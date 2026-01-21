<script lang="ts">
	let tantrumCount = $state(0);
	let currentPhase = $state(0);
	let hasWon = $state(false);
	let selectedCategory = $state('peace');
	let playerName = $state('');

	const TANTRUM_THRESHOLD = 50;

	const phases = [
		{
			min: 0,
			max: 10,
			title: "Polite Request",
			description: "You've submitted a formal nomination request.",
			buttonText: "Request Consideration",
			emoji: "📝",
			responses: [
				"Thank you for your interest. The committee will review in due course.",
				"Your nomination has been logged.",
				"We appreciate your patience during our deliberations."
			]
		},
		{
			min: 11,
			max: 20,
			title: "Persistent Asking",
			description: "You're sending follow-up emails.",
			buttonText: "Send Another Email",
			emoji: "📧",
			responses: [
				"We've received your 12th email this week.",
				"As stated previously, we cannot comment on nominations.",
				"Please stop calling the Oslo office."
			]
		},
		{
			min: 21,
			max: 30,
			title: "Social Media Campaign",
			description: "You're hashtagging aggressively.",
			buttonText: "Post Another Tweet",
			emoji: "🐦",
			responses: [
				"#IDeserveTheNobel is trending... in your household.",
				"Your LinkedIn post got 3 pity likes.",
				"Someone replied 'who are you?'"
			]
		},
		{
			min: 31,
			max: 40,
			title: "Public Tantrum",
			description: "You're crying on national television.",
			buttonText: "Cry Harder on TV",
			emoji: "😭",
			responses: [
				"Your tearful interview went viral (for the wrong reasons).",
				"Pundits are calling it 'unhinged but entertaining'.",
				"Your approval ratings somehow increased."
			]
		},
		{
			min: 41,
			max: 49,
			title: "Man-Child Mode",
			description: "Full toddler energy. Threatening to hold your breath.",
			buttonText: "Throw Things",
			emoji: "🤬",
			responses: [
				"You've been banned from the Nobel Peace Center.",
				"Security had to escort you out. Twice.",
				"The committee issued a restraining order."
			]
		},
		{
			min: 50,
			max: 999,
			title: "YOU WON!",
			description: "Congratulations! Your persistence has exhausted the committee.",
			buttonText: "Claim Your Prize",
			emoji: "🏆",
			responses: [
				"Fine. FINE. You win. Please just stop."
			]
		}
	];

	const currentPhaseData = $derived(() => {
		return phases.find(p => tantrumCount >= p.min && tantrumCount <= p.max) || phases[0];
	});

	let lastResponse = $state('');

	function throwTantrum() {
		if (hasWon) return;

		tantrumCount++;
		const phase = currentPhaseData();
		lastResponse = phase.responses[Math.floor(Math.random() * phase.responses.length)];

		if (tantrumCount >= TANTRUM_THRESHOLD) {
			hasWon = true;
		}
	}

	function reset() {
		tantrumCount = 0;
		hasWon = false;
		lastResponse = '';
	}

	const tantrumIntensity = $derived(() => Math.min(tantrumCount / TANTRUM_THRESHOLD * 100, 100));

	const famousTantrumers = [
		{
			name: "Donald J. Trump",
			strategy: "Tweet, threaten, repeat",
			result: "Claims he already won but was robbed",
			quote: "I should have gotten it, frankly. Many people are saying it."
		},
		{
			name: "María Corina Machado",
			strategy: "Democratic persistence despite the odds",
			result: "Actually fighting for something real",
			quote: "Unlike some nominees, I have actual principles."
		}
	];
</script>

<svelte:head>
	<title>Nominate Yourself | NobelMarket</title>
</svelte:head>

