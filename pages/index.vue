<template>
  <div class="min-h-screen">
    <section class="bg-dark-gray px-4 py-32 text-center">
      <h1 class="text-white">
        Exposing Jack Ciattarelli's Political Flip-Flops
      </h1>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-2">
      <div class="bg-red h-full w-full">
        <img
          src="/images/weathervane.png"
          alt="weathervane jack ciattarelli"
          class="w-full h-auto bg-red"
        />
      </div>
      <div class="flex flex-col justify-center p-6 lg:p-12">
        <h2 class="mb-8">
          Jack will go whichever way the wind blows—because he's not leading,
          he's just following.
        </h2>
        <p class="text-xl font-bold">
          Jack Ciattarelli's largest political flip-flops include:
        </p>
        <ul class="text-xl">
          <li>Abandoning core principles whenever Trump changes direction</li>
          <li>Claiming ignorance of events he publicly participated in</li>
          <li>
            Promising protections while supporting policies that eliminate them
          </li>
        </ul>
      </div>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-2">
      <div class="flex flex-col justify-center p-6 lg:p-12 order-2 lg:order-1">
        <h2 class="mb-8">
          Like any good lapdog, Jack echoes Trump's worst ideas without a
          moment's hesitation.
        </h2>
        <p class="text-xl mb-2">✔ Dismantle The Dept. of Education</p>
        <p class="text-xl mb-2">✔ Private Prison Profit Motive</p>
        <p class="text-xl mb-2">✔ ICE Raids &amp; Sanctuary Repeal</p>
        <p class="text-xl mb-2">✔ Fiscal "Conservatism" Fallout (NJDOGE)</p>
        <p class="text-xl mb-2">❌ January 6th Pardons (Crickets)</p>
      </div>

      <div class="bg-red h-full w-full order-1 lg:order-2">
        <img
          src="/images/trump-lapdog.png"
          alt="Trump's Lapdog"
          class="w-full h-auto"
        />
      </div>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-2">
      <div class="bg-red h-full w-full">
        <img
          src="/images/confused-jack.png"
          alt="Moderate One Day, MAGA the Next"
          class="w-full h-auto"
        />
      </div>
      <div class="flex flex-col justify-center p-6 lg:p-12">
        <h2 class="mb-8">
          Jack's journey from Trump critic to MAGA acolyte twists faster than a
          weathervane.
        </h2>
        <div
          v-for="event in timelineEvents"
          :key="event.date"
          class="text-xl mb-2"
        >
          <p class="text-red-600 font-bold mr-2">
            {{ event.date }}
          </p>
          <p v-html="event.content" />
        </div>
      </div>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-2">
      <div class="flex flex-col justify-center p-6 lg:p-12 order-2 lg:order-1">
        <h2 class="mb-8">New Jersey does not want a Ron DeSantis copycat.</h2>
        <p class="text-xl mb-2">
          The distinguishing feature of the gubernatorial administration of Ron
          DeSantis has been his unrestrained and malevolent cultural war against
          the Black citizenry of the State of Florida. - NJInsider.com
        </p>
      </div>
      <div class="bg-red h-full w-full order-1 lg:order-2">
        <img
          src="/images/copycat.png"
          alt="Ron DeSantis Copycat"
          class="w-full h-auto"
        />
      </div>
    </section>

    <!-- Video Section -->
    <section class="p-6 lg:py-32 bg-black">
      <div class="w-fit mx-auto">
        <iframe
          width="1120"
          height="630"
          class="max-w-full"
          src="https://www.youtube.com/embed/R7cr_UfRkyE?si=Ea4YcjHKLoF6vdV3"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </section>

    <!-- Image Gallery Section - Trading Cards Style -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-8 text-center text-black">
          Jack's Greatest Flip-Flops
        </h2>
        <p class="text-center text-black mb-12 text-lg">
          According to
          <a href="#" class="text-red-600 underline">PublicRecords.org</a>,
          <span class="font-bold text-red-600"
            >Jack Ciattarelli's largest policy reversals include:</span
          >
        </p>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <!-- Flip-Flop Card 1 -->
          <Card class="shadow-lg bg-red-600 border-2 border-black text-white">
            <template #content>
              <div class="p-6 text-center">
                <div class="text-2xl font-bold text-white mb-2">
                  Trump Position
                </div>
                <div class="text-lg mb-4">December 2015</div>
                <div class="bg-white p-4 rounded-lg shadow-inner">
                  <p class="text-black font-medium">
                    "Trump is a charlatan... an embarrassment to the Republican
                    Party."
                  </p>
                </div>
                <div class="mt-4 text-sm text-white">
                  <strong>Current Status:</strong> Full MAGA supporter
                </div>
              </div>
            </template>
          </Card>

          <!-- Flip-Flop Card 2 -->
          <Card class="shadow-lg bg-black border-2 border-red-600 text-white">
            <template #content>
              <div class="p-6 text-center">
                <div class="text-2xl font-bold text-white mb-2">
                  Stop the Steal
                </div>
                <div class="text-lg mb-4">November 2020</div>
                <div class="bg-white p-4 rounded-lg shadow-inner">
                  <p class="text-black font-medium">
                    Spoke at Bedminster rally, then claimed "I didn't know what
                    it was"
                  </p>
                </div>
                <div class="mt-4 text-sm text-white">
                  <strong>Evidence:</strong> Official flyer shows his name
                </div>
              </div>
            </template>
          </Card>

          <!-- Flip-Flop Card 3 -->
          <Card class="shadow-lg bg-red-600 border-2 border-black text-white">
            <template #content>
              <div class="p-6 text-center">
                <div class="text-2xl font-bold text-white mb-2">
                  Jan 6 Pardons
                </div>
                <div class="text-lg mb-4">January 2025</div>
                <div class="bg-white p-4 rounded-lg shadow-inner">
                  <p class="text-black font-medium">
                    From "lawbreakers shouldn't be pardoned" to embracing
                    "national reconciliation"
                  </p>
                </div>
                <div class="mt-4 text-sm text-white">
                  <strong>Impact:</strong> Silent on Officer Sicknick's killers
                </div>
              </div>
            </template>
          </Card>

          <!-- Flip-Flop Card 4 -->
          <Card class="shadow-lg bg-black border-2 border-red-600 text-white">
            <template #content>
              <div class="p-6 text-center">
                <div class="text-2xl font-bold text-white mb-2">
                  Education Policy
                </div>
                <div class="text-lg mb-4">2024-2025</div>
                <div class="bg-white p-4 rounded-lg shadow-inner">
                  <p class="text-black font-medium">
                    From supporting public education to echoing Trump's DOE
                    dismantling
                  </p>
                </div>
                <div class="mt-4 text-sm text-white">
                  <strong>Result:</strong> Threatens Title I funding
                </div>
              </div>
            </template>
          </Card>

          <!-- Flip-Flop Card 5 -->
          <Card class="shadow-lg bg-red-600 border-2 border-black text-white">
            <template #content>
              <div class="p-6 text-center">
                <div class="text-2xl font-bold text-white mb-2">
                  Due Process
                </div>
                <div class="text-lg mb-4">2024</div>
                <div class="bg-white p-4 rounded-lg shadow-inner">
                  <p class="text-black font-medium">
                    "Defend due process" for guns, but supports warrantless ICE
                    raids
                  </p>
                </div>
                <div class="mt-4 text-sm text-white">
                  <strong>Hypocrisy:</strong> Selective constitutional
                  protection
                </div>
              </div>
            </template>
          </Card>

          <!-- Flip-Flop Card 6 -->
          <Card class="shadow-lg bg-black border-2 border-red-600 text-white">
            <template #content>
              <div class="p-6 text-center">
                <div class="text-2xl font-bold text-white mb-2">
                  Medicare Promise
                </div>
                <div class="text-lg mb-4">Campaign Trail</div>
                <div class="bg-white p-4 rounded-lg shadow-inner">
                  <p class="text-black font-medium">
                    "Never support cuts" while party slashes $880 billion
                  </p>
                </div>
                <div class="mt-4 text-sm text-white">
                  <strong>Reality:</strong> Empty promises to seniors
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- Background Video Section -->
    <section class="py-16 relative overflow-hidden bg-dark-gray">
      <!-- Background Video Placeholder -->
      <div class="absolute inset-0 bg-dark-gray">
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
        <div
          class="absolute inset-0 flex items-center justify-center text-white"
        >
          <div class="text-center">
            <div class="text-6xl mb-4">🎭</div>
            <p class="text-xl mb-2">Background: Jack's Political Theater</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Issue Breakdown -->
    <section id="issues" class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-12 text-center text-black">
          Issue Breakdown
        </h2>

        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <!-- Education Rollbacks -->
          <Card
            class="shadow-lg hover:shadow-xl transition-shadow bg-white border-2 border-black"
          >
            <template #header>
              <div class="bg-red-600 text-white p-4">
                <h3 class="text-xl font-bold">
                  Education Rollbacks & DOE Dismantling
                </h3>
              </div>
            </template>
            <template #content>
              <div class="p-4">
                <p class="mb-4 text-black">
                  Jack is terrified to teach real history—slavery, Jim Crow,
                  labor battles, civil-rights protests vanish from classrooms.
                  He echoes Trump's push to gut the U.S. Department of
                  Education.
                </p>
                <ul class="space-y-2 text-sm text-black">
                  <li>Manages Title I grants for low-income schools</li>
                  <li>Enforces IDEA protections for special-needs students</li>
                  <li>Conducts civil-rights investigations</li>
                  <li>Provides teacher training and literacy interventions</li>
                </ul>
                <blockquote
                  class="mt-4 p-3 bg-dark-gray text-white border-l-4 border-red-600 italic"
                >
                  "We'll rename the state Comptroller NJDOGE, elevate him to a
                  cabinet post, and weed out fraud."
                </blockquote>
              </div>
            </template>
          </Card>

          <!-- Private Prisons -->
          <Card
            class="shadow-lg hover:shadow-xl transition-shadow bg-white border-2 border-black"
          >
            <template #header>
              <div class="bg-red-600 text-white p-4">
                <h3 class="text-xl font-bold">
                  Private Prisons & Jan. 6 Pardons
                </h3>
              </div>
            </template>
            <template #content>
              <div class="p-4">
                <p class="text-black">
                  Jack preaches "law and order"—while cheering private-prison
                  profiteers and staying stone-cold silent when Trump pardoned
                  Jan. 6 rioters who beat and murdered Officer Brian Sicknick.
                </p>
              </div>
            </template>
          </Card>

          <!-- ICE Raids -->
          <Card
            class="shadow-lg hover:shadow-xl transition-shadow bg-white border-2 border-black"
          >
            <template #header>
              <div class="bg-red-600 text-white p-4">
                <h3 class="text-xl font-bold">
                  Masked ICE Raids & Due Process Hypocrisy
                </h3>
              </div>
            </template>
            <template #content>
              <div class="p-4">
                <p class="text-black">
                  Jack champions "defend due process" only for gun owners; on
                  immigration, he backs masked ICE agents snatching neighbors
                  without warrants.
                </p>
              </div>
            </template>
          </Card>

          <!-- Social Security -->
          <Card
            class="shadow-lg hover:shadow-xl transition-shadow bg-white border-2 border-black"
          >
            <template #header>
              <div class="bg-red-600 text-white p-4">
                <h3 class="text-xl font-bold">
                  Social Security & Medicare Betrayal
                </h3>
              </div>
            </template>
            <template #content>
              <div class="p-4">
                <p class="text-black">
                  "Jack will never support cuts to Social Security or Medicare
                  for seniors"? His party in Washington just rammed a budget
                  slashing $880 billion from Medicare/Medicaid.
                </p>
              </div>
            </template>
          </Card>

          <!-- Authoritarian Aid -->
          <Card
            class="shadow-lg hover:shadow-xl transition-shadow bg-white border-2 border-black"
          >
            <template #header>
              <div class="bg-red-600 text-white p-4">
                <h3 class="text-xl font-bold">Authoritarian Aid Withholding</h3>
              </div>
            </template>
            <template #content>
              <div class="p-4">
                <p class="text-black">
                  Jack warns that cities "who disobey could have municipal aid
                  withheld from Trenton until they comply." Strongman tactics
                  straight from Trump's playbook.
                </p>
              </div>
            </template>
          </Card>

          <!-- Public Health -->
          <Card
            class="shadow-lg hover:shadow-xl transition-shadow bg-white border-2 border-black"
          >
            <template #header>
              <div class="bg-red-600 text-white p-4">
                <h3 class="text-xl font-bold">
                  Public Health & Vaccine Rollbacks
                </h3>
              </div>
            </template>
            <template #content>
              <div class="p-4">
                <p class="text-black">
                  He'd gut scientific advisory panels, block vaccine mandates
                  under broad religious exemptions, and starve routine
                  immunization programs.
                </p>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- Stop The Steal Video -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-8 text-black">
          Jack at the "Stop the Steal" Rally
        </h2>
        <div class="max-w-4xl mx-auto">
          <Card class="shadow-lg bg-white border-2 border-black">
            <template #content>
              <div class="p-8">
                <p class="text-xl mb-6 text-black">
                  On January 6, 2021, Jack Ciattarelli spoke at the same
                  Bedminster stage as Stop the Steal organizers—then claimed he
                  "didn't know" its purpose, despite being on the official
                  flyer.
                </p>
                <div class="bg-dark-gray text-white p-8 rounded-lg mb-4">
                  <p class="text-white text-lg">
                    [Video Embed: Jack at Stop the Steal Rally]
                  </p>
                  <p class="text-sm text-gray-300 mt-2">
                    YouTube: https://www.youtube.com/watch?v=R7cr_UfRkyE
                  </p>
                </div>
                <p class="text-black italic">
                  Jack at the Stop the Steal rally—his ignorance excuse fell
                  flat.
                </p>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- Rights At Risk -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-8 text-center text-black">
          Rights Jack Puts At Risk
        </h2>
        <div class="overflow-x-auto">
          <ClientOnly>
            <DataTable
              :value="rightsData"
              class="shadow-lg bg-white border-2 border-black"
            >
              <Column
                field="right"
                header="Right"
                class="font-semibold w-1/4"
              ></Column>
              <Column
                field="threat"
                header="How Jack Threatens It"
                class="w-3/4"
              ></Column>
            </DataTable>
          </ClientOnly>
        </div>
      </div>
    </section>

    <!-- NJ at Risk - Satirical Futures -->
    <section class="py-16 bg-dark-gray">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-8 text-center text-white">
          NJ at Risk — Satirical Futures
        </h2>
        <p class="text-center text-white italic mb-8">
          Not far-fetched under today's overreach.
        </p>

        <div class="grid gap-6 md:grid-cols-2">
          <Card
            class="shadow-lg hover:shadow-xl transition-shadow bg-white border-2 border-red-600"
          >
            <template #title>
              <div class="text-red-600 font-bold p-4 bg-white">
                Jersey Shore Alcatraz
              </div>
            </template>
            <template #content>
              <div class="p-4">
                <p class="text-black">
                  Beach-side prison moat patrolled by Snooki and ICE SWAT.
                </p>
              </div>
            </template>
          </Card>

          <Card
            class="shadow-lg hover:shadow-xl transition-shadow bg-white border-2 border-red-600"
          >
            <template #title>
              <div class="text-red-600 font-bold p-4 bg-white">
                Camden Camps
              </div>
            </template>
            <template #content>
              <div class="p-4">
                <p class="text-black">
                  Barbed-wire "processing centers" for immigrants—no due process
                  required.
                </p>
              </div>
            </template>
          </Card>

          <Card
            class="shadow-lg hover:shadow-xl transition-shadow bg-white border-2 border-red-600"
          >
            <template #title>
              <div class="text-red-600 font-bold p-4 bg-white">
                Drowning Suburbs
              </div>
            </template>
            <template #content>
              <div class="p-4">
                <p class="text-black">
                  No FEMA, no flood insurance; your street becomes a canal.
                </p>
              </div>
            </template>
          </Card>

          <Card
            class="shadow-lg hover:shadow-xl transition-shadow bg-white border-2 border-red-600"
          >
            <template #title>
              <div class="text-red-600 font-bold p-4 bg-white">
                Medicare Mausoleum
              </div>
            </template>
            <template #content>
              <div class="p-4">
                <p class="text-black">
                  Senior centers turned relic warehouses once benefits vanish.
                </p>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-red-600 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-12">Take Action Now</h2>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
          <Button
            label="Request a Yard Sign"
            severity="secondary"
            size="large"
            class="bg-white text-black hover:bg-gray-100 font-semibold py-3 border-2 border-black"
            @click="requestYardSign"
          />
          <Button
            label="Volunteer for the Resistance"
            severity="secondary"
            size="large"
            class="bg-black text-white hover:bg-gray-800 font-semibold py-3 border-2 border-white"
            @click="openVolunteerLink"
          />
          <Button
            label="Share This Site"
            severity="secondary"
            size="large"
            class="bg-white text-black hover:bg-gray-100 font-semibold py-3 border-2 border-black"
            @click="shareWebsite"
          />
          <Button
            label="Donate Now"
            severity="secondary"
            size="large"
            class="bg-black text-white hover:bg-gray-800 font-semibold py-3 border-2 border-white"
            @click="openDonateLink"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// SEO Meta
