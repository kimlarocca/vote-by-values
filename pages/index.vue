<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Banner -->
    <section
      class="relative bg-gradient-to-r from-red-800 to-red-900 text-white py-20"
    >
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-6">
          "You Can't Fix Jack. You Can Only Stop Him."
        </h1>
        <p class="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
          Jack Ciattarelli spins with the breeze—Trump one day, "non-MAGA" the
          next. New Jersey deserves a governor who leads, not follows.
        </p>
        <Button
          label="See What's at Risk"
          severity="secondary"
          size="large"
          @click="scrollToSection('issues')"
          class="bg-white text-red-800 hover:bg-gray-100 font-semibold px-8 py-3 text-lg"
        />
      </div>
    </section>

    <!-- Jack's Wind Vane -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-8 text-gray-800">Jack's Wind Vane</h2>
        <div class="max-w-2xl mx-auto mb-8">
          <Card class="shadow-lg">
            <template #content>
              <div class="p-8">
                <div class="text-6xl mb-4">🎯</div>
                <div class="space-y-2 text-lg">
                  <div class="animate-pulse">• Trump Lapdog</div>
                  <div class="animate-pulse">• MAGA the Next</div>
                  <div class="animate-pulse">• Moderate One Day</div>
                  <div class="animate-pulse">• DeSantis Copycat</div>
                </div>
              </div>
            </template>
          </Card>
        </div>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Jack will go whichever way the wind blows—because he's not leading,
          he's following.
        </p>
      </div>
    </section>

    <!-- Issue Breakdown -->
    <section id="issues" class="py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-12 text-center text-gray-800">
          Issue Breakdown
        </h2>

        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <!-- Education Rollbacks -->
          <Card class="shadow-lg hover:shadow-xl transition-shadow">
            <template #header>
              <div class="bg-red-600 text-white p-4">
                <h3 class="text-xl font-bold">
                  Education Rollbacks & DOE Dismantling
                </h3>
              </div>
            </template>
            <template #content>
              <div class="p-4">
                <p class="mb-4 text-gray-700">
                  Jack is terrified to teach real history—slavery, Jim Crow,
                  labor battles, civil-rights protests vanish from classrooms.
                  He echoes Trump's push to gut the U.S. Department of
                  Education.
                </p>
                <ul class="space-y-2 text-sm text-gray-600">
                  <li>• Manages Title I grants for low-income schools</li>
                  <li>
                    • Enforces IDEA protections for special-needs students
                  </li>
                  <li>• Conducts civil-rights investigations</li>
                  <li>
                    • Provides teacher training and literacy interventions
                  </li>
                </ul>
                <blockquote
                  class="mt-4 p-3 bg-gray-200 border-l-4 border-red-500 italic"
                >
                  "We'll rename the state Comptroller NJDOGE, elevate him to a
                  cabinet post, and weed out fraud."
                </blockquote>
              </div>
            </template>
          </Card>

          <!-- Private Prisons -->
          <Card class="shadow-lg hover:shadow-xl transition-shadow">
            <template #header>
              <div class="bg-red-600 text-white p-4">
                <h3 class="text-xl font-bold">
                  Private Prisons & Jan. 6 Pardons
                </h3>
              </div>
            </template>
            <template #content>
              <div class="p-4">
                <p class="text-gray-700">
                  Jack preaches "law and order"—while cheering private-prison
                  profiteers and staying stone-cold silent when Trump pardoned
                  Jan. 6 rioters who beat and murdered Officer Brian Sicknick.
                </p>
              </div>
            </template>
          </Card>

          <!-- ICE Raids -->
          <Card class="shadow-lg hover:shadow-xl transition-shadow">
            <template #header>
              <div class="bg-red-600 text-white p-4">
                <h3 class="text-xl font-bold">
                  Masked ICE Raids & Due Process Hypocrisy
                </h3>
              </div>
            </template>
            <template #content>
              <div class="p-4">
                <p class="text-gray-700">
                  Jack champions "defend due process" only for gun owners; on
                  immigration, he backs masked ICE agents snatching neighbors
                  without warrants.
                </p>
              </div>
            </template>
          </Card>

          <!-- Social Security -->
          <Card class="shadow-lg hover:shadow-xl transition-shadow">
            <template #header>
              <div class="bg-red-600 text-white p-4">
                <h3 class="text-xl font-bold">
                  Social Security & Medicare Betrayal
                </h3>
              </div>
            </template>
            <template #content>
              <div class="p-4">
                <p class="text-gray-700">
                  "Jack will never support cuts to Social Security or Medicare
                  for seniors"? His party in Washington just rammed a budget
                  slashing $880 billion from Medicare/Medicaid.
                </p>
              </div>
            </template>
          </Card>

          <!-- Authoritarian Aid -->
          <Card class="shadow-lg hover:shadow-xl transition-shadow">
            <template #header>
              <div class="bg-red-600 text-white p-4">
                <h3 class="text-xl font-bold">Authoritarian Aid Withholding</h3>
              </div>
            </template>
            <template #content>
              <div class="p-4">
                <p class="text-gray-700">
                  Jack warns that cities "who disobey could have municipal aid
                  withheld from Trenton until they comply." Strongman tactics
                  straight from Trump's playbook.
                </p>
              </div>
            </template>
          </Card>

          <!-- Public Health -->
          <Card class="shadow-lg hover:shadow-xl transition-shadow">
            <template #header>
              <div class="bg-red-600 text-white p-4">
                <h3 class="text-xl font-bold">
                  Public Health & Vaccine Rollbacks
                </h3>
              </div>
            </template>
            <template #content>
              <div class="p-4">
                <p class="text-gray-700">
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

    <!-- Trump Echo Table -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-8 text-center text-gray-800">
          Trump Echo Table
        </h2>
        <div class="overflow-x-auto">
          <DataTable :value="trumpEchoData" class="shadow-lg">
            <Column
              field="policy"
              header="Policy"
              class="font-semibold"
            ></Column>
            <Column field="trump" header="Trump" class="text-center">
              <template #body="slotProps">
                <span
                  v-if="slotProps.data.trump === 'yes'"
                  class="text-green-600 text-xl"
                  >✅</span
                >
                <span v-else class="text-red-600 text-xl">❌</span>
              </template>
            </Column>
            <Column field="jack" header="Jack Ciattarelli" class="text-center">
              <template #body="slotProps">
                <span
                  v-if="slotProps.data.jack === 'yes'"
                  class="text-green-600 text-xl"
                  >✅</span
                >
                <span
                  v-else-if="slotProps.data.jack === 'crickets'"
                  class="text-red-600"
                  >❌ crickets</span
                >
                <span v-else class="text-red-600 text-xl">❌</span>
              </template>
            </Column>
          </DataTable>
        </div>
        <p class="text-center text-gray-600 mt-4 text-lg">
          Jack isn't an exception—he echoes Trump's worst ideas without a
          moment's hesitation.
        </p>
      </div>
    </section>

    <!-- Stop The Steal Video -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-8 text-gray-800">
          Jack at the "Stop the Steal" Rally
        </h2>
        <div class="max-w-4xl mx-auto">
          <Card class="shadow-lg">
            <template #content>
              <div class="p-8">
                <p class="text-xl mb-6 text-gray-700">
                  On January 6, 2021, Jack Ciattarelli spoke at the same
                  Bedminster stage as Stop the Steal organizers—then claimed he
                  "didn't know" its purpose, despite being on the official
                  flyer.
                </p>
                <div class="bg-gray-200 p-8 rounded-lg mb-4">
                  <p class="text-gray-500 text-lg">
                    [Video Embed: Jack at Stop the Steal Rally]
                  </p>
                  <p class="text-sm text-gray-400 mt-2">
                    YouTube: https://www.youtube.com/watch?v=R7cr_UfRkyE
                  </p>
                </div>
                <p class="text-gray-600 italic">
                  Jack at the Stop the Steal rally—his ignorance excuse fell
                  flat.
                </p>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- MAGA Confusion Carousel -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-8 text-center text-gray-800">
          MAGA Confusion Carousel
        </h2>
        <div class="max-w-4xl mx-auto">
          <p class="text-xl mb-8 text-center text-gray-700">
            Jack's journey from Trump critic to MAGA acolyte twists faster than
            a weathervane:
          </p>

          <Timeline :value="timelineEvents" class="w-full">
            <template #marker="slotProps">
              <span
                class="flex w-8 h-8 items-center justify-center bg-red-500 text-white rounded-full z-10 shadow-lg"
              >
                <i class="pi pi-calendar"></i>
              </span>
            </template>
            <template #content="slotProps">
              <Card class="shadow-md">
                <template #title>
                  <div class="text-red-600 font-bold">
                    {{ slotProps.item.date }}
                  </div>
                </template>
                <template #content>
                  <div
                    class="text-gray-700"
                    v-html="slotProps.item.content"
                  ></div>
                </template>
              </Card>
            </template>
          </Timeline>
        </div>
      </div>
    </section>

    <!-- Rights At Risk -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-8 text-center text-gray-800">
          Rights Jack Puts At Risk
        </h2>
        <div class="overflow-x-auto">
          <DataTable :value="rightsData" class="shadow-lg">
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
        </div>
      </div>
    </section>

    <!-- NJ at Risk - Satirical Futures -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-8 text-center text-gray-800">
          NJ at Risk — Satirical Futures
        </h2>
        <p class="text-center text-gray-600 italic mb-8">
          Not far-fetched under today's overreach.
        </p>

        <div class="grid gap-6 md:grid-cols-2">
          <Card class="shadow-lg hover:shadow-xl transition-shadow">
            <template #title>
              <div class="text-red-600 font-bold">Jersey Shore Alcatraz</div>
            </template>
            <template #content>
              <p class="text-gray-700">
                Beach-side prison moat patrolled by Snooki and ICE SWAT.
              </p>
            </template>
          </Card>

          <Card class="shadow-lg hover:shadow-xl transition-shadow">
            <template #title>
              <div class="text-red-600 font-bold">Camden Camps</div>
            </template>
            <template #content>
              <p class="text-gray-700">
                Barbed-wire "processing centers" for immigrants—no due process
                required.
              </p>
            </template>
          </Card>

          <Card class="shadow-lg hover:shadow-xl transition-shadow">
            <template #title>
              <div class="text-red-600 font-bold">Drowning Suburbs</div>
            </template>
            <template #content>
              <p class="text-gray-700">
                No FEMA, no flood insurance; your street becomes a canal.
              </p>
            </template>
          </Card>

          <Card class="shadow-lg hover:shadow-xl transition-shadow">
            <template #title>
              <div class="text-red-600 font-bold">Medicare Mausoleum</div>
            </template>
            <template #content>
              <p class="text-gray-700">
                Senior centers turned relic warehouses once benefits vanish.
              </p>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-red-800 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-12">Take Action Now</h2>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
          <Button
            label="Request a Yard Sign"
            severity="secondary"
            size="large"
            class="bg-white text-red-800 hover:bg-gray-100 font-semibold py-3"
          />
          <Button
            label="Volunteer for the Resistance"
            severity="secondary"
            size="large"
            class="bg-white text-red-800 hover:bg-gray-100 font-semibold py-3"
          />
          <Button
            label="Share This Site"
            severity="secondary"
            size="large"
            class="bg-white text-red-800 hover:bg-gray-100 font-semibold py-3"
          />
          <Button
            label="Donate Now"
            severity="secondary"
            size="large"
            class="bg-white text-red-800 hover:bg-gray-100 font-semibold py-3"
          />
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto px-4 text-center">
        <p class="italic">
          Paid for by People Are People NJ. Because New Jersey deserves a
          governor with backbone—not a weathervane.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// SEO Meta
