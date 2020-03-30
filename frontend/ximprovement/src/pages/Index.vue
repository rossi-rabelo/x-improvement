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
      @reloadEvents="confirmSubscription"
    />
  </q-page>
</template>

<script>
import PartyCard from 'src/components/PartyCard'
import SubscriptionDialog from 'src/components/SubscriptionDialog'
import settings from 'src/statics/axiosSetting'
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
      events: []
    }
  },
  methods: {
    showGuestList (eventId) {
      const employees = this.events.find((element) => {
        return element.id === eventId
      }).employees
      this.$emit('showGuestList', employees, eventId)
    },
    showSubscriptionDialog (event) {
      this.dialogModel = true
      this.selectedEvent = event
    },
    hideGuestList () {
      this.$emit('hideGuestList')
    },
    getEventList () {
      this.$q.loading.show({
        delay: 400 // ms
      })
      this.$axios.get(`${settings.baseURL}/events`).then((response) => {
        this.events = response.data
        this.$q.loading.hide()
      }).catch(() => {
        this.errorMessage('Não foi possível obter a lista de eventos.')
      })
    },
    errorMessage (message) {
      this.$q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'fas fa-info',
        message: message,
        position: 'top',
        timeout: 300
      })
    },
    confirmSubscription () {
      this.$q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'fas fa-info',
        message: 'Sua Inscrição foi realizada com sucesso!',
        position: 'top',
        timeout: 300
      })
      window.location.reload()
    }
  }
}
</script>
