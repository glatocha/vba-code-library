<template>
  <div
    class="flex bg-opacity-70 bg-black w-11/12 max-w-screen-xl text-white m-5 rounded-lg border-primary-dark border-4 self-center"
  >
    <left-panel class="box-border w-1/3 max-w-5xl flex flex-col"></left-panel>
    <right-panel class="box-border w-2/3"></right-panel>
  </div>
</template>

<script setup>
import LeftPanel from "./LeftPanel.vue";
import RightPanel from "./RightPanel.vue";

components: {
  LeftPanel, RightPanel;
}
</script>

<style scoped></style>
