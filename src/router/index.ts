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
    component: () =>
      import(
        /* webpackChunkName: "blog-create" */ "../views/AdvancedRibbon.vue"
      ),
  },
  {
    path: "/barChartView",
    name: "barChartView.index",
    component: () =>
      import(/* webpackChunkName: "blog-create" */ "../views/BarChartView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
