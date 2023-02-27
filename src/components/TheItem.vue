<template>
  <div class="bg-gray-300 rounded-sm">
    <div
      class="flex items-center px-4 py-3 border-b border-gray-400 last:border-b-0"
    >
      <div class="flex items-center justify-center mr-2">
        <TheCheck :todoC="todo" />
      </div>

      <div class="w-full">
        <input
          type="text"
          placeholder="Digite a sua tarefa"
          v-model="inputValue"
          :class="[
            'bg-gray-300 placeholder-gray-500 text-gray-700 font-light focus:outline-none block w-full appearance-none leading-normal mr-3',
            { 'line-through': todo.completed },
          ]"
          :readonly="todo.completed"
          :onFocusout="updateTodo"
          @keyup.enter="updateTodo"
        />
      </div>

      <div class="ml-auto flex items-center justify-center">
        <TheRemove :id="todo.id" />
      </div>
    </div>
  </div>
</template>

<script>
import TheCheck from "@/components/TheCheck.vue";
import TheRemove from "@/components/TheRemove.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { toast } from "vue3-toastify";

export default {
  components: {
    TheCheck,
    TheRemove,
  },
  props: {
    todo: Object,
  },
  setup(props) {
    const store = useStore();

    let inputValue = ref(props.todo.title);

    const updateTodo = () => {
      if (inputValue.value === "") {
        toast.error("To-do vazio não é To-do, Jovem!!!", {
          autoClose: 1000,
        });
        return false;
      }

      // avoid editing when it doesn't count changes
      if (props.todo.title !== inputValue.value) {
        const data = {
          id: props.todo.id,
          data: {
            title: inputValue.value,
            completed: props.todo.completed,
          },
        };
        store.dispatch("updateTodo", data).then(() => {
          toast.success("To-do editado!", {
            autoClose: 1000,
          });
        });
      }
    };

    return {
      inputValue,
      updateTodo,
    };
  },
};
</script>