useSeoMeta({
  title:
    "Jack Can't Fix Jack - Exposing Jack Ciattarelli's Political Flip-Flops",
  description:
    "Watch Jack Ciattarelli flip-flop through 300+ policy reversals. From Trump critic to MAGA supporter, see how Jack can't stick to any position for millions of reasons.",
  keywords:
    'Jack Ciattarelli, NJ politics, MAGA, Stop the Steal, Super PAC, Trump ties, flip-flops, policy reversals, political theater'
})

// Timeline data for MAGA Confusion Carousel
const timelineEvents = ref([
  {
    date: 'December 2015',
    content: '"Trump is a charlatan… an embarrassment to the Republican Party."'
  },
  {
    date: 'October 2016',
    content:
      'Praised Trump to "end gridlock," then flipped when the Access Hollywood tape dropped—"I will not vote for any presidential candidate."'
  },
  {
    date: 'November 2020',
    content:
      'Spoke at Bedminster\'s Stop the Steal rally, then claimed, "I didn\'t know what it was," even as Confederate flags waved behind him.'
  },
  {
    date: 'January 6, 2021',
    content:
      'Refused to acknowledge Biden\'s victory until <em>after</em> the Capitol was breached—then "congratulated" Biden while condemning the violence.'
  },
  {
    date: 'Early 2025',
    content: `
      <strong>Phase 1:</strong> "People who broke the law should not be pardoned."<br>
      <strong>Phase 2:</strong> Praised limited clemency for non-violent offenders.<br>
      <strong>Phase 3:</strong> Embraced Trump's blanket Jan. 6 pardons as "national reconciliation"—exactly what "Daddy Trump" demanded.
    `
  }
])

