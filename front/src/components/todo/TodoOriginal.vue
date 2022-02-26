<template>
<div class="my-sub-view todo-original">

    <div class="text-h5 text-blue-grey text-weight-bold">
        {{ info.title }}
    </div>

    <q-input type="text" class="q-my-md" 
        label-color="blue-grey-4" input-style="color: grey"
        :label="info.inputLabel" v-model="inputTodo" 
        @blur="doneEdit" @keyup.enter="doneEdit" @keyup.escape="cancelEdit">
        <template v-slot:before>
            <q-checkbox v-model="toggleAll" 
                checked-icon="check_box_outline_blank" unchecked-icon="apps"
                color="blue-grey" keep-color/>
        </template>
    </q-input>

    <q-list v-if="todos.length" style="margin: 0 -15px 0 -15px">
        <q-item clickable v-for="todo in todos" :key="todo.id">
            <q-item-section side>
                <q-checkbox v-model="todo.is_completed"
                    checked-icon="task_alt" unchecked-icon="radio_button_unchecked"
                    color="orange" keep-color/>
            </q-item-section>
            <q-item-section>
                <div class="text-h6 text-weight-bold">{{ todo.title }}</div>
            </q-item-section>
            <q-item-section side>
                <q-btn flat dense round icon="delete"
                    class="gt-xs text-grey-8 q-qutter-xs" size="12px"
                    @click="deleteTodo(todo)" />
            </q-item-section>
        </q-item>
    </q-list>
    <div v-else class="text-h6 text-center text-blue-grey">{{ info.emptyTodos }}</div>

</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const info = {
    title: '비지도 학습',
    inputLabel: '모델링 일정을 입력하세요:',
    emptyTodos: '등록된 모델링 일정이 없습니다.',
}

const inputTodo = ref('')
const todos = ref([])
const toggleAll = ref(false)

function doneEdit(e) {
    if (!inputTodo.value.length) return
    const newTodo = {
        id: todos.value.length + 1,
        title: inputTodo.value,
        is_completed: false
    }
    todos.value.push(newTodo)
    e.target.focus()
    inputTodo.value = ''
    console.log('done')
}

function cancelEdit(e) {
    inputTodo.value = ''
    console.log('cancel')
}

function deleteTodo(todo) {
    // console.log(`TodoOriginal.deleteTodo(todos.value.indexOf(todo)): ${todos.value.indexOf(todo)}`)
    todos.value.splice(todos.value.indexOf(todo), 1)
}

function getTodosFromServer() {
    console.log('TodoOriginal.getTodosFromServer Start.')
    axios 
        .get('/api/todo/')
        .then(response => {
            todos.value = response.data 
            if (!todos.value.length) todos.value = []
            console.log(`TodoOriginal.getTodosFromServer(todos.value.length): ${todos.value.length}`)
            console.log('TodoOriginal.getTodosFromServer(todos.value):')
            console.log(todos.value)
        })
        .catch(error => {
            console.log(`TodoOriginal.getTodosFromServer ${error}`)
        })
}

onMounted(() => {
    axios 
        .get('/api/todo/')
        .then(response => {
            todos.value = response.data 
            if (!todos.value.length) todos.value = []
            console.log(`TodoOriginal.onMounted(todos.value.length): ${todos.value.length}`)
            console.log('TodoOriginal.onMounted(todos.value):')
            console.log(todos.value)
        })
        .catch(error => {
            console.log(`TodoOriginal.onMounted ${error}`)
        })
    console.log(`TodoOriginal.onMounted(todos.value.length): ${todos.value.length}`)
})
</script>