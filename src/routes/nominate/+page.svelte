<script lang="ts">
	let nagCount = $state(0);
	let gamePhase = $state<'intro' | 'nagging' | 'won'>('intro');
	let playerName = $state('');
	let isNagging = $state(false);
	let showTweet = $state(false);
	let currentResponse = $state('');
	let committeePatience = $state(100);
	let tweetText = $state('');

	const WIN_THRESHOLD = 100;
	const PATIENCE_DRAIN = 2;

	// Trump-style nagging messages that escalate
	const nagMessages = [
		// Early stage (0-20)
		"I DESERVE this prize. Everyone knows it. EVERYONE.",
		"Many people are saying I should win. The best people.",
		"This is a DISGRACE. I've done more for peace than anyone. ANYONE!",
		"The Nobel Committee is very unfair to me. Very, very unfair.",
		"I know more about peace than the generals, believe me.",
		// Mid stage (21-50)
		"RIGGED! The whole thing is RIGGED against me!",
		"Norway is treating me very badly. I thought we were friends!",
		"Sleepy Nobel Committee can't see GREATNESS when it's right in front of them!",
		"I've been nominated many times. Many, many times. They keep losing my paperwork!",
		"This is a WITCH HUNT against the greatest peacemaker in history - ME!",
		"The fake news media doesn't want you to give me the prize. SAD!",
		// Late stage (51-80)
		"I will NEVER stop. NEVER! You will give me this prize!",
		"My lawyers are looking into this. Very strongly. VERY strongly.",
		"The failing Nobel Committee has NO credibility. Give me the prize NOW!",
		"Everyone at my rallies agrees - I DESERVE THE NOBEL! Thousands of people!",
		"I'm the most peaceful person you've ever met. Ask anyone. ANYONE!",
		"This is worse than the STOLEN ELECTION! Much worse!",
		// Critical stage (81-99)
		"GIVE. ME. THE. PRIZE. NOW!!!",
		"I will be here FOREVER until you recognize my TREMENDOUS achievements!",
		"Fine! I'll just BUY the Nobel Committee! How much?",
		"THIS IS MY FINAL WARNING! Give me the prize or... or... I'LL TWEET ABOUT IT!",
		"*breathes heavily* I... will... not... STOP!",
	];

	// Committee responses that get more tired
	const committeeResponses = [
		// High patience (100-80)
		{ min: 80, responses: [
			"Sir, self-nominations are not accepted.",
			"We appreciate your interest, but please follow proper channels.",
			"The committee will review all qualified nominations.",
			"Perhaps consider earning it through actual achievements?",
		]},
		// Medium patience (79-50)
		{ min: 50, responses: [
			"Sir, please... this is the 30th email today.",
			"We've already explained this. Multiple times.",
			"Security has been notified.",
			"Is there someone we can call for you?",
			"*sighs in Norwegian*",
		]},
		// Low patience (49-20)
		{ min: 20, responses: [
			"Please. We're begging you. Stop.",
			"The staff is hiding under their desks.",
			"We're considering early retirement. All of us.",
			"Why are you like this?",
			"*muffled screaming*",
		]},
		// Critical patience (19-1)
		{ min: 1, responses: [
			"...",
			"*thousand yard stare*",
			"We've stopped answering the phones.",
			"Someone is crying in the break room.",
			"Fine. FINE. We'll... we'll consider you. Just STOP.",
		]},
	];

	// Trump-style tweets
	const tweets = [
		"The Nobel Committee is a JOKE! I've done more for peace than anyone in HISTORY. Obama got one for doing NOTHING. I ended wars! (that I started, but still!) GIVE ME MY PRIZE! #NobelPrize #Rigged #MAGA",
		"Just heard the Nobel Committee is considering giving the Peace Prize to someone else. AGAIN! This is a DISGRACE to the great people of America (and Norway, I guess). I DEMAND a recount of the nominations!",
		"Many people don't know this, but I was nominated for the Nobel Prize 47 times. Maybe more! The corrupt committee keeps 'losing' the paperwork. Very suspicious! INVESTIGATE!",
		"I will be holding a press conference to announce that I am awarding MYSELF the Nobel Peace Prize. It will be the most beautiful prize ceremony ever. Much better than Sweden. (Is it Sweden or Norway? WHO CARES!)",
		"The Nobel Peace Prize has been totally DEVALUED by giving it to people who aren't me. When I get it (and I WILL), it will finally mean something again. The world is watching! #Trump2024 #NobelForTrump",
	];

	function startGame() {
		if (!playerName.trim()) {
			playerName = 'Donald J. Trump';
		}
		gamePhase = 'nagging';
	}

	function nag() {
		if (isNagging || gamePhase === 'won') return;

		isNagging = true;
		nagCount++;
		committeePatience = Math.max(0, committeePatience - PATIENCE_DRAIN);

		// Get appropriate nag message based on progress
		const progressPercent = (nagCount / WIN_THRESHOLD) * 100;
		let messagePool: string[];
		if (progressPercent < 20) {
			messagePool = nagMessages.slice(0, 5);
		} else if (progressPercent < 50) {
			messagePool = nagMessages.slice(5, 12);
		} else if (progressPercent < 80) {
			messagePool = nagMessages.slice(12, 18);
		} else {
			messagePool = nagMessages.slice(18);
		}

		// Get committee response based on patience
		const responseGroup = committeeResponses.find(g => committeePatience >= g.min) || committeeResponses[committeeResponses.length - 1];
		currentResponse = responseGroup.responses[Math.floor(Math.random() * responseGroup.responses.length)];

		// Random chance to trigger a tweet
		if (Math.random() < 0.15 && nagCount > 10) {
			showTweet = true;
			tweetText = tweets[Math.floor(Math.random() * tweets.length)];
			setTimeout(() => showTweet = false, 4000);
		}

		// Check for win
		if (nagCount >= WIN_THRESHOLD || committeePatience <= 0) {
			setTimeout(() => {
				gamePhase = 'won';
			}, 500);
		}

		setTimeout(() => {
			isNagging = false;
		}, 150);
	}

	function reset() {
		nagCount = 0;
		gamePhase = 'intro';
		playerName = '';
		committeePatience = 100;
		currentResponse = '';
		showTweet = false;
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
					<label class="block text-left mb-2 font-semibold text-[var(--navy)]">
						Enter Your Very Important Name
					</label>
					<input
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
						<li>🐦 Random tweets will appear to boost your case</li>
						<li>🏆 Keep going until they give in!</li>
					</ul>
				</div>
			</div>

		{:else if gamePhase === 'nagging'}
			<!-- Game Screen -->
			<div class="text-center">
				<!-- Header -->
				<div class="mb-8">
					<p class="text-sm text-gray-500 uppercase tracking-wider mb-2">Currently Harassing</p>
					<h1 class="font-display text-3xl md:text-4xl font-bold text-[var(--navy)]">
						The Nobel Committee
					</h1>
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
						class="relative text-xl md:text-2xl font-bold px-16 py-8 rounded-2xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-80"
						style="background: linear-gradient(135deg, {intensity < 0.5 ? '#d4af37, #b8960f' : intensity < 0.8 ? '#ef4444, #dc2626' : '#7c2d12, #451a03'}); color: white; box-shadow: 0 8px 32px {intensity < 0.5 ? 'rgba(212, 175, 55, 0.4)' : 'rgba(239, 68, 68, 0.4)'};"
					>
						{#if intensity < 0.2}
							DEMAND THE PRIZE!
						{:else if intensity < 0.4}
							NAG HARDER!
						{:else if intensity < 0.6}
							THROW A TANTRUM!
						{:else if intensity < 0.8}
							THREATEN THEM!
						{:else}
							FINAL PUSH!!!
						{/if}
					</button>

					<!-- Visual effects on button -->
					{#if intensity > 0.7}
						<div class="absolute -inset-4 rounded-3xl border-2 border-red-500 animate-ping opacity-50"></div>
					{/if}
				</div>

				<!-- Your Demand -->
				<div class="card max-w-2xl mx-auto p-6 mb-6" style="border-left: 4px solid {intensity < 0.5 ? 'var(--gold)' : '#ef4444'};">
					<div class="flex items-start gap-4">
						<div class="w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold text-lg shrink-0">
							{playerName.charAt(0).toUpperCase() || 'D'}
						</div>
						<div class="text-left">
							<div class="font-bold text-[var(--navy)]">{playerName || 'Donald J. Trump'}</div>
							<p class="text-gray-700 mt-1" class:trump-caps={intensity > 0.6}>
								{nagMessages[Math.min(Math.floor(intensity * nagMessages.length), nagMessages.length - 1)]}
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

				<!-- Random Tweet Popup -->
				{#if showTweet}
					<div class="fixed bottom-8 right-8 max-w-sm bg-white rounded-2xl shadow-2xl p-6 border-l-4 border-blue-400 animate-bounce z-50">
						<div class="flex items-center gap-2 mb-3">
							<span class="text-blue-400 text-xl">𝕏</span>
							<span class="font-bold">New Post</span>
						</div>
						<p class="text-sm text-gray-700">{tweetText}</p>
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
						is disbanding. Several members have moved to undisclosed locations. Please...
						just leave us alone."
					</p>
					<p class="text-sm text-gray-400 mt-4">— Norwegian Nobel Committee (Former)</p>
				</div>

				<div class="card max-w-lg mx-auto p-6 bg-green-50 border-2 border-green-200 mb-8">
					<h4 class="font-bold text-green-800 mb-2">Your Victory Tweet</h4>
					<p class="text-green-700 text-sm">
						"I KNEW IT! The Nobel Committee finally recognized TRUE GREATNESS! This is the most
						DESERVED prize in HISTORY! Many people are saying it's even better than my other
						achievements (which are many). THANK YOU NORWAY! 🏆🇺🇸 #NobelPrize #Winner #MAGA"
					</p>
				</div>

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

		<!-- Historical Context -->
		{#if gamePhase !== 'won'}
			<div class="mt-16 card p-8">
				<h2 class="font-display text-2xl font-bold text-[var(--navy)] mb-6 text-center">
					🏆 Hall of Persistent Nominators 🏆
				</h2>
				<div class="grid md:grid-cols-2 gap-6">
					<div class="p-4 bg-gray-50 rounded-xl">
						<h3 class="font-bold text-lg mb-2">Donald J. Trump</h3>
						<p class="text-sm text-gray-600 mb-2">Strategy: Tweet, threaten, repeat endlessly</p>
						<p class="text-sm text-gray-500 italic">"I should have gotten it many times. They keep losing my nominations. Very suspicious!"</p>
					</div>
					<div class="p-4 bg-gray-50 rounded-xl">
						<h3 class="font-bold text-lg mb-2">María Corina Machado</h3>
						<p class="text-sm text-gray-600 mb-2">Strategy: Actually fight for democracy</p>
						<p class="text-sm text-gray-500 italic">"I don't need to nag. The work speaks for itself. But it would be nice if Norway cared as much about democracy as they do about oil money."</p>
					</div>
				</div>

				<div class="mt-6 p-4 bg-amber-50 rounded-xl text-sm text-amber-800">
					<strong>Pro Tip:</strong> The real lesson here is that the Nobel Peace Prize has been given to war criminals
					(Kissinger), awarded prematurely (Obama), and often ignores those doing the actual work (Machado).
					Maybe the real prize was the institutional critique we made along the way.
				</div>
			</div>
		{/if}
	</div>
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
	}
</style>
