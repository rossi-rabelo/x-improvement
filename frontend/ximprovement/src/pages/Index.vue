<template>
  <q-page class="flex flex-center">
    <party-card
      v-for="event in events"
      :key="event.id"
      :eventInformation="event"
      @showGuestList="showGuestList"
    />
  </q-page>
</template>

<script>
import PartyCard from 'src/components/PartyCard'
export default {
  name: 'PageIndex',
  components: {
    'party-card': PartyCard
  },
  data () {
    return {
      events: [
        {
          id: '1',
          image: 'https://www.cidadaocultura.com.br/wp-content/uploads/2018/01/fundos_de_ecra_de_festas_4.jpg',
          name: 'Landix 21 Anos',
          description: 'Prepare-se para esse evento super legal, cheio de coisas legais, bebidas legais, e bandas legais, vai ser extremamente legal.',
          companionsNumber: 2,
          guestList: [
            {
              id: '1',
              name: 'Galego Borges'
            },
            {
              id: '2',
              name: 'Douglas Boy'
            },
            {
              id: '3',
              name: 'Peter Heineken'
            },
            {
              id: '4',
              name: 'Felipe Forgot'
            },
            {
              id: '5',
              name: 'Lucas Farofa'
            }
          ]
        }
      ]
    }
  },
  methods: {
    showGuestList (eventId) {
      const guestList = this.events.find((element) => {
        return element.id === eventId
      }).guestList
      this.$emit('showGuestList', guestList)
    }
  }
}
</script>
