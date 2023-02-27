<template>
  <form
    class="flex items-center px-4 bg-gray-900 h-15 rounded-sm border-l-2 border-green-400 mb-3"
    @submit.prevent="handleSubmit"
  >
    <input
      placeholder="Adicione um novo item ..."
      type="text"
      v-model="inputValue"
      class="bg-gray-900 placeholder-gray-500 text-gray-500 font-light focus:outline-none block w-full appearance-none leading-normal py-3 pr-3"
    />

    <button
      class="text-green-400 text-xs font-semibold focus:outline-none"
      type="submit"
    >
      ADICIONAR
    </button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { toast } from "vue3-toastify";

export default {
  setup() {
    const store = useStore();

    let inputValue = ref("");

    const handleSubmit = () => {
      if (inputValue.value === "") {
        toast.error("To-do vazio não é To-do, Jovem!!!", {
          autoClose: 1000,
        });
        return false;
      }

      store
        .dispatch("setTodo", {
          title: inputValue.value,
          completed: false,
        })
        .then(() => {
          inputValue.value = "";
          toast.success("To-do adicionado!", {
            autoClose: 1000,
          });
        });
    };

    return {
      handleSubmit,
      inputValue,
    };
  },
};
</script>
