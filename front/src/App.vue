<template>
<q-layout view="hHh lpR fFf">

	<div class="row justify-center">
		<MainHeader/>
		<div class="col-xs-12 col-sm-12 col-md-10 col-lg-8">
			<router-view/>
		</div>
	</div>

</q-layout>
</template>

<script setup>
import { onMounted } from 'vue'
import store from '@/store/index.js'
import MainHeader from '@/components/main/MainHeader.vue'

onMounted(() => {
	console.log('App onMounted')
	store.commit('initializeStore')
})
</script>
