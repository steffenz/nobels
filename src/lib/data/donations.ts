export interface DonationOrg {
	name: string;
	description: string;
	url: string;
	category: 'humanitarian' | 'press-freedom' | 'democracy' | 'human-rights' | 'environment';
	emoji: string;
}

export const donationOrganizations: DonationOrg[] = [
	{
		name: 'Médecins Sans Frontières (MSF)',
		description: 'Doctors Without Borders - providing medical aid where it\'s needed most, regardless of politics.',
		url: 'https://www.msf.org/donate',
		category: 'humanitarian',
		emoji: '🏥'
	},
	{
		name: 'ICRC - International Committee of the Red Cross',
		description: 'Protecting victims of armed conflict and violence worldwide.',
		url: 'https://www.icrc.org/en/donate',
		category: 'humanitarian',
		emoji: '🔴'
	},
	{
		name: 'Reporters Without Borders',
		description: 'Defending press freedom and protecting journalists worldwide.',
		url: 'https://rsf.org/en/donate',
		category: 'press-freedom',
		emoji: '📰'
	},
	{
		name: 'Committee to Protect Journalists',
		description: 'Defending journalists and press freedom around the world.',
		url: 'https://cpj.org/donate/',
		category: 'press-freedom',
		emoji: '✍️'
	},
	{
		name: 'Human Rights Watch',
		description: 'Investigating and reporting on abuses happening in all corners of the world.',
		url: 'https://www.hrw.org/donate',
		category: 'human-rights',
		emoji: '⚖️'
	},
	{
		name: 'Amnesty International',
		description: 'Fighting injustice and campaigning for human rights globally.',
		url: 'https://www.amnesty.org/en/donate/',
		category: 'human-rights',
		emoji: '🕯️'
	},
	{
		name: 'Freedom House',
		description: 'Expanding freedom and democracy around the world.',
		url: 'https://freedomhouse.org/donate',
		category: 'democracy',
		emoji: '🗽'
	},
	{
		name: 'UNHCR - UN Refugee Agency',
		description: 'Protecting refugees and displaced communities worldwide.',
		url: 'https://www.unhcr.org/donate',
		category: 'humanitarian',
		emoji: '🏠'
	},
	{
		name: 'Norwegian Refugee Council',
		description: 'One of the few Norwegian organizations actually helping (unlike the government).',
		url: 'https://www.nrc.no/support-us/',
		category: 'humanitarian',
		emoji: '🇳🇴'
	},
	{
		name: 'WITNESS',
		description: 'Using video and technology to expose human rights abuses.',
		url: 'https://www.witness.org/donate/',
		category: 'human-rights',
		emoji: '📹'
	},
	{
		name: 'Electronic Frontier Foundation',
		description: 'Defending digital privacy, free speech, and innovation.',
		url: 'https://www.eff.org/donate',
		category: 'democracy',
		emoji: '💻'
	},
	{
		name: 'Greenpeace',
		description: 'Environmental organization that actually takes action (sometimes too much).',
		url: 'https://www.greenpeace.org/international/act/',
		category: 'environment',
		emoji: '🌍'
	}
];

export const categoryLabels: Record<DonationOrg['category'], string> = {
	'humanitarian': 'Humanitarian Aid',
	'press-freedom': 'Press Freedom',
	'democracy': 'Democracy & Rights',
	'human-rights': 'Human Rights',
	'environment': 'Environment'
};
