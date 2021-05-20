import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

import RibbonIndex from "@/views/RibbonIndex.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/ribbon",
    name: "ribbon.index",
    component: RibbonIndex,
  },
  {
    path: "/ribbonAdv",
    name: "advRibbon.index",
    component: () => import("../views/AdvancedRibbon.vue"),
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
