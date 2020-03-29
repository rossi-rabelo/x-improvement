<template>
  <q-layout view="hhh LpR fFf">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn v-if="authenticated" dense flat round icon="fas fa-sign-out-alt" @click="left = !left" />
        <q-btn v-else dense flat round icon="fas fa-sign-in-alt" @click="left = !left" />

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
          <welcome-screen
            v-if="authenticated"
            @logout="logout"
          />
          <form-login
            v-else
            :loginInformations="formLogin"
            @authenticated="setAuthenticated"
          />
        </div>
      </div>
    </q-drawer>

    <q-drawer v-model="right" side="right" bordered>
      <guest-list
        :employees="employees"
        :eventId="selectedEventId"
        :authenticated="authenticated"
      />
    </q-drawer>

    <q-page-container>
      <router-view  @showGuestList="showGuestList" @hideGuestList="hideGuestList"/>
    </q-page-container>

  </q-layout>
</template>

<script>
import GuestList from '../components/GuestList.vue'
import FormLogin from '../components/FormLogin.vue'
import WelcomeScreen from '../components/WelcomeScreen.vue'
export default {
  components: {
    'guest-list': GuestList,
    'form-login': FormLogin,
    'welcome-screen': WelcomeScreen
  },
  created () {
    if (this.$q.localStorage.has('authtoken')) {
      this.authenticated = true
    } else {
      this.authenticated = false
    }
  },
  data () {
    return {
      left: false,
      right: false,
      employees: [],
      selectedEventId: '',
      authenticated: false,
      // Form Login Variables
      formLogin: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    showGuestList (employees, eventId) {
      this.selectedEventId = eventId
      this.employees = employees
      this.right = !this.right
    },
    setAuthenticated () {
      this.authenticated = true
    },
    logout () {
      this.authenticated = false
    },
    hideGuestList () {
      this.right = false
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
