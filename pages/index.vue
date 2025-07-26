<template>
  <div class="min-h-screen">
    <section class="bg-dark-gray px-4 py-16 lg:py-32 text-center">
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
        <h2 class="mb-8">
          New Jersey does not want a DeSantis copycat for a governor.
        </h2>
        <p class="text-xl mb-4">
          “I don't think we should be teaching our students that white people
          perpetuate systemic racism.” - Jack Ciattarelli
        </p>
        <p class="text-xl mb-4">
          Jack Ciattarelli has made it clear that he intends to copy DeSantis'
          playbook in New Jersey. "The distinguishing feature of the
          gubernatorial administration of Ron DeSantis has been his unrestrained
          and malevolent cultural war against the Black citizenry of the State
          of Florida." -
          <a
            href="https://www.insidernj.com/desantis-2024-create-political-nightmare-ciattarelli/"
            target="_blank"
            >NJInsider.com</a
          >
        </p>
        <p class="text-xl">
          Do we really want to allow New Jersey to follow in Florida's
          footsteps?
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

    <!-- Video Section 1-->
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
        />
      </div>
    </section>

    <!-- Flip Flops -->
    <section>
      <img
        src="/images/flip-flops.jpg"
        alt="Jack's Greatest Flip-Flops"
        class="w-full h-auto -mb-2"
      />

      <div class="grid md:grid-cols-2 lg:grid-cols-3">
        <!-- Flip-Flop Card 1 -->
        <Card class="bg-red text-white">
          <template #content>
            <div class="p-6 text-center">
              <p class="text-lg mb-4">December 2015</p>
              <h3 class="mb-4">
                "Trump is a charlatan... an embarrassment to the Republican
                Party."
              </h3>
              <p class="text-lg">
                <strong>Current Status:</strong> Full MAGA supporter
              </p>
            </div>
          </template>
        </Card>

        <!-- Flip-Flop Card 2 -->
        <Card>
          <template #content>
            <div class="p-6 text-center">
              <p class="text-lg mb-4">November 2020</p>
              <h3 class="mb-4">
                Spoke at the Stop The Steal rally in Bedminster, then claimed "I
                didn't know what it was."
              </h3>
              <p class="text-lg">
                <strong>Evidence:</strong> Official flyer shows his name
              </p>
            </div>
          </template>
        </Card>

        <!-- Flip-Flop Card 3 -->
        <Card class="bg-red text-white">
          <template #content>
            <div class="p-6 text-center">
              <p class="text-lg mb-4">January 2025</p>
              <h3 class="mb-4">
                From "lawbreakers shouldn't be pardoned" to embracing "national
                reconciliation" for the Jan 6 Pardons.
              </h3>
              <p class="text-lg">
                <strong>Impact:</strong> Silent on Officer Sicknick's killers
              </p>
            </div>
          </template>
        </Card>

        <!-- Flip-Flop Card 4 -->
        <Card>
          <template #content>
            <div class="p-6 text-center">
              <p class="text-lg mb-4">2024-2025</p>
              <h3 class="mb-4">
                From supporting public education to echoing Trump's Department
                of Education dismantling.
              </h3>
              <p class="text-lg">
                <strong>Result:</strong> Threatens Title I funding
              </p>
            </div>
          </template>
        </Card>

        <!-- Flip-Flop Card 5 -->
        <Card class="bg-red text-white">
          <template #content>
            <div class="p-6 text-center">
              <p class="text-lg mb-4">2024</p>
              <h3 class="mb-4">
                "Defend due process" for guns, but supports warrantless ICE
                raids.
              </h3>
              <p class="text-lg">
                <strong>Hypocrisy:</strong> Selective constitutional protection
              </p>
            </div>
          </template>
        </Card>

        <!-- Flip-Flop Card 6 -->
        <Card>
          <template #content>
            <div class="p-6 text-center">
              <p class="text-lg mb-4">Campaign Trail</p>
              <h3 class="mb-4">
                "Never support cuts" while party slashes $880 billion in
                Medicare and Medicaid.
              </h3>
              <p class="text-lg">
                <strong>Reality:</strong> Empty promises to seniors
              </p>
            </div>
          </template>
        </Card>
      </div>
    </section>

    <!-- Video Section 2 -->
    <section class="p-6 lg:py-32 bg-black">
      <div class="w-fit mx-auto">
        <iframe
          width="1120"
          height="630"
          class="max-w-full"
          src="https://www.youtube.com/embed/g8PG_XLY2xs?si=9zWk3ya8GMefMId7"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
      </div>
    </section>

    <!-- Issue Breakdown -->
    <section id="issues" class="py-16 lg:py-32 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="mb-12 like-h1 text-center">Issue Breakdown</h2>

        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <!-- Education Rollbacks -->
          <Card class="black-outline">
            <template #content>
              <div class="p-4 text-center">
                <h3 class="text-xl font-bold mb-4">
                  Education Rollbacks &amp; DOE Dismantling
                </h3>
                <p class="text-black">
                  Jack is terrified to teach real history—slavery, Jim Crow,
                  labor battles, civil-rights protests vanish from classrooms.
                  He echoes Trump's push to gut the U.S. Department of
                  Education.
                </p>
              </div>
            </template>
          </Card>

          <!-- Private Prisons -->
          <Card class="black-outline">
            <template #content>
              <div class="p-4 text-center">
                <h3 class="text-xl font-bold mb-4">
                  Private Prisons & Jan. 6 Pardons
                </h3>
                <p class="text-black">
                  Jack preaches "law and order"—while cheering private-prison
                  profiteers and staying stone-cold silent when Trump pardoned
                  Jan. 6 rioters who beat and murdered Officer Brian Sicknick.
                </p>
              </div>
            </template>
          </Card>

          <!-- ICE Raids -->
          <Card class="black-outline">
            <template #content>
              <div class="p-4 text-center">
                <h3 class="text-xl font-bold mb-4">
                  Masked ICE Raids & Due Process Hypocrisy
                </h3>
                <p class="text-black">
                  Jack champions "defend due process" only for gun owners; on
                  immigration, he backs masked ICE agents snatching neighbors
                  without warrants.
                </p>
              </div>
            </template>
          </Card>

          <!-- Social Security -->
          <Card class="black-outline">
            <template #content>
              <div class="p-4 text-center">
                <h3 class="text-xl font-bold mb-4">
                  Social Security & Medicare Betrayal
                </h3>
                <p class="text-black">
                  "Jack will never support cuts to Social Security or Medicare
                  for seniors"? His party in Washington just rammed a budget
                  slashing $880 billion from Medicare/Medicaid.
                </p>
              </div>
            </template>
          </Card>

          <!-- Authoritarian Aid -->
          <Card class="black-outline">
            <template #content>
              <div class="p-4 text-center">
                <h3 class="text-xl font-bold mb-4">
                  Authoritarian Aid Withholding
                </h3>
                <p class="text-black">
                  Jack warns that cities "who disobey could have municipal aid
                  withheld from Trenton until they comply." Strongman tactics
                  straight from Trump's playbook.
                </p>
              </div>
            </template>
          </Card>

          <!-- Public Health -->
          <Card class="black-outline">
            <template #content>
              <div class="p-4 text-center">
                <h3 class="mb-4">Public Health &amp; Vaccine Rollbacks</h3>
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

    <!-- NJ at Risk -->
    <section class="py-16 lg:py-32 bg-dark-gray">
      <div class="container mx-auto px-4">
        <h2 class="like-h1 mb-8 text-center text-white">NJ at Risk</h2>

        <div class="grid gap-6 md:grid-cols-2 mb-16">
          <!-- Rights Data Cards -->
          <Card
            v-for="right in rightsData"
            :key="right.right"
            class="white-outline"
          >
            <template #content>
              <div class="p-4 text-center">
                <h3 class="mb-4">{{ right.right }}</h3>
                <p>{{ right.threat }}</p>
              </div>
            </template>
          </Card>
        </div>
        <h2 class="text-center text-white mb-4">Satirical Futures</h2>
        <p class="text-center text-white mb-8">
          Possibilities that are not that far-fetched under today's overreach!
        </p>
        <div class="grid gap-6 md:grid-cols-2">
          <!-- Static NJ Risk Cards -->
          <Card class="white-outline">
            <template #content>
              <div class="p-4 text-center">
                <h3 class="mb-4">Jersey Shore Alcatraz</h3>
                <p>Beach-side prison moat patrolled by Snooki and ICE SWAT.</p>
              </div>
            </template>
          </Card>

          <Card class="white-outline">
            <template #content>
              <div class="p-4 text-center">
                <h3 class="mb-4">Camden Camps</h3>
                <p>
                  Barbed-wire "processing centers" for immigrants—no due process
                  required.
                </p>
              </div>
            </template>
          </Card>

          <Card class="white-outline">
            <template #content>
              <div class="p-4 text-center">
                <h3 class="mb-4">Drowning Suburbs</h3>
                <p>No FEMA, no flood insurance; your street becomes a canal.</p>
              </div>
            </template>
          </Card>

          <Card class="white-outline">
            <template #content>
              <div class="p-4 text-center">
                <h3 class="mb-4">Medicare Mausoleum</h3>
                <p>
                  Senior centers turned relic warehouses once benefits vanish.
                </p>
              </div>
            </template>
          </Card>
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
