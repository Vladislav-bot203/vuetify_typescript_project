import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth/cordova";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
    meta: {
      layout: "Main",
      auth: true,
    },
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../views/AuthView.vue"),
    meta: {
      layout: "Auth",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const requireAuth = to.meta.auth;

    const user = await new Promise((resolve) => {
      onAuthStateChanged(getAuth(), (user) => resolve(user));
    });

    const isAuthenticated = !!user;

    if (requireAuth) {
      if (isAuthenticated) {
        next();
      } else {
        next({
          path: "/auth",
          query: { message: "auth", redirect: to.fullPath },
        });
      }
    } else {
      next();
    }
  }
);

export default router;
