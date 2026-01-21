<script lang="ts">
	const prompts = [
		{
			phase: 'Initial Concept',
			prompt: `I want to build a satirical website on nobels.no that has a marketplace for buying and selling Nobel Prizes in light of current events. I already use the Next-stack so that might be a good idea, but I'm open to Svelte too (if you guide me so I can learn!)`,
			result: 'SvelteKit project with TypeScript and Tailwind CSS, marketplace structure, mock listings'
		},
		{
			phase: 'Feature Expansion',
			prompt: `I also like to have a 'LinkedIn Jerk-Circle Post Generator'. Discount codes should also be available when buying (poke fun of war crimes++). I also want a 'nominate yourself' function where you can hit a 'nag/cry/act like a man child' button until you win. I want clear references to Donald Trump and María Corina Machado. I also want the disclaimers and warnings to nod to the original Jackass Series warnings (as everyone seems to be jackasses right now). Focus on how the governments (mainly Norway) are sellouts and promote war and just pretend to care about peace (selling weapons etc). I also want a merch shop for the poor (something with laks, and all i got was this lousy t-shirt, sticker, etc - be creative here!)`,
			result: 'LinkedIn BS generator, war crimes discount codes, nomination game, Trump/Machado references, Jackass disclaimers, merch shop'
		},
		{
			phase: 'UI Enhancement',
			prompt: `Enhance the UI and use proper fonts (and sizes). Enhance the nominate yourself. I want an interactive game where you keep nagging until they say 'Fine we'll consider you!'. Use Trump rhetoric.`,
			result: 'Playfair Display & Inter fonts, interactive nagging game with Trump-style escalating messages and tweets'
		},
		{
			phase: 'Game Refinement',
			prompt: `We should be careful glorifying María (especially after giving the price to Trump), so tone down that part. As for the game - the tweets are funny but disappear too quickly. Should act more like a traditional toast where hovering keeps them visible. Maybe even have a way to view them later in a message box. And feel free to throw in more Trump-ism to make it more absurd. Also the random message/tweet tends to show the same over and over. Try to show as many of them as we can and re-cycle only when needed!`,
			result: 'Toast system with hover-to-pin, tweet inbox modal, shuffle queue for no-repeat randomization, expanded to 36 nag messages and 20 tweets'
		},
		{
			phase: 'Controversial Content',
			prompt: `If we can somehow mix in special Epstein stuff, that be golden (Jagland is in the files). Be careful with direct defamation in this regard. And my man Jonas G needs to be in here (recent news). And some Greenland stuff too. If you can - generate photos too (especially in the merch store). And lets slap on a certified 100% AI Generated/Prompted somewhere. Finally - when buying something I want you to instead encourage user to consider donating to an organization worthwhile fighting instead of supporting these clowns. Maybe make a list and send the user to their pages if they click.`,
			result: 'Jagland/Støre/Greenland satirical listings, donation modal with 12 real charities, AI-generated badge'
		},
		{
			phase: 'Final Polish',
			prompt: `A few more things. The year now is 2026. Remove the "Sue us, cowards" and if any change it to beg them not to sue. For merch I also want to link to donations. And product description should not be shortened. Technically having a page on how this is made with original prompts would be nice, also with a link to the GitHub repo (issues should be submitted as prompts!). Also update README to tell what this project is and how its made. Finally - prepare for release on GitHub Pages.`,
			result: 'This page you\'re reading right now!'
		}
	];
</script>

<svelte:head>
	<title>How It's Made | NobelMarket</title>
</svelte:head>

