<template>
  <div class="container page">
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
