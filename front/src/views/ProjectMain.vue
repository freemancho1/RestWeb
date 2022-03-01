<template>
<div class="bg-red">aa</div>
</template>

<script setup>
import { ref } from 'vue'

const siteMenu = {
	title: 'Freeman',
	menus: [
		{ id: 0, label: 'Home', to: '/' },
		{ id: 1, label: 'Scheduling', to: '/todos' },
		{ id: 2, label: 'Login', to: '/auth/login' },
	]
}

const isLeftDrawerOpen = ref(false)
const isRightDrawerOpen = ref(false)

const toggleLeftDrawer = () => {}
const toggleRightDrawer = () => {}
</script>

<style lang="scss">
</style>
