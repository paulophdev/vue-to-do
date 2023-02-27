<template>
  <div class="px-3 py-10 md:px-10">
    <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
      <TheForm />

      <TheSpinner v-if="loading" />

      <template v-else>
        <TheItens v-if="$store.state.todos.length > 0">
          <TheItem
            v-for="(todo, i) in $store.state.todos"
            :key="i"
            :todo="todo"
          />
        </TheItens>

        <TheNoContent v-else />
      </template>
    </div>
  </div>
</template>

<script>
import TheSpinner from "@/components/TheSpinner.vue";
import TheForm from "@/components/TheForm.vue";
import TheItem from "@/components/TheItem.vue";
import TheItens from "@/components/TheItens.vue";
import TheNoContent from "./components/TheNoContent.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import "vue3-toastify/dist/index.css";

export default {
  components: {
    TheSpinner,
    TheForm,
    TheItem,
    TheItens,
    TheNoContent,
  },
  setup() {
    const store = useStore();
    let loading = ref(true);

    onMounted(() => {
      store.dispatch("getTodos").then(() => {
        loading.value = !loading.value;
      });
    });

    return {
      loading,
    };
  },
};
</script>

<style>
body {
  background-color: rgb(31 41 55);
}
</style>
