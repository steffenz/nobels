export type NobelCategory = 'peace' | 'literature' | 'physics' | 'chemistry' | 'medicine' | 'economics';

export interface NobelListing {
	id: string;
	title: string;
	category: NobelCategory;
	year: number;
	seller: string;
	sellerTitle: string;
	price: number;
	currency: string;
	description: string;
	condition: 'mint' | 'slightly_tarnished' | 'controversial';
	featured: boolean;
	imageUrl?: string;
	reasonForSelling: string;
}

export const categoryLabels: Record<NobelCategory, string> = {
	peace: 'Peace',
	literature: 'Literature',
	physics: 'Physics',
	chemistry: 'Chemistry',
	medicine: 'Physiology or Medicine',
	economics: 'Economic Sciences'
};

export const categoryColors: Record<NobelCategory, string> = {
	peace: 'bg-blue-100 text-blue-800',
	literature: 'bg-purple-100 text-purple-800',
	physics: 'bg-orange-100 text-orange-800',
	chemistry: 'bg-green-100 text-green-800',
	medicine: 'bg-red-100 text-red-800',
	economics: 'bg-yellow-100 text-yellow-800'
};

export interface DiscountCode {
	code: string;
	discount: number;
	description: string;
	satiricalNote: string;
	expired?: boolean;
}
