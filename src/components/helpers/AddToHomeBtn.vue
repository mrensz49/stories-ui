<template>
  <div>
    <div v-if="shown">
        <v-alert
          shaped
          :type=type
          prominent
          class="pl-7"
        >
            {{ message }}
          <v-btn
            color="orange"
            ref="addBtn"
            @click="installPWA"
          >
            Install
          </v-btn>
      </v-alert>
    </div>
    <div>
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        color="deep-purple-accent-4"
      >
        {{ text }}

        <template v-slot:actions>
          <v-btn
            variant="text"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>    
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    shown: false,
    type: 'info',
    message: 'Add storiesforyou to home screen?',

    snackbar: false,
    text: 'Thanks! Kindly see your app in a moment',
    timeout: 3000,    
  }),

  computed: {
    isMobileOrTablet() {
      return window.innerWidth <= 768; // Adjust the breakpoint as needed
    }
  },

  beforeMount() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      this.installEvent = e
      this.shown = true
    })
  },

  methods: {
    dismissPrompt() {
      this.shown = false
    },

    installPWA() {
      this.installEvent.prompt()
      this.installEvent.userChoice.then((choice) => {
        this.dismissPrompt() // Hide the prompt once the user's clicked
        if (choice.outcome === 'accepted') {
          this.snackbar = true
        } else {
          // Do something additional if the user declined
        }
      })
    },
  }
}
</script>
