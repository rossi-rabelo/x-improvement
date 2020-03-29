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

    }
  }
}
</script>
