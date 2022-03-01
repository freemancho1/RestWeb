<template>
    <div class="aif-header row items-center justify-center bg-orange-8 q-mb-lg">
        <div class="col-xs-12 col-sm-12 col-md-10 col-lg-8 row">
            <div class="col-8 text-left">
                <span class="material-icons">widgets</span>
                <span class="project-name" @click="goPathMain(0)">
                    {{ siteMenu.title }}
                </span>

                <span v-for="menu in filteredMain" :key="menu.id"
                    class="menu" :class="{ active: menusActive[menu.id] }"
                    @click="goPathMain(menu.id)">
                    {{ menu. label }}
                </span>
            </div>

            <div class="col-4 text-right items-center">
                <span v-for="menu in filteredSide" :key="menu.id"
                    class="menu" :class="{ active: menusActive[menu.id] }"
                    @click="goPathSide(menu.id)">
                    {{ menu. label }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
// import store from '@/store'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const siteMenu = {
	title: 'Modeling',
	menus: [    // displayLevel: 0-항상, 1-로그인 전, 2-로그인 후
                // type: 1-메인(왼쪽) 메뉴, 2-사이드(오른쪽) 메뉴
        { id: 0, label: 'Home', to: '/', displayLevel: 0, type: 1 },
        { id: 1, label: 'Scheduling', to: '/todos', displayLevel: 2, type: 1 },
        { id: 2, label: 'Login', to: '/auth/login', displayLevel: 1, type: 2 },
        { id: 3, label: 'Signup', to: '/auth/signup', displayLevel: 1, type: 2 },
        { id: 4, label: 'Account', to: '/auth/account', displayLevel: 2, type: 2 },
        { id: 5, label: 'Logout', to: '/auth/logout', displayLevel: 2, type: 2 },
        { id: 6, label: 'BBS', to: '/bbs', displayLevel: 0, type: 1 },
    ]
}
const menuFilter = {  
    beforLogin: (menus) => menus.filter((menu) => menu.displayLevel !== 2),
    afterLogin: (menus) => menus.filter((menu) => menu.displayLevel !== 1)
}
const mainFilter = siteMenu.menus.filter((menu) => menu.type === 1)
const sideFilter = siteMenu.menus.filter((menu) => menu.type === 2)
const loginState = computed(() => store.state.isAuthenticated ? 'afterLogin': 'beforLogin')
const filteredMain = computed(() => menuFilter[loginState.value](mainFilter))
const filteredSide = computed(() => menuFilter[loginState.value](sideFilter))

const menusActive = ref([])
const lastMenuId = computed(() => store.state.lastMenuId)

const fillTrue = (id) => {
    menusActive.value.fill(false)
    menusActive.value[id] = true
    localStorage.setItem('lastMenuId', id)
}
function logout() {
    store.commit('removeToken')
    fillTrue(0)
    console.log('logout 1')
    router.replace(siteMenu.menus[0].to)
    console.log('logout 2')
}
const goPathMain = (id) => {
    fillTrue(id)
    router.push(siteMenu.menus[id].to)
}
const goPathSide = (id) => {
    if (siteMenu.menus[id].label === 'Logout') {
        logout()
    } else {
        fillTrue(id)
        router.push(siteMenu.menus[id].to)
    }
}
</script>

<style lang="scss" scope>
.aif-header {
    padding-top: 10px;
    width: 100%;
    height: 70px;
}
.aif-header span {
    font-size: 16px;
    color: #facc80;
    font-weight: bold;
    cursor: pointer;
    // text-shadow:1px 1px 1px #000;
}
.aif-header span.active {
    color: #f1f8e9;
    font-weight: bold;
    text-shadow:3px 3px 3px #795548;
    border-bottom: 3px solid #f1f8e9;
    border-radius: 10px;
    padding-bottom: 5px;
}
.aif-header span.menu {
    padding-left: 15px;
    padding-right: 15px;
}
.aif-header span.project-name {
    color: #f1f8e9;
    font-size: 20px;
    margin-left: 10px;
    margin-right: 30px;
}
.aif-header span.material-icons {
    color: white;
    font-size: 30px;
    // margin-left: 20px;
    padding-bottom: 15px;
    // text-shadow:3px 3px 3px #795548;
}
.aif-header .text-right {
    padding-top: 10px;
}
</style>