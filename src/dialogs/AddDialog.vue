<template>
  <div
    class="bg-black opacity-50 h-full w-full fixed z-40 flex justify-center items-center"
    @click="closeDialog"
  ></div>
  <div
    id="addDialog"
    class="z-50 p-5 bg-white border-primary-dark border-2 rounded-lg w-9/12"
  >
    <form @submit.prevent="addItem" class="flex flex-col" autocomplete="off">
      <h1>Enter the name and paste the code</h1>
      <input
        class="border-primary-dark border-2 rounded-md my-2 h-8 px-2"
        type="text"
        id="name"
        title="snippet name"
        placeholder="snippet name"
        v-model="item.title"
      />
      <textarea
        name="itemCode"
        id="itemCode"
        cols="30"
        rows="25"
        class="border-primary-dark border-2 rounded-md my-2 p-2"
        v-model="item.code"
      ></textarea>
      <div class="flex flex-row justify-end">
        <button
          class="mx-1 text-white font-bold bg-primary px-3 py-2 rounded-lg hover:bg-primary-light focus:outline-primary-dark scale-50 sm:scale-100 transition-scale hover:scale-105 duration-50 ease-in-out"
          type="button"
          @click.prevent="closeDialog"
        >
          Cancel
        </button>
        <button
          class="mx-1 text-white font-bold bg-primary px-3 py-2 rounded-lg hover:bg-primary-light focus:outline-primary-dark scale-50 sm:scale-100 transition-scale hover:scale-105 duration-50 ease-in-out"
          type="submit"
        >
          Add item
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { supabase } from "../supabase/init";

export default {
  setup() {
    const store = useStore();
    const item = ref({
      title: "",
      code: "",
      tags: "",
    });

    async function addItem() {
      console.log("Trying to add item:" + item.value.title);
      store.dispatch("setLoadingDialog", {
        isOpen: true,
        text: "Saving data...",
        textClass: "info",
      });
      try {
        const { error } = await supabase.from("vba-snippets").insert([
          {
            title: item.value.title,
            code: item.value.code,
            tags: item.value.tags,
          },
        ]);
        if (error) throw error;
        closeDialog();
        store.dispatch("forceRefresh");
      } catch (error) {
        console.warn("Inserting error :>> ", error);
        store.dispatch("setLoadingDialog", {
          isOpen: true,
          text: "Saving error :" + error.message,
          textClass: "alarm",
        });
        setTimeout(() => {
          store.dispatch("closeDialog");
        }, 5000);
      }
    }

    function closeDialog() {
      store.dispatch("closeDialog");
    }

    return { addItem, closeDialog, item };
  },
};
</script>

<style scoped>
#addDialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
textarea {
  color: var(--code-color);
  font-family: "Source Code Pro", monospace;
  font-size: 0.7rem;
  line-height: 0.9rem;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
