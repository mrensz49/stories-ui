<template>
  <v-row
    class="d-flex justify-center align-center fill-height"
    style="min-height: 100vh"
  >
    <v-col cols="10" lg="8" md="10" sm="12">
      <v-card class="elevation-6 mt-10">
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-row>
              <v-col cols="12" md="6">
                <v-card-text class="mt-12">
                  <h3 class="text-center">Sign in</h3>
                  <v-row align="center" justify="center">
                    <v-col cols="12" md="10" sm="8">
                      <form @submit.prevent="handleLogin">
                        <v-text-field
                          v-model="email"
                          type="email"
                          label="Email"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          class="mt-16"
                          required
                        />
                        <v-text-field
                          v-model="password"
                          label="Password"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          type="password"
                          required
                        />

                        <v-row>
                          <v-col
                            cols="12"
                            lg="12"
                            md="12"
                            sm="12"
                            class="text-body-2 mt-n9"
                          >
                            <table width="100%">
                              <tr>
                                <td>
                                  <v-checkbox color="blue">
                                    <template v-slot:label>
                                      <small style="font-size: 10.2px"
                                        ><b>Remember Me</b></small
                                      >
                                    </template>
                                  </v-checkbox>
                                </td>
                                <td>
                                  <a
                                    href="#"
                                    class="text-decoration-none text-right"
                                    @click="step += 2"
                                  >
                                    <span class="caption blue--text"
                                      ><small>Forgot password</small></span
                                    >
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </v-col>
                        </v-row>

                        <v-btn
                          color="blue"
                          type="submit"
                          dark
                          block
                          tile
                          :loading="authStore.loading"
                          >Log in</v-btn
                        >
                      </form>

                      <v-alert
                        class="mt-8"
                        color="warning"
                        icon="$error"
                        text=""
                        v-if="Object.keys(authStore.errors_login).length"
                      >
                        <span
                          v-for="(error, index) in authStore.errors_login"
                          :key="index"
                        >
                          {{ error[0] }}<br
                        /></span>
                      </v-alert>

                      <!-- <v-row align="center" class="grey--text mt-4 mb-3">
                              <v-divider></v-divider> or login as <v-divider></v-divider>
                            </v-row> -->
                      <!-- d-flex   -->
                      <div class="justify-space-between align-center mb-16">
                        <!-- <div class="mb-2">
                                <v-btn depressed block outlined color="grey" @click="AuthProvider('google')" class="mr-1">
                                  <v-icon color="red">mdi-google</v-icon>
                                </v-btn>
                              </div>
                              <div>
                                <v-btn depressed block outlined color="grey" @click="AuthProvider('facebook')" class="mr-1">
                                  <v-icon color="blue">mdi-facebook</v-icon>
                                </v-btn>
                              </div> -->
                        <!-- <v-btn depressed outlined color="grey">
                                  <v-icon color="light-blue lighten-3">mdi-twitter</v-icon>
                                </v-btn> -->
                        <div class="mt-5 text-justify">
                          <small>
                            By clicking Log In, you agree to our
                            <u class="pointer" @click="consent('terms')"
                              >Terms</u
                            >. Learn how we process your data in our
                            <u class="pointer" @click="consent('privacy')"
                              >Privacy Policy</u
                            >.
                          </small>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-col>

              <v-col cols="12" md="6" class="blue rounded-bl-xl">
                <div class="text-center" style="padding: 2%; margin-top: 10%">
                  <v-card-text class="white--text">
                    <v-simple-table dense elevation="5">
                      <template v-slot:default>
                        <thead style="background-color: #fcf8e1">
                          <tr>
                            <th class="text-center">Why Login?</th>
                            <th class="text-center">Coming soon</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Dashboard</td>
                            <td class="font-italic">Theme Color</td>
                          </tr>
                          <tr>
                            <td>Visited Stories</td>
                            <td class="font-italic">Lofi music</td>
                          </tr>
                          <tr>
                            <td>Unvisited Stories</td>
                            <td class="font-italic">Add comments</td>
                          </tr>
                          <tr>
                            <td>Latest Stories</td>
                            <td class="font-italic">Likes and etc.</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                </div>
                <div style="text-align: center" class="mb-7">
                  <v-card-text class="white--text">
                    <h3 class="text-center">Don't have an account?</h3>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn color="warning" @click="step++">SIGN UP</v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item :value="2">
            <v-row>
              <v-col cols="12" md="5" class="blue rounded-br-xl">
                <div style="text-align: center; padding: 180px 0">
                  <v-card-text class="white--text">
                    <h3 class="text-center">Have an account?</h3>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn color="warning" @click="step--">Log in</v-btn>
                  </div>
                </div>
              </v-col>

              <v-col cols="12" md="7">
                <v-card-text class="mt-12">
                  <h4 class="text-center">Sign up for an account</h4>
                  <form @submit.prevent="handleRegister">
                    <v-row align="center" justify="center">
                      <v-col cols="12" md="10" sm="8" class="mt-4 mb-5">
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="formData.first_name"
                              label="First Name"
                              outlined
                              dense
                              color="blue"
                              autocomplete="false"
                              required
                            />
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="formData.last_name"
                              label="Last Name"
                              outlined
                              dense
                              color="blue"
                              autocomplete="false"
                              required
                            />
                          </v-col>
                        </v-row>

                        <v-text-field
                          v-model="formData.email"
                          label="Email"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          type="email"
                          required
                        />
                        <v-text-field
                          v-model="formData.password"
                          label="Password"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          type="password"
                          required
                        />
                        <v-text-field
                          v-model="formData.password_confirmation"
                          label="Confirm"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          type="password"
                          required
                        />
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
                        <v-btn
                          color="blue"
                          type="submit"
                          dark
                          block
                          tile
                          :loading="authStore.loading"
                          >Sign up</v-btn
                        >
                        <v-alert
                          class="mt-8"
                          color="warning"
                          icon="$error"
                          text=""
                          v-if="Object.keys(authStore.errors_reg).length"
                        >
                          <span
                            v-for="(error, index) in authStore.errors_reg"
                            :key="index"
                          >
                            {{ error[0] }}<br
                          /></span>
                        </v-alert>

                        <div class="mt-5 text-justify">
                          <small>
                            By clicking Sign Up, you agree to our
                            <u class="pointer" @click="consent('terms')"
                              >Terms</u
                            >. Learn how we process your data in our
                            <u class="pointer" @click="consent('privacy')"
                              >Privacy Policy</u
                            >.
                          </small>
                        </div>
                      </v-col>
                    </v-row>
                  </form>
                </v-card-text>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item :value="3">
            <v-row>
              <v-col cols="12" md="6" class="blue rounded-br-xl">
                <div style="text-align: center; padding: 180px 0">
                  <v-card-text class="white--text">
                    <h3 class="text-center">Have an account?</h3>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn tile outlined dark @click="step -= 2">Log in</v-btn>
                  </div>
                </div>
              </v-col>

              <v-col cols="12" md="6">
                <v-card-text class="mt-12">
                  <h1 class="text-center">Forgot Password</h1>
                  <p class="text-center grey--text mt-3 text-justify">
                    No problem. Just let us know your email address and we will
                    email you a password reset linkthat will allow you to choose
                    a new one.
                  </p>

                  <form @submit.prevent="handleForgotPassword">
                    <v-row align="center" justify="center">
                      <v-col cols="12" md="10" sm="8" class="mt-4">
                        <v-text-field
                          v-model="email"
                          label="Email"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          type="email"
                          required
                        />

                        <v-btn
                          color="warning"
                          type="submit"
                          dark
                          block
                          tile
                          :loading="authStore.loading"
                          >Reset</v-btn
                        >

                        <v-alert
                          class="mt-8"
                          color="warning"
                          icon="$error"
                          text=""
                          v-if="Object.keys(authStore.errors_reset).length"
                        >
                          <span
                            v-for="(error, index) in authStore.errors_reset"
                            :key="index"
                          >
                            {{ error[0] }}<br
                          /></span>
                        </v-alert>
                        <v-alert
                          class="mt-8"
                          color="success"
                          icon="$success"
                          text=""
                          v-if="authStore.reset_password_details"
                        >
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
import { useAuthStore } from "@/stores/auth";
import router from "@/router";

