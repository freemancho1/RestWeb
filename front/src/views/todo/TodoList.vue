<template>
<div class="todo-list">

    <!-- <q-header height-hint="98">
		<q-toolbar class="text-white">

            <q-btn dense flat round class="bg-white text-primary" 
                icon="chevron_left" @click="$router.replace('/')"/>

            <q-toolbar-title>
				{{ viewInfo.title }}
			</q-toolbar-title>

		</q-toolbar>
	</q-header> -->

    <q-tabs v-model="menuTab" indicator-color="blue-grey" class="text-primary">
        <q-tab v-for="tab in tabs" :key="tab.id"
            :name="tab.name" :icon="tab.icon" 
            class="text-blue-grey-14 text-weight-bold" :label="tab.name"/>
    </q-tabs>

    <!-- <q-separator/> -->

    <q-tab-panels v-model="menuTab" dense animated>
        <q-tab-panel v-for="tab in tabs" :key="tab.id" :name="tab.name">
            <component v-bind:is="tab.component"/>
        </q-tab-panel>
    </q-tab-panels>

</div>
</template>

<script setup>
import { ref } from 'vue'
import TodoOriginal from '@/components/todo/TodoOriginal.vue'
import TodoOthers from '@/components/todo/TodoOthers.vue'

const viewInfo = {
    title: '모델링 관리',
}

const tabs = [
    { id: 1, name: '비지도학습', icon: 'list', component: TodoOriginal },
    { id: 2, name: '기타', icon: 'more_horiz', component: TodoOthers },
]
const menuTab = ref(tabs[0].name)

</script>