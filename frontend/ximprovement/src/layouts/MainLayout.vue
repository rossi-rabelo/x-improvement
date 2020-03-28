<template>
  <q-layout view="hhh LpR fFf">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="fas fa-sign-in-alt" @click="left = !left" />

        <q-toolbar-title>
          <div class="row text-h5 layoutTitle full-width justify-center">
            Landix 21 Anos
          </div>
        </q-toolbar-title>

        <!-- <q-btn dense flat round icon="menu" @click="right = !right" /> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" bordered>
      <div class="fit background">
        <div class="fit q-pt-md" style="background-color: rgb(0,0,0,.5)">
          <form-login
            :loginInformations="formLogin"
          />
        </div>
      </div>
    </q-drawer>

    <q-drawer v-model="right" side="right" bordered>
      <guest-list
        :guestList="guestList"
      />
    </q-drawer>

    <q-page-container>
      <router-view  @showGuestList="showGuestList"/>
    </q-page-container>

  </q-layout>
</template>

<script>
import GuestList from '../components/GuestList.vue'
import FormLogin from '../components/FormLogin.vue'
export default {
  components: {
    'guest-list': GuestList,
    'form-login': FormLogin
  },
  data () {
    return {
      left: false,
      right: false,
      guestList: [],
      // Form Login Variables
      formLogin: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    showGuestList (guestList) {
      this.guestList = guestList
      this.right = !this.right
    }
  }
}
</script>

<style lang="stylus">
  .layoutTitle
    font-family 'mainFont'
  .background
    background-image url('../statics/images/background.jpg')
</style>
