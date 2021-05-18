<template>
  <svg class="barchart" :width="width" :height="height">
    <g class="bars" fill="none">
      <rect
        v-for="(bar, index) in bars"
        fill="pink"
        :key="index"
        :height="bar.height"
        :width="bar.width"
        :x="bar.x"
        :y="bar.y"
      ></rect>
    </g>
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import d3 from "@/assets/d3";

export default defineComponent({
  name: "BarChart",
  props: {
    dataSet: { default: [] },
  },
  setup(props) {
    const width = ref(500);
    const height = ref(200);

    const x = computed(() => {
      return d3
        .scaleBand()
        .range([0, width.value])
        .padding(0.3)
        .domain(props.dataSet.map((e) => e[0]));
    });

    const y = computed(() => {
      let values = props.dataSet.map((e) => e[1]);
      return d3
        .scaleLinear()
        .range([height.value, 0])
        .domain([0, Math.max(...values)]);
    });

    const bars = computed(() => {
      let bars = props.dataSet.map((d) => {
        return {
          xLabel: d[0],
          x: x.value(d[0]),
          y: y.value(d[1]),
          width: x.value.bandwidth(),
          height: height.value - y.value(d[1]),
        };
      });
      return bars;
    });

    return {
      height: height.value,
      width: width.value,
      bars,
    };
  },
});
</script>

<style lang="scss"></style>
