<script lang="ts">
	import { listings } from '$lib/data/listings';
	import { categoryLabels, categoryColors, type NobelCategory } from '$lib/types';

	let selectedCategory = $state<NobelCategory | 'all'>('all');
	let sortBy = $state<'price-asc' | 'price-desc' | 'year'>('year');

	const filteredListings = $derived(() => {
		let result = selectedCategory === 'all'
			? [...listings]
			: listings.filter(l => l.category === selectedCategory);

		return result.sort((a, b) => {
			if (sortBy === 'price-asc') return a.price - b.price;
			if (sortBy === 'price-desc') return b.price - a.price;
			return b.year - a.year;
		});
	});

	function formatPrice(price: number, currency: string): string {
		return new Intl.NumberFormat('nb-NO', {
			style: 'currency',
			currency,
			maximumFractionDigits: 0
		}).format(price);
	}

	const categories: Array<{ value: NobelCategory | 'all'; label: string }> = [
		{ value: 'all', label: 'All Categories' },
		{ value: 'peace', label: 'Peace' },
		{ value: 'literature', label: 'Literature' },
		{ value: 'physics', label: 'Physics' },
		{ value: 'chemistry', label: 'Chemistry' },
		{ value: 'medicine', label: 'Medicine' },
		{ value: 'economics', label: 'Economics' }
	];
</script>

<svelte:head>
	<title>Browse Nobel Prizes | NobelMarket</title>
</svelte:head>

<section class="py-12 px-6">
	<div class="max-w-6xl mx-auto">
		<h1 class="text-4xl font-bold text-[var(--navy)] mb-8">Browse Nobel Prizes</h1>

		<!-- Filters -->
		<div class="flex flex-wrap gap-4 mb-8 p-4 bg-white rounded-lg shadow">
			<div class="flex items-center gap-2">
				<label for="category" class="font-medium text-gray-700">Category:</label>
				<select
					id="category"
					bind:value={selectedCategory}
					class="border rounded px-3 py-2 bg-white"
				>
					{#each categories as cat}
						<option value={cat.value}>{cat.label}</option>
					{/each}
				</select>
			</div>

			<div class="flex items-center gap-2">
				<label for="sort" class="font-medium text-gray-700">Sort by:</label>
				<select
					id="sort"
					bind:value={sortBy}
					class="border rounded px-3 py-2 bg-white"
				>
					<option value="year">Newest First</option>
					<option value="price-desc">Price: High to Low</option>
					<option value="price-asc">Price: Low to High</option>
				</select>
			</div>

			<div class="ml-auto text-gray-600">
				{filteredListings().length} prizes found
			</div>
		</div>

		<!-- Listings Grid -->
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each filteredListings() as listing}
				<a
					href="/listing/{listing.id}"
					class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
				>
					<div class="h-40 bg-gradient-to-br from-[var(--gold)]/20 to-[var(--navy)]/10 flex items-center justify-center">
						<div class="w-20 h-20 rounded-full bg-[var(--gold)] flex items-center justify-center text-3xl">
							🏅
						</div>
					</div>
					<div class="p-5">
						<div class="flex gap-2 mb-3">
							<span class="text-xs px-2 py-1 rounded {categoryColors[listing.category]}">
								{categoryLabels[listing.category]}
							</span>
							<span class="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
								{listing.year}
							</span>
							{#if listing.condition === 'controversial'}
								<span class="text-xs px-2 py-1 rounded bg-red-100 text-red-800">
									Hot!
								</span>
							{/if}
						</div>
						<h3 class="font-bold text-[var(--navy)] group-hover:text-[var(--gold)] transition-colors mb-2">
							{listing.title}
						</h3>
						<p class="text-gray-600 text-sm line-clamp-2 mb-3">
							{listing.description}
						</p>
						<div class="flex items-center justify-between pt-3 border-t">
							<span class="text-lg font-bold text-[var(--gold)]">
								{formatPrice(listing.price, listing.currency)}
							</span>
							<span class="text-xs text-gray-500 italic">
								by {listing.seller}
							</span>
						</div>
					</div>
				</a>
			{/each}
		</div>

		{#if filteredListings().length === 0}
			<div class="text-center py-16 text-gray-500">
				<p class="text-xl mb-2">No prizes found in this category.</p>
				<p>Check back later or consider selling your own!</p>
			</div>
		{/if}
	</div>
</section>
