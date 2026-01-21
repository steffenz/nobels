<script lang="ts">
	import { categoryLabels, categoryColors } from '$lib/types';

	let { data } = $props();
	const listing = data.listing;

	function formatPrice(price: number, currency: string): string {
		return new Intl.NumberFormat('nb-NO', {
			style: 'currency',
			currency,
			maximumFractionDigits: 0
		}).format(price);
	}

	const conditionLabels = {
		mint: 'Mint Condition',
		slightly_tarnished: 'Slightly Tarnished',
		controversial: 'Controversial'
	};
</script>

<svelte:head>
	<title>{listing.title} | NobelMarket</title>
</svelte:head>

<section class="py-12 px-6">
	<div class="max-w-4xl mx-auto">
		<!-- Breadcrumb -->
		<nav class="mb-6 text-sm">
			<a href="/" class="text-gray-500 hover:text-[var(--navy)]">Home</a>
			<span class="mx-2 text-gray-400">/</span>
			<a href="/marketplace" class="text-gray-500 hover:text-[var(--navy)]">Marketplace</a>
			<span class="mx-2 text-gray-400">/</span>
			<span class="text-[var(--navy)]">{listing.title}</span>
		</nav>

		<div class="bg-white rounded-lg shadow-lg overflow-hidden">
			<!-- Header Image -->
			<div class="h-64 bg-gradient-to-br from-[var(--gold)]/30 to-[var(--navy)]/20 flex items-center justify-center">
				<div class="w-32 h-32 rounded-full bg-[var(--gold)] flex items-center justify-center text-6xl shadow-lg">
					🏅
				</div>
			</div>

			<!-- Content -->
			<div class="p-8">
				<!-- Tags -->
				<div class="flex flex-wrap gap-2 mb-4">
					<span class="text-sm px-3 py-1 rounded {categoryColors[listing.category]}">
						{categoryLabels[listing.category]}
					</span>
					<span class="text-sm px-3 py-1 rounded bg-gray-100 text-gray-700">
						{listing.year}
					</span>
					<span class="text-sm px-3 py-1 rounded bg-amber-100 text-amber-800">
						{conditionLabels[listing.condition]}
					</span>
				</div>

				<!-- Title & Price -->
				<h1 class="text-3xl font-bold text-[var(--navy)] mb-4">{listing.title}</h1>
				<div class="text-4xl font-bold text-[var(--gold)] mb-6">
					{formatPrice(listing.price, listing.currency)}
				</div>

				<!-- Description -->
				<div class="prose max-w-none mb-8">
					<p class="text-gray-700 text-lg leading-relaxed">{listing.description}</p>
				</div>

				<!-- Seller Info -->
				<div class="bg-gray-50 rounded-lg p-6 mb-8">
					<h3 class="font-bold text-lg mb-3">Seller Information</h3>
					<div class="grid grid-cols-2 gap-4 text-sm">
						<div>
							<span class="text-gray-500">Seller:</span>
							<span class="font-medium ml-2">{listing.seller}</span>
						</div>
						<div>
							<span class="text-gray-500">Title:</span>
							<span class="font-medium ml-2">{listing.sellerTitle}</span>
						</div>
						<div class="col-span-2">
							<span class="text-gray-500">Reason for Selling:</span>
							<span class="font-medium ml-2 italic">"{listing.reasonForSelling}"</span>
						</div>
					</div>
				</div>

				<!-- Actions -->
				<div class="flex gap-4">
					<button
						class="flex-1 bg-[var(--gold)] text-[var(--navy)] py-4 rounded-lg font-bold text-lg hover:bg-[var(--gold-dark)] transition-colors"
					>
						Buy Now
					</button>
					<button
						class="flex-1 border-2 border-[var(--navy)] text-[var(--navy)] py-4 rounded-lg font-bold text-lg hover:bg-[var(--navy)] hover:text-white transition-colors"
					>
						Make an Offer
					</button>
				</div>

				<p class="text-center text-sm text-gray-500 mt-4">
					Note: Purchasing does not transfer any actual Nobel Prize legitimacy. You will simply own a very expensive medal.
				</p>
			</div>
		</div>

		<!-- Related Listings Placeholder -->
		<div class="mt-12">
			<h2 class="text-2xl font-bold text-[var(--navy)] mb-4">You Might Also Like</h2>
			<p class="text-gray-500 italic">Other prestigious awards you probably can't afford either.</p>
		</div>
	</div>
</section>
