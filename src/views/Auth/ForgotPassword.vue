<template>
  <v-row
    class="d-flex justify-center align-center fill-height"
    style="min-height: 100vh"
  >
    <v-col cols="12" sm="12">
      <v-card class="elevation-6 mt-10">
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-row>
              <v-col cols="12" md="6" class="blue rounded-br-xl">
                <div style="text-align: center; padding: 180px 0">
                  <v-card-text class="white--text">
                    <h3 class="text-center">Already Signed up?</h3>
                    <h6 class="text-center">
                      Log in to your account so you can continue building and<br />
                      editing your onboarding flows
                    </h6>
                  </v-card-text>
                  <div class="text-center">
                    <router-link to="/login" class="text-decoration-none">
                      <v-btn tile outlined dark>Log in</v-btn>
                    </router-link>
                  </div>
                </div>
              </v-col>

              <v-col cols="12" md="6">
                <v-card-text class="mt-12">
                  <h1 class="text-center">Reset Password</h1>
                  <p class="text-center grey--text mt-3">
                    Reset your password.
                  </p>

                  <form @submit.prevent="handleResetPassword">
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="8" class="mt-4">
                        <v-text-field
                          v-model="formData.email"
                          label="Email"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          disabled
                          required
                        />
                        <v-text-field
                          type="password"
                          label="New Password"
                          v-model="formData.password"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          required
                        />
                        <v-text-field
                          type="password"
                          label="Repeat New Password"
                          v-model="formData.password_confirmation"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          required
                        />

                        <v-btn
                          color="warning"
                          type="submit"
                          dark
                          block
                          tile
                          :loading="authStore.loading"
                          >Submit</v-btn
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
import EventService from "@/services/EventService.js";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

export default {
  name: "ForgotPassword",

  mounted() {
    this.formData.email = this.$route.params.email;
    this.formData.token = this.$route.params.token;
  },

  data: () => ({
    authStore: authStore,

    step: 1,
    formData: {
      email: "",
      token: "",
      password: "",
      password_confirmation: "",
    },
  }),

  props: {
    source: String,
  },

  methods: {
    handleResetPassword() {
      authStore.handleResetPassword(this.formData);
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
