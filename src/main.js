import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';
import App from './App.vue';
import Home from './pages/Home.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import NotFound from './pages/NotFound.vue';
import axios from 'axios';

axios.defaults.withCredentials = true;

const store = createStore({
    state() {
        return {
            loggedInUser: null
        }
    },
    actions: {
        async logIn({ dispatch }, payload) {
            await axios.get('http://localhost:8000/sanctum/csrf-cookie');
            await axios.post('http://localhost:8000/login', {
                email: payload.email,
                password: payload.password
            });

            await axios.get('http://localhost:8000/api/user');
            dispatch('me');

            // This value could be from the user eventually so it matches up. For now let's put it to a day ahead.
            dispatch('setLogoutTimer', 1000 * 60 * 60 * 24);
        },
        setLogoutTimer({dispatch}, expirationTime) {
            setTimeout(() => {
                dispatch('logOut');
            }, expirationTime);
        },
        async logOut({commit}) {

            // We want to clear the cookies too I think.
            await axios.post('http://localhost:8000/logout');
            commit('clearAuthData');
            // Check that we're not on the /login page already or this will error.
            router.replace('/login');
        },
        me({ commit }) {
            return axios.get('http://localhost:8000/api/user').then((response) => {
                if (response && response.data && !response.data.error) {
                    commit('authUser', { user: response.data });
                } else {
                    commit('authUser', { user: null });
                }
            }).catch(() => {
                commit('authUser', { user: null });
            })
        },
        async signup({ commit }, payload) {
            let response = null;
            
            response = await axios.get('http://localhost:8000/sanctum/csrf-cookie');
            
            if (response.status == 204) {
    
                let registrationResponse = await axios.post('http://localhost:8000/api/register', payload);
                if (registrationResponse.status !== 200) {
                    console.log('Could not register user.')
                } else {
                    commit('authUser', {user: registrationResponse.data.user});
                }
            } else {
                console.log('Could not get CSRF cookie.');
            }
        },
    },
    mutations: {
        authUser(state, payload) {
            state.loggedInUser = payload.user;
        },
        clearAuthData(state) {
            state.loggedInUser = null;
        }
    },
    getters: {
        loggedInUser(state) {
            return state.loggedInUser;
        },
        isAuthenticated(state) {
            return !!state.loggedInUser;
        }
    }
});

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/:notFound(.*)', component: NotFound }
    ]
});
store.dispatch('me').then(() => {
    const app = createApp(App);
    app.use(router);
    app.use(store);
    app.mount('#app');
});