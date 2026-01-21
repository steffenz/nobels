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
<section class="bg-[var(--navy)] text-white py-20 px-6">
	<div class="max-w-4xl mx-auto text-center">
		<h1 class="text-5xl font-bold mb-6">
			The World's Premier
			<span class="text-[var(--gold)]">Nobel Prize</span>
			Marketplace
		</h1>
		<p class="text-xl text-white/80 mb-8">
			Buy. Sell. Trade. Because apparently everything has a price now.
		</p>
		<div class="flex gap-4 justify-center">
			<a
				href="/marketplace"
				class="bg-[var(--gold)] text-[var(--navy)] px-8 py-3 rounded font-semibold hover:bg-[var(--gold-dark)] transition-colors"
			>
				Browse Listings
			</a>
			<a
				href="/sell"
				class="border border-[var(--gold)] text-[var(--gold)] px-8 py-3 rounded font-semibold hover:bg-[var(--gold)]/10 transition-colors"
			>
				Sell Your Nobel
			</a>
		</div>
	</div>
</section>

<!-- Stats Section -->
<section class="py-12 px-6 bg-white border-b">
	<div class="max-w-6xl mx-auto grid grid-cols-3 gap-8 text-center">
		<div>
			<div class="text-4xl font-bold text-[var(--navy)]">847</div>
			<div class="text-gray-600">Prizes Listed</div>
		</div>
		<div>
			<div class="text-4xl font-bold text-[var(--gold)]">23B NOK</div>
			<div class="text-gray-600">Total Volume</div>
		</div>
		<div>
			<div class="text-4xl font-bold text-[var(--navy)]">6</div>
			<div class="text-gray-600">Categories</div>
		</div>
	</div>
</section>

<!-- Featured Listings -->
<section class="py-16 px-6">
	<div class="max-w-6xl mx-auto">
		<h2 class="text-3xl font-bold text-[var(--navy)] mb-8">Featured Listings</h2>
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each featured as listing}
				<a
					href="/listing/{listing.id}"
					class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
				>
					<div class="h-48 bg-gradient-to-br from-[var(--gold)]/20 to-[var(--navy)]/10 flex items-center justify-center">
						<div class="w-24 h-24 rounded-full bg-[var(--gold)] flex items-center justify-center text-4xl">
							🏅
						</div>
					</div>
					<div class="p-6">
						<div class="flex gap-2 mb-3">
							<span class="text-xs px-2 py-1 rounded {categoryColors[listing.category]}">
								{categoryLabels[listing.category]}
							</span>
							<span class="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
								{listing.year}
							</span>
						</div>
						<h3 class="font-bold text-lg text-[var(--navy)] group-hover:text-[var(--gold)] transition-colors mb-2">
							{listing.title}
						</h3>
						<p class="text-gray-600 text-sm line-clamp-2 mb-4">
							{listing.description}
						</p>
						<div class="flex items-center justify-between">
							<span class="text-xl font-bold text-[var(--gold)]">
								{formatPrice(listing.price, listing.currency)}
							</span>
							<span class="text-sm text-gray-500">
								{listing.seller}
							</span>
						</div>
					</div>
				</a>
			{/each}
		</div>
		<div class="text-center mt-10">
			<a
				href="/marketplace"
				class="inline-block border-2 border-[var(--navy)] text-[var(--navy)] px-8 py-3 rounded font-semibold hover:bg-[var(--navy)] hover:text-white transition-colors"
			>
				View All Listings
			</a>
		</div>
	</div>
</section>

<!-- Why Choose Us -->
<section class="py-16 px-6 bg-white">
	<div class="max-w-6xl mx-auto">
		<h2 class="text-3xl font-bold text-[var(--navy)] mb-12 text-center">Why NobelMarket?</h2>
		<div class="grid md:grid-cols-3 gap-8">
			<div class="text-center">
				<div class="w-16 h-16 bg-[var(--gold)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
					<span class="text-3xl">🔒</span>
				</div>
				<h3 class="font-bold text-xl mb-2">Secure Escrow</h3>
				<p class="text-gray-600">Your Nobel Prize is held safely until funds clear. We've never lost a laureate yet.</p>
			</div>
			<div class="text-center">
				<div class="w-16 h-16 bg-[var(--gold)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
					<span class="text-3xl">✅</span>
				</div>
				<h3 class="font-bold text-xl mb-2">Verified Authenticity</h3>
				<p class="text-gray-600">Each medal verified by the Swedish Academy's former interns.</p>
			</div>
			<div class="text-center">
				<div class="w-16 h-16 bg-[var(--gold)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
					<span class="text-3xl">🌍</span>
				</div>
				<h3 class="font-bold text-xl mb-2">Global Shipping</h3>
				<p class="text-gray-600">Discrete packaging. Your neighbors won't know you bought prestige.</p>
			</div>
		</div>
	</div>
</section>
