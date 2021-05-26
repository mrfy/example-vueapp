<template id="mockedRibbonBar">
  <div class="center">
    <Tooltip
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
import {
  computed,
  defineComponent,
  reactive,
  ref,
  PropType,
  toRefs,
} from "vue";
import d3 from "@/assets/d3";
import Tooltip from "@/components/RibbonBar/StateTooltip.vue";
import { RibbonDataType } from "../../types";

export default defineComponent({
  name: "MockedRibbonbar",
  template: "#mockedRibbonBar",
  props: {
    dataSet: { type: Object as PropType<RibbonDataType>, required: true },
    barPadding: { type: Number, default: 0.3 },
    showScale: { type: Boolean, default: false },
  },
  components: {
    Tooltip,
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
    let bars = {};

    console.log(`props.dataSet`, props.dataSet);

    const arrSum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

    const segLong = computed(() => {
      const from_ms = props.dataSet.domain.from.getTime();
      const to_ms = props.dataSet.domain.to.getTime();
      const difference_ms = to_ms - from_ms;

      // let values = props.dataSet.map((e) => e[1]);
      // let sum = arrSum(values);

      return d3
        .scaleLinear()
        .range([0, width.value])
        .domain([0, difference_ms]);
    });

    bars = computed(() => {
      let xPos: any[] = [];
      let bars = props.dataSet.states.map((d) => {
        let longitude = arrSum(xPos);
        const stateWidth = d.period.to.getTime() - d.period.from.getTime();
        xPos.push(segLong.value(stateWidth));

        return {
          xLabel: d.description,
          x: xPos.length > 1 ? longitude : 0,
          y: 0,
          width: segLong.value(stateWidth) + 1,
          height: 35,
          fill: "#" + Math.floor(Math.random() * 16777215).toString(16),
        };
      });
      return bars;
    });

    console.log(`bars`, bars);
    const move = (evt: any, bar: any) => {
      tooltipObj.toolTipX = evt.pageX;
      tooltipObj.toolTipY = evt.pageY;
      tooltipObj.showTooltip = true;
      tooltipObj.bar = bar;
    };

    const cancelMove = function() {
      console.log(`cancelMove`);
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
