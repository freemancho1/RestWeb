<template>
<div class="aif-login row items-center justify-end">
    <div class="aif-login-card text-blue-grey text-center">
        <h3>Modeling Login.</h3>
        
        <q-input label="ID:" v-model="userInfo.userId" ref="aif_ref_userId"/>
        <div v-if="errors.userId" class="q-mb-md">
            <p v-for="error in errors.userId" :key="error" class="error-notification">
                {{ error }}
            </p>
        </div>

        <q-input label="Password:" v-model="userInfo.password"
            ref="aif_ref_password"/>
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
import { ref } from 'vue'

const userInfo = ref({
    userId: '',
    password: ''
})
const errors = ref({
    userId: [],
    password: [],
    etc: []
})
const aif_ref_userId = ref(null)
const aif_ref_password = ref(null)

const submit = async () => {
    errors.value = { userId: [], password: [], etc: [] }
    localStorage.removeItem('aif_loginToken')
    
    if (!userInfo.value.password) {
        errors.value.password.push('비밀번호를 입력하세요.')
        aif_ref_password.value.focus()
    }
    if (!userInfo.value.userId) {
        errors.value.userId.push('ID를 입력하세요.')
        aif_ref_userId.value.focus()
    }

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
    max-width: 400px;
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
}
</style>