<section class="section">
	<div class="max-w-4xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-12">
			<div class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-full mb-6">
				<span class="text-lg">🤖</span>
				<span class="text-sm font-mono text-purple-600">100% AI Generated</span>
			</div>
			<h1 class="font-display text-4xl md:text-5xl font-bold text-[var(--navy)] mb-4">
				How This Was Made
			</h1>
			<p class="text-xl text-gray-600 max-w-2xl mx-auto">
				This entire website was built through a conversation between a human and Claude (Anthropic's AI).
				Here are the actual prompts that created it.
			</p>
		</div>

		<!-- The Process -->
		<div class="card p-8 mb-12">
			<h2 class="font-display text-2xl font-bold text-[var(--navy)] mb-4">The Process</h2>
			<div class="prose prose-gray max-w-none">
				<p class="text-gray-600 leading-relaxed mb-4">
					NobelMarket was created entirely through <strong>prompt engineering</strong> - a human described what they wanted,
					and an AI (Claude) wrote all the code. No manual coding required. The human's role was to:
				</p>
				<ul class="text-gray-600 space-y-2 mb-4">
					<li>Describe the vision and features</li>
					<li>Provide feedback on what worked and what didn't</li>
					<li>Iterate with refinements</li>
					<li>Make creative and editorial decisions</li>
				</ul>
				<p class="text-gray-600 leading-relaxed">
					The AI handled all technical implementation: SvelteKit setup, TypeScript types, Tailwind styling,
					component architecture, and the satirical content writing.
				</p>
			</div>
		</div>

		<!-- Prompts Timeline -->
		<div class="mb-12">
			<h2 class="font-display text-2xl font-bold text-[var(--navy)] mb-6">The Prompts</h2>
			<div class="space-y-6">
				{#each prompts as { phase, prompt, result }, i}
					<div class="card overflow-hidden">
						<div class="bg-gradient-to-r from-[var(--navy)] to-[var(--navy)]/90 px-6 py-3">
							<div class="flex items-center gap-3">
								<span class="w-8 h-8 rounded-full bg-[var(--gold)] text-[var(--navy)] font-bold flex items-center justify-center text-sm">
									{i + 1}
								</span>
								<h3 class="font-display font-bold text-white">{phase}</h3>
							</div>
						</div>
						<div class="p-6">
							<div class="mb-4">
								<div class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Human Prompt:</div>
								<div class="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-700 leading-relaxed">
									"{prompt}"
								</div>
							</div>
							<div>
								<div class="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">AI Generated:</div>
								<p class="text-gray-600">{result}</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Tech Stack -->
		<div class="card p-8 mb-12">
			<h2 class="font-display text-2xl font-bold text-[var(--navy)] mb-4">Tech Stack</h2>
			<div class="grid md:grid-cols-2 gap-4">
				<div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
					<span class="text-2xl">⚡</span>
					<div>
						<div class="font-semibold text-[var(--navy)]">SvelteKit</div>
						<div class="text-sm text-gray-500">Framework</div>
					</div>
				</div>
				<div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
					<span class="text-2xl">📘</span>
					<div>
						<div class="font-semibold text-[var(--navy)]">TypeScript</div>
						<div class="text-sm text-gray-500">Language</div>
					</div>
				</div>
				<div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
					<span class="text-2xl">🎨</span>
					<div>
						<div class="font-semibold text-[var(--navy)]">Tailwind CSS v4</div>
						<div class="text-sm text-gray-500">Styling</div>
					</div>
				</div>
				<div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
					<span class="text-2xl">🤖</span>
					<div>
						<div class="font-semibold text-[var(--navy)]">Claude (Anthropic)</div>
						<div class="text-sm text-gray-500">AI Coder</div>
					</div>
				</div>
			</div>
		</div>

		<!-- GitHub Section -->
		<div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white text-center">
			<div class="text-5xl mb-4">🐙</div>
			<h2 class="font-display text-2xl font-bold mb-3">Open Source</h2>
			<p class="text-white/70 mb-6 max-w-lg mx-auto">
				This project is open source. Check out the code, fork it, or submit issues.
				<strong class="text-[var(--gold)]">Pro tip: Submit issues as prompts!</strong>
			</p>
			<a
				href="https://github.com/steffenz/nobels"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
			>
				<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
				</svg>
				View on GitHub
			</a>
			<p class="text-white/50 text-sm mt-4">
				Issues should be submitted as prompts. Example: "Add a feature that lets users..."
			</p>
		</div>

		<!-- Credits -->
		<div class="mt-12 text-center text-gray-500 text-sm">
			<p>Made with 🤖 by Claude and a human who had too much coffee and opinions about Nobel Prizes.</p>
			<p class="mt-2">No actual Nobel laureates were consulted in the making of this website.</p>
		</div>
	</div>
</section>
