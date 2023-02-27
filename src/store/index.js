import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    todos: [],
  },
  getters: {},
  mutations: {
    setTodos(state, data) {
      state.todos = data;
    },
    setTodo(state, data) {
      const index = state.todos.findIndex((todo) => todo.id === data.id);
      if (index >= 0) {
        state.todos.splice(index, 1, data);
      } else {
        state.todos.push(data);
      }
    },
    removeTodo(state, id) {
      const index = state.todos.findIndex((todo) => todo.id === id);
      state.todos.splice(index, 1);
    },
  },
  actions: {
    getTodos({ commit }) {
      axios.get("http://localhost:3000/todos").then((response) => {
        commit("setTodos", response.data);
      });
    },
    setTodo({ commit }, data) {
      axios.post("http://localhost:3000/todos", data).then((response) => {
        commit("setTodo", response.data);
      });
    },
    deleteTodo({ commit }, id) {
      axios.delete(`http://localhost:3000/todos/${id}`).then(() => {
        commit("removeTodo", id);
      });
    },
    updateTodo({ commit }, { id, data }) {
      axios.put(`http://localhost:3000/todos/${id}`, data).then((response) => {
        commit("setTodo", response.data);
      });
    },
  },
  modules: {},
});
