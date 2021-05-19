<template>
  <svg class="ribbon" :width="width + 40" :height="height + 40">
    <g transform="translate(20, 20)">
      <g class="bars" fill="none">
        <rect
          style="stroke-width:31;stroke:{{bar.fill}}"
          v-for="(bar, index) in bars"
          :fill="bar.fill"
          :key="index"
          :height="bar.height"
          :width="bar.width"
          :x="bar.x"
          :y="0"
          v-on:click="addTwo"
        ></rect>
      </g>
    </g>
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import d3 from "@/assets/d3";

export default defineComponent({
  name: "Ribbonbar",
  props: {
    dataSet: { default: [] },
    barPadding: { default: 0.3 },
  },
  setup(props) {
    const addTwo = () => {
      console.log("click");
    };

    const width = ref(200);
    const height = ref(100);

    const arrSum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

    const segLong = computed(() => {
      let values = props.dataSet.map((e) => e[1]);
      let sum = arrSum(values);
      return d3
        .scaleLinear()
        .range([0, width.value])
        .domain([0, sum]);
    });

    const bars = computed(() => {
      let xPos: any[] = [];
      let bars = props.dataSet.map((d) => {
        let longitude = arrSum(xPos);
        xPos.push(segLong.value(d[1]));

        return {
          xLabel: d[0],
          x: xPos.length > 1 ? longitude : 0,
          y: 0,
          width: segLong.value(d[1]) + 1,
          height: 35,
          fill: "#" + Math.floor(Math.random() * 16777215).toString(16),
        };
      });
      return bars;
    });

    return {
      height: height.value,
      width: width.value,
      bars,
      addTwo,
    };
  },
});
</script>

<style lang="scss"></style>
