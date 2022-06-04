import { createStore } from "vuex";

const Store = createStore({
  state() {
    return {
      user: null, //storing supabase user object - null if not logged in
      isLoginDialogOpen: false, //true when the login dialog is open
      isAddDialogOpen: false, //true when the add edit dialog is open
      items: null, //store all code snippets
      selectedItem: {
        title: "Select snippet",
        code: "",
      }, //
    };
  },
  mutations: {
    setUser(state, value) {
      state.user = value;
    },
    openLoginDialog(state) {
      state.isLoginDialogOpen = true;
    },
    openAddDialog(state) {
      state.isAddDialogOpen = true;
    },
    closeDialog(state) {
      state.isLoginDialogOpen = false;
      state.isAddDialogOpen = false;
    },
    setItems(state, payload) {
      state.items = payload;
    },
    setSelectedItem(state, payload) {
      state.selectedItem = payload;
    },
  },
  actions: {
    setUser(context, value) {
      context.commit("setUser", value);
    },
    openLoginDialog(context) {
      context.commit("openLoginDialog");
    },
    openAddDialog(context) {
      context.commit("openAddDialog");
    },
    closeDialog(context) {
      context.commit("closeDialog");
    },
    setItems(context, payload) {
      context.commit("setItems", payload);
    },
    setSelectedItem(context, payload) {
      context.commit("setSelectedItem", payload);
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    isLoginDialogOpen(state) {
      return state.isLoginDialogOpen;
    },
    isAddDialogOpen(state) {
      return state.isAddDialogOpen;
    },
    items(state) {
      return state.items;
    },
    selectedItem(state) {
      return state.selectedItem;
    },
  },
});

export default Store;
