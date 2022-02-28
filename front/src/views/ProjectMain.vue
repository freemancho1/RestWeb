<template>
<q-layout view="hHh lpR fFf">

	<q-header class="bg-orange glossy shadow-2 text-white" height-hint="98">

		<q-toolbar>
	
			<q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
	
			<q-toolbar-title style="max-width: 200px;">
				<!-- <q-avatar>
					<img src="/favicon.ico" />
				</q-avatar> -->
				{{ siteMenu.title }}
			</q-toolbar-title>

			<!-- <q-btn dense flat round icon="menu" @click="toggleRightDrawer" /> -->
	
			<q-tabs align="left">
				<q-route-tab v-for="menu in siteMenu.menus" :key="menu.id"
					:to="menu.to" :label="menu.label" />
			</q-tabs>
	
		</q-toolbar>

	</q-header>

	<q-drawer show-if-above v-if="isLeftDrawerOpen" side="left">
	</q-drawer>
	<q-drawer show-if-above v-if="isRightDrawerOpen" side="right">
	</q-drawer>

	<q-page-container class="column" style="height: 100%;">
		<div class="col-12 row justify-center q-pa-md">
			<router-view class="col-xs-12 col-sm-12 col-md-10 col-lg-8"/>
		</div>
	</q-page-container>

	<q-footer class="bg-grey-3 text-grey shadow-up-2">
		<q-toolbar>
			<q-toolbar-title align="left">
				Freeman's Room
			</q-toolbar-title>
			<q-item class="items-center">Copyright(c) 2022, Freeman</q-item>
		</q-toolbar>
	</q-footer>

</q-layout>
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