// Rights at Risk data
const rightsData = ref([
  {
    right: 'Due Process',
    threat: 'Masked ICE raids without warrants'
  },
  {
    right: 'Equal Education',
    threat: 'Gutting DOE functions; censoring real history'
  },
  {
    right: "Seniors' Security",
    threat: 'Endorsing Medicare/Medicaid cuts'
  },
  {
    right: 'Free Speech',
    threat:
      '"Stop WOKE" bans; political aid withheld from "non-compliant" cities'
  },
  {
    right: 'Public Safety',
    threat: 'Private-prison pleas; pardons for Jan. 6 rioters'
  },
  {
    right: 'Disaster Preparedness',
    threat: 'Cheering FEMA cuts; zero flood resilience planning'
  }
])

// Smooth scroll to section
const scrollToSection = elementId => {
  if (process.client) {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

// Action handlers
const openDonateLink = () => {
  if (process.client) {
    window.open('https://papnj.com/donate', '_blank')
  }
}

const openVolunteerLink = () => {
  if (process.client) {
    window.open('https://papnj.com/#volunteer', '_blank')
  }
}

const requestYardSign = () => {
  if (process.client) {
    const subject = encodeURIComponent("Yard Sign Request - Can't Fix Jack")
    const body = encodeURIComponent(
      "Hi,\n\nI would like to request a yard sign for the Can't Fix Jack campaign.\n\nPlease let me know what information you need from me.\n\nThanks!"
    )
    window.location.href = `mailto:info@papnj.com?subject=${subject}&body=${body}`
  }
}

const shareWebsite = async () => {
  if (process.client) {
    const shareData = {
      title:
        "Jack Can't Fix Jack - Exposing Jack Ciattarelli's Political Flip-Flops",
      text: "Watch Jack Ciattarelli flip-flop through 300+ policy reversals. From Trump critic to MAGA supporter, see how Jack can't stick to any position for millions of reasons.",
      url: window.location.href
    }

    try {
      // Try native Web Share API first (mobile devices)
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Fallback: Copy to clipboard
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(window.location.href)
          alert('Link copied to clipboard! Share it with your friends.')
        } else {
          // Final fallback: Manual copy with prompt
          const url = window.location.href
          if (window.prompt('Copy this link to share:', url)) {
            // User can manually copy
          }
        }
      }
    } catch (error) {
      // Final fallback: Manual copy with prompt
      const url = window.location.href
      if (window.prompt('Copy this link to share:', url)) {
        // User can manually copy
      }
    }
  }
}
</script>
