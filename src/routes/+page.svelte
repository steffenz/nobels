<script lang="ts">
	import { getFeaturedListings } from '$lib/data/listings';
	import { categoryLabels, categoryColors } from '$lib/types';

	const featured = getFeaturedListings();

	function formatPrice(price: number, currency: string): string {
		return new Intl.NumberFormat('nb-NO', {
			style: 'currency',
			currency,
			maximumFractionDigits: 0
		}).format(price);
	}
</script>

<!-- Hero Section -->
<section class="gradient-animated text-white py-24 md:py-32 px-6">
	<div class="max-w-5xl mx-auto text-center">
		<p class="text-[var(--gold)] font-medium tracking-widest uppercase text-sm mb-4">Est. 2025 - Oslo, Norway</p>
		<h1 class="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
			The World's Premier<br/>
			<span class="text-[var(--gold)]">Nobel Prize</span> Marketplace
		</h1>
		<p class="text-xl md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
			Buy. Sell. Trade. Because apparently everything has a price now.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a href="/marketplace" class="btn-primary text-lg">
				Browse Listings
			</a>
			<a href="/sell" class="btn-secondary border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--navy)] text-lg">
				Sell Your Nobel
			</a>
		</div>
	</div>
</section>

<!-- Stats Section -->
<section class="py-16 px-6 bg-white border-b border-gray-100">
	<div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
		<div class="p-6">
			<div class="font-display text-5xl md:text-6xl font-bold text-[var(--navy)] mb-2">847</div>
			<div class="text-gray-500 font-medium uppercase tracking-wider text-sm">Prizes Listed</div>
		</div>
		<div class="p-6 md:border-x border-gray-100">
			<div class="font-display text-5xl md:text-6xl font-bold text-[var(--gold)] mb-2">23B</div>
			<div class="text-gray-500 font-medium uppercase tracking-wider text-sm">NOK Total Volume</div>
		</div>
		<div class="p-6">
			<div class="font-display text-5xl md:text-6xl font-bold text-[var(--navy)] mb-2">6</div>
			<div class="text-gray-500 font-medium uppercase tracking-wider text-sm">Categories</div>
		</div>
	</div>
</section>

<!-- Featured Listings -->
<section class="section">
	<div class="max-w-7xl mx-auto">
		<div class="flex items-end justify-between mb-10">
			<div>
				<p class="text-[var(--gold)] font-semibold uppercase tracking-wider text-sm mb-2">Hot Right Now</p>
				<h2 class="font-display text-4xl text-[var(--navy)]">Featured Listings</h2>
			</div>
			<a href="/marketplace" class="hidden md:block text-[var(--navy)] font-semibold hover:text-[var(--gold)] transition-colors">
				View All →
			</a>
		</div>
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each featured as listing}
				<a href="/listing/{listing.id}" class="card overflow-hidden group">
					<div class="h-52 bg-gradient-to-br from-[var(--gold)]/20 via-[var(--cream)] to-[var(--navy)]/10 flex items-center justify-center relative overflow-hidden">
						<div class="w-28 h-28 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center text-5xl shadow-lg group-hover:scale-110 transition-transform duration-300">
							🏅
						</div>
						{#if listing.condition === 'controversial'}
							<div class="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
								Hot
							</div>
						{/if}
					</div>
					<div class="p-6">
						<div class="flex gap-2 mb-4">
							<span class="tag {categoryColors[listing.category]}">
								{categoryLabels[listing.category]}
							</span>
							<span class="tag bg-gray-100 text-gray-600">
								{listing.year}
							</span>
						</div>
						<h3 class="font-display font-bold text-xl text-[var(--navy)] group-hover:text-[var(--gold)] transition-colors mb-3 leading-tight">
							{listing.title}
						</h3>
						<p class="text-gray-500 text-sm line-clamp-2 mb-5 leading-relaxed">
							{listing.description}
						</p>
						<div class="flex items-center justify-between pt-4 border-t border-gray-100">
							<span class="font-display text-2xl font-bold text-[var(--gold)]">
								{formatPrice(listing.price, listing.currency)}
							</span>
							<span class="text-sm text-gray-400 font-medium">
								{listing.seller}
							</span>
						</div>
					</div>
				</a>
			{/each}
		</div>
		<div class="text-center mt-12 md:hidden">
			<a href="/marketplace" class="btn-secondary inline-block">
				View All Listings
			</a>
		</div>
	</div>
</section>

<!-- Why Choose Us -->
<section class="section bg-white">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-16">
			<p class="text-[var(--gold)] font-semibold uppercase tracking-wider text-sm mb-2">Why Us</p>
			<h2 class="font-display text-4xl text-[var(--navy)]">The NobelMarket Advantage</h2>
		</div>
		<div class="grid md:grid-cols-3 gap-12">
			<div class="text-center">
				<div class="w-20 h-20 bg-gradient-to-br from-[var(--gold)]/20 to-[var(--gold)]/5 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
					<span class="text-4xl">🔒</span>
				</div>
				<h3 class="font-display font-bold text-xl mb-3 text-[var(--navy)]">Secure Escrow</h3>
				<p class="text-gray-500 leading-relaxed">Your Nobel Prize is held safely until funds clear. We've never lost a laureate yet.</p>
			</div>
			<div class="text-center">
				<div class="w-20 h-20 bg-gradient-to-br from-[var(--gold)]/20 to-[var(--gold)]/5 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
					<span class="text-4xl">✅</span>
				</div>
				<h3 class="font-display font-bold text-xl mb-3 text-[var(--navy)]">Verified Authenticity</h3>
				<p class="text-gray-500 leading-relaxed">Each medal verified by the Swedish Academy's former interns.</p>
			</div>
			<div class="text-center">
				<div class="w-20 h-20 bg-gradient-to-br from-[var(--gold)]/20 to-[var(--gold)]/5 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
					<span class="text-4xl">🌍</span>
				</div>
				<h3 class="font-display font-bold text-xl mb-3 text-[var(--navy)]">Global Shipping</h3>
				<p class="text-gray-500 leading-relaxed">Discrete packaging. Your neighbors won't know you bought prestige.</p>
			</div>
		</div>
	</div>
</section>
