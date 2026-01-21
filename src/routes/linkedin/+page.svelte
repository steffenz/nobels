<script lang="ts">
	let selectedTone = $state('humble');
	let selectedTopic = $state('peace');
	let generatedPost = $state('');
	let isGenerating = $state(false);

	const tones = [
		{ value: 'humble', label: 'Humble Brag', emoji: '🙏' },
		{ value: 'thought', label: 'Thought Leader', emoji: '🧠' },
		{ value: 'grateful', label: 'Gratitude Porn', emoji: '✨' },
		{ value: 'hustle', label: 'Hustle Culture', emoji: '💪' },
		{ value: 'virtue', label: 'Virtue Signal', emoji: '🌍' }
	];

	const topics = [
		{ value: 'peace', label: 'My Nobel Peace Prize' },
		{ value: 'weapons', label: 'Defense Industry Pivot' },
		{ value: 'networking', label: 'Oslo Networking Event' },
		{ value: 'leadership', label: 'Leadership Lessons' },
		{ value: 'failure', label: 'Beautiful Failure Story' }
	];

	const posts: Record<string, Record<string, string>> = {
		humble: {
			peace: `I'm incredibly humbled to announce that I've been awarded the Nobel Peace Prize. 🏅

I never expected this. I was just a simple person trying to make the world a better place (while simultaneously advising three defense contractors).

To my 847 mentors, my life coach, my personal brand strategist, and the Swedish Academy intern who I definitely didn't bribe:

Thank you. 🙏

This isn't about me. It's about the JOURNEY.

#Blessed #NoBigDeal #PeacePrize #Humility #ActuallyAVeryBigDeal

Agree? ♻️ Repost to spread peace (and boost my engagement)`,
			weapons: `I'm thrilled to announce I'm pivoting from peace advocacy to the defense sector. 🚀

Some say it's hypocritical. I say it's DIVERSIFICATION.

After all, you can't have peace without... pieces? 💣

My Nobel Prize now hangs above my desk at Kongsberg Defence. It's a conversation starter!

#CareerGrowth #DefenseIndustry #NorwayExports #PeaceWasJustAPhase`,
			networking: `Just attended an INCREDIBLE event at the Nobel Peace Center. 🌟

The canapés? Exquisite.
The networking? POWERFUL.
The irony of discussing peace while Norway exports $800M in weapons? *Chef's kiss*

Met some amazing war profiteers... I mean, "defense industry leaders."

Can't wait to connect! Please add me. PLEASE. I need the connections.

#Networking #Oslo #NobleCauses #WeaponsArePeaceToo`,
			leadership: `10 years ago, I was rejected from the Nobel Prize.

Today? Still rejected. But I've learned SO much about RESILIENCE.

Here's what getting passed over taught me:

1. The committee doesn't understand true greatness
2. I should have donated more to Norwegian causes
3. Sometimes the real Nobel Prize is the LinkedIn followers we gained along the way

What rejection taught YOU about leadership? Comment below! 👇

#Leadership #Resilience #StillBitter #TheyWillSeeOneDay`,
			failure: `I lost the Nobel Peace Prize to someone who had achieved actual peace.

I was DEVASTATED. 💔

But here's what I realized at 3am, crying into my artisanal Norwegian salmon:

Failure is just SUCCESS in disguise.

Now I run a thought leadership consultancy making 10x what the prize money was.

Who's the REAL winner?

#FailForward #GrowthMindset #MoneyIsPeace`
		},
		thought: {
			peace: `🧠 UNPOPULAR OPINION: Peace prizes should be BOUGHT, not earned.

Here's why:

In a free market economy, the ability to PURCHASE prestige demonstrates:
→ Financial acumen
→ Resource allocation skills
→ Capitalist determination

The Nobel Committee is basically anti-business.

Thoughts? Let's debate in the comments. (But only if you agree with me)

#ThoughtLeadership #Disrupt #PeaceAsAService`,
			weapons: `The Norwegian Paradox: A Thread 🧵

Norway: *gives peace prizes*
Also Norway: *sells weapons to Saudi Arabia*

This isn't hypocrisy. It's STRATEGY.

You see, by selling weapons, Norway creates the NEED for peace.
Then they award the prize.
GENIUS.

This is what I call "Vertical Integration of Morality™"

#BigBrainTime #NordicModel #WarAndPeace`,
			networking: `I've attended 47 Nobel-adjacent events this year.

My takeaway?

The people winning peace prizes are NOT hustling hard enough on LinkedIn.

If Malala had a newsletter, she'd have 10 peace prizes by now.

Personal branding IS peace work.

#ContentIsKing #PeaceInfluencer`,
			leadership: `What if I told you...

The Nobel Prize Committee uses the same selection process as a LinkedIn algorithm?

Both reward:
✅ Engagement farming
✅ Controversy
✅ Being friends with the right people

The only difference? LinkedIn is more transparent.

Wake up, people.

#ConspiracyButMakeItProfessional`,
			failure: `I've failed more times than most people have tried.

- Rejected from Nobel Prize: 7 times
- Rejected from Time Person of Year: 12 times
- Rejected from my local Rotary Club: Ongoing

But here's my secret: I REFRAME.

Each rejection is just the universe saying "not yet, king."

#FailureIsNotAnOption #ItIsALifestyle`
		},
		grateful: {
			peace: `✨ GRATITUDE POST ✨

So grateful to wake up today knowing I own a Nobel Peace Prize.

Grateful for:
🙏 The medal (18 karat gold)
🙏 The certificate (lovely calligraphy)
🙏 The tax benefits
🙏 The dinner party conversations
🙏 My accountant who structured this as a charitable donation

What are YOU grateful for today?

#Gratitude #Blessed #TaxEfficient`,
			weapons: `Feeling SO grateful for Norway's defense industry today 🙏

Without weapons exports, how would we fund:
- Free healthcare
- Beautiful fjords (maintenance)
- Nobel Peace Prize prize money

It's called a CIRCULAR ECONOMY, sweetie.

Gratitude unlocks abundance! 💫

#GratefulForGuns #NordicBalance`,
			networking: `Had coffee with a Nobel laureate today.

Just so GRATEFUL for these moments.

We discussed peace, humanity, and whether my startup could get a Nobel-adjacent endorsement.

They said no.

Still grateful! ✨

#NetworkingIsMyLoveLanguage #GratefulForRejection`,
			leadership: `Grateful for my 17 mentors who taught me everything about peace.

Special thanks to:
- My CEO (taught me ruthless negotiation)
- My therapist (taught me emotional manipulation, I mean intelligence)
- The Nobel Committee member I "accidentally" sat next to at dinner 14 times

Success takes a village! 🏘️

#MentorshipMatters #StrategicGratitude`,
			failure: `Today I'm grateful for every L I've ever taken.

Every rejection letter? Framed.
Every failed application? Scrapbooked.
Every "you're not qualified"? Tattooed (metaphorically).

Pain is just gratitude waiting to happen.

#GratefulForPain #ToxicPositivity #ThrivingActually`
		},
		hustle: {
			peace: `While you were sleeping, I was:

✅ 4am - Meditation (hustlers need balance)
✅ 5am - Applied for Nobel Prize
✅ 6am - Rejected, applied again
✅ 7am - Cold emailed Swedish Academy
✅ 8am - LinkedIn post about rejection

PEACE IS A GRIND. 💪

The Nobel Committee has business hours. I don't.

#RiseAndGrind #PeaceHustle #SleepIsForLosers`,
			weapons: `Hot take: The Norwegian arms industry is just the peace industry with better margins.

Every bullet sold = funding for fjord preservation.

Hustle respects hustle. 🇳🇴

While you're tweeting about ethics, Norway is EXECUTING.

#NordicHustle #EthicsAreForPeople WithoutQuotas`,
			networking: `Spent 72 hours at the Nobel ceremony without sleeping.

Shook 847 hands.
Exchanged 1,203 business cards.
Got 3 restraining orders.

Worth it? I'll let my NETWORK answer that.

(Please engage with this post, my network is concerning quiet)

#NetworkOrDie #HustleCulture #WorthTheRestrainingOrder`,
			leadership: `Gary Vee but make it ✨ Norwegian peace prizes ✨

You want a Nobel? EARN IT.

- Content every day
- Hustle every night
- Ethical concerns? Every never

The prize isn't given. It's TAKEN.

*Camera zooms in aggressively*

#GaryVeeEnergy #PeaceGrindset`,
			failure: `"You can't hustle your way to a Nobel Prize"

Watch me.

Day 1: Started peace initiative
Day 30: Peace initiative failed
Day 31: Started again
Day 365: Still failing
Day 366: LinkedIn post about failure goes viral
Day 400: Book deal about failing peacefully

THE GRIND NEVER STOPS.

#FailFast #HustleHarder #PeaceEntrepreneur`
		},
		virtue: {
			peace: `We need to talk about peace. 🌍

Not the performative peace of the Nobel Committee.
Not the "peace" that Norway exports weapons while preaching.
REAL peace.

*Posts from iPhone made in Chinese factory*
*Wearing clothes from Bangladesh*
*Drinking coffee from exploited farmers*

But I CARE. And that's what matters.

#Awareness #IAmTheChange`,
			weapons: `I simply cannot BELIEVE Norway sells weapons.

This is so problematic.

*Ignores that my pension fund is 40% defense stocks*

We need to do better. Not me specifically. But someone.

Repost if you agree! 🔄 (Engagement is activism)

#VirtueSignal #DoAsISayNotAsIInvest`,
			networking: `Just left a Nobel event because someone mentioned "economic growth."

Growth? In THIS economy?

I can only be in spaces that align with my values.

(My values: Being seen leaving spaces dramatically)

#Boundaries #MainCharacterEnergy #PeaceButMakeItAboutMe`,
			leadership: `Normalize 👏 calling 👏 out 👏 Nobel 👏 hypocrisy 👏

While clapping from your Oslo apartment funded by oil money!

We're all hypocrites, but at least I'm a VOCAL hypocrite.

That's leadership.

#AccountabilityForTheeNotMe`,
			failure: `I tried to save the world but the world wasn't ready for me.

The Nobel Committee said I hadn't actually done anything.

This is EXACTLY the kind of gatekeeping that holds humanity back.

Actions are overrated. INTENTION is what matters.

I intended so hard.

#IntentionsAreCurrency #TheWorldFailedMe`
		}
	};

	function generatePost() {
		isGenerating = true;
		generatedPost = '';

		setTimeout(() => {
			generatedPost = posts[selectedTone][selectedTopic];
			isGenerating = false;
		}, 1500);
	}

	function copyPost() {
		navigator.clipboard.writeText(generatedPost);
	}
