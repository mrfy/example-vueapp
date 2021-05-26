<template id="itemToolTip">
  <div class="toolTip" :style="position">
    <p>
      Width: <span>{{ bar.width }}</span>
    </p>
    <p>fill: {{ bar.fill }}</p>
    <p>Quantity: aa</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "App",
  template: "#itemToolTip",
  props: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    bar: Object,
  },
  setup(props) {
    const position = computed(() => {
      return {
        top: `${props.y + 10}px`,
        left: `${props.x + 10}px`,
        bar: props.bar,
      };
    });

    return {
      position,
    };
  },
});
</script>

<style>
.toolTip {
  position: absolute;
  background-color: black;
  border-radius: 5px;
  padding: 10px 0;
  pointer-events: none;
}

.toolTip > p {
  color: white;
  text-align: left;
  padding: 1px;
  margin: 1px 10px 1px 10px;
}
</style>
