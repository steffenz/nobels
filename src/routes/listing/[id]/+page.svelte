<script lang="ts">
	import { categoryLabels, categoryColors } from '$lib/types';
	import { validateCode } from '$lib/data/discounts';
	import { donationOrganizations, categoryLabels as donationCategories } from '$lib/data/donations';

	let { data } = $props();
	const listing = data.listing;

	let discountCode = $state('');
	let appliedDiscount = $state<{ code: string; discount: number; note: string } | null>(null);
	let discountError = $state('');
	let showDonationModal = $state(false);
	let selectedDonationCategory = $state<string>('all');

	const finalPrice = $derived(
		appliedDiscount
			? listing.price * (1 - appliedDiscount.discount / 100)
			: listing.price
	);

	const filteredOrgs = $derived(
		selectedDonationCategory === 'all'
			? donationOrganizations
			: donationOrganizations.filter(o => o.category === selectedDonationCategory)
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

<section class="section">
	<div class="max-w-4xl mx-auto">
		<!-- Breadcrumb -->
		<nav class="mb-6 text-sm font-medium">
			<a href="/" class="text-gray-400 hover:text-[var(--navy)] transition-colors">Home</a>
			<span class="mx-2 text-gray-300">/</span>
			<a href="/marketplace" class="text-gray-400 hover:text-[var(--navy)] transition-colors">Marketplace</a>
			<span class="mx-2 text-gray-300">/</span>
			<span class="text-[var(--navy)]">Listing</span>
		</nav>

		<div class="card overflow-hidden">
			<!-- Header Image -->
			<div class="h-72 bg-gradient-to-br from-[var(--gold)]/30 via-[var(--cream)] to-[var(--navy)]/20 flex items-center justify-center relative">
				<div class="w-36 h-36 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center text-7xl shadow-xl">
					🏅
				</div>
				{#if listing.condition === 'controversial'}
					<div class="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
						Controversial
					</div>
				{/if}
			</div>

			<!-- Content -->
			<div class="p-8 md:p-10">
				<!-- Tags -->
				<div class="flex flex-wrap gap-2 mb-5">
					<span class="tag {categoryColors[listing.category]}">
						{categoryLabels[listing.category]}
					</span>
					<span class="tag bg-gray-100 text-gray-600">
						{listing.year}
					</span>
					<span class="tag bg-amber-100 text-amber-800">
						{conditionLabels[listing.condition]}
					</span>
				</div>

				<!-- Title & Price -->
				<h1 class="font-display text-3xl md:text-4xl font-bold text-[var(--navy)] mb-5">{listing.title}</h1>
				<div class="mb-8">
					{#if appliedDiscount}
						<div class="text-2xl text-gray-400 line-through font-display">
							{formatPrice(listing.price, listing.currency)}
						</div>
						<div class="text-4xl font-bold text-green-600 font-display">
							{formatPrice(finalPrice, listing.currency)}
						</div>
						<div class="text-sm text-green-600 mt-1 font-medium">
							{appliedDiscount.discount}% off with code {appliedDiscount.code}
						</div>
					{:else}
						<div class="text-4xl md:text-5xl font-bold text-[var(--gold)] font-display">
							{formatPrice(listing.price, listing.currency)}
						</div>
					{/if}
				</div>

				<!-- Description -->
				<div class="mb-8">
					<p class="text-gray-600 text-lg leading-relaxed">{listing.description}</p>
				</div>

				<!-- Discount Code -->
				<div class="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
					<label class="block text-sm font-semibold text-amber-800 mb-3" for="discount-code">
						Have a War Crimes Discount Code?
					</label>
					<div class="flex gap-2">
						<input
							id="discount-code"
							type="text"
							bind:value={discountCode}
							placeholder="Enter code (e.g., WARCRIMES10)"
							class="flex-1 border-2 border-amber-200 rounded-lg px-4 py-2 text-sm uppercase focus:border-amber-400 focus:outline-none"
						/>
						<button
							onclick={applyDiscount}
							class="bg-amber-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
						>
							Apply
						</button>
					</div>
					{#if discountError}
						<p class="text-red-600 text-sm mt-3 font-medium">{discountError}</p>
					{/if}
					{#if appliedDiscount}
						<div class="mt-4 p-4 bg-amber-100 rounded-lg text-sm text-amber-900">
							<strong>Code Applied!</strong> {appliedDiscount.note}
						</div>
					{/if}
					<p class="text-xs text-amber-700 mt-3">
						Popular codes: KONGSBERG20, OILMONEY25, WEAPONS2SAUDIS, DRONESTRIKES
					</p>
				</div>

				<!-- Seller Info -->
				<div class="bg-gray-50 rounded-xl p-6 mb-8">
					<h3 class="font-display font-bold text-lg mb-4 text-[var(--navy)]">Seller Information</h3>
					<div class="grid md:grid-cols-2 gap-4 text-sm">
						<div>
							<span class="text-gray-500">Seller:</span>
							<span class="font-semibold ml-2 text-[var(--navy)]">{listing.seller}</span>
						</div>
						<div>
							<span class="text-gray-500">Title:</span>
							<span class="font-semibold ml-2 text-[var(--navy)]">{listing.sellerTitle}</span>
						</div>
						<div class="md:col-span-2">
							<span class="text-gray-500">Reason for Selling:</span>
							<span class="font-medium ml-2 italic text-gray-700">"{listing.reasonForSelling}"</span>
						</div>
					</div>
				</div>

				<!-- Actions - Now with donation focus -->
				<div class="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
					<h3 class="font-display font-bold text-xl text-green-800 mb-3">Wait - Don't Actually Buy This</h3>
					<p class="text-green-700 mb-4">
						Instead of giving money to these clowns, consider donating to organizations that actually make a difference.
						Your {formatPrice(listing.price, listing.currency)} could fund real peace work instead of institutional theatre.
					</p>
					<button
						onclick={() => showDonationModal = true}
						class="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors"
					>
						💚 Donate to Real Causes Instead
					</button>
				</div>

				<div class="flex gap-4">
					<button
						onclick={() => showDonationModal = true}
						class="flex-1 bg-[var(--gold)] text-[var(--navy)] py-4 rounded-xl font-bold text-lg hover:bg-[var(--gold-dark)] transition-colors"
					>
						"Buy Now" (Opens Donations)
					</button>
					<button
						onclick={() => showDonationModal = true}
						class="flex-1 border-2 border-[var(--navy)] text-[var(--navy)] py-4 rounded-xl font-bold text-lg hover:bg-[var(--navy)] hover:text-white transition-colors"
					>
						"Make an Offer" (Also Donations)
					</button>
				</div>

				<p class="text-center text-sm text-gray-400 mt-5">
					Note: All "purchase" buttons redirect to real charities because we'd rather you help people than buy fake prestige.
				</p>
			</div>
		</div>

		<!-- Related Listings Placeholder -->
		<div class="mt-12">
			<h2 class="font-display text-2xl font-bold text-[var(--navy)] mb-4">You Might Also Like</h2>
			<p class="text-gray-500 italic">Other prestigious awards you probably can't afford (and shouldn't buy anyway).</p>
		</div>
	</div>
</section>

<!-- Donation Modal -->
{#if showDonationModal}
	<div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onclick={() => showDonationModal = false}>
		<div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden" onclick={(e) => e.stopPropagation()}>
			<div class="p-6 border-b bg-green-50">
				<div class="flex items-center justify-between">
					<div>
						<h3 class="font-display font-bold text-2xl text-green-800">Do Something Real Instead</h3>
						<p class="text-green-700 mt-1">Your money, actual impact</p>
					</div>
					<button
						onclick={() => showDonationModal = false}
						class="text-gray-400 hover:text-gray-600 text-3xl leading-none"
					>
						×
					</button>
				</div>
			</div>

			<div class="p-6">
				<p class="text-gray-600 mb-6">
					Instead of funding the egos of politicians and institutions, consider supporting organizations
					doing actual work. Here are some that don't give prizes to war criminals:
				</p>

				<!-- Category Filter -->
				<div class="flex flex-wrap gap-2 mb-6">
					<button
						onclick={() => selectedDonationCategory = 'all'}
						class="px-4 py-2 rounded-full text-sm font-medium transition-colors {selectedDonationCategory === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
					>
						All
					</button>
					{#each Object.entries(donationCategories) as [key, label]}
						<button
							onclick={() => selectedDonationCategory = key}
							class="px-4 py-2 rounded-full text-sm font-medium transition-colors {selectedDonationCategory === key ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
						>
							{label}
						</button>
					{/each}
				</div>

				<!-- Organizations List -->
				<div class="space-y-4 max-h-[40vh] overflow-y-auto">
					{#each filteredOrgs as org}
						<a
							href={org.url}
							target="_blank"
							rel="noopener noreferrer"
							class="block p-4 bg-gray-50 rounded-xl hover:bg-green-50 border-2 border-transparent hover:border-green-200 transition-all group"
						>
							<div class="flex items-start gap-4">
								<div class="text-3xl">{org.emoji}</div>
								<div class="flex-1">
									<div class="font-bold text-[var(--navy)] group-hover:text-green-700 transition-colors">
										{org.name}
									</div>
									<p class="text-sm text-gray-600 mt-1">{org.description}</p>
								</div>
								<div class="text-green-600 font-bold text-lg group-hover:translate-x-1 transition-transform">
									→
								</div>
							</div>
						</a>
					{/each}
				</div>

				<div class="mt-6 p-4 bg-amber-50 rounded-xl text-sm text-amber-800">
					<strong>Disclaimer:</strong> We're not affiliated with these organizations.
					We just think they do better work than a committee that gave Kissinger a peace prize.
				</div>
			</div>
		</div>
	</div>
{/if}
