<template>
  <div v-if="item" class="flex flex-col">
    <div
      class="h-12 flex flex-row items-center px-3 m-2 bg-gray-300 rounded-md justify-between"
    >
      <h2 class="p-1 text-black font-bold">{{ item.title }}</h2>
      <div class="text-primary-dark">
        <font-awesome-icon
          v-if="isAdmin"
          class="cursor-pointer mx-1 h-6 hover:scale-110"
          title="Edit"
          icon="pen-to-square"
        />
        <font-awesome-icon
          class="cursor-pointer mx-1 h-6 hover:scale-110"
          title="Copy to clipboard"
          icon="clipboard"
        />
      </div>
    </div>
    <code
      class="h-full bg-gray-300 mx-2 mb-2 p-3 rounded-md box-border text-left"
      v-html="code"
    ></code>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import string2html from "../vba-formating";

export default {
  setup() {
    const store = useStore();
    const isAdmin = computed(() => store.getters.isAdmin);

    const item = computed(() => store.getters.selectedItem);

    const code = computed(() => string2html(item.value.code));

    return { isAdmin, item, code };
  },
};
</script>

<style scoped>
code {
  color: var(--code-color);
  font-family: "Source Code Pro", monospace;
  font-size: 0.7rem;
  line-height: 0.9rem;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

code::selection,
code:deep(::selection) {
  background-color: theme("colors.primary.light");
}

code:deep(.code-keyword) {
  color: var(--code-keyword-color);
  font-weight: 600;
}

code:deep(.code-comment) {
  color: var(--code-comment-color);
}

code:deep(.code-strLiteral) {
  color: var(--code-string-literal);
}
</style>
