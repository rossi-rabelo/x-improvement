<template>
  <div>
    <div class="row full-width justify-center text-white text-h5 layoutTitle">
      Login
    </div>
    <div class="row q-mt-xs justify-center full-width">
      <q-input bg-color="white" outlined v-model="loginInformations.email" label="E-mail"/>
    </div>
    <div class="row q-mt-md justify-center full-width">
      <q-input v-model="loginInformations.password" bg-color="white" outlined type="password" label="Password" />
    </div>
    <div class="row full-width justify-center q-mt-md">
      <q-btn rounded color="positive" label="Entrar" icon="directions" @click="login" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormLogin',
  props: {
    loginInformations: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      // Error messages
      incorrectFieldMessage: 'Preencha os dados corretamente!'
    }
  },
  methods: {
    login () {
      if (this.loginInformations.email === '' || this.loginInformations.password === '') {
        this.loginFailed(this.incorrectFieldMessage)
      } else {
        this.$emit('authenticated')
      }
    },
    loginFailed (message) {
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
