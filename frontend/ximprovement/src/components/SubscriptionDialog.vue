<template>
  <q-dialog v-model="model" @hide="hideDialog" persistent>
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
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
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
        email: ''
      }
    }
  },
  methods: {
    hideDialog () {
      this.$emit('input', false)
    }
  }
}
</script>
<style lang="stylus">
  .cardDialog
    width: 100%
    max-width 50%
</style>
