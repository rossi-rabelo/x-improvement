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
import settings from 'src/statics/axiosSetting'
export default {
  name: 'FormLogin',
  computed: {
    formLogin: function () {
      return {
        email: this.loginInformations.email,
        password: this.loginInformations.password
      }
    }
  },
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
        this.$q.loading.show({
          delay: 400 // ms
        })
        this.$axios.post(`${settings.baseURL}/sessions`, this.formLogin).then((response) => {
          this.$q.loading.hide()
          this.$q.localStorage.set('authtoken', response.data.token)
          this.$emit('authenticated')
        }).catch(() => {
          this.$q.loading.hide()
          this.loginFailed('Não foi possível logar com essas informações!')
        })
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
