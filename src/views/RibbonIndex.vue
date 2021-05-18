<template>
  <div>
    <div class="wrapper">
      <span
        v-for="(item, index) in items"
        v-bind:key="index"
        :ref="items"
        class="item"
      >
        {{ item.name }}
      </span>
    </div>
    <button v-on:click="addItem">Add Item</button>
    <button v-on:click="removeItem">Remove Item</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

interface ItemsArray {
  name: number;
}

export default defineComponent({
  name: "RibbonIndex",
  setup() {
    const items = ref<ItemsArray[]>([]);
    items.value = [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }];
    const store = ref(null);

    const addItem = () => {
      var newItem = { name: items.value.length + 1 };
      items.value.push(newItem);
    };

    const removeItem = () => {
      items.value.pop();
    };

    return {
      store,
      items,
      addItem,
      removeItem,
    };
  },
});
</script>

<style>
body {
  font: 16px arial;
}

div {
  padding: 5px;
  margin: 5px 0;
  border: 2px solid transparent;
}

.wrapper {
  border-color: silver;
}

.item {
  border: 2px solid red;
  display: inline-block;
  font-size: 4rem;
}
</style>
