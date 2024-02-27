import axios from "axios";
import toast from "@/services/toast.js";

const API_TIMEOUT = 10000; // Define timeout as a constant
let lastError = null; // Track the last displayed error and its timestamp
let errorSet = new Set(); // Set to store unique error messages

// Configuration for environment-specific base URLs
const baseURLs = {
  development: import.meta.env.VITE_APP_URL,
  production: import.meta.env.VITE_APP_URL_PROD,
};

const apiClient = axios.create({
  baseURL: baseURLs[import.meta.env.VITE_NODE_ENV],
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: API_TIMEOUT,
});

// Authentication interceptor
apiClient.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("storiesforyou_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
      // Handle timeout error
      await handleTimeoutError(error);
    } else {
      // Handle other errors
      await handleOtherError(error);
    }
    return Promise.reject(error);
  },
);

async function handleTimeoutError(error) {
  const errorText = "The request took too long to complete.";
  displayUniqueError(errorText);
}

async function handleOtherError(error) {
  const errorText = determineErrorMessage(error);

  // Exclude 401 status code
  if (error.response && error.response.status === 401) {
    return; // Skip handling the error
  }

  if (error.response && error.response.status === 500) {
    // await retryRequest(error);
    return;
  }

  // For other errors, display the error message
  displayUniqueError(errorText);
}

async function retryRequest(error) {
  try {
    // Attempt to retry the request
    await apiClient.request(error.config);
  } catch (retryError) {
    // Retry failed, display the error message
    const errorText = determineErrorMessage(retryError);
    displayUniqueError(errorText);
  }
}

function determineErrorMessage(error) {
  if (!error.response) {
    // No response received
    return navigator.onLine
      ? "The server might be experiencing issues."
      : "You seem to be offline. Please check your internet connection.";
  } else {
    // Server responded with an error
    if (error.response.status === 500) {
      return "The server might be experiencing issues.";
    } else if (error.response.status === 408) {
      return "The request took too long to complete.";
    } else {
      return "Hmm, it seems something went wrong.";
    }
  }
}

function displayUniqueError(errorText) {
  if (!errorSet.has(errorText)) {
    displayAlert(errorText);
    errorSet.add(errorText);
  }
}

function displayAlert(message) {
  toast.error(message);
}

export default {
  fetchUserAccess() {
    return apiClient.get(`/user-access`);
  },

  isLoggedIn() {
    return apiClient.get(`/is-logged-in`);
  },

  getCSRFToken() {
    return apiClient.get(`/csrf-token`);
  },

  getRecommended() {
    return apiClient.get(`/recommended`);
  },

  getCategories() {
    return apiClient.get(`/categories`);
  },

  getCategory(name) {
    return apiClient.get(`/category/${name}`);
  },

  getNewPage(payloads) {
    return apiClient.get(`/category/${payloads.name}?page=${payloads.page}`);
  },

  getStory(payloads) {
    return apiClient.get(`/story/${payloads.name}/${payloads.title}`);
  },

  getLatest5() {
    return apiClient.get(`/latest5`);
  },

  moralLesson3() {
    return apiClient.get(`/moral_lesson3`);
  },

  getPopular5() {
    return apiClient.get(`/popular5`);
  },

  getMoralLesson(page) {
    return apiClient.get(`/moral_lessons?page=${page}`);
  },

  getCountReadStories() {
    return apiClient.get(`/count-read-stories`);
  },

  getReadStories(page) {
    return apiClient.get(`/read-stories?page=${page}`);
  },

  getUnReadStories(page) {
    return apiClient.get(`/unread-stories?page=${page}`);
  },

  getCountUnReadStories() {
    return apiClient.get(`/count-unread-stories`);
  },

  getCountLatestStories() {
    return apiClient.get(`/count-latest-stories`);
  },

  getCountUpcomingStories() {
    return apiClient.get(`/count-upcoming-stories`);
  },

  getLatestStories(page) {
    return apiClient.get(`/latest-stories?page=${page}`);
  },

  getUpcomingStories(page) {
    return apiClient.get(`/upcoming-stories?page=${page}`);
  },

  getCredits(page) {
    return apiClient.get(`/credits/images?page=${page}`);
  },

  postReaction(payloads) {
    return apiClient.post(`/reaction`, payloads);
  },

  getReactionSummary(id) {
    return apiClient.get(`/reaction-summary/${id}`);
  },

  getUsersReaction(id) {
    return apiClient.get(`/users-reaction/${id}`);
  },

  register(payloads) {
    return apiClient.post(`/auth/register`, payloads);
  },

  verifyEmail(payloads) {
    return apiClient.post(`/auth/verify-email`, payloads);
  },

  resendVerification(payloads) {
    return apiClient.post(`/auth/resend-verification`, payloads);
  },

  login(payloads) {
    return apiClient.post(`/auth/login`, payloads);
  },

  logout() {
    return apiClient.post(`/auth/logout`);
  },

  forgotPassword(payloads) {
    return apiClient.post(`/auth/forgot-password`, payloads);
  },

  resetPassword(payloads) {
    return apiClient.post(`/auth/reset-password`, payloads);
  },
};
