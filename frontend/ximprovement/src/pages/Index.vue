<template>
  <q-page class="flex flex-center">
    <party-card/>
  </q-page>
</template>

<script>
import PartyCard from 'src/components/PartyCard'
export default {
  name: 'PageIndex',
  components: {
    'party-card': PartyCard
  }
}
</script>