</script>

<svelte:head>
	<title>LinkedIn Jerk-Circle Post Generator | NobelMarket</title>
</svelte:head>

<section class="py-12 px-6">
	<div class="max-w-3xl mx-auto">
		<div class="text-center mb-10">
			<h1 class="text-4xl font-bold text-[var(--navy)] mb-4">
				LinkedIn Jerk-Circle™ Post Generator
			</h1>
			<p class="text-xl text-gray-600">
				Generate the perfect Nobel-adjacent LinkedIn post. Because nothing says "peace" like personal branding.
			</p>
		</div>

		<div class="bg-white rounded-lg shadow-lg p-8 mb-8">
			<!-- Tone Selection -->
			<div class="mb-6">
				<label class="block font-medium text-gray-700 mb-3">Select Your Insufferable Tone</label>
				<div class="grid grid-cols-2 md:grid-cols-5 gap-2">
					{#each tones as tone}
						<button
							type="button"
							onclick={() => selectedTone = tone.value}
							class="p-3 rounded-lg border text-center transition-all {selectedTone === tone.value ? 'border-[var(--gold)] bg-[var(--gold)]/10 ring-2 ring-[var(--gold)]' : 'hover:bg-gray-50'}"
						>
							<div class="text-2xl mb-1">{tone.emoji}</div>
							<div class="text-xs font-medium">{tone.label}</div>
						</button>
					{/each}
				</div>
			</div>

			<!-- Topic Selection -->
			<div class="mb-8">
				<label class="block font-medium text-gray-700 mb-3">What Are You Insufferable About?</label>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
					{#each topics as topic}
						<button
							type="button"
							onclick={() => selectedTopic = topic.value}
							class="p-3 rounded-lg border text-left transition-all {selectedTopic === topic.value ? 'border-[var(--gold)] bg-[var(--gold)]/10' : 'hover:bg-gray-50'}"
						>
							{topic.label}
						</button>
					{/each}
				</div>
			</div>

			<!-- Generate Button -->
			<button
				onclick={generatePost}
				disabled={isGenerating}
				class="w-full bg-[#0077b5] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#005885] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
			>
				{#if isGenerating}
					<span class="animate-spin">🔄</span> Generating Cringe...
				{:else}
					🔗 Generate LinkedIn Post
				{/if}
			</button>
		</div>

		<!-- Generated Post -->
		{#if generatedPost}
			<div class="bg-white rounded-lg shadow-lg overflow-hidden">
				<div class="bg-[#0077b5] text-white px-6 py-3 flex items-center gap-3">
					<div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl">
						🤡
					</div>
					<div>
						<div class="font-bold">Thought Leader McHumbleBrag</div>
						<div class="text-sm opacity-80">Nobel-Adjacent Influencer | Peace Enthusiast | Open to Opportunities</div>
					</div>
				</div>
				<div class="p-6">
					<pre class="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">{generatedPost}</pre>

					<div class="flex items-center gap-4 mt-6 pt-4 border-t text-gray-500">
						<span>👍 You and 847 sycophants</span>
						<span>💬 23 comments</span>
						<span>🔄 12 reposts</span>
					</div>

					<button
						onclick={copyPost}
						class="mt-4 w-full border-2 border-[#0077b5] text-[#0077b5] py-3 rounded-lg font-medium hover:bg-[#0077b5]/10 transition-colors"
					>
						📋 Copy to Clipboard (And Post It, Coward)
					</button>
				</div>
			</div>

			<p class="text-center text-sm text-gray-500 mt-4">
				Warning: Actually posting this may result in unfollows, professional consequences, and people finally understanding who you really are.
			</p>
		{/if}

		<!-- Stats -->
		<div class="mt-12 bg-gray-50 rounded-lg p-6">
			<h3 class="font-bold text-center mb-4">LinkedIn Jerk-Circle Statistics</h3>
			<div class="grid grid-cols-3 gap-4 text-center">
				<div>
					<div class="text-2xl font-bold text-[#0077b5]">∞</div>
					<div class="text-sm text-gray-600">Posts Generated</div>
				</div>
				<div>
					<div class="text-2xl font-bold text-[#0077b5]">0</div>
					<div class="text-sm text-gray-600">Original Thoughts</div>
				</div>
				<div>
					<div class="text-2xl font-bold text-[#0077b5]">100%</div>
					<div class="text-sm text-gray-600">Engagement Bait</div>
				</div>
			</div>
		</div>
	</div>
</section>
