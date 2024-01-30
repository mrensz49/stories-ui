<template>
    <div>
      <v-row>
        <v-col cols="12" lg="12" xl="12">
          <div>
            <div>
              <div>
                <h2 class="text-h4 font-weight-bold">Verifying Your Email</h2>

                <h4 class="text-h6">&nbsp</h4>
              </div>

              <v-divider class="my-4"></v-divider>
              <div style="min-height: 62vh">
                    <v-card
                        flat
                        elevation="20"
                      >
                        <v-card-text>
                          <div class="text-h5 font-weight-bold primary--text" v-if="authStore.loading">
                            <v-progress-circular
                                :size="20"
                                color="amber"
                                indeterminate
                            ></v-progress-circular> 
                            <span class="ml-3 text-h6 font-weight-bold primary--text">Please wait while verifying your email.</span>
                          </div>
                            <v-alert v-if="authStore.verified"
                                dense
                                text
                                type="success"
                            >
                                Successfully verified! Redirecting to dashboard.
                            </v-alert>


                            <v-alert v-if="authStore.errors_verify"
                                dense
                                text
                                type="warning"
                            >
                                {{ authStore.errors_verify }}
                            </v-alert>
                        </v-card-text>   
                      </v-card>
                      
                  </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </template>

  <script>

  import { useAuthStore } from '@/stores/auth'

  export default {
    name: "Category",

    mounted() {

        const hash = this.$route.params.hash
        const id = this.$route.params.id
        this.authStore.handleVerifyEmail({id:id, hash:hash})
    },

    data() {
        return {
            authStore: useAuthStore()
        }
    },
  };
  </script>