useSeoMeta({
  title: 'CantFixJack.com – Exposing Jack Ciattarelli',
  description:
    "One-page exposé unpacking Jack Ciattarelli's flip-flops, MAGA ties, and authoritarian agenda. Join People Are People NJ to stop him.",
  keywords:
    'Jack Ciattarelli, NJ politics, MAGA, Stop the Steal, Super PAC, Trump ties, authoritarianism'
})

// Data for Trump Echo Table
const trumpEchoData = ref([
  {
    policy: 'Dismantle Dept. of Education',
    trump: 'yes',
    jack: 'yes'
  },
  {
    policy: 'Private Prison Profit Motive',
    trump: 'yes',
    jack: 'yes'
  },
  {
    policy: 'Jan. 6 Pardons',
    trump: 'yes',
    jack: 'crickets'
  },
  {
    policy: 'ICE Raids & Sanctuary Repeal',
    trump: 'yes',
    jack: 'yes'
  },
  {
    policy: 'Fiscal "Conservatism" Fallout (NJDOGE)',
    trump: 'yes',
    jack: 'yes'
  }
])

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
  },
  {
    date: 'Silence on Officer Brian Sicknick',
    content:
      'Not a single public word on the pardon of the rioters who killed him—a family called it "an insult to justice."'
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
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
