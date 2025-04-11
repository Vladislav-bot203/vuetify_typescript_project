import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from "vue-router";
import useUserStore from "../stores/user-storage";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: import("../views/HomeView.vue"),
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
  (
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const requireAuth = to.meta.auth;
    const useStorage = useUserStore();

    if (requireAuth && useStorage.userId) {
      next();
    } else if (requireAuth && !useStorage.userId) {
      next("/auth?message=auth");
    } else {
      next();
    }
  }
);

export default router;
