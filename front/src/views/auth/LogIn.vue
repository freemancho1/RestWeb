<template>
<div class="row justify-center">
    <div class="aip-auth col-4 text-center">
        
        <div class="sub-title">AI Platform</div>
        <div class="main-title">Log In</div>

        <q-input label="ID:" v-model="userInfo.username" ref="aipRefUsername"
            color="orange-8" label-color="orange-8"
            @keyup.enter="aipRefPassword.focus()"/>
        <div class="error-notify">
            <p v-for="error in errors.username" :key="error" class="text-left">
                {{ error }}
            </p>
        </div>

        <q-input type="password" label="Password:" v-model="userInfo.password"
            color="orange-8" label-color="orange-8"
            ref="aipRefPassword" @keyup.enter="submit"/>
        <div class="error-notify">
            <p v-for="error in errors.password" :key="error" class="text-left">
                {{ error }}
            </p>
        </div>

        <div class="error-notify">
            <p v-for="error in errors.etc" :key="error" 
                class="text-left" v-html="error"/>
        </div>

        <q-btn label="Login" color="orange-8" glossy @click="submit"/>
        <div class="notify text-right">
            Or <a @click="router.push('/auth/signup')">Click here</a> to sign up.
        </div>

    </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const store = useStore()

const userInfo = ref({
    username: '',
    password: ''
})
const errors = ref({
    username: [],
    password: [],
    etc: []
})

const aipRefUsername = ref(null)
const aipRefPassword = ref(null)

const submit = async () => {
    errors.value = { username: [], password: [], etc: []}
    localStorage.removeItem('loginToken')

    if (!userInfo.value.username) {
        errors.value.username.push('ID를 입력하세요.')
        aipRefUsername.value.focus()
        return
    }
    if (!userInfo.value.password) {
        errors.value.password.push('비밀번호를 입력하세요.')
        aipRefPassword.value.focus()
        return
    }

    const formData = {
        username: userInfo.value.username,
        password: userInfo.value.password
    }
    console.log(formData)

    await axios 
        .post('/auth/token/login/', formData)
        .then(response => {
            const token = response.data.auth_token
            // store.state.loginToken = token
            store.commit('setToken', token)
            axios.defaults.headers.common['Authorization'] = 'Token ' + token
            console.log('login axios 1')
            const toPath = route.query.to || '/'
            console.log('login axios 2')
            router.push(toPath)
        })
        .catch(error => {
            if (error.response) {
                errors.value.etc.push('ID나 비밀번호를 잘못 입력하였습니다.')
                console.log('error.response.data:')
                console.log(JSON.stringify(error.response.data))
            } else if (error.message) {
                errors.value.etc.push('시스템 오류입니다.<br/> 잠시 후 다시 시도하시기 바랍니다.')
                console.log('error.message')
                console.log(error.message)
            }
        })
}
</script>

<style lang="scss" scope>
@import "~@/styles/main";
</style>