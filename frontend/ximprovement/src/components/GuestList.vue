<template>
  <div>
    <div class="row text-h6 q-pa-md text-center">
      Lista de confirmados:
    </div>
    <div class="row">
      <q-list class="full-width">
        <q-item v-for="guest in guestList" :key="guest.id">
          <q-item-section avatar>
            <q-icon color="positive" name="fas fa-check" />
          </q-item-section>
          <q-item-section>{{ guest.name }}</q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuestList',
  props: {
    guestList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {}
  }
}
</script>