const authStore = useAuthStore();

export default {
  name: "LoginForm",

  data: () => ({
    authStore: authStore,

    step: 1,
    email: "",
    password: "",
    formData: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  }),

  props: {
    source: String,
  },

  methods: {
    AuthProvider(provider) {
      var self = this;
      this.$auth
        .authenticate(provider)
        .then((response) => {
          this.socialLogin(provider, response);
        })
        .catch((err) => {
          console.log({ err: err });
        });
    },

    socialLogin(provider, response) {
      var baseURL =
        import.meta.env.VITE_NODE_ENV == "development"
          ? import.meta.env.VITE_APP_URL
          : import.meta.env.VITE_APP_URL_PROD;

      this.$http
        .post(baseURL + "sociallogin/" + provider, response)
        .then((response) => {
          router.push({ name: "Dashboard" });
        })
        .catch((err) => {
          console.log({ err: err });
        });
    },

    handleRegister() {
      authStore.handleRegister(this.formData);
    },

    handleLogin() {
      authStore.handleLogin({ email: this.email, password: this.password });
    },

    handleForgotPassword() {
      authStore.handleForgotPassword({ email: this.email });
    },

    consent(name) {
      if (name == "terms") {
        window.location.href = "https://www.storiesforyou.net/be/terms-service";
      } else {
        window.location.href =
          "https://www.storiesforyou.net/be/privacy-policy";
      }
    },
  },
};
</script>
<style scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}
.v-application .rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}
</style>
