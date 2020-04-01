<template>
  <q-card class="my-card">
    <q-img :src="eventInformation.image" style="cursor: pointer" @click="showBody">
      <div class="text-h5 absolute-bottom">
          <div class="row full-width text-left">
          {{ eventInformation.name }}
        </div>
      </div>
    </q-img>
    <q-slide-transition @hide="hideGuestList">
      <div v-show="visible" style="padding: 15px">
        <div class="full-width descriptionBody text-body1">
          {{ eventInformation.description }}
        </div>
        <ul>
          <li class="text-bold">Endereço: {{ eventInformation.place }}</li>
        </ul>
        <q-separator class="q-my-xs" color="grey"/>
        <div class="row q-mt-md justify-between">
          <div class="col-xs-12 col-md-6 text-left q-pr-sm">
            <q-btn color="positive" class="fit dense" icon-right="fas fa-glass-cheers" label="Tenho Interesse!" @click="showSubscriptionDialog"/>
          </div>
          <div class="col-xs-12 col-md-6 text-right q-pl-sm">
            <q-btn color="primary" class="fit dense" icon-right="fas fa-clipboard-list" label="Confirmados" @click="showGuestList"/>
          </div>
        </div>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script>
export default {
  name: 'PartyCard',
  props: {
    eventInformation: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  created () {
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    showBody () {
      this.visible = !this.visible
    },
    showGuestList () {
      this.$emit('showGuestList', this.eventInformation.id)
    },
    showSubscriptionDialog () {
      this.$emit('showSubscriptionDialog', this.eventInformation)
    },
    hideGuestList () {
      this.$emit('hideGuestList')
    }
  }
}
</script>
<style lang="stylus">
  .my-card
    width: 100%
    max-width: 35%
  .cardTitle
    font-family 'eventName'
</style>
