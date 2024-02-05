import axios from 'axios'

import { createToastInterface } from "vue-toastification";
const pluginOptions = {
  timeout: 4000
};
const toast = createToastInterface();

const API_TIMEOUT = 10000; // Define timeout as a constant
let lastError = null; // Track the last displayed error and its timestamp

// Configuration for environment-specific base URLs
const baseURLs = {
  development: import.meta.env.VITE_APP_URL,
  production: import.meta.env.VITE_APP_URL_PROD,
};

const apiClient = axios.create({
  baseURL: baseURLs[import.meta.env.VITE_NODE_ENV],
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: API_TIMEOUT,
  // signal: new AbortController().signal, // Uncomment if using AbortController
});

// Authentication interceptor (refactored)
apiClient.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem('storiesforyou_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (refactored)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
      // Handle timeout error
      await handleTimeoutError(error);
    }
    return Promise.reject(error);
  }
);

async function handleTimeoutError(error) {
  // Determine best error message based on network information
  const errorText = determineErrorMessage(error);

  // Display the alert in a user-friendly manner
  if (!lastError || (Date.now() - lastError.timestamp) > API_TIMEOUT || lastError.message !== errorText) {
    displayAlert(errorText);
    lastError = {
      message: errorText,
      timestamp: Date.now()
    };
  }
}

function determineErrorMessage(error) {
  // Analyze network information available in `error.response`
  // (if network response is available) to provide more specific info
  // If unavailable, default to a general message:
  if (!error.response) {
    return 'Hmm, it seems something went wrong.';
  }

  // Example logic for determining more specific messages:
  if (error.response.status === 500) {
    return 'The server might be experiencing issues.';
  } else if (error.response.status === 408) {
    return 'The request took too long to complete.';
  } else if (error.request) {
    // Check network state or connection quality and tailor message accordingly
    if (navigator.onLine) {
      return 'It looks like your internet connection might be slow.';
    } else {
      return 'You seem to be offline. Please check your internet connection.';
    }
  } else {
    // Fallback message
    return 'Hmm, it seems something went wrong.';
  }
}

function displayAlert(message) {
  // Use a framework-specific or generic alert mechanism
  // Replace this with your preferred alert implementation
  // (e.g., `alert`, `toastr`, custom components)
  // alert(message);
  toast.error(message);
}

export default {

    fetchUserAccess() {
        return apiClient.get(`/user-access`)
    },

    isLoggedIn() {
        return apiClient.get(`/is-logged-in`)
    },

    getCSRFToken() {
        return apiClient.get(`/csrf-token`)
    },

    getRecommended() {
        return apiClient.get(`/recommended`)
    },

    getCategories() {
        return apiClient.get(`/categories`)
    },

    getCategory(name) {
        return apiClient.get(`/category/${name}`)
    },

    getNewPage(payloads) {
        return apiClient.get(`/category/${payloads.name}?page=${payloads.page}`)
    },

    getStory(payloads) {
        return apiClient.get(`/story/${payloads.name}/${payloads.title}`)
    },

    getLatest5() {
        return apiClient.get(`/latest5`)
    },

    moralLesson3() {
        return apiClient.get(`/moral_lesson3`)
    },

    getPopular5() {
        return apiClient.get(`/popular5`)
    },

    getMoralLesson(page) {
        return apiClient.get(`/moral_lessons?page=${page}`)
    },

    getCountReadStories() {
        return apiClient.get(`/count-read-stories`)
    },    

    getReadStories(page) {
        return apiClient.get(`/read-stories?page=${page}`)
    }, 

    getUnReadStories(page) {
        return apiClient.get(`/unread-stories?page=${page}`)
    }, 

    getCountUnReadStories() {
        return apiClient.get(`/count-unread-stories`)
    },

    getCountLatestStories() {
        return apiClient.get(`/count-latest-stories`)
    },    

    getLatestStories(page) {
        return apiClient.get(`/latest-stories?page=${page}`)
    }, 

    getCredits(page) {
      return apiClient.get(`/credits/images?page=${page}`)
    },

    register(payloads) {
        return apiClient.post(`/auth/register`, payloads)
    },

    verifyEmail(payloads) {
        return apiClient.post(`/auth/verify-email`, payloads)
    },

    resendVerification(payloads) {
        return apiClient.post(`/auth/resend-verification`, payloads)
    },

    login(payloads) {
        return apiClient.post(`/auth/login`, payloads)
    },

    logout() {
        return apiClient.post(`/auth/logout`)
    },

    forgotPassword(payloads) {
        return apiClient.post(`/auth/forgot-password`, payloads)
    },

    resetPassword(payloads) {
        return apiClient.post(`/auth/reset-password`, payloads)
    },
}