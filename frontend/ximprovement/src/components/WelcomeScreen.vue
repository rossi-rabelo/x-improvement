<template>
  <div>
    <div class="row full-width justify-center text-white text-h5 layoutTitle">
      Olá Equipe Gente
    </div>
    <div class="row full-width justify-center q-mt-md">
      <q-btn rounded color="negative" label="Sair" icon="fas fa-sign-out-alt" @click="logout" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomeScreen',
  data () {
    return {}
  },
  methods: {
    logout () {
      if (this.$q.localStorage.has('authtoken')) {
        this.$q.localStorage.remove('authtoken')
      }
      this.$emit('logout')
    }
  }
}
</script>
