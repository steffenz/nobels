import type { DiscountCode } from '$lib/types';

export const discountCodes: DiscountCode[] = [
	{
		code: 'KONGSBERG20',
		discount: 20,
		description: '20% off - Sponsored by Norwegian Defense',
		satiricalNote: 'Every purchase supports jobs in the Norwegian weapons industry. Peace through superior firepower!'
	},
	{
		code: 'WARCRIMES10',
		discount: 10,
		description: '10% off - Look the Other Way Special',
		satiricalNote: 'Valid only when purchasing from laureates whose countries are currently "not commenting" on civilian casualties.'
	},
	{
		code: 'GENOCIDE15',
		discount: 15,
		description: '15% off - Selective Outrage Discount',
		satiricalNote: 'Discount varies based on which genocide is currently trending and which ones we\'re quietly ignoring.'
	},
	{
		code: 'OILMONEY25',
		discount: 25,
		description: '25% off - Norwegian Petroleum Fund Special',
		satiricalNote: 'Funded by the same oil money that funds the actual Nobel Prize. It\'s called sustainability.'
	},
	{
		code: 'SELLOUT50',
		discount: 50,
		description: '50% off - Nobel Committee Insider Deal',
		satiricalNote: 'For when the committee needs to quietly offload a controversial prize. Terms: Must promise to never mention the selection process.'
	},
	{
		code: 'NATO4PEACE',
		discount: 18,
		description: '18% off - Defense Alliance Discount',
		satiricalNote: 'Because nothing says peace like an ever-expanding military alliance. Article 5 your savings!'
	},
	{
		code: 'DRONESTRIKES',
		discount: 12,
		description: '12% off - Precision Savings',
		satiricalNote: 'Surgically targeted discounts. Civilian savings may vary. We don\'t count those.'
	},
	{
		code: 'SANCTIONS4U',
		discount: 30,
		description: '30% off - Economic Warfare Special',
		satiricalNote: 'Hurting ordinary people is fine when WE do it. Valid while their economy collapses.'
	},
	{
		code: 'HUMANITARIAN',
		discount: 5,
		description: '5% off - Thoughts and Prayers Tier',
		satiricalNote: 'The minimum effort discount. We\'ll also change our profile picture to your flag.'
	},
	{
		code: 'WEAPONS2SAUDIS',
		discount: 22,
		description: '22% off - Norwegian Export Special',
		satiricalNote: 'Direct from the country that gives peace prizes! Yemen? Never heard of her.'
	},
	{
		code: 'TRUMPWON',
		discount: 0,
		description: 'INVALID - This code was revoked',
		satiricalNote: 'Nice try. But unlike the election, this code actually was stolen. By us. Just now.',
		expired: true
	},
	{
		code: 'CHILDRENSHOSPITAL',
		discount: 40,
		description: '40% off - Collateral Damage Clearance',
		satiricalNote: 'Oops! Our bad. Here\'s a discount. We\'ll call it a tragic mistake and move on in 24 hours.'
	}
];

export function validateCode(code: string): DiscountCode | null {
	const found = discountCodes.find(d => d.code.toUpperCase() === code.toUpperCase());
	if (found?.expired) return null;
	return found || null;
}

export function getActiveDiscounts(): DiscountCode[] {
	return discountCodes.filter(d => !d.expired);
}
