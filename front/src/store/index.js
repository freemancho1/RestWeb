import { createStore } from 'vuex'

export default createStore({
    state: {
        isAuthenticated: false,
        loginToken: '',
        // lastMenuId: 0,
    },

    mutations: {

        initializeStore(state) {
            // let lastMenuId = localStorage.getItem('lastMenuId')
            // console.log('init1', lastMenuId)
            // lastMenuId = (lastMenuId >= 0) ? lastMenuId: 0
            // // console.log('init', lastMenuId)
            // state.lastMenuId = lastMenuId
            // console.log('init2', state.lastMenuId)
            // localStorage.setItem('lastMenuId', state.lastMenuId)
            if (localStorage.getItem('loginToken')) {
                console.log('init3 true')
                state.loginToken = localStorage.getItem('loginToken')
                state.isAuthenticated = true
            } else {
                console.log('init3 false')
                state.loginToken = ''
                state.isAuthenticated = false
            }
            // console.log('init4', localStorage.getItem('lastMenuId'))
        },

        setToken(state, token) {
            state.loginToken = token
            state.isAuthenticated = true
            // state.lastMenuId = 0
            localStorage.setItem('loginToken', token)
            localStorage.setItem('lastMenuId', 0)
            console.log('store.setToken', localStorage.getItem('lastMenuId'))
        },

        removeToken(state) {
            state.loginToken = ''
            state.isAuthenticated = false
            // state.lastMenuId = 0
            localStorage.setItem('loginToken', '')
            localStorage.setItem('lastMenuId', 0)
        },

        // setLastMenuId(state, id) {
        //     state.lastMenuId = id
        // }
    },
    actions: {
    },
    modules: {
    }
})
