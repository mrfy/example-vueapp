<template id="ribbonBar">
  <div class="center">
    <FakeTooltip
      v-if="tooltipObj.showTooltip"
      :x="tooltipObj.toolTipX"
      :y="tooltipObj.toolTipY"
      :bar="tooltipObj.bar"
    />
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
            v-on:mousemove="move($event, bar)"
            v-on:mouseout="cancelMove"
          >
            > >
          </rect>
        </g>
      </g>
      <g
        v-if="showScale"
        class="x-axis"
        fill="none"
        :transform="`translate(0, ${height})`"
      >
        <g
          class="tick"
          opacity="1"
          font-size="10"
          font-family="sans-serif"
          text-anchor="middle"
          v-for="(bar, index) in bars"
          :key="index"
          :transform="`translate(${bar.x + bar.width / 2}, 0)`"
        >
          <line stroke="currentColor" y2="4"></line>
          <text fill="currentColor" y="4" dy="0.71em">{{ bar.xLabel }}</text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import d3 from "@/assets/d3";
import FakeTooltip from "@/components/RibbonBar/FakeTooltip.vue";

export default defineComponent({
  name: "Ribbonbar",
  template: "#ribbonBar",
  props: {
    dataSet: { default: [] },
    barPadding: { default: 0.3 },
    showScale: { default: false },
  },
  components: {
    FakeTooltip,
  },
  setup(props) {
    const width = ref(750);
    const height = ref(100);
    const tooltipObj = reactive({
      toolTipX: 0,
      toolTipY: 0,
      showTooltip: false,
      bar: {},
    });

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

    const move = (evt: any, bar: any) => {
      tooltipObj.toolTipX = evt.pageX;
      tooltipObj.toolTipY = evt.pageY;
      tooltipObj.showTooltip = true;
      tooltipObj.bar = bar;
    };

    const cancelMove = function() {
      tooltipObj.showTooltip = false;
    };

    return {
      height: height.value,
      width: width.value,
      bars,
      move,
      cancelMove,
      tooltipObj,
    };
  },
});
</script>

<style lang="scss"></style>
