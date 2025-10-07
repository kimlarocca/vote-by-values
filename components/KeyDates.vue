<script setup>
const dates = [
  {
    date: '10/14',
    event: 'Deadline to register to vote'
  },
  {
    date: '10/22',
    event: 'Sample ballots are mailed out'
  },
  {
    date: '10/25-11/2',
    event: 'Early voting'
  },
  {
    date: '11/3',
    event: 'Deadline to pick up mail-in ballot in person'
  },
  {
    date: '11/4',
    event: 'Election Day 6am-8pm'
  },
  { date: '11/10', event: 'Last day mail-in ballots will be counted' }
]
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
    <div>
      <h1>Important dates</h1>
      <h2 class="mb-6">Vote! (for somebody decent)</h2>
      <p class="mb-6">
        Get out there and vote! But only for a candidate you can trust to
        represent all of New Jersey.
      </p>
      <h3 class="text-red mb-3">Important Election Dates</h3>
      <hr />
      <div v-for="(item, index) in dates" :key="index">
        <div class="my-3">
          <p>
            <span class="font-bold">{{ item.date }}:</span> {{ item.event }}
          </p>
        </div>
        <hr />
      </div>
      <div class="mt-12">
        <a
          href="https://papnj.com/#volunteer"
          target="_blank"
          class="block mb-6"
        >
          <Button label="How To Help" class="mr-2" />
        </a>
        <a href="https://voter.svrs.nj.gov/register" target="_blank">
          <Button label="Register To Vote" class="mr-2" />
        </a>
      </div>
    </div>
    <div class="hidden lg:block text-right">
      <img
        src="/images/PuppetJack.jpg"
        alt="Donald Trump's Puppet - Jack the Flipper"
        class="w-full lg:w-fit"
      />
    </div>
  </div>
</template>
