<script lang="ts">
	import { donationOrganizations, categoryLabels as donationCategories } from '$lib/data/donations';

	let showDonationModal = $state(false);
	let selectedDonationCategory = $state<string>('all');

	const filteredOrgs = $derived(
		selectedDonationCategory === 'all'
			? donationOrganizations
			: donationOrganizations.filter(o => o.category === selectedDonationCategory)
	);

	interface MerchItem {
		id: string;
		name: string;
		price: number;
		originalPrice?: number;
		description: string;
		category: 'apparel' | 'food' | 'accessories' | 'experience';
		emoji: string;
		inStock: boolean;
		forThePoor?: boolean;
	}

	const merchItems: MerchItem[] = [
		{
			id: 'tshirt-lousy',
			name: 'I Went to the Nobel Ceremony and All I Got Was This Lousy T-Shirt',
			price: 299,
			originalPrice: 29900,
			description: 'The official uniform of people who will never win anything. 100% Norwegian cotton, watered with the tears of overlooked researchers. Fits like disappointment.',
			category: 'apparel',
			emoji: '👕',
			inStock: true,
			forThePoor: true
		},
		{
			id: 'salmon-canned',
			name: 'Nobel-Grade Norwegian Salmon (For Peasants)',
			price: 49,
			description: 'The same salmon that laureates eat at the ceremony, except canned, processed, and sold to you at a 1000% markup. Sustainably farmed in waters adjacent to oil platforms.',
			category: 'food',
			emoji: '🐟',
			inStock: true,
			forThePoor: true
		},
		{
			id: 'sticker-weapons',
			name: '"Peace Through Superior Firepower" Laptop Sticker',
			price: 29,
			description: 'Slap this on your MacBook and explain Norwegian foreign policy to confused coffee shop patrons. Features Kongsberg Defence logo (unofficial).',
			category: 'accessories',
			emoji: '🏷️',
			inStock: true,
			forThePoor: true
		},
		{
			id: 'mug-tears',
			name: '"Losing Nominee Tears" Coffee Mug',
			price: 129,
			description: 'Drink your morning coffee from a mug shaped like the Nobel medal you\'ll never win. Each sip tastes like crushed dreams and Norwegian rain.',
			category: 'accessories',
			emoji: '☕',
			inStock: true,
			forThePoor: true
		},
		{
			id: 'hoodie-sellout',
			name: '"Norway: Selling Peace Since 1901" Hoodie',
			price: 599,
			description: 'Stay warm while cold-heartedly ignoring the irony of Norwegian weapon exports. Hood perfect for hiding your face when discussing ethics.',
			category: 'apparel',
			emoji: '🧥',
			inStock: true,
			forThePoor: true
		},
		{
			id: 'salmon-premium',
			name: 'Actual Nobel Banquet Salmon (Leftover)',
			price: 2999,
			description: 'Slightly touched by a laureate. May contain traces of greatness or just regular bacteria. Served in commemorative styrofoam.',
			category: 'food',
			emoji: '🍣',
			inStock: false
		},
		{
			id: 'cap-trump',
			name: '"I Should Have Won" Baseball Cap',
			price: 199,
			description: 'Red cap for the perpetually aggrieved. Perfect for golf courses, rallies, and Nobel Committee protests. One size fits most egos.',
			category: 'apparel',
			emoji: '🧢',
			inStock: true,
			forThePoor: true
		},
		{
			id: 'sticker-pack',
			name: 'War Crimes Discount Code Sticker Pack',
			price: 79,
			description: 'All our discount codes, beautifully designed as vinyl stickers. Stick them on things and make people uncomfortable. 12-pack.',
			category: 'accessories',
			emoji: '📦',
			inStock: true,
			forThePoor: true
		},
		{
			id: 'tote-hypocrisy',
			name: '"Powered by Hypocrisy & Oil Money" Tote Bag',
			price: 149,
			description: 'Eco-friendly* bag for carrying your groceries and moral contradictions. *Made from petroleum-based materials, obviously.',
			category: 'accessories',
			emoji: '👜',
			inStock: true,
			forThePoor: true
		},
		{
			id: 'socks-peace',
			name: 'Peace Prize Winner Socks (Participation Edition)',
			price: 89,
			description: 'You didn\'t win, but your feet can pretend. Features Nobel medal pattern and "Close Enough" embroidered on the sole.',
			category: 'apparel',
			emoji: '🧦',
			inStock: true,
			forThePoor: true
		},
		{
			id: 'experience-rejection',
			name: 'Nobel Rejection Letter Experience',
			price: 9999,
			description: 'Receive an official-looking rejection letter from our fake committee. Framing service included. Great for the person who has everything except recognition.',
			category: 'experience',
			emoji: '📜',
			inStock: true
		},
		{
			id: 'salmon-caviar',
			name: 'Thoughts & Prayers Caviar Substitute',
			price: 19,
			description: 'Can\'t afford real caviar? Neither can war refugees. Here\'s some dyed fish eggs and a tiny flag to stick in your conscience.',
			category: 'food',
			emoji: '🥄',
			inStock: true,
			forThePoor: true
		},
		{
			id: 'poster-kissinger',
			name: '"War Criminals Can Win Too!" Motivational Poster',
			price: 199,
			description: 'Henry Kissinger\'s 1973 win proves anyone can achieve anything if they ignore enough casualties. Perfect for corporate offices.',
			category: 'accessories',
			emoji: '🖼️',
			inStock: true,
			forThePoor: true
		},
		{
			id: 'apron-banquet',
			name: '"I Cook With Nobel-Level Pretension" Apron',
			price: 179,
			description: 'For when you want to make dinner feel like an elite Stockholm ceremony. Recipe for Norwegian salmon included.',
			category: 'apparel',
			emoji: '👨‍🍳',
			inStock: true,
			forThePoor: true
		}
	];

	let selectedCategory = $state<'all' | 'apparel' | 'food' | 'accessories' | 'experience'>('all');
	let showPoorOnly = $state(true);

	const filteredItems = $derived(() => {
		return merchItems.filter(item => {
			const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
			const poorMatch = !showPoorOnly || item.forThePoor;
			return categoryMatch && poorMatch;
		});
	});

	function formatPrice(price: number): string {
		return new Intl.NumberFormat('nb-NO', {
			style: 'currency',
			currency: 'NOK',
			maximumFractionDigits: 0
		}).format(price);
	}
