<template id="mockedRibbonBar">
  <div ref="resizeRef">
    <Tooltip
      v-if="showTooltip && tooltipObj.tooltipVisible"
      :x="tooltipObj.toolTipX"
      :y="tooltipObj.toolTipY"
      :bar="tooltipObj.bar"
    />
    <svg ref="svgRef" class="ribbon">
      <g transform="translate(0, 20)">
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
          ></rect>
        </g>
        <g class="time-axis" fill="none" :transform="`translate(0, 35)`" />
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import d3s from "@/assets/d3s";
import * as d3 from "d3";

import Tooltip from "@/components/RibbonBar/StateTooltip.vue";
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
  watchEffect,
} from "vue";
import { Bar, RibbonDataType } from "../../types";
import moment from "moment";
import useResizeObserver from "@/use/resizeObserver";

export default defineComponent({
  name: "MockedRibbonbar",
  template: "#mockedRibbonBar",
  props: {
    dataSet: { type: Object as PropType<RibbonDataType>, required: true },
    barPadding: { type: Number, default: 0.3 },
    showScale: { type: Boolean, default: false },
    showTooltip: { type: Boolean, default: false },
  },
  components: {
    Tooltip,
  },
  setup(props) {
    const svgRef = ref(null);
    const bars = ref();

    const { resizeRef, resizeState } = useResizeObserver();

    const tooltipObj = reactive({
      toolTipX: 0,
      toolTipY: 0,
      bar: {},
      tooltipVisible: false,
    });

    const arrSum = (arr: number[]): number => arr.reduce((a, b) => a + b, 0);

    onMounted(() => {
      const svg = d3.select(svgRef.value);

      watchEffect(() => {
        const from_ms = props.dataSet.domain.from.getTime();
        const to_ms = props.dataSet.domain.to.getTime();
        const difference_ms = to_ms - from_ms;

        const { width, height } = resizeState.dimensions;

        const timeScale = d3s
          .scaleTime()
          .domain([props.dataSet.domain.from, props.dataSet.domain.to])
          .range([0, width])
          .nice();

        svg
          .select(".time-axis")
          .call(d3.axisBottom(timeScale) as never) //!! fakkkkkkkkk !!
          .attr("stroke", "#000")
          .attr("stroke-opacity", "0.1")
          .style("opacity", props.showScale ? 1 : 0);

        const segLong = d3s
          .scaleLinear()
          .range([0, width])
          .domain([0, difference_ms]);

        let xPos: number[] = [];

        bars.value = props.dataSet.states.map((d) => {
          let longitude = arrSum(xPos);
          const stateWidth = d.period.to.getTime() - d.period.from.getTime();
          xPos.push(segLong(stateWidth));

          return {
            label: d.description,
            x: xPos.length > 1 ? longitude : 0,
            period: d.period,
            from: moment(d.period.from).format("lll"),
            to: moment(d.period.to).format("lll"),
            width: segLong(stateWidth) + 1,
            height: 35,
            duration: moment.utc(stateWidth).format("HH:mm:ss"),
            fill: d.color,
          };
        });
      });
    });

    const move = (evt: any, bar: Bar) => {
      tooltipObj.toolTipX = evt.pageX;
      tooltipObj.toolTipY = evt.pageY;
      tooltipObj.tooltipVisible = true;
      tooltipObj.bar = bar;
    };

    const cancelMove = function() {
      tooltipObj.tooltipVisible = false;
    };

    return {
      bars,
      move,
      cancelMove,
      tooltipObj,
      svgRef,
      resizeRef,
    };
  },
});
</script>

<style>
.ribbon {
  /* important for responsiveness */
  display: block;
  fill: none;
  stroke: none;
  width: 100%;
  height: 100%;
  overflow: visible;
}
</style>
