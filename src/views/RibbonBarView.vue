<template>
  <div>
    <label for="scales">Synapstry® ribbon component</label>
    <div id="v-model-basic" class="demo">
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
    <mocked-ribbon-bar
      class="chart"
      :data-set="RibbonDataJSON"
      :showScale="showScale"
      :showTooltip="showTooltip"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MockedRibbonBar from "@/components/RibbonBar/MockedRibbonBar.vue";
import { RibbonDataJSON } from "../mocks/ribbonData";

export default defineComponent({
  name: "ribbonBarView",
  components: {
    MockedRibbonBar,
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
    const showTooltip = ref(true);

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
      showTooltip,
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
