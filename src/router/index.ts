import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/ribbonAdv",
    name: "PureRibbonBar.index",
    component: () => import("../views/PureRibbonBar.vue"),
  },
  {
    path: "/RibbonBarView",
    name: "RibbonBarView.index",
    component: () => import("../views/RibbonBarView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
