<template>
  <div style="display: table-caption">
    <div id="v-model-basic" class="demo">
      <input v-model="inputValue" placeholder="edit me" @keyup.enter="addPet" />
      <button class="button is-link" @click="onSubmit">Submit</button>

      <p>Random states cnt is: {{ inputValue }}</p>
      <div>
        <input
          type="checkbox"
          id="scaleCheck"
          name="scaleCheck"
          :checked="scaleChecked"
          v-model="scaleChecked"
        />
        {{ scaleChecked }}
        <label for="scales">Scale</label>
      </div>
    </div>

    <RibbonBar
      class="chart"
      :data-set="data"
      :scaleChecked="scaleChecked"
      :margin-left="40"
      :margin-top="40"
      :tick-count="5"
      :bar-padding="0.4"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import RibbonBar from "@/components/RibbonBar/RibbonBar.vue";

export default defineComponent({
  name: "ribbonBarView",
  components: {
    RibbonBar,
  },
  setup() {
    const def = [];
    for (let index = 0; index < 10; index++) {
      let newRow = ["13:00", Math.floor(Math.random() * 33)];
      def.push(newRow);
    }
    const inputValue = ref(10);
    const dataOnRibbon = ref(def);
    const scaleChecked = ref(false);

    const onSubmit = () => {
      dataOnRibbon.value = [];
      console.log(`scaleChecked.value`, scaleChecked.value);
      for (let index = 0; index < inputValue.value; index++) {
        let newRow = ["12:00", Math.floor(Math.random() * 33)];
        dataOnRibbon.value.push(newRow);
      }
    };

    return {
      data: dataOnRibbon,
      inputValue,
      scaleChecked,
      onSubmit,
    };
  },
});
</script>

<style scss>
.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}
</style>
