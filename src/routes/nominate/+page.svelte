<script lang="ts">
	let nagCount = $state(0);
	let gamePhase = $state<'intro' | 'nagging' | 'won'>('intro');
	let playerName = $state('');
	let isNagging = $state(false);
	let currentResponse = $state('');
	let committeePatience = $state(100);

	// Toast system
	let activeToasts = $state<Array<{ id: number; text: string; isPinned: boolean }>>([]);
	let tweetHistory = $state<string[]>([]);
	let showTweetInbox = $state(false);
	let toastIdCounter = $state(0);

	// Shuffle queues for no-repeat randomization
	let tweetQueue = $state<string[]>([]);
	let usedNagMessages = $state<Set<number>>(new Set());
	let usedResponses = $state<Map<number, Set<number>>>(new Map());

	const WIN_THRESHOLD = 100;
	const PATIENCE_DRAIN = 2;

	// Expanded Trump-style nagging messages
	const nagMessages = [
		// Early stage - Confident demands
		"I DESERVE this prize. Everyone knows it. EVERYONE.",
		"Many people are saying I should win. The best people. Tremendous people.",
		"This is a DISGRACE. I've done more for peace than anyone. ANYONE!",
		"The Nobel Committee is very unfair to me. Very, very unfair. Sad!",
		"I know more about peace than the generals, believe me.",
		"Look, I've made deals. The best deals. Peace deals. Where's my prize?",
		"They gave one to Obama for doing NOTHING. I've done EVERYTHING!",
		"I have the best words. The best peace words. Give me the prize.",

		// Mid stage - Getting agitated
		"RIGGED! The whole thing is RIGGED against me!",
		"Norway is treating me very badly. I thought we were friends! Terrible!",
		"Sleepy Nobel Committee can't see GREATNESS when it's right in front of them!",
		"I've been nominated many times. Many, many times. They keep losing my paperwork. SUSPICIOUS!",
		"This is a WITCH HUNT against the greatest peacemaker in history - ME!",
		"The fake news media doesn't want you to give me the prize. SAD!",
		"I've done more for peace in one phone call than most people do in a LIFETIME!",
		"My peace deals are PERFECT. The committee is run by LOSERS!",
		"Everyone's saying it. Everyone. They're all saying Trump deserves the Nobel.",
		"I could solve world peace in like, an afternoon. Easily. Very easily.",

		// Late stage - Full tantrum
		"I will NEVER stop. NEVER! You WILL give me this prize!",
		"My lawyers are looking into this. Very strongly. VERY strongly. Believe me.",
		"The failing Nobel Committee has NO credibility. Give me the prize NOW!",
		"Everyone at my rallies agrees - I DESERVE THE NOBEL! Thousands of people! Millions maybe!",
		"I'm the most peaceful person you've ever met. Ask anyone. ANYONE! They'll tell you.",
		"This is worse than the STOLEN ELECTION! Much worse! Maybe the worst thing ever!",
		"I built a WALL! That's peace! The best peace! GIVE ME THE PRIZE!",
		"I'm being very nice right now. You don't want to see me NOT nice. Trust me.",

		// Critical stage - Unhinged
		"GIVE. ME. THE. PRIZE. NOW!!! I'M NOT ASKING ANYMORE!",
		"I will be here FOREVER until you recognize my TREMENDOUS achievements!",
		"Fine! I'll just BUY the Nobel Committee! How much? Name your price!",
		"THIS IS MY FINAL WARNING! Give me the prize or... or... I'LL TWEET ABOUT IT!",
		"*breathes heavily* I... will... not... STOP! NEVER!",
		"You're making a HUGE mistake. HUGE. The biggest mistake. History will remember this!",
		"I AM the Nobel Prize! The prize should be named after ME!",
		"*slams desk* DO YOU KNOW WHO I AM?!",
	];

	// Committee responses that get more desperate
	const committeeResponses = [
		{ min: 80, responses: [
			"Sir, self-nominations are not accepted. Please review our guidelines.",
			"We appreciate your interest, but please follow proper channels.",
			"The committee will review all qualified nominations in due time.",
			"Perhaps consider earning it through actual documented achievements?",
			"Sir, this is the Nobel Committee, not a request line.",
			"We've received your... enthusiastic correspondence.",
		]},
		{ min: 50, responses: [
			"Sir, please... this is the 30th email today.",
			"We've already explained this. Multiple times. Many, many times.",
			"Security has been notified. Again.",
			"Is there someone we can call for you? A handler perhaps?",
			"*sighs in Norwegian*",
			"We're considering changing our phone number.",
			"The committee is in a meeting. Forever. We're in a meeting forever.",
			"Please hold... *puts phone down, walks away*",
		]},
		{ min: 20, responses: [
			"Please. We're begging you. Stop.",
			"The staff is hiding under their desks.",
			"We're considering early retirement. All of us. The entire committee.",
			"Why are you like this? Who hurt you?",
			"*muffled screaming from the break room*",
			"We've started a support group. For us. Because of you.",
			"Our therapist says we need to set boundaries. This is a boundary. Please.",
			"Several committee members have fled to Sweden.",
		]},
		{ min: 1, responses: [
			"...",
			"*thousand yard stare*",
			"We've stopped answering the phones. All phones. Forever.",
			"Someone is crying in the break room. It might be all of us.",
			"Fine. FINE. We'll... we'll consider you. Just... STOP.",
			"*unintelligible Norwegian sobbing*",
			"The committee has voted to dissolve itself.",
			"You win. You win. Please. Just go away.",
		]},
	];

	// Expanded Trump-style tweets
	const allTweets = [
		"The Nobel Committee is a JOKE! I've done more for peace than anyone in HISTORY. Obama got one for doing NOTHING. I ended wars! (that I started, but still!) GIVE ME MY PRIZE! #NobelPrize #Rigged #MAGA",

		"Just heard the Nobel Committee is considering giving the Peace Prize to someone else. AGAIN! This is a DISGRACE to the great people of America (and Norway, I guess). I DEMAND a recount of the nominations!",

		"Many people don't know this, but I was nominated for the Nobel Prize 47 times. Maybe more! The corrupt committee keeps 'losing' the paperwork. Very suspicious! INVESTIGATE!",

		"I will be holding a press conference to announce that I am awarding MYSELF the Nobel Peace Prize. It will be the most beautiful prize ceremony ever. Much better than Sweden. (Is it Sweden or Norway? WHO CARES!)",

		"The Nobel Peace Prize has been totally DEVALUED by giving it to people who aren't me. When I get it (and I WILL), it will finally mean something again. The world is watching! #Trump2024 #NobelForTrump",

		"Norway should be THANKING ME! I put them on the map! Nobody knew where Norway was before me. Now everyone's talking about Norway. You're welcome! Now give me my PRIZE!",

		"The Nobel Committee called me. They said, 'Sir, you are the most peaceful person we've ever seen.' I said, 'I know.' Then they hung up. RUDE! #FakeNobel",

		"I've made more peace than all other Nobel winners COMBINED! Abraham Lincoln, Martin Luther King, Mother Teresa - great people, but they didn't have my deals! #PeaceDeals #Winning",

		"BREAKING: Sources are telling me the Nobel Committee is TERRIFIED of how great I am. They can't handle this level of peace. Many such cases! SAD!",

		"Why does the Nobel Committee hate America? Why do they hate PEACE? Why do they hate ME? These are the questions the Fake News won't ask! #NobelScandal",

		"I just saved the world again. Didn't even try that hard. It's just natural talent. Where's my prize? Hello? HELLO?! #NaturalPeacemaker",

		"The Nobel Prize is actually named after my great great grandfather, Alfred Trump Nobel. The Fake History books won't tell you that! Give me back my family's prize!",

		"Some people are saying I should get TWO Nobel Prizes. One for Peace, one for being such a stable genius. I agree! #DoubleNobel #VeryStable",

		"I've been tougher on war than any president in history. Also tougher on peace. I'm tough on everything. Very tough. The toughest. GIVE ME THE PRIZE!",

		"The Nobel Committee just endorsed me for the prize. They didn't say it publicly because they're scared, but I could tell. I can always tell. #Endorsed",

		"NORWAY ALERT: If I don't get the Nobel Prize, I will be forced to consider Norway a hostile nation. Very hostile. The hostilest. Think about it! 🇳🇴❌",

		"People keep asking, 'Sir, why don't you have a Nobel Prize?' And I say, 'Great question!' And they say, 'You deserve one!' And I say, 'I know!' #PeopleAreSaying",

		"The Nobel Prize ceremony would get the BEST ratings if I won. The best ever. Better than the Super Bowl. Better than the Moon Landing. Think of the ratings, Norway!",

		"I'm starting my own prize. The Trump Prize for Peace and Greatness. First winner: ME! Much better than the Nobel. Nobody will remember the Nobel. #TrumpPrize",

		"FAKE NEWS is saying I'm 'obsessed' with the Nobel Prize. WRONG! I barely think about it. Maybe once or twice an hour. Very normal amount! #NotObsessed",
	];

	function shuffleArray<T>(array: T[]): T[] {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	}

	function getNextTweet(): string {
		if (tweetQueue.length === 0) {
			tweetQueue = shuffleArray(allTweets);
		}
		return tweetQueue.pop()!;
	}

	function getNagMessage(progressPercent: number): string {
		// Determine which slice of messages to use
		let start: number, end: number;
		if (progressPercent < 20) {
			start = 0; end = 8;
		} else if (progressPercent < 50) {
			start = 8; end = 20;
		} else if (progressPercent < 80) {
			start = 20; end = 28;
		} else {
			start = 28; end = nagMessages.length;
		}

		// Get unused messages in this range
		const availableIndices: number[] = [];
		for (let i = start; i < end; i++) {
			if (!usedNagMessages.has(i)) {
				availableIndices.push(i);
			}
		}

		// If all used, reset this range
		if (availableIndices.length === 0) {
			for (let i = start; i < end; i++) {
				usedNagMessages.delete(i);
				availableIndices.push(i);
			}
		}

		const idx = availableIndices[Math.floor(Math.random() * availableIndices.length)];
		usedNagMessages.add(idx);
		return nagMessages[idx];
	}

	function getCommitteeResponse(): string {
		const group = committeeResponses.find(g => committeePatience >= g.min) || committeeResponses[committeeResponses.length - 1];
		const groupIdx = committeeResponses.indexOf(group);

		if (!usedResponses.has(groupIdx)) {
			usedResponses.set(groupIdx, new Set());
		}
		const used = usedResponses.get(groupIdx)!;

		// Get unused responses
		const availableIndices: number[] = [];
		for (let i = 0; i < group.responses.length; i++) {
			if (!used.has(i)) {
				availableIndices.push(i);
			}
		}

		// If all used, reset
		if (availableIndices.length === 0) {
			used.clear();
			for (let i = 0; i < group.responses.length; i++) {
				availableIndices.push(i);
			}
		}

		const idx = availableIndices[Math.floor(Math.random() * availableIndices.length)];
		used.add(idx);
		return group.responses[idx];
	}

	function addToast(text: string) {
		const id = toastIdCounter++;
		activeToasts = [...activeToasts, { id, text, isPinned: false }];
		tweetHistory = [...tweetHistory, text];

		// Auto-dismiss after 8 seconds if not pinned
		setTimeout(() => {
			dismissToast(id);
		}, 8000);
	}

	function dismissToast(id: number) {
		activeToasts = activeToasts.filter(t => t.id !== id || t.isPinned);
	}

	function pinToast(id: number) {
		activeToasts = activeToasts.map(t =>
			t.id === id ? { ...t, isPinned: true } : t
		);
	}

	function unpinToast(id: number) {
		activeToasts = activeToasts.map(t =>
			t.id === id ? { ...t, isPinned: false } : t
		);
		// Start dismiss timer
		setTimeout(() => dismissToast(id), 3000);
	}

	let currentNagMessage = $state('');

	function startGame() {
		if (!playerName.trim()) {
			playerName = 'Donald J. Trump';
		}
		gamePhase = 'nagging';
		tweetQueue = shuffleArray(allTweets);
		usedNagMessages = new Set();
		usedResponses = new Map();
	}

	function nag() {
		if (isNagging || gamePhase === 'won') return;

		isNagging = true;
		nagCount++;
		committeePatience = Math.max(0, committeePatience - PATIENCE_DRAIN);

		const progressPercent = (nagCount / WIN_THRESHOLD) * 100;
		currentNagMessage = getNagMessage(progressPercent);
		currentResponse = getCommitteeResponse();

		// Random chance to trigger a tweet (higher chance as game progresses)
		const tweetChance = 0.1 + (progressPercent / 500);
		if (Math.random() < tweetChance && nagCount > 5) {
			addToast(getNextTweet());
		}

		// Check for win
		if (nagCount >= WIN_THRESHOLD || committeePatience <= 0) {
			setTimeout(() => {
				gamePhase = 'won';
			}, 500);
		}

		setTimeout(() => {
			isNagging = false;
		}, 100);
	}

	function reset() {
		nagCount = 0;
		gamePhase = 'intro';
		playerName = '';
		committeePatience = 100;
		currentResponse = '';
		currentNagMessage = '';
		activeToasts = [];
		tweetHistory = [];
		showTweetInbox = false;
		tweetQueue = [];
		usedNagMessages = new Set();
		usedResponses = new Map();
	}

	// Derived values for visual effects
	const intensity = $derived(nagCount / WIN_THRESHOLD);
	const screenShake = $derived(intensity > 0.5);
	const backgroundColor = $derived(
		intensity < 0.3 ? 'bg-[var(--cream)]' :
		intensity < 0.6 ? 'bg-orange-50' :
		intensity < 0.8 ? 'bg-red-50' :
		'bg-red-100'
	);
