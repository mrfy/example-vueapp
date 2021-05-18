<template>
  <nav>
    <h2>Navigation</h2>
    <ul>
      <li>
        <router-link :to="{ name: 'ribbon.index' }">RTibbon index</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'advRibbon.index' }"
          >adv RTibbon index</router-link
        >
      </li>
      <li>
        <router-link :to="{ name: 'barChartView.index' }">
          barChartView index</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
import { reactive, computed } from "vue";

export default {
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2),
    });

    function increment() {
      state.count++;
    }

    return {
      state,
      increment,
    };
  },
};
</script>
