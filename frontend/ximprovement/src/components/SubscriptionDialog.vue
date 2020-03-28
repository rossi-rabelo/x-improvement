<template>
  <q-dialog v-model="model" @hide="hideDialog" @show="verifyCompanionsNumber" persistent>
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
              v-if="event.companionsNumber > 1"
              :disable="formSubscription.companionsList.length >= event.companionsNumber"
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
                <q-btn round flat color="negative" icon="fas fa-minus" size="xs" @click="removeCompanion(index)"/>
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
    verifyCompanionsNumber () {
      if (this.event.companionsNumber > 0 && this.formSubscription.companionsList.length === 0) {
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
      this.$emit('input', false)
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
