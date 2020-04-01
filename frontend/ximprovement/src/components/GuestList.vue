<template>
  <div class="bg-primary full-height">
    <div class="row text-h6 q-pa-md text-center text-white guestListTitle">
      Lista de confirmados:
    </div>
    <div v-if="employees.length > 0" class="row">
      <q-expansion-item
        class="full-width"
        dense-toggle
        v-for="guest in employees"
        :key="guest.id"
        header-class="bg-primary text-white"
        expand-separator
        :expand-icon-class="getExpandIconClass(guest.companions.length)"
      >
        <template v-slot:header>
          <q-item-section v-if="authenticated" avatar>
            <q-btn round flat color="negative" icon="fas fa-minus" @click.stop="removeGuest(guest)" />
          </q-item-section>
          <q-item-section>
            {{ guest.name }}
          </q-item-section>
        </template>
        <q-card v-if="guest.companions.length > 0">
          <q-card-section>
            <q-list class="full-width">
              <q-item v-for="companion in guest.companions" :key="companion.id">
                <q-item-section>{{ companion.name }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
    <div v-else class="text-white q-pa-md">
      Ainda não há pessoas confirmadas para esse evento.
    </div>
    <dialog-remove
      v-model="dialogModel"
      :guest="selectedGuest"
      :eventId="eventId"
      @removeGuest="removeGuestFromList"
    />
  </div>
</template>

<script>
import DialogRemoveGuest from 'src/components/DialogRemoveGuest'
export default {
  name: 'GuestList',
  components: {
    'dialog-remove': DialogRemoveGuest
  },
  props: {
    employees: {
      type: Array,
      default: () => {
        return []
      }
    },
    eventId: {
      type: String,
      default: ''
    },
    authenticated: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialogModel: false,
      selectedGuest: {}
    }
  },
  methods: {
    removeGuest (guest) {
      this.selectedGuest = guest
      this.dialogModel = true
    },
    getExpandIconClass (companions) {
      if (companions > 0) {
        return 'text-white'
      } else {
        return 'hidden'
      }
    },
    removeGuestFromList (guestId) {
      const guestIndex = this.employees.findIndex((element) => {
        return element.id === guestId
      })
      this.employees.splice(guestIndex, 1)
    }
  }
}
</script>
<style lang="stylus">
.guestListTitle
    font-family 'mainFont'
    text-align 'center'
</style>
