import axios from 'axios';

const state = {
    todos: [],
    limit: 5
};

const getters = {
    allTodos: (state) => state.todos,
    limitTodos: (state) => state.limit
};

const actions = {
    async fetchTodos({ commit, state }) {
        const response = await axios.get(`http://localhost:7001/todos?_limit=${state.limit}`);

        commit('setTodos', response.data);
    },
    async addTodo({ commit }, title) {
        const response = await axios.post('http://localhost:7001/todos', { title, completed: false});

        commit('newTodo', response.data);
    },
    async deleteTodo({ commit }, id) {
        await axios.delete(`http://localhost:7001/todos/${id}`);

        commit('removeTodo', id);
    },
    async filterTodos({ commit, dispatch }, e) {
        // Get selected number
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);

        commit('limitTodos', limit);
        dispatch('fetchTodos');
    }
};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
    limitTodos: (state, limit) => state.limit = limit
};

export default {
    state,
    getters,
    actions,
    mutations
}