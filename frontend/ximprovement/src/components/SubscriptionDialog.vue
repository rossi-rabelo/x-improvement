<template>
  <q-dialog v-model="model" @hide="hideDialog" @show="verifymaxCompanion" persistent>
    <q-card class="cardDialog">
      <q-card-section>
        <div class="text-h6">{{ event.name }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input outlined v-model="formSubscription.name" label="Nome"/>
          </div>
          <div class="col">
            <q-input outlined v-model="formSubscription.email" label="E-mail"/>
          </div>
        </div>
        <div class="row q-mt-sm full-width justify-center">
          <div class="row q-mt-sm full-width justify-start">
            <q-btn round color="secondary"
              v-if="event.maxCompanion > 1"
              :disable="formSubscription.companionsList.length >= event.maxCompanion"
              icon="fas fa-plus"
              @click="pushNewCompanion"
            />
          </div>
          <div class="row full-width justify-center q-mt-xs"
            v-for="(companion, index) in formSubscription.companionsList"
            :key="index"
          >
            <div class="row">
              <div class="col-10">
                <q-input
                  outlined
                  v-model="formSubscription.companionsList[index]"
                  :dense="true"
                  label="Acompanhante"
                />
              </div>
              <div class="col-2">
                <q-btn v-if="event.maxCompanion > 1" round flat color="negative" icon="fas fa-minus" size="xs" @click="removeCompanion(index)"/>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="negative" @click="resetInformations" v-close-popup />
        <q-btn flat label="Enviar" color="positive" @click="sendInformations"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'SubscriptionDialog',
  created () {
    this.model = this.value
  },
  watch: {
    value: function () {
      this.model = this.value
    }
  },
  computed: {
    exitInformations: function () {
      return {
        Employee: {
          name: this.formSubscription.name,
          email: this.formSubscription.email,
          maxCompanion: 2
        },
        Companions: this.formSubscription.companionsList.filter((element) => {
          return element !== ''
        }).map((element) => {
          return { name: element }
        }),
        Event: {
          id: this.event.id
        }
      }
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    event: {
      type: Object
    }
  },
  data () {
    return {
      model: false,
      formSubscription: {
        name: '',
        email: '',
        companionsList: []
      }
    }
  },
  methods: {
    hideDialog () {
      this.$emit('input', false)
    },
    verifymaxCompanion () {
      if (this.event.maxCompanion > 0 && this.formSubscription.companionsList.length === 0) {
        this.formSubscription.companionsList.push('')
      }
    },
    pushNewCompanion () {
      this.formSubscription.companionsList.push('')
    },
    removeCompanion (index) {
      this.formSubscription.companionsList.splice(index, 1)
    },
    sendInformations () {
      this.$q.loading.show({
        delay: 400 // ms
      })
      this.$axios.post('http://localhost:3333/employees', this.exitInformations).then((response) => {
        this.$q.loading.hide()
        console.log(response)
        // this.$emit('input', false)
      }).catch(() => {
        this.$q.loading.hide()
        this.loginFailed('Não foi possível se inscrever no evento!')
      })
    },
    resetInformations () {
      this.formSubscription = {
        name: '',
        email: '',
        companionsList: []
      }
    }
  }
}
</script>
<style lang="stylus">
  .cardDialog
    width: 100%
    max-width 50%
</style>
