import axios from 'axios';

const state = {
    todos: []
};

const getters = {
    allTodos: (state) => state.todos
};

const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get('http://localhost:7001/todos');

        commit('setTodos', response.data);
    },
    async addTodo({ commit }, title) {
        const response = await axios.post('http://localhost:7001/todos', { title, completed: false});

        commit('newTodo', response.data);
    }
};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo)
};

export default {
    state,
    getters,
    actions,
    mutations
}