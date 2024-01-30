<template>
    
    <v-col cols="12" lg="12" md="12" v-if="authStore.is_logged_in && !authStore.user.email_verified_at">
    <v-alert
      border="bottom"
      colored-border
      type="warning"
      elevation="20"
      class="mb-10"
    >
        <span class="text-h5">Thanks for signing up!</span> <br />
        <p class="text-justify">
            Before getting started, could you verify your email address by clicking on the link we just emailed to you? <br />
        </p>
        If you didn't receive the email: <br />
        <span>&#8226;</span> Check your email <span class="font-italic font-weight-bold text-decoration-underline">{{ authStore.user.email }}</span> for typos. <br />
        <span>&#8226;</span> Check the SPAM folder of your mailbox. <br />
        <span>&#8226;</span> Or we will gladly send you another. 

        <v-btn class="btn-sm ml-3" v-if="authStore.verification_loading">
            <v-progress-circular :size="20" color="amber" indeterminate class="mr-2"></v-progress-circular> 
            Resending verification link...
        </v-btn>
        <v-btn v-if="!authStore.verification_loading && !authStore.verified" color="warning" class="btn-sm ml-4 mb-3" :disabled="authStore.verification_loading"  @click="authStore.handleResendVerification()">
            Resend verification
        </v-btn>
        <span v-if="authStore.verified">
            <v-btn color="success" fab class="ml-4 mb-3 mr-2" small>
                <v-icon>mdi-check</v-icon>
            </v-btn>
            <small>check you email.</small>
        </span>
        <p style="color:#B71C1C" v-if="authStore.errors_verification.length">{{ authStore.errors_verification }}</p>
    </v-alert>

    <p style="color:#B71C1C">Note: Dashboard is accessable only if email is verified.</p>
    </v-col>
    
    
</template>


<script>

    import { useAuthStore } from '@/stores/auth'

    export default {

        name: "VerifiyEmail",

        data() {
            return {
            authStore: useAuthStore()
            }
        },        

    }
</script>