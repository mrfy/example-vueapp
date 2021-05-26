<template>
  <div style="display: table-caption">
    <div id="v-model-basic" class="demo">
      <input v-model="inputValue" placeholder="edit me" @keyup.enter="addPet" />
      <button class="button is-link" @click="onSubmit">Submit</button>

      <p>Random states cnt is: {{ inputValue }}</p>
      <div>
        <input
          type="checkbox"
          id="showScale"
          name="showScale"
          v-model="showScale"
        />
        <label for="scales">Display scale</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="showTooltip"
          name="showTooltip"
          v-model="showTooltip"
        />
        <label for="scales">Display tooltip</label>
      </div>
    </div>

    <RibbonBar
      class="chart"
      :data-set="data"
      :showScale="showScale"
      :margin-left="40"
      :margin-top="40"
      :tick-count="5"
      :bar-padding="0.4"
    />
    <MckedRibbonBar
      class="chart"
      :data-set="RibbonDataJSON"
      :showScale="showScale"
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
import MckedRibbonBar from "@/components/RibbonBar/MockedRibbonBar.vue";
import { RibbonDataJSON } from "../mocks/ribbonData";

export default defineComponent({
  name: "ribbonBarView",
  components: {
    RibbonBar,
    MckedRibbonBar,
  },
  setup() {
    const def = [];
    for (let index = 0; index < 10; index++) {
      let newRow = ["13:00", Math.floor(Math.random() * 33)];
      def.push(newRow);
    }
    const inputValue = ref(10);
    const dataOnRibbon = ref(def);
    const showScale = ref(true);

    const onSubmit = () => {
      dataOnRibbon.value = [];
      for (let index = 0; index < inputValue.value; index++) {
        let newRow = ["12:00", Math.floor(Math.random() * 33)];
        dataOnRibbon.value.push(newRow);
      }
    };

    return {
      data: dataOnRibbon,
      inputValue,
      showScale,
      onSubmit,
      RibbonDataJSON,
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
