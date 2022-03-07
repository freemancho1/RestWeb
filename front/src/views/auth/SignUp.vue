<template>
<div class="row justify-center">
<div class="aip-auth col-4 text-center">

    <div class="sub-title">AI Platform</div>
    <div class="main-title">Sign Up</div>

    <q-input label="New ID *" 
        color="orange-8" label-color="orange-8"
        v-model="userInfo.username"
        ref="aipRefUsername"
        @keyup.enter="aipRefPassword1.focus()"/>
    <div class="error-notify">
        <p v-for="error in errors.username" :key="error" 
            class="text-left">
            {{ error }}
        </p>
    </div>

    <q-input type="password" label="Password *"  
        color="orange-8" label-color="orange-8"
        v-model="userInfo.password1"
        ref="aipRefPassword1"
        @keyup.enter="aipRefPassword2.focus()"/>
    <div class="error-notify">
        <p v-for="error in errors.password" :key="error" 
            class="text-left">
            {{ error }}
        </p>
    </div>

    <q-input type="password" label="Comform Password *"
        color="orange-8" label-color="orange-8"
        v-model="userInfo.password2"
        ref="aipRefPassword2"
        @keyup.enter="submit"/>

    <div class="error-notify">
        <p v-for="error in errors.etc" :key="error"
            class="text-left" v-html="error"/>
    </div>

    <q-btn label="Sign up" color="orange-8" glossy @click="submit"/>
    <div class="notify text-right">
        Or <a @click="router.push('/auth/login')">Click here</a> to log in.
    </div>

</div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import axios from 'axios'

const router = useRouter()
const $q = useQuasar()

const userInfo = ref({username:'', password1:'', password2:''})
const errors = ref({username:[], password:[], etc:[]})

const aipRefUsername = ref(null)
const aipRefPassword1 = ref(null)
const aipRefPassword2 = ref(null)

const submit = () => {
    errors.value = {username:[], password:[], etc:[]}

    if (userInfo.value.username.length < 4) {
        aipRefUsername.value.focus()
        if (!userInfo.value.username) {
            errors.value.username.push('New ID는 필수 입력 항목입니다.')
        } else {
            errors.value.username.push('New ID는 4글자 이상 입력해야 합니다.')
        }
        return
    }
    if (userInfo.value.password1.length < 4) {
        aipRefPassword1.value.focus()
        if (!userInfo.value.password1) {
            errors.value.password.push('Password는 필수 입력 항목입니다.')
        } else {
            errors.value.password.push('Password는 4글자 이상 입력해야 합니다.')
        }
        return
    }
    if (userInfo.value.password2.length < 4) {
        aipRefPassword2.value.focus()
        if (!userInfo.value.password2) {
            errors.value.password.push('Comform Password는 필수 입력 항목입니다.')
        } else {
            errors.value.password.push('Comform Password는 4글자 이상 입력해야 합니다.')
        }
        return
    }
    if (userInfo.value.password1 !== userInfo.value.password2) {
        aipRefPassword1.value.focus()
        errors.value.password.push('Password와 Conform Password가 일치하지 않습니다.')
        return
    }

    const formData = {
        username: userInfo.value.username,
        password: userInfo.value.password1
    }

    axios
        .post('/auth/users/', formData)
        .then(response => {
            showNotify(`${userInfo.value.username} ID를 등록했습니다.`, 'orange-8')
            console.log(response)
            router.push('/auth/login/')
        })
        .catch(error => {
            if (error.response) {
                for (const property in error.response.data) {
                    errors.value.etc.push(error.response.data[property])
                }
            } else if (error.message) {
                errors.value.etc.push(error.message)
            }
            showNotify(`${userInfo.value.username} ID 등록 중 오류가 발생했습니다.`, 'blue-7')
        })
}

const showNotify = (message, color) => {
    $q.notify({
        message: message,
        color: color,
        position: 'center',
        timeout: 2500
    })
}
</script>

<style lang="scss" scope>
@import "~@/styles/main";
</style>