import { createStore } from 'vuex'

export default createStore({
    state: {
        isAuthenticated: false,
        loginToken: '',
        lastMenuId: 0,
    },
    mutations: {
        initializeStore(state) {
            state.lastMenuId = localStorage.getItem('lastMenuId') ? localStorage.getItem('lastMenuId'): 0
            localStorage.setItem('lastMenuId', state.lastMenuId)
            if (localStorage.getItem('loginToken')) {
                state.loginToken = localStorage.getItem('loginToken')
                state.isAuthenticated = true
            } else {
                state.loginToken = ''
                state.isAuthenticated = false
            }
            console.log('init', localStorage.getItem('lastMenuId'))
        },
        setToken(state, token) {
            state.loginToken = token
            state.isAuthenticated = true
            state.lastMenuId = 0
            localStorage.setItem('loginToken', token)
            localStorage.setItem('lastMenuId', 0)
        },
        removeToken(state) {
            state.loginToken = ''
            state.isAuthenticated = false
            state.lastMenuId = 0
            localStorage.setItem('loginToken', '')
            localStorage.setItem('lastMenuId', 0)
        }
    },
    actions: {
    },
    modules: {
    }
})
