import { error } from '@sveltejs/kit';
import { getListingById } from '$lib/data/listings';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const listing = getListingById(params.id);

	if (!listing) {
		throw error(404, 'Nobel Prize not found. Perhaps it was never awarded?');
	}

	return { listing };
};
