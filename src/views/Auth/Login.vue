<template>
  <v-row class="d-flex justify-center align-center fill-height" style="min-height: 100vh">
          <v-col cols="12" sm="12">
            <v-card class="elevation-6 mt-10"  >
             <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-card-text class="mt-12">
                        <h3 class="text-center">Login Your Account</h3>
                        <v-row align="center" justify="center">
                          <v-col cols="12" sm="8">

                            <form @submit.prevent="handleLogin">

                              <v-text-field v-model="email" type="email" label="Email" outlined dense color="blue" autocomplete="false" class="mt-16" required/>
                              <v-text-field v-model="password" label="Password" outlined dense color="blue" autocomplete="false" type="password" required/>

                              <v-row>
                                <v-col cols="12" sm="7">
                                  <v-checkbox label="Remember Me" class="mt-n1" color="blue" > </v-checkbox>
                                </v-col>
                                <v-col cols="12" sm="5">
                                  <a href="#" class="text-decoration-none" @click="step+=2" >
                                    <span class="caption blue--text">Forgot password</span>
                                  </a>
                                </v-col>
                              </v-row>
                              <v-btn color="blue" type="submit" dark block tile :loading="authStore.loading">Log in</v-btn>
                            </form>

                            <v-alert class="mt-8" color="warning" icon="$error" text="" v-if="Object.keys(authStore.errors_login).length">
                              <span v-for="(error, index) in authStore.errors_login" :key="index"> {{ error[0] }}<br/></span>
                            </v-alert>

                            <h5 class="text-center  grey--text mt-4 mb-3">Or</h5>

                            <div class="d-flex  justify-space-between align-center mx-10 mb-16">
                                <v-btn depressed outlined color="grey" @click="AuthProvider('google')">
                                  <v-icon color="red">mdi-google</v-icon>
                                </v-btn>
                                <v-btn depressed outlined color="grey">
                                  <v-icon color="blue">mdi-facebook</v-icon>
                                </v-btn>
                                <v-btn depressed outlined color="grey">
                                  <v-icon color="light-blue lighten-3">mdi-twitter</v-icon>
                                </v-btn>
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-col>

                    <v-col cols="12" md="6" class="blue rounded-bl-xl" >
                    <div style="  text-align: center; padding: 180px 0;">
                      <v-card-text class="white--text" >
                        <h3 class="text-center ">Don't Have an Account Yet?</h3>
                        <h6
                          class="text-center"
                        >Let's get you all set up so you can start creating your your first<br>  onboarding experience</h6>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn tile outlined dark @click="step++">SIGN UP</v-btn>
                      </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row >
                    <v-col cols="12" md="6" class="blue rounded-br-xl">
                     <div style="  text-align: center; padding: 180px 0;">
                      <v-card-text class="white--text" >
                        <h3 class="text-center ">Already Signed up?</h3>
                        <h6
                          class="text-center"
                        >Log in to your account so you can continue building and<br>  editing your onboarding flows</h6>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn tile outlined dark @click="step--">Log in</v-btn>
                      </div>
                      </div>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-card-text class="mt-12">
                        <h4
                          class="text-center"
                        >Sign Up for an Account</h4>
                        <h6
                          class="text-center  grey--text "
                        >Let's get you all set up so you can start creatin your <br>
                        first onboarding experiance</h6>

                        <form @submit.prevent="handleRegister">
                          <v-row align="center" justify="center">
                            <v-col cols="12" sm="8" class="mt-4" >
                            <v-row>
                              <v-col cols="12" sm="6">
                                <v-text-field v-model="formData.first_name" label="First Name" outlined dense color="blue" autocomplete="false" required />
                              </v-col>
                            <v-col cols="12" sm="6">
                              <v-text-field v-model="formData.last_name" label="Last Name" outlined dense color="blue" autocomplete="false" required />
                            </v-col>
                            </v-row>

                            <v-text-field v-model="formData.email" label="Email" outlined dense color="blue" autocomplete="false" type="email" required/>
                            <v-text-field v-model="formData.password" label="Password" outlined dense color="blue" autocomplete="false" type="password" required/>
                            <v-text-field v-model="formData.password_confirmation" label="Confirm" outlined dense color="blue" autocomplete="false" type="password" required/>
                              <!-- <v-row>
                                <v-col cols="12" sm="7">
                                  <v-checkbox
                                    label="I Accept AAE"
                                    class="mt-n1"
                                    color="blue"
                                  > </v-checkbox>
                                </v-col>
                                <v-col cols="12" sm="5">
                                  <span class="caption blue--text ml-n4">Terms &Conditions</span>
                                </v-col>
                              </v-row> -->
                              <v-btn color="blue" type="submit" dark block tile :loading="authStore.loading">Sign up</v-btn>
                              <v-alert class="mt-8" color="warning" icon="$error" text="" v-if="Object.keys(authStore.errors_reg).length">
                                  <span v-for="(error, index) in authStore.errors_reg" :key="index"> {{ error[0] }}<br/></span>
                                </v-alert>
                            </v-col>
                          </v-row>
                      </form>

                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>

                <v-window-item :value="3">
                  <v-row >
                    <v-col cols="12" md="6" class="blue rounded-br-xl">
                     <div style="  text-align: center; padding: 180px 0;">
                      <v-card-text class="white--text" >
                        <h3 class="text-center ">Already Signed up?</h3>
                        <h6
                          class="text-center"
                        >Log in to your account so you can continue building and<br>  editing your onboarding flows</h6>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn tile outlined dark @click="step-=2">Log in</v-btn>
                      </div>
                      </div>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-card-text class="mt-12">
                        <h1 class="text-center" >Forgot Password</h1>
                        <p class="text-center  grey--text mt-3">
                          No problem. Just let us know your email address and we will email <br>you a password reset linkthat will allow you to choose a new one.
                        </p>

                        <form @submit.prevent="handleForgotPassword">
                          <v-row align="center" justify="center">
                            <v-col cols="12" sm="8" class="mt-4" >

                            <v-text-field v-model="email" label="Email" outlined dense color="blue" autocomplete="false" type="email" required/>

                              <v-btn color="warning" type="submit" dark block tile :loading="authStore.loading">Reset</v-btn>

                              <v-alert class="mt-8" color="warning" icon="$error" text="" v-if="Object.keys(authStore.errors_reset).length">
                                <span v-for="(error, index) in authStore.errors_reset" :key="index"> {{ error[0] }}<br/></span>
                              </v-alert>
                              <v-alert class="mt-8" color="success" icon="$success" text="" v-if="authStore.reset_password_details">
                                <span>{{ authStore.reset_password_details }}</span>
                              </v-alert>

                            </v-col>
                          </v-row>
                      </form>

                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>


              </v-window>
            </v-card>
          </v-col>

  </v-row>
</template>

<script>

  import EventService from "@/services/EventService.js"
  import { useAuthStore } from '@/stores/auth'

  const authStore = useAuthStore()

  export default {

    name: 'LoginForm',

    data: () => ({
      authStore: authStore,

      step: 1,
      email: '',
      password: '',
      formData: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
    }),

    props: {
      source: String
    },

    methods: {

      AuthProvider(provider) {

        var self = this
        this.$auth.authenticate(provider).then(response =>{

          self.SocialLogin(provider,response)

        }).catch(err => {
          console.log({err1:err})

          EventService.isLoggedIn()
            .then(response => {
              console.log('res - ', response.data)
              if (response.data == 1) {
                this.$router.push(`/dashboard`).catch(err => {});
              }
          })
        })
      },



      handleRegister() {
        authStore.handleRegister(this.formData)
      },

      handleLogin() {
        authStore.handleLogin({ email: this.email, password: this.password})
      },

      handleForgotPassword() {
        authStore.handleForgotPassword({ email: this.email })
      }

    }

  }
</script>
<style scoped>
.v-application .rounded-bl-xl {
    border-bottom-left-radius: 300px !important;
}
.v-application .rounded-br-xl {
    border-bottom-right-radius: 300px !important;
}
</style>