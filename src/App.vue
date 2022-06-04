<template>
  <Header class="flex-none"></Header>
  <main-panel class="flex-1 overflow-auto"></main-panel>
  <Footer class="flex-none"></Footer>

  <login-dialog v-if="isLoginDialogOpen"></login-dialog>
  <add-dialog v-if="isAddDialogOpen"></add-dialog>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { supabase } from "./supabase/init";

import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import MainPanel from "./components/MainPanel.vue";

import LoginDialog from "./dialogs/LoginDialog.vue";
import AddDialog from "./dialogs/AddDialog.vue";

export default {
  components: {
    Header,
    Footer,
    MainPanel,
    LoginDialog,
    AddDialog,
  },
  setup() {
    const store = useStore();

    const isLoginDialogOpen = computed(() => store.getters.isLoginDialogOpen);
    const isAddDialogOpen = computed(() => store.getters.isAddDialogOpen);

    //check if user already logged in - for example after refresh
    store.dispatch("setUser", supabase.auth.user());

    //read all items from supabase
    async function getItems() {
      try {
        const { data: items, error } = await supabase
          .from("vba-snippets")
          .select("*")
          .order("title", { ascending: true });
        if (error) throw error;
        store.dispatch("setItems", items);
        console.log("items :>> ", items);
      } catch (error) {
        console.warn("error :>> ", error.message);
      }
    }
    getItems();

    // Runs when there is a auth state change
    // if user is logged in, this will fire
    supabase.auth.onAuthStateChange((event, session) => {
      store.dispatch("setUser", session);
      console.log("Auth status changed - " + event);
      console.log("session :>> ", session);
    });

    //Subscribe to change events
    const mySubscription = supabase
      .from("vba-snippets")
      .on("*", (payload) => {
        //here we will reload the whole table?!
        console.log("Change in the table received!", payload);
      })
      .subscribe();

    return {
      isLoginDialogOpen,
      isAddDialogOpen,
    };
  },
};
</script>

<style>
body {
  background-image: url(./assets/bg6.jpg);
  /* Center the image */
  background-position: center;
  /* Do not repeat the image */
  background-repeat: no-repeat;
  /* Resize the background image to cover the entire container */
  background-size: cover;
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  overflow: hidden;
}

#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: "Noto Sans";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
  max-height: 100vh;
  align-content: center;
}
</style>
