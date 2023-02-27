<template>
  <button
    :class="[
      { 'text-gray-400': !todoC.completed },
      { 'text-emerald-800': todoC.completed },
    ]"
    @click="upCheck"
  >
    <svg
      class="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 13l4 4L19 7"
      ></path>
    </svg>
  </button>
</template>

<script>
import { useStore } from "vuex";

export default {
  props: {
    todoC: Object,
  },
  setup(props) {
    const store = useStore();

    const upCheck = () => {
      const data = {
        id: props.todoC.id,
        data: {
          title: props.todoC.title,
          completed: !props.todoC.completed,
        },
      };
      store.dispatch("updateTodo", data);
    };

    return {
      upCheck,
    };
  },
};
</script>
