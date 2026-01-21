<script lang="ts">
	import '../app.css';

	let { children } = $props();
	let mobileMenuOpen = $state(false);
</script>

<svelte:head>
	<title>NobelMarket - Buy & Sell Nobel Prizes</title>
	<meta name="description" content="The world's premier marketplace for Nobel Prize trading. Satire." />
</svelte:head>

<!-- Jackass-Style Warning Banner -->
<div class="bg-red-600 text-white text-center py-2 px-4 text-sm font-bold">
	<span class="hidden md:inline">WARNING: The following content features professional hypocrites and corrupt institutions. </span>
	<span>Do NOT attempt to take any of this seriously.</span>
</div>

<div class="min-h-screen bg-[var(--cream)] flex flex-col">
	<nav class="bg-[var(--navy)] text-white py-4 px-6">
		<div class="max-w-6xl mx-auto flex items-center justify-between">
			<a href="/" class="text-2xl font-bold">
				<span class="text-[var(--gold)]">Nobel</span>Market
			</a>

			<!-- Desktop Nav -->
			<div class="hidden md:flex gap-6">
				<a href="/marketplace" class="hover:text-[var(--gold)] transition-colors">Browse Prizes</a>
				<a href="/nominate" class="hover:text-[var(--gold)] transition-colors">Nominate Yourself</a>
				<a href="/sell" class="hover:text-[var(--gold)] transition-colors">Sell Your Nobel</a>
				<a href="/linkedin" class="hover:text-[var(--gold)] transition-colors">LinkedIn BS</a>
				<a href="/merch" class="hover:text-[var(--gold)] transition-colors">Merch</a>
				<a href="/about" class="hover:text-[var(--gold)] transition-colors">About</a>
			</div>

			<!-- Mobile Menu Button -->
			<button
				class="md:hidden text-white"
				onclick={() => mobileMenuOpen = !mobileMenuOpen}
			>
				{mobileMenuOpen ? '✕' : '☰'}
			</button>
		</div>

		<!-- Mobile Nav -->
		{#if mobileMenuOpen}
			<div class="md:hidden mt-4 flex flex-col gap-3 pb-4">
				<a href="/marketplace" class="hover:text-[var(--gold)]">Browse Prizes</a>
				<a href="/nominate" class="hover:text-[var(--gold)]">Nominate Yourself</a>
				<a href="/sell" class="hover:text-[var(--gold)]">Sell Your Nobel</a>
				<a href="/linkedin" class="hover:text-[var(--gold)]">LinkedIn BS</a>
				<a href="/merch" class="hover:text-[var(--gold)]">Merch</a>
				<a href="/about" class="hover:text-[var(--gold)]">About</a>
			</div>
		{/if}
	</nav>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="bg-[var(--navy)] text-white py-8 px-6">
		<div class="max-w-6xl mx-auto">
			<!-- Jackass-Style Disclaimer -->
			<div class="border-2 border-red-500 rounded-lg p-6 mb-8 text-center">
				<h3 class="text-red-500 font-bold text-lg mb-3">⚠️ DISCLAIMER ⚠️</h3>
				<p class="text-white/90 mb-4 font-medium">
					WARNING: The stunts and opinions on this website are performed by professional jackasses.
				</p>
				<p class="text-white/70 text-sm mb-3">
					NobelMarket and all associated parties are not responsible for any offense caused to:
					governments pretending to care about peace while selling weapons, billionaires who think
					they deserve recognition for being rich, politicians throwing tantrums about awards they
					didn't win, or Nobel Committee members suffering cognitive dissonance.
				</p>
				<p class="text-white/70 text-sm mb-3">
					Any resemblance to actual war criminals, dictators, or Norwegian arms dealers is entirely
					intentional. The Norwegian government is kindly asked to stop pretending they're neutral
					while profiting from global conflict.
				</p>
				<p class="text-red-400 text-xs font-bold">
					DO NOT ATTEMPT TO TAKE ANY GOVERNMENT OR INSTITUTION AT FACE VALUE.
					EVERYONE IS A JACKASS. INCLUDING US.
				</p>
			</div>

			<!-- Footer Links -->
			<div class="grid md:grid-cols-4 gap-8 mb-8 text-sm">
				<div>
					<h4 class="font-bold text-[var(--gold)] mb-3">Marketplace</h4>
					<ul class="space-y-2 text-white/60">
						<li><a href="/marketplace" class="hover:text-white">Browse All</a></li>
						<li><a href="/marketplace?category=peace" class="hover:text-white">Peace Prizes</a></li>
						<li><a href="/marketplace?category=controversial" class="hover:text-white">Controversial</a></li>
					</ul>
				</div>
				<div>
					<h4 class="font-bold text-[var(--gold)] mb-3">Get Involved</h4>
					<ul class="space-y-2 text-white/60">
						<li><a href="/sell" class="hover:text-white">Sell Your Nobel</a></li>
						<li><a href="/nominate" class="hover:text-white">Nominate Yourself</a></li>
						<li><a href="/linkedin" class="hover:text-white">Generate LinkedIn BS</a></li>
					</ul>
				</div>
				<div>
					<h4 class="font-bold text-[var(--gold)] mb-3">Norwegian Exports</h4>
					<ul class="space-y-2 text-white/60">
						<li>Weapons: $8B/year</li>
						<li>Oil & Gas: $100B/year</li>
						<li>Moral Lectures: Priceless</li>
						<li>Salmon: Also sold here</li>
					</ul>
				</div>
				<div>
					<h4 class="font-bold text-[var(--gold)] mb-3">Legal</h4>
					<ul class="space-y-2 text-white/60">
						<li><a href="/about" class="hover:text-white">About (Satire)</a></li>
						<li><span class="line-through">Privacy Policy</span> (lol)</li>
						<li><span class="line-through">Terms of Service</span></li>
						<li>Sue us, cowards</li>
					</ul>
				</div>
			</div>

			<div class="text-center text-white/40 text-xs border-t border-white/10 pt-6">
				<p class="mb-2">© 2025 NobelMarket. A satirical production.</p>
				<p>No actual Nobel Prizes were harmed in the making of this website.</p>
				<p class="mt-2">Funded by oil money, like everything else in Norway.</p>
			</div>
		</div>
	</footer>
</div>
