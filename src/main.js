import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/main.css";
import store from "./store";
import Vue3Toastify from "vue3-toastify";

createApp(App).use(Vue3Toastify).use(store).mount("#app");