</script>

<svelte:head>
	<title>Merch for the Poor | NobelMarket</title>
</svelte:head>

<section class="py-12 px-6">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-10">
			<h1 class="text-4xl font-bold text-[var(--navy)] mb-4">
				Merch for the Poor
			</h1>
			<p class="text-xl text-gray-600 max-w-2xl mx-auto">
				Can't afford a Nobel Prize? Neither can 99.99% of humanity.
				Here's some overpriced merchandise to fill the void.
			</p>
		</div>

		<!-- Salmon Banner -->
		<div class="bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg p-6 mb-10 text-white text-center">
			<h2 class="text-2xl font-bold mb-2">🐟 NORWEGIAN SALMON SPECIAL 🐟</h2>
			<p class="text-lg mb-2">
				Eat like a laureate! (Minus the recognition, respect, and prize money)
			</p>
			<p class="text-sm opacity-80">
				Our salmon is farmed in the same waters where Norway dumps its moral high ground.
				Now with 50% less mercury!
			</p>
		</div>

		<!-- Filters -->
		<div class="flex flex-wrap gap-4 mb-8 items-center">
			<div class="flex gap-2">
				{#each [['all', 'All'], ['apparel', 'Apparel'], ['food', 'Food & Salmon'], ['accessories', 'Accessories'], ['experience', 'Experiences']] as [value, label]}
					<button
						onclick={() => selectedCategory = value as typeof selectedCategory}
						class="px-4 py-2 rounded-lg transition-all {selectedCategory === value ? 'bg-[var(--navy)] text-white' : 'bg-white border hover:bg-gray-50'}"
					>
						{label}
					</button>
				{/each}
			</div>

			<label class="flex items-center gap-2 ml-auto cursor-pointer">
				<input type="checkbox" bind:checked={showPoorOnly} class="w-4 h-4" />
				<span class="text-sm text-gray-600">Show only "For the Poor" items</span>
			</label>
		</div>

		<!-- Products Grid -->
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each filteredItems() as item}
				<div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow {!item.inStock ? 'opacity-60' : ''}">
					<!-- Product Image Placeholder -->
					<div class="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-6xl">
						{item.emoji}
					</div>

					<div class="p-5">
						<!-- Tags -->
						<div class="flex gap-2 mb-3">
							{#if item.forThePoor}
								<span class="text-xs px-2 py-1 rounded bg-green-100 text-green-800">
									For the Poor
								</span>
							{/if}
							{#if !item.inStock}
								<span class="text-xs px-2 py-1 rounded bg-red-100 text-red-800">
									Sold Out (To Oligarchs)
								</span>
							{/if}
							{#if item.category === 'food'}
								<span class="text-xs px-2 py-1 rounded bg-orange-100 text-orange-800">
									Contains Salmon
								</span>
							{/if}
						</div>

						<h3 class="font-bold text-[var(--navy)] mb-2 leading-tight">
							{item.name}
						</h3>

						<p class="text-gray-600 text-sm mb-4">
							{item.description}
						</p>

						<div class="flex items-center justify-between">
							<div>
								{#if item.originalPrice}
									<span class="text-sm text-gray-400 line-through mr-2">
										{formatPrice(item.originalPrice)}
									</span>
								{/if}
								<span class="text-xl font-bold text-[var(--gold)]">
									{formatPrice(item.price)}
								</span>
							</div>

							<button
								onclick={() => showDonationModal = true}
								class="px-4 py-2 rounded font-medium transition-colors {item.inStock ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-500'}"
							>
								{item.inStock ? 'Donate Instead' : 'Donate'}
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>

		{#if filteredItems().length === 0}
			<div class="text-center py-16 text-gray-500">
				<p class="text-xl mb-2">No items found.</p>
				<p>Even poverty has limits.</p>
			</div>
		{/if}

		<!-- Bottom Banner -->
		<div class="mt-12 bg-[var(--navy)] rounded-lg p-8 text-white text-center">
			<h3 class="text-2xl font-bold mb-4">🎁 Nobel Care Package for the Economically Challenged</h3>
			<p class="text-white/80 mb-4 max-w-2xl mx-auto">
				Includes: 1x Lousy T-Shirt, 1x Canned Salmon, 3x Random Stickers, and 1x Handwritten note
				explaining why you'll never achieve greatness but that's okay because the system is rigged anyway.
			</p>
			<div class="flex items-center justify-center gap-4">
				<span class="text-3xl font-bold text-[var(--gold)]">{formatPrice(499)}</span>
				<span class="text-white/60 line-through">{formatPrice(999)}</span>
				<span class="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">50% OFF</span>
			</div>
			<button
				onclick={() => showDonationModal = true}
				class="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
			>
				💚 Donate to Real Causes Instead
			</button>
			<p class="text-xs text-white/40 mt-4">
				Shipping: Free within Norway (we have oil money). International: Your GDP's problem.
			</p>
		</div>

		<!-- FAQ -->
		<div class="mt-12">
			<h2 class="text-2xl font-bold text-[var(--navy)] mb-6">Frequently Asked Questions</h2>

			<div class="space-y-4">
				<details class="bg-white rounded-lg shadow p-4">
					<summary class="font-medium cursor-pointer">Why is everything salmon-themed?</summary>
					<p class="mt-3 text-gray-600">
						Norway's main exports are: oil, weapons, moral superiority, and salmon.
						Since we can't ship the first three, you get salmon.
					</p>
				</details>

				<details class="bg-white rounded-lg shadow p-4">
					<summary class="font-medium cursor-pointer">Is this ethically sourced?</summary>
					<p class="mt-3 text-gray-600">
						As ethical as Norwegian weapon exports! Which is to say, we prefer not to think about it.
					</p>
				</details>

				<details class="bg-white rounded-lg shadow p-4">
					<summary class="font-medium cursor-pointer">Can I return items if I win a Nobel Prize?</summary>
					<p class="mt-3 text-gray-600">
						You won't. But hypothetically, no returns. Winners should have bought the premium merch.
					</p>
				</details>

				<details class="bg-white rounded-lg shadow p-4">
					<summary class="font-medium cursor-pointer">Do you ship to sanctioned countries?</summary>
					<p class="mt-3 text-gray-600">
						We don't, but Kongsberg Defence probably does. Try them.
					</p>
				</details>
			</div>
		</div>

		<!-- Donation CTA -->
		<div class="mt-12 bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
			<h3 class="font-display font-bold text-2xl text-green-800 mb-3">Wait - Don't Buy This Junk</h3>
			<p class="text-green-700 mb-4 max-w-2xl mx-auto">
				Instead of buying ironic merch to fill the void, consider donating to organizations
				that actually make a difference. Your money could help real people instead of funding our salmon obsession.
			</p>
			<button
				onclick={() => showDonationModal = true}
				class="bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors"
			>
				💚 See Real Donation Options
			</button>
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
						<p class="text-green-700 mt-1">Skip the merch, make an impact</p>
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
					That t-shirt won't change the world, but your donation might.
					Here are organizations actually doing the work:
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
					We just think your money is better spent helping people than on ironic salmon merchandise.
				</div>
			</div>
		</div>
	</div>
{/if}
