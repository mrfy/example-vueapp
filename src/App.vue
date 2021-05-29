<template>
  <div class="container page" id="app">
    <Header />
    <Sidebar />
    <main class="container page">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "./components/Sidebar.vue";
import Header from "@/components/Header.vue";

export default defineComponent({
  name: "App",
  components: { Sidebar, Header },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 720px;
  margin: 100px auto;
  padding: 0 20px;
}

.buttons {
  margin-top: 2rem;
}
</style>
