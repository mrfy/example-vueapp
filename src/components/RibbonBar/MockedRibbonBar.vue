<template id="mockedRibbonBar">
  <div class="center">
    <Tooltip
      v-if="tooltipObj.showTooltip"
      :x="tooltipObj.toolTipX"
      :y="tooltipObj.toolTipY"
      :bar="tooltipObj.bar"
    />

    <svg ref="svgRef" class="ribbon" :width="width + 40" :height="height + 40">
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
          ></rect>
        </g>
        <g
          v-if="showScale"
          class="time-axis"
          fill="none"
          :transform="`translate(0, 35)`"
        />
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
import { RibbonDataType } from "../../types";
import moment from "moment";

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
    const svgRef = ref(null);

    const width = ref(750);
    const height = ref(100);
    const tooltipObj = reactive({
      toolTipX: 0,
      toolTipY: 0,
      showTooltip: false,
      bar: {},
    });
    let bars = {};

    onMounted(() => {
      const svg = d3.select(svgRef.value);

      watchEffect(() => {
        const timeScale = d3s
          .scaleTime()
          .domain([props.dataSet.domain.from, props.dataSet.domain.to])
          .range([0, width.value])
          .nice();

        svg
          .select(".time-axis")
          .call(d3.axisBottom(timeScale) as any)
          .attr("stroke", "#000")
          .attr("stroke-opacity", "0.1");
      });
    });

    const arrSum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

    const from_ms = props.dataSet.domain.from.getTime();
    const to_ms = props.dataSet.domain.to.getTime();
    const difference_ms = to_ms - from_ms;

    const segLong = computed(() => {
      return d3s
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
          label: d.description,
          x: xPos.length > 1 ? longitude : 0,
          period: d.period,
          from: moment(d.period.from).format("lll"),
          to: moment(d.period.to).format("lll"),
          width: segLong.value(stateWidth) + 1,
          height: 35,
          duration: moment.utc(stateWidth).format("HH:mm:ss"),
          fill: d.color,
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
      svgRef,
    };
  },
});
</script>

<style lang="scss"></style>
