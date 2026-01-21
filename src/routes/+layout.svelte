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
<div class="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white text-center py-2.5 px-4 text-sm font-semibold tracking-wide">
	<span class="hidden md:inline">WARNING: The following content features professional hypocrites and corrupt institutions. </span>
	<span class="uppercase">Do NOT attempt to take any of this seriously.</span>
</div>

<div class="min-h-screen bg-[var(--cream)] flex flex-col">
	<nav class="bg-[var(--navy)] text-white py-5 px-6 shadow-lg">
		<div class="max-w-7xl mx-auto flex items-center justify-between">
			<a href="/" class="font-display text-3xl font-bold tracking-tight group">
				<span class="text-[var(--gold)] group-hover:text-[var(--gold-light)] transition-colors">Nobel</span><span class="group-hover:text-gray-200 transition-colors">Market</span>
			</a>

			<!-- Desktop Nav -->
			<div class="hidden lg:flex items-center gap-8">
				<a href="/marketplace" class="text-sm font-medium hover:text-[var(--gold)] transition-colors">Browse Prizes</a>
				<a href="/nominate" class="text-sm font-medium hover:text-[var(--gold)] transition-colors">Nominate Yourself</a>
				<a href="/sell" class="text-sm font-medium hover:text-[var(--gold)] transition-colors">Sell Your Nobel</a>
				<a href="/linkedin" class="text-sm font-medium hover:text-[var(--gold)] transition-colors">LinkedIn BS</a>
				<a href="/merch" class="text-sm font-medium hover:text-[var(--gold)] transition-colors">Merch</a>
				<a href="/about" class="text-sm font-medium hover:text-[var(--gold)] transition-colors">About</a>
			</div>

			<!-- Mobile Menu Button -->
			<button
				class="lg:hidden text-white text-2xl w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
				onclick={() => mobileMenuOpen = !mobileMenuOpen}
			>
				{mobileMenuOpen ? '✕' : '☰'}
			</button>
		</div>

		<!-- Mobile Nav -->
		{#if mobileMenuOpen}
			<div class="lg:hidden mt-6 flex flex-col gap-1 pb-4 border-t border-white/10 pt-4">
				<a href="/marketplace" class="py-2 px-3 rounded-lg hover:bg-white/10 hover:text-[var(--gold)] transition-colors">Browse Prizes</a>
				<a href="/nominate" class="py-2 px-3 rounded-lg hover:bg-white/10 hover:text-[var(--gold)] transition-colors">Nominate Yourself</a>
				<a href="/sell" class="py-2 px-3 rounded-lg hover:bg-white/10 hover:text-[var(--gold)] transition-colors">Sell Your Nobel</a>
				<a href="/linkedin" class="py-2 px-3 rounded-lg hover:bg-white/10 hover:text-[var(--gold)] transition-colors">LinkedIn BS</a>
				<a href="/merch" class="py-2 px-3 rounded-lg hover:bg-white/10 hover:text-[var(--gold)] transition-colors">Merch</a>
				<a href="/about" class="py-2 px-3 rounded-lg hover:bg-white/10 hover:text-[var(--gold)] transition-colors">About</a>
			</div>
		{/if}
	</nav>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="bg-[var(--navy)] text-white py-12 px-6">
		<div class="max-w-7xl mx-auto">
			<!-- Jackass-Style Disclaimer -->
			<div class="border-2 border-red-500/80 rounded-2xl p-8 mb-12 text-center bg-red-950/20 backdrop-blur">
				<h3 class="font-display text-red-400 font-bold text-xl mb-4">⚠️ DISCLAIMER ⚠️</h3>
				<p class="text-white/90 mb-4 font-medium text-lg leading-relaxed">
					WARNING: The stunts and opinions on this website are performed by professional jackasses.
				</p>
				<p class="text-white/60 text-sm mb-4 max-w-3xl mx-auto leading-relaxed">
					NobelMarket and all associated parties are not responsible for any offense caused to:
					governments pretending to care about peace while selling weapons, billionaires who think
					they deserve recognition for being rich, politicians throwing tantrums about awards they
					didn't win, or Nobel Committee members suffering cognitive dissonance.
				</p>
				<p class="text-white/60 text-sm mb-4 max-w-3xl mx-auto leading-relaxed">
					Any resemblance to actual war criminals, dictators, or Norwegian arms dealers is entirely
					intentional. The Norwegian government is kindly asked to stop pretending they're neutral
					while profiting from global conflict.
				</p>
				<p class="text-red-400 text-xs font-bold uppercase tracking-wider">
					Do not attempt to take any government or institution at face value. Everyone is a jackass. Including us.
				</p>
			</div>

			<!-- Footer Links -->
			<div class="grid md:grid-cols-4 gap-10 mb-12">
				<div>
					<h4 class="font-display font-bold text-[var(--gold)] text-lg mb-4">Marketplace</h4>
					<ul class="space-y-3 text-white/60 text-sm">
						<li><a href="/marketplace" class="hover:text-white transition-colors">Browse All</a></li>
						<li><a href="/marketplace?category=peace" class="hover:text-white transition-colors">Peace Prizes</a></li>
						<li><a href="/marketplace?category=controversial" class="hover:text-white transition-colors">Controversial</a></li>
					</ul>
				</div>
				<div>
					<h4 class="font-display font-bold text-[var(--gold)] text-lg mb-4">Get Involved</h4>
					<ul class="space-y-3 text-white/60 text-sm">
						<li><a href="/sell" class="hover:text-white transition-colors">Sell Your Nobel</a></li>
						<li><a href="/nominate" class="hover:text-white transition-colors">Nominate Yourself</a></li>
						<li><a href="/linkedin" class="hover:text-white transition-colors">Generate LinkedIn BS</a></li>
					</ul>
				</div>
				<div>
					<h4 class="font-display font-bold text-[var(--gold)] text-lg mb-4">Norwegian Exports</h4>
					<ul class="space-y-3 text-white/60 text-sm">
						<li>Weapons: $8B/year</li>
						<li>Oil & Gas: $100B/year</li>
						<li>Moral Lectures: Priceless</li>
						<li>Salmon: Also sold here</li>
					</ul>
				</div>
				<div>
					<h4 class="font-display font-bold text-[var(--gold)] text-lg mb-4">Legal</h4>
					<ul class="space-y-3 text-white/60 text-sm">
						<li><a href="/about" class="hover:text-white transition-colors">About (Satire)</a></li>
						<li><span class="line-through opacity-60">Privacy Policy</span> <span class="text-xs">(lol)</span></li>
						<li><span class="line-through opacity-60">Terms of Service</span></li>
						<li class="text-white/40">Sue us, cowards</li>
					</ul>
				</div>
			</div>

			<div class="text-center text-white/30 text-xs border-t border-white/10 pt-8 space-y-1">
				<p>© 2025 NobelMarket. A satirical production.</p>
				<p>No actual Nobel Prizes were harmed in the making of this website.</p>
				<p class="text-white/20">Funded by oil money, like everything else in Norway.</p>
			</div>

			<!-- AI Generated Badge -->
			<div class="mt-8 flex justify-center">
				<div class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-full">
					<span class="text-lg">🤖</span>
					<span class="text-sm font-mono text-purple-300">100% AI Generated</span>
					<span class="text-xs text-white/40">| Prompted by a human, built by Claude</span>
				</div>
			</div>
		</div>
	</footer>

	<!-- Floating AI Badge -->
	<div class="fixed bottom-4 left-4 z-50 hidden md:block">
		<div class="group cursor-default">
			<div class="flex items-center gap-2 px-3 py-1.5 bg-[var(--navy)]/90 backdrop-blur border border-purple-500/40 rounded-full shadow-lg hover:bg-[var(--navy)] transition-all">
				<span class="text-sm animate-pulse">🤖</span>
				<span class="text-xs font-mono text-purple-300 group-hover:text-purple-200">AI Generated</span>
			</div>
			<div class="absolute bottom-full left-0 mb-2 px-3 py-2 bg-[var(--navy)] border border-purple-500/40 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
				<p class="text-xs text-white/80">100% prompted by a human</p>
				<p class="text-xs text-white/80">100% generated by Claude</p>
				<p class="text-xs text-purple-300 mt-1">0% regrets</p>
			</div>
		</div>
	</div>
</div>
