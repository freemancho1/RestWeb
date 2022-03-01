<template>
<div class="aif-login row items-center justify-end">
    <div class="aif-login-card text-blue-grey text-center">
        <h3>Modeling Login.</h3>
        
        <q-input label="ID:" v-model="userInfo.username" ref="aif_ref_username"/>
        <div v-if="errors.username" class="q-mb-md">
            <p v-for="error in errors.username" :key="error" class="error-notification">
                {{ error }}
            </p>
        </div>

        <q-input label="Password:" v-model="userInfo.password"
            ref="aif_ref_password" @keyup.enter="submit"/>
        <div v-if="errors.password" class="q-mb-xl">
            <p v-for="error in errors.password" :key="error" class="error-notification">
                {{ error }}
            </p>
        </div>

        <div v-if="errors.etc" class="q-mb-xl">
            <p v-for="error in errors.etc" :key="error" class="error-notification">
                {{ error }}
            </p>
        </div>

        <q-btn label="Login" color="primary" glossy @click="submit"/>
        <div class="text-left q-mt-xl">
            Or <a href="/sign-up">Click here</a> to sign up.
        </div>
    </div>
</div>
</template>

<script setup>
import axios from 'axios'
import store from '@/store/index.js'
import { useRoute, useRouter } from 'vue-router'
// import router from '@/router/index.js'
// import { ref, useStore, useRouter } from 'vue'
import { ref } from 'vue'

// const store = useStore()
const router = useRouter()
const route = useRoute()

const userInfo = ref({
    username: '',
    password: ''
})
const errors = ref({
    username: [],
    password: [],
    etc: []
})
const aif_ref_username = ref(null)
const aif_ref_password = ref(null)

const submit = async () => {
    errors.value = { username: [], password: [], etc: [] }
    localStorage.removeItem('loginToken')
    
    if (!userInfo.value.password) {  
        errors.value.password.push('비밀번호를 입력하세요.')
        aif_ref_password.value.focus()
    }
    if (!userInfo.value.username) {
        errors.value.username.push('ID를 입력하세요.')
        aif_ref_username.value.focus()
    }

    const formData = {
        username: userInfo.value.username,
        password: userInfo.value.password,
    }

    await axios
        .post('/auth/token/login/', formData)
        .then(response => {
            const token = response.data.auth_token
            // store.state.loginToken = token
            store.commit('setToken', token)
            axios.defaults.headers.common['Authorization'] = 'Token ' + token
            const toPath = route.query.to || '/'
            router.push(toPath)
        })
        .catch(error => {
            errors.value.etc.push('ID나 비밀번호를 잘못 입력하였습니다.')
            if (error.response) {
                console.log('error.response.data:')
                console.log(JSON.stringify(error.response.data))
            } else if (error.message) {
                console.log('error.message')
                console.log(error.message)
            }
        })

}
</script>

<style scope>
.aif-login {
    height: 100% !important;
    width: 100% !important;
    background-image: url('/img/aif-2.jpeg');
    background-repeat: no-repeat;
    background-size: cover;
}

.aif-login-card {
    width: 100%;
    max-width: 300px;
    margin-right: 50px;
    padding: 20px;
    background-color: white;
    /* opacity: .8; */
}

.error-notification {
    text-align: left;
    color: orangered;
    margin-top: 2px;
    margin-bottom: 2px;
    font-size: 14px;
}
</style>
