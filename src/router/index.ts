import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

import RibbonBarView from "@/views/RibbonBarView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/RibbonBarView",
    name: "RibbonBarView.index",
    component: RibbonBarView,
  },
  {
    path: "/ribbonAdv",
    name: "PureRibbonBar.index",
    component: () => import("../views/PureRibbonBar.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
