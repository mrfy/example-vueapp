<template>
  <div class="home">
    <BarChart
      class="chart"
      :data-set="data"
      :margin-left="40"
      :margin-top="40"
      :tick-count="5"
      :bar-padding="0.4"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarChart from "@/components/BarChart.vue";

export default defineComponent({
  name: "BarChartView",
  components: {
    BarChart,
  },
  setup() {
    return {
      data: [
        ["Bob", 33],
        ["Robin", 24],
        ["Mark", 22],
        ["Joe", 29],
        ["Eve", 38],
        ["Karen", 21],
        ["Kirsty", 25],
        ["Chris", 30],
      ],
    };
  },
});
</script>
