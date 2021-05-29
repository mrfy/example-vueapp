<template>
  <nav>
    <h2>Navigation</h2>
    <ul>
      <li>
        <router-link :to="{ name: 'PureRibbonBar.index' }"
          >RibbonBar playground
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'RibbonBarView.index' }">
          Synapstry ribbon</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>