<section class="py-12 px-6">
	<div class="max-w-3xl mx-auto">
		<div class="text-center mb-10">
			<h1 class="text-4xl font-bold text-[var(--navy)] mb-4">
				Nominate Yourself for a Nobel Prize
			</h1>
			<p class="text-xl text-gray-600">
				The Nobel Committee doesn't accept self-nominations. But have they considered
				that you're really, really special?
			</p>
		</div>

		<!-- Name Input -->
		{#if !playerName}
			<div class="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
				<h2 class="text-xl font-bold mb-4">First, tell us who deserves this prize</h2>
				<input
					type="text"
					bind:value={playerName}
					placeholder="Your Very Important Name"
					class="border rounded-lg px-4 py-3 w-full max-w-md text-center text-lg"
				/>
				<button
					onclick={() => playerName = playerName || 'Anonymous Genius'}
					class="mt-4 bg-[var(--gold)] text-[var(--navy)] px-8 py-3 rounded-lg font-bold hover:bg-[var(--gold-dark)] transition-colors"
				>
					That's Me!
				</button>
			</div>
		{:else}
			<!-- Main Game -->
			<div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
				<!-- Progress Bar -->
				<div class="h-3 bg-gray-200">
					<div
						class="h-full transition-all duration-300"
						style="width: {tantrumIntensity()}%; background: linear-gradient(90deg, #22c55e, #eab308, #ef4444)"
					></div>
				</div>

				<div class="p-8 text-center" style="background: rgba(239, 68, 68, {tantrumIntensity() / 300})">
					<!-- Current Phase -->
					<div class="text-6xl mb-4">{currentPhaseData().emoji}</div>
					<h2 class="text-2xl font-bold text-[var(--navy)] mb-2">
						{hasWon ? `${playerName} WINS!` : currentPhaseData().title}
					</h2>
					<p class="text-gray-600 mb-6">{currentPhaseData().description}</p>

					<!-- Tantrum Counter -->
					<div class="mb-6">
						<span class="text-5xl font-bold text-[var(--navy)]">{tantrumCount}</span>
						<span class="text-xl text-gray-500">/ {TANTRUM_THRESHOLD} tantrums</span>
					</div>

					<!-- Response -->
					{#if lastResponse}
						<div class="bg-gray-100 rounded-lg p-4 mb-6 italic text-gray-700">
							"{lastResponse}"
						</div>
					{/if}

					<!-- Action Button -->
					{#if hasWon}
						<div class="space-y-4">
							<div class="bg-green-100 border border-green-300 rounded-lg p-6">
								<p class="text-green-800 text-lg font-medium mb-2">
									The Nobel Committee has surrendered!
								</p>
								<p class="text-green-700">
									{playerName} will receive the Nobel Prize in {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
									for "outstanding contributions to making everyone extremely tired."
								</p>
							</div>
							<button
								onclick={reset}
								class="bg-[var(--navy)] text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors"
							>
								Do It Again (Addiction Warning)
							</button>
						</div>
					{:else}
						<button
							onclick={throwTantrum}
							class="text-xl px-12 py-4 rounded-lg font-bold transition-all transform hover:scale-105 active:scale-95"
							style="background: linear-gradient(135deg, {tantrumCount < 20 ? '#d4af37' : tantrumCount < 40 ? '#ef4444' : '#7c2d12'}); color: white; animation: {tantrumCount > 30 ? 'shake 0.1s infinite' : 'none'}"
						>
							{currentPhaseData().buttonText}
						</button>
					{/if}

					<!-- Category Selection -->
					<div class="mt-8 pt-6 border-t">
						<label class="text-sm text-gray-500 block mb-2">Prize Category (not that it matters)</label>
						<select
							bind:value={selectedCategory}
							class="border rounded px-4 py-2 bg-white"
						>
							<option value="peace">Peace (Ironic)</option>
							<option value="literature">Literature (Unread)</option>
							<option value="physics">Physics (Theoretical)</option>
							<option value="chemistry">Chemistry (Bad)</option>
							<option value="economics">Economics (Trickle-Down)</option>
						</select>
					</div>
				</div>
			</div>

			<!-- Famous Tantrum Hall of Fame -->
			<div class="bg-white rounded-lg shadow-lg p-8">
				<h2 class="text-2xl font-bold text-[var(--navy)] mb-6 text-center">
					🏆 Tantrum Hall of Fame 🏆
				</h2>
				<div class="grid md:grid-cols-2 gap-6">
					{#each famousTantrumers as person}
						<div class="border rounded-lg p-4">
							<h3 class="font-bold text-lg mb-2">{person.name}</h3>
							<div class="text-sm space-y-1">
								<p><span class="text-gray-500">Strategy:</span> {person.strategy}</p>
								<p><span class="text-gray-500">Result:</span> {person.result}</p>
								<p class="italic text-gray-600 mt-2">"{person.quote}"</p>
							</div>
						</div>
					{/each}
				</div>

				<div class="mt-6 p-4 bg-red-50 rounded-lg text-sm text-red-800">
					<strong>Historical Note:</strong> Donald Trump has repeatedly claimed he deserves the Nobel Peace Prize
					and was "robbed." María Corina Machado, meanwhile, continues to actually fight for democratic principles
					in Venezuela while the world watches and does nothing useful. One throws tantrums, the other throws shade
					at authoritarians. We'll let you decide who deserves it.
				</div>
			</div>
		{/if}

		<!-- Pro Tips -->
		<div class="mt-8 bg-gray-50 rounded-lg p-6">
			<h3 class="font-bold mb-3">Pro Tips from Previous Winners</h3>
			<ul class="space-y-2 text-sm text-gray-600">
				<li>💡 Obama 2009: Win it first, figure out what for later</li>
				<li>💡 Kissinger: War criminals can win too, it's fine</li>
				<li>💡 Aung San Suu Kyi: They literally cannot take it back (they can't, we checked)</li>
				<li>💡 The EU: Just be a vague concept, works great</li>
			</ul>
		</div>
	</div>
</section>

<style>
	@keyframes shake {
		0%, 100% { transform: translateX(0); }
		25% { transform: translateX(-2px) rotate(-1deg); }
		75% { transform: translateX(2px) rotate(1deg); }
	}
</style>
