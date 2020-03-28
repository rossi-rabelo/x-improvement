<template>
  <q-card class="my-card">
    <q-img :src="eventInformation.image" style="cursor: pointer" @click="showBody">
      <div class="text-h5 absolute-bottom">
          <div class="row full-width text-left">
          {{ eventInformation.name }}
        </div>
      </div>
    </q-img>
    <q-slide-transition>
      <div v-show="visible" style="padding: 15px">
        <div class="full-width descriptionBody text-body1">
          {{ eventInformation.description }}
        </div>
        <q-separator class="q-my-xs" color="grey"/>
        <div class="row q-mt-md justify-between">
          <q-btn color="positive" icon-right="fas fa-glass-cheers" label="Tenho Interesse!" />
          <q-btn color="primary" icon-right="fas fa-clipboard-list" label="Confirmados" @click="showGuestList"/>
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
