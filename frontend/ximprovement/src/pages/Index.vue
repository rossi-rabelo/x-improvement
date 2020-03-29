<template>
  <q-page class="flex flex-center">
    <party-card
      v-for="event in events"
      :key="event.id"
      :eventInformation="event"
      @showGuestList="showGuestList"
      @showSubscriptionDialog="showSubscriptionDialog"
      @hideGuestList="hideGuestList"
    />
    <subscription-dialog
      v-model="dialogModel"
      :event="selectedEvent"
    />
  </q-page>
</template>

<script>
import PartyCard from 'src/components/PartyCard'
import SubscriptionDialog from 'src/components/SubscriptionDialog'
export default {
  name: 'PageIndex',
  components: {
    'party-card': PartyCard,
    'subscription-dialog': SubscriptionDialog
  },
  created () {
    this.getEventList()
  },
  data () {
    return {
      dialogModel: false,
      selectedEvent: {},
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
              name: 'Galego Borges',
              companions: ['Agnes', 'Maria']
            },
            {
              id: '2',
              name: 'Douglas Boy',
              companions: []
            },
            {
              id: '3',
              name: 'Peter Heineken',
              companions: []
            },
            {
              id: '4',
              name: 'Felipe Forgot',
              companions: []
            },
            {
              id: '5',
              name: 'Lucas Farofa',
              companions: []
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
      this.$emit('showGuestList', guestList, eventId)
    },
    showSubscriptionDialog (event) {
      this.dialogModel = true
      this.selectedEvent = event
    },
    hideGuestList () {
      this.$emit('hideGuestList')
    },
    getEventList () {

    }
  }
}
</script>
