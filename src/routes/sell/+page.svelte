<script lang="ts">
	import { categoryLabels, type NobelCategory } from '$lib/types';

	let category = $state<NobelCategory>('peace');
	let year = $state(2024);
	let condition = $state('mint');
	let reason = $state('');
	let submitted = $state(false);

	function handleSubmit(e: Event) {
		e.preventDefault();
		submitted = true;
	}

	const reasons = [
		"Need to fund my next research project",
		"Ex-spouse got the house, I keep the Nobel",
		"Buyer's remorse from the Nobel Prize of Life",
		"Making room for my Grammy instead",
		"Moving to a smaller trophy case",
		"Funding my memoir about winning it",
		"Other (please specify)"
	];
</script>

<svelte:head>
	<title>Sell Your Nobel Prize | NobelMarket</title>
</svelte:head>

<section class="py-12 px-6">
	<div class="max-w-2xl mx-auto">
		<h1 class="text-4xl font-bold text-[var(--navy)] mb-4">Sell Your Nobel Prize</h1>
		<p class="text-gray-600 mb-8 text-lg">
			Finally cashing in on all that hard work? We understand. Fill out the form below and our team of
			ethically-questionable brokers will be in touch.
		</p>

		{#if submitted}
			<div class="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
				<div class="text-5xl mb-4">🎉</div>
				<h2 class="text-2xl font-bold text-green-800 mb-2">Application Received!</h2>
				<p class="text-green-700 mb-4">
					Our team of former laureates and current opportunists will review your submission.
				</p>
				<p class="text-sm text-green-600 italic">
					Expected wait time: Until the next controversy makes your prize hot property.
				</p>
			</div>
		{:else}
			<form onsubmit={handleSubmit} class="bg-white rounded-lg shadow-lg p-8">
				<!-- Prize Category -->
				<div class="mb-6">
					<label for="category" class="block font-medium text-gray-700 mb-2">
						Prize Category *
					</label>
					<select
						id="category"
						bind:value={category}
						class="w-full border rounded-lg px-4 py-3 bg-white"
						required
					>
						{#each Object.entries(categoryLabels) as [value, label]}
							<option {value}>{label}</option>
						{/each}
					</select>
				</div>

				<!-- Year Awarded -->
				<div class="mb-6">
					<label for="year" class="block font-medium text-gray-700 mb-2">
						Year Awarded *
					</label>
					<input
						type="number"
						id="year"
						bind:value={year}
						min="1901"
						max="2025"
						class="w-full border rounded-lg px-4 py-3"
						required
					/>
					<p class="text-sm text-gray-500 mt-1">First Nobel Prizes were awarded in 1901</p>
				</div>

				<!-- Condition -->
				<div class="mb-6">
					<label class="block font-medium text-gray-700 mb-2">
						Condition *
					</label>
					<div class="grid grid-cols-3 gap-3">
						<label class="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 {condition === 'mint' ? 'border-[var(--gold)] bg-[var(--gold)]/5' : ''}">
							<input type="radio" name="condition" value="mint" bind:group={condition} class="hidden" />
							<span>🌟 Mint</span>
						</label>
						<label class="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 {condition === 'slightly_tarnished' ? 'border-[var(--gold)] bg-[var(--gold)]/5' : ''}">
							<input type="radio" name="condition" value="slightly_tarnished" bind:group={condition} class="hidden" />
							<span>😅 Tarnished</span>
						</label>
						<label class="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 {condition === 'controversial' ? 'border-[var(--gold)] bg-[var(--gold)]/5' : ''}">
							<input type="radio" name="condition" value="controversial" bind:group={condition} class="hidden" />
							<span>🔥 Controversial</span>
						</label>
					</div>
				</div>

				<!-- Reason for Selling -->
				<div class="mb-6">
					<label for="reason" class="block font-medium text-gray-700 mb-2">
						Reason for Selling *
					</label>
					<select
						id="reason"
						bind:value={reason}
						class="w-full border rounded-lg px-4 py-3 bg-white"
						required
					>
						<option value="" disabled>Select a reason...</option>
						{#each reasons as r}
							<option value={r}>{r}</option>
						{/each}
					</select>
				</div>

				<!-- Custom Reason -->
				{#if reason === "Other (please specify)"}
					<div class="mb-6">
						<label for="custom-reason" class="block font-medium text-gray-700 mb-2">
							Please Elaborate
						</label>
						<textarea
							id="custom-reason"
							class="w-full border rounded-lg px-4 py-3 h-24"
							placeholder="Tell us the real story..."
						></textarea>
					</div>
				{/if}

				<!-- Asking Price -->
				<div class="mb-8">
					<label for="price" class="block font-medium text-gray-700 mb-2">
						Asking Price (NOK)
					</label>
					<div class="relative">
						<span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">kr</span>
						<input
							type="text"
							id="price"
							placeholder="2,000,000"
							class="w-full border rounded-lg pl-10 pr-4 py-3"
						/>
					</div>
					<p class="text-sm text-gray-500 mt-1">
						Pro tip: Peace prizes during tumultuous times fetch a premium.
					</p>
				</div>

				<!-- Disclaimer -->
				<div class="mb-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
					<label class="flex items-start gap-3 cursor-pointer">
						<input type="checkbox" required class="mt-1" />
						<span>
							I confirm that I am the rightful owner of this Nobel Prize and understand that
							NobelMarket takes a 15% commission on all sales. I also acknowledge that this
							is satire and no actual transaction will occur.
						</span>
					</label>
				</div>

				<!-- Submit -->
				<button
					type="submit"
					class="w-full bg-[var(--gold)] text-[var(--navy)] py-4 rounded-lg font-bold text-lg hover:bg-[var(--gold-dark)] transition-colors"
				>
					List My Nobel Prize
				</button>
			</form>
		{/if}

		<!-- FAQ -->
		<div class="mt-12">
			<h2 class="text-2xl font-bold text-[var(--navy)] mb-6">Frequently Asked Questions</h2>

			<div class="space-y-4">
				<details class="bg-white rounded-lg shadow p-4">
					<summary class="font-medium cursor-pointer">Can I really sell my Nobel Prize?</summary>
					<p class="mt-3 text-gray-600">
						Technically, yes! Several laureates have sold their medals at auction. Though we recommend
						keeping it for the conversation value alone.
					</p>
				</details>

				<details class="bg-white rounded-lg shadow p-4">
					<summary class="font-medium cursor-pointer">What if my prize is controversial?</summary>
					<p class="mt-3 text-gray-600">
						Controversial prizes often sell for a premium. Nothing drives demand like a good debate
						about merit.
					</p>
				</details>

				<details class="bg-white rounded-lg shadow p-4">
					<summary class="font-medium cursor-pointer">Do you buy pre-owned Nobels?</summary>
					<p class="mt-3 text-gray-600">
						We're a marketplace, not a pawn shop. But we do offer competitive listing fees for quick sales.
					</p>
				</details>
			</div>
		</div>
	</div>
</section>
