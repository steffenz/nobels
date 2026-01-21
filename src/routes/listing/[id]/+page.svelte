<script lang="ts">
	import { categoryLabels, categoryColors } from '$lib/types';
	import { validateCode } from '$lib/data/discounts';

	let { data } = $props();
	const listing = data.listing;

	let discountCode = $state('');
	let appliedDiscount = $state<{ code: string; discount: number; note: string } | null>(null);
	let discountError = $state('');

	const finalPrice = $derived(
		appliedDiscount
			? listing.price * (1 - appliedDiscount.discount / 100)
			: listing.price
	);

	function formatPrice(price: number, currency: string): string {
		return new Intl.NumberFormat('nb-NO', {
			style: 'currency',
			currency,
			maximumFractionDigits: 0
		}).format(price);
	}

	function applyDiscount() {
		discountError = '';
		const found = validateCode(discountCode);
		if (found) {
			appliedDiscount = {
				code: found.code,
				discount: found.discount,
				note: found.satiricalNote
			};
		} else {
			discountError = discountCode.toUpperCase() === 'TRUMPWON'
				? 'Nice try. This code was revoked. Unlike the election, this one actually was stolen.'
				: 'Invalid code. Try something more morally bankrupt.';
		}
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
				<div class="mb-6">
					{#if appliedDiscount}
						<div class="text-2xl text-gray-400 line-through">
							{formatPrice(listing.price, listing.currency)}
						</div>
						<div class="text-4xl font-bold text-green-600">
							{formatPrice(finalPrice, listing.currency)}
						</div>
						<div class="text-sm text-green-600 mt-1">
							{appliedDiscount.discount}% off with code {appliedDiscount.code}
						</div>
					{:else}
						<div class="text-4xl font-bold text-[var(--gold)]">
							{formatPrice(listing.price, listing.currency)}
						</div>
					{/if}
				</div>

				<!-- Description -->
				<div class="prose max-w-none mb-8">
					<p class="text-gray-700 text-lg leading-relaxed">{listing.description}</p>
				</div>

				<!-- Discount Code -->
				<div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
					<label class="block text-sm font-medium text-amber-800 mb-2">
						Have a War Crimes Discount Code?
					</label>
					<div class="flex gap-2">
						<input
							type="text"
							bind:value={discountCode}
							placeholder="Enter code (e.g., WARCRIMES10)"
							class="flex-1 border rounded px-3 py-2 text-sm uppercase"
						/>
						<button
							onclick={applyDiscount}
							class="bg-amber-600 text-white px-4 py-2 rounded font-medium hover:bg-amber-700 transition-colors"
						>
							Apply
						</button>
					</div>
					{#if discountError}
						<p class="text-red-600 text-sm mt-2">{discountError}</p>
					{/if}
					{#if appliedDiscount}
						<div class="mt-3 p-3 bg-amber-100 rounded text-sm text-amber-900">
							<strong>Code Applied!</strong> {appliedDiscount.note}
						</div>
					{/if}
					<p class="text-xs text-amber-700 mt-2">
						Popular codes: KONGSBERG20, OILMONEY25, WEAPONS2SAUDIS, DRONESTRIKES
					</p>
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