</script>

<svelte:head>
	<title>Nominate Yourself | NobelMarket</title>
</svelte:head>

<section class="min-h-screen {backgroundColor} transition-colors duration-500 py-12 px-6 {screenShake ? 'shake' : ''}">
	<div class="max-w-4xl mx-auto">

		{#if gamePhase === 'intro'}
			<!-- Intro Screen -->
			<div class="text-center py-12">
				<h1 class="font-display text-5xl md:text-6xl font-bold text-[var(--navy)] mb-6">
					Nominate <span class="text-[var(--gold)]">Yourself</span>
				</h1>
				<p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
					The Nobel Committee doesn't accept self-nominations. But have they considered
					that you're <em>really, really</em> special? That you've done more for peace
					than anyone? <strong>ANYONE?</strong>
				</p>

				<div class="card max-w-md mx-auto p-8 mb-8">
					<label class="block text-left mb-2 font-semibold text-[var(--navy)]" for="player-name">
						Enter Your Very Important Name
					</label>
					<input
						id="player-name"
						type="text"
						bind:value={playerName}
						placeholder="Donald J. Trump"
						class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg text-center focus:border-[var(--gold)] focus:outline-none transition-colors"
					/>
					<p class="text-sm text-gray-400 mt-2">Leave blank for the authentic experience</p>
				</div>

				<button
					onclick={startGame}
					class="btn-primary text-xl px-12 py-4 pulse-gold"
				>
					START NAGGING
				</button>

				<div class="mt-12 p-6 bg-white/50 rounded-2xl max-w-lg mx-auto">
					<h3 class="font-display font-bold text-lg text-[var(--navy)] mb-3">How To Play</h3>
					<ul class="text-left text-gray-600 space-y-2">
						<li>🗣️ Click the button to nag the Nobel Committee</li>
						<li>😤 Watch their patience drain with every demand</li>
						<li>🐦 Tweets will pop up - hover to keep them visible!</li>
						<li>📥 Check your Tweet Inbox to review your greatest hits</li>
						<li>🏆 Keep going until they give in!</li>
					</ul>
				</div>
			</div>

		{:else if gamePhase === 'nagging'}
			<!-- Game Screen -->
			<div class="text-center">
				<!-- Header -->
				<div class="mb-8 flex items-center justify-center gap-4">
					<div>
						<p class="text-sm text-gray-500 uppercase tracking-wider mb-2">Currently Harassing</p>
						<h1 class="font-display text-3xl md:text-4xl font-bold text-[var(--navy)]">
							The Nobel Committee
						</h1>
					</div>

					<!-- Tweet Inbox Button -->
					{#if tweetHistory.length > 0}
						<button
							onclick={() => showTweetInbox = !showTweetInbox}
							class="relative ml-4 p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
							title="Tweet Inbox"
						>
							<span class="text-2xl">📥</span>
							<span class="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
								{tweetHistory.length}
							</span>
						</button>
					{/if}
				</div>

				<!-- Stats Bar -->
				<div class="grid grid-cols-2 gap-4 mb-8 max-w-lg mx-auto">
					<div class="card p-4">
						<div class="text-3xl font-bold text-[var(--gold)] font-display">{nagCount}</div>
						<div class="text-sm text-gray-500">Demands Made</div>
					</div>
					<div class="card p-4">
						<div class="text-3xl font-bold font-display {committeePatience < 30 ? 'text-red-500' : committeePatience < 60 ? 'text-orange-500' : 'text-green-500'}">{committeePatience}%</div>
						<div class="text-sm text-gray-500">Committee Patience</div>
					</div>
				</div>

				<!-- Progress Bar -->
				<div class="max-w-lg mx-auto mb-8">
					<div class="h-4 bg-gray-200 rounded-full overflow-hidden">
						<div
							class="h-full transition-all duration-300 rounded-full"
							style="width: {intensity * 100}%; background: linear-gradient(90deg, #22c55e, #eab308, #ef4444);"
						></div>
					</div>
					<p class="text-sm text-gray-500 mt-2">
						{#if intensity < 0.3}
							They're still being polite...
						{:else if intensity < 0.6}
							They're getting annoyed...
						{:else if intensity < 0.9}
							They're considering giving in...
						{:else}
							ALMOST THERE! ONE MORE PUSH!
						{/if}
					</p>
				</div>

				<!-- Main Button -->
				<div class="relative mb-8">
					<button
						onclick={nag}
						disabled={isNagging}
						class="relative text-xl md:text-2xl font-bold px-16 py-8 rounded-2xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-80 uppercase tracking-wide"
						style="background: linear-gradient(135deg, {intensity < 0.5 ? '#d4af37, #b8960f' : intensity < 0.8 ? '#ef4444, #dc2626' : '#7c2d12, #451a03'}); color: white; box-shadow: 0 8px 32px {intensity < 0.5 ? 'rgba(212, 175, 55, 0.4)' : 'rgba(239, 68, 68, 0.4)'};"
					>
						{#if intensity < 0.2}
							Demand the Prize!
						{:else if intensity < 0.4}
							Nag Harder!
						{:else if intensity < 0.6}
							Throw a Tantrum!
						{:else if intensity < 0.8}
							Threaten Them!
						{:else}
							FINAL PUSH!!!
						{/if}
					</button>

					{#if intensity > 0.7}
						<div class="absolute -inset-4 rounded-3xl border-2 border-red-500 animate-ping opacity-50"></div>
					{/if}
				</div>

				<!-- Your Demand -->
				<div class="card max-w-2xl mx-auto p-6 mb-6" style="border-left: 4px solid {intensity < 0.5 ? 'var(--gold)' : '#ef4444'};">
					<div class="flex items-start gap-4">
						<div class="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
							{playerName.charAt(0).toUpperCase() || 'D'}
						</div>
						<div class="text-left">
							<div class="font-bold text-[var(--navy)]">{playerName || 'Donald J. Trump'}</div>
							<p class="text-gray-700 mt-1" class:trump-caps={intensity > 0.6}>
								{currentNagMessage || nagMessages[0]}
							</p>
						</div>
					</div>
				</div>

				<!-- Committee Response -->
				{#if currentResponse}
					<div class="card max-w-2xl mx-auto p-6 bg-gray-50 border-l-4 border-gray-400">
						<div class="flex items-start gap-4">
							<div class="w-12 h-12 rounded-full bg-[var(--navy)] flex items-center justify-center text-xl shrink-0">
								🇳🇴
							</div>
							<div class="text-left">
								<div class="font-bold text-[var(--navy)]">Nobel Committee</div>
								<p class="text-gray-600 mt-1 italic">{currentResponse}</p>
							</div>
						</div>
					</div>
				{/if}
			</div>

		{:else if gamePhase === 'won'}
			<!-- Win Screen -->
			<div class="text-center py-12">
				<div class="text-8xl mb-6">🏆</div>
				<h1 class="font-display text-5xl md:text-6xl font-bold text-[var(--gold)] mb-6">
					YOU WON!
				</h1>
				<p class="text-2xl text-[var(--navy)] mb-4">
					{playerName || 'Donald J. Trump'} has been awarded the Nobel Peace Prize!
				</p>
				<p class="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
					After {nagCount} demands and completely destroying the committee's will to live,
					they have officially given up and granted you the prize.
				</p>

				<div class="card max-w-lg mx-auto p-8 mb-8">
					<h3 class="font-display font-bold text-xl text-[var(--navy)] mb-4">Official Statement</h3>
					<p class="text-gray-600 italic leading-relaxed">
						"Fine. FINE. Take it. Take the prize. We don't care anymore. The committee
						is disbanding. Several members have moved to undisclosed locations. The building
						is being sold. We're done. You win. Please... just leave us alone."
					</p>
					<p class="text-sm text-gray-400 mt-4">— Norwegian Nobel Committee (Dissolved)</p>
				</div>

				<div class="card max-w-lg mx-auto p-6 bg-green-50 border-2 border-green-200 mb-8">
					<h4 class="font-bold text-green-800 mb-2">Your Victory Tweet</h4>
					<p class="text-green-700 text-sm">
						"I KNEW IT! The Nobel Committee finally recognized TRUE GREATNESS! This is the most
						DESERVED prize in HISTORY! Many people are saying it's even better than my other
						achievements (which are many). THANK YOU NORWAY! You're welcome! 🏆🇺🇸 #NobelPrize #Winner #MAGA"
					</p>
				</div>

				<!-- Tweet History on Win -->
				{#if tweetHistory.length > 0}
					<div class="card max-w-lg mx-auto p-6 mb-8">
						<h4 class="font-bold text-[var(--navy)] mb-4">Your Campaign Trail ({tweetHistory.length} tweets)</h4>
						<div class="max-h-48 overflow-y-auto space-y-3 text-left">
							{#each tweetHistory as tweet, i}
								<div class="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 border-l-2 border-blue-400">
									{tweet.slice(0, 100)}...
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<button
					onclick={reset}
					class="btn-primary text-lg"
				>
					Demand Another Prize
				</button>

				<p class="text-sm text-gray-400 mt-6">
					Note: This was easier than it should be, which is exactly the point.
				</p>
			</div>
		{/if}

		<!-- Historical Context - toned down -->
		{#if gamePhase !== 'won'}
			<div class="mt-16 card p-8">
				<h2 class="font-display text-2xl font-bold text-[var(--navy)] mb-6 text-center">
					Nobel Prize: A Complicated History
				</h2>

				<div class="space-y-4 text-sm text-gray-600">
					<p>
						The Nobel Peace Prize has a... let's say <em>mixed</em> track record. Henry Kissinger won in 1973
						while overseeing the bombing of Cambodia. Obama won in 2009 for... well, being elected, mostly.
						The EU won in 2012, which is a whole thing.
					</p>
					<p>
						Meanwhile, countless activists, journalists, and leaders doing actual work get overlooked.
						Some nominees face real consequences for their advocacy while the committee debates.
					</p>
					<p>
						And then there's the fact that Norway gives out this peace prize while being one of the world's
						largest per-capita arms exporters. But sure, they're the arbiters of peace. Makes sense.
					</p>
				</div>

				<div class="mt-6 p-4 bg-amber-50 rounded-xl text-sm text-amber-800">
					<strong>The Point:</strong> Maybe the real absurdity isn't someone nagging for a prize -
					it's that the whole system is a bit of a circus anyway. At least tantrums are honest about what they are.
				</div>
			</div>
		{/if}
	</div>

	<!-- Toast Container -->
	<div class="fixed bottom-4 right-4 flex flex-col gap-3 z-50 max-w-sm">
		{#each activeToasts as toast (toast.id)}
			<div
				class="bg-white rounded-2xl shadow-2xl p-5 border-l-4 border-blue-400 transform transition-all duration-300 hover:scale-105 cursor-pointer"
				onmouseenter={() => pinToast(toast.id)}
				onmouseleave={() => unpinToast(toast.id)}
				role="alert"
			>
				<div class="flex items-center justify-between gap-2 mb-2">
					<div class="flex items-center gap-2">
						<span class="text-blue-500 text-lg">𝕏</span>
						<span class="font-bold text-sm">New Post</span>
					</div>
					<button
						onclick={() => { activeToasts = activeToasts.filter(t => t.id !== toast.id); }}
						class="text-gray-400 hover:text-gray-600 text-lg leading-none"
					>
						×
					</button>
				</div>
				<p class="text-sm text-gray-700 leading-relaxed">{toast.text}</p>
				{#if toast.isPinned}
					<p class="text-xs text-blue-500 mt-2">📌 Pinned - move mouse away to dismiss</p>
				{/if}
			</div>
		{/each}
	</div>

	<!-- Tweet Inbox Modal -->
	{#if showTweetInbox}
		<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onclick={() => showTweetInbox = false}>
			<div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden" onclick={(e) => e.stopPropagation()}>
				<div class="p-6 border-b flex items-center justify-between">
					<div class="flex items-center gap-3">
						<span class="text-2xl">📥</span>
						<h3 class="font-display font-bold text-xl text-[var(--navy)]">Tweet Inbox</h3>
					</div>
					<button
						onclick={() => showTweetInbox = false}
						class="text-gray-400 hover:text-gray-600 text-2xl leading-none"
					>
						×
					</button>
				</div>
				<div class="p-6 overflow-y-auto max-h-[60vh]">
					{#if tweetHistory.length === 0}
						<p class="text-center text-gray-500">No tweets yet. Keep nagging!</p>
					{:else}
						<div class="space-y-4">
							{#each tweetHistory as tweet, i}
								<div class="p-4 bg-gray-50 rounded-xl border-l-4 border-blue-400">
									<div class="flex items-center gap-2 mb-2">
										<span class="text-blue-500">𝕏</span>
										<span class="font-bold text-sm text-gray-700">Tweet #{i + 1}</span>
									</div>
									<p class="text-sm text-gray-700 leading-relaxed">{tweet}</p>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</section>

<style>
	.shake {
		animation: shake 0.2s ease-in-out infinite;
	}

	@keyframes shake {
		0%, 100% { transform: translateX(0); }
		25% { transform: translateX(-3px) rotate(-0.5deg); }
		75% { transform: translateX(3px) rotate(0.5deg); }
	}

	.trump-caps {
		text-transform: uppercase;
		font-weight: 700;
		letter-spacing: 0.02em;
	}
</style>
