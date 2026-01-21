<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>NobelMarket - Buy & Sell Nobel Prizes</title>
	<meta name="description" content="The world's premier marketplace for Nobel Prize trading. Satire." />
</svelte:head>

<div class="min-h-screen bg-[var(--cream)] flex flex-col">
	<nav class="bg-[var(--navy)] text-white py-4 px-6">
		<div class="max-w-6xl mx-auto flex items-center justify-between">
			<a href="/" class="text-2xl font-bold">
				<span class="text-[var(--gold)]">Nobel</span>Market
			</a>
			<div class="flex gap-6">
				<a href="/marketplace" class="hover:text-[var(--gold)] transition-colors">Browse Prizes</a>
				<a href="/sell" class="hover:text-[var(--gold)] transition-colors">Sell Your Nobel</a>
				<a href="/about" class="hover:text-[var(--gold)] transition-colors">About</a>
			</div>
		</div>
	</nav>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="bg-[var(--navy)] text-white/60 py-8 px-6">
		<div class="max-w-6xl mx-auto text-center text-sm">
			<p class="mb-2">This is a satirical website. No actual Nobel Prizes are for sale.</p>
			<p>All listings are fictional and for entertainment purposes only.</p>
		</div>
	</footer>
</div>
