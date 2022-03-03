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
import { onBeforeMount } from 'vue'
import store from '@/store'
import MainHeader from '@/components/main/MainHeader.vue'

// onBeforeMount를 사용하지 않고, onMounted를 사용할 경우
// App.vue의 onMounted보다 컴포넌트인 MainHeader의 onMounted가 먼저 실행됨.
onBeforeMount(() => {
	console.log('App onBeforeMount')
	store.commit('initializeStore')
})
</script>
