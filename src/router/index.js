import { useAuthStore } from "@/stores/auth";
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/Dashboard.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/categories",
    name: "Categories",
    component: () => import("@/views/Categories.vue"),
  },
  {
    path: "/category/:name",
    name: "Category",
    component: () => import("@/views/Category.vue"),
  },
  {
    path: "/moral-lesson",
    name: "MoralLesson",
    component: () => import("@/views/MoralLesson.vue"),
  },
  {
    path: "/detail",
    name: "Detail",
    component: () => import("@/views/Detail.vue"),
  },
  {
    path: "/authors",
    name: "Authors",
    component: () => import("@/views/Authors.vue"),
  },
  {
    path: "/list/:type",
    name: "List",
    component: () => import("@/views/List.vue"),
  },
  {
    path: "/credits",
    name: "Credits",
    component: () => import("@/views/Credits.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Auth/Login.vue"),
  },
  {
    path: "/password-reset/:token/:email",
    name: "ForgotPassword",
    component: () => import("@/views/Auth/ForgotPassword"),
  },
  {
    path: "/verify-email/:id/:hash",
    name: "VerifyEmail",
    component: () => import("@/views/Auth/VerifyEmail"),
  },
  {
    path: "/auth/:provider/callback",
    component: {
      template: '<div class="auth-component"></div>',
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.isLoggedIn();
  if (to.name == "Dashboard" && localStorage.getItem("storiesforyou_token")) {
    next();
  }
  if (to.name != "Dashboard") {
    next();
  }
});

export default router;
