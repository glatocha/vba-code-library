<template>
  <div class="p-2 text-left">
    <ul class="overflow-auto h-full">
      <li
        class="border-b cursor-pointer pt-1 mr-1 group"
        v-for="(item, index) in listOfItems"
        :key="index"
        @click="selectItem(item)"
      >
        <span class="pl-0 group-hover:pl-2">{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const listOfItems = computed(() => store.getters.items);
    console.log("list :>> ", listOfItems);

    function selectItem(item) {
      window.history.replaceState({ page: "page" }, "", `?selectItem=${item.id}`);
      store.dispatch("setSelectedItem", item);
    }

    return { listOfItems, selectItem };
  },
};
</script>

<style></style>
