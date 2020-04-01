<template>
  <q-dialog v-model="model" @hide="closeDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ guest.name }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        Tem certeza que deseja remover {{ guest.name }} deste evento?
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Não" color="negative" v-close-popup />
        <q-btn flat label="Sim" color="positive" @click="removeGuest"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import settings from 'src/statics/axiosSetting'
export default {
  name: 'DialogRemoveGuest',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    guest: {
      type: Object,
      default: () => {
        return {}
      }
    },
    eventId: {
      type: String,
      default: ''
    }
  },
  created () {
    this.model = this.value
  },
  watch: {
    value: function () {
      this.model = this.value
    }
  },
  data () {
    return {
      model: false
    }
  },
  methods: {
    closeDialog () {
      this.$emit('input', false)
    },
    removeGuest () {
      this.$q.loading.show({
        delay: 400 // ms
      })
      const token = this.$q.localStorage.getItem('authtoken')
      if (!token) {
        this.errorMessage('Você não tem permissão para realizar essa ação!')
        this.$q.loading.hide()
      } else {
        this.$axios.delete(`${settings.baseURL}/employees/${this.guest.id}/${this.eventId}`, {
          headers: {
            Authorization: `bearer ${token}`
          }
        }).then((response) => {
          this.$emit('removeGuest', this.guest.id)
          this.$q.loading.hide()
          this.$emit('input', false)
        }).catch(() => {
          this.errorMessage(`Não foi possível excluir ${this.guest.name} deste evento!`)
          this.$q.loading.hide()
        })
      }
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
    }
  }
}
</script>
