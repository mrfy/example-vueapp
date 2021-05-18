<template>
  <div v-for="(item, index) in itemRefs" v-bind:key="index" :ref="itemRefs">
    {{ item }}
  </div>
  <div
    style="border: 1px solid black; background: red;height: 30px;width: 25px;"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const itemRefs = ["one item", "second item", "third idem"];
    return { itemRefs };
  },
});
</script>
