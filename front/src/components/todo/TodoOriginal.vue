<template>
<div class="my-sub-view todo-original">

    <div class="row">
        <div class="col-8 text-h5 text-blue-grey text-weight-bold">
            {{ info.title }}
        </div>
        <div class="col-4 text-right">
            <q-radio v-model="visibility" val="all" 
                label="All" class="text-blue-grey" color="blue-grey"/>
            <q-radio v-model="visibility" val="active" 
                label="Active" class="text-blue-grey q-ml-md" color="blue-grey"/>
            <q-radio v-model="visibility" val="completed" 
                label="Completed" class="text-blue-grey q-ml-md" color="blue-grey"/>
        </div>
    </div>

    <q-input type="text" class="q-my-md" 
        label-color="blue-grey-4" input-style="color: grey"
        :label="info.inputLabel" v-model="inputTodo" 
        @blur="doneEdit" @keyup.enter="doneEdit" @keyup.escape="cancelEdit">
        <template v-slot:before>
            <q-checkbox v-model="toggleAll" @click="toggleTodos"
                checked-icon="check_box_outline_blank" unchecked-icon="apps"
                color="blue-grey" keep-color/>
        </template>
    </q-input>

    <q-list v-if="filteredTodos.length" style="margin: 0 -15px 0 -15px">
        <q-item clickable v-for="todo in filteredTodos" :key="todo.id">
            <q-item-section side>
                <q-checkbox v-model="todo.is_completed"
                    checked-icon="task_alt" unchecked-icon="radio_button_unchecked"
                    @click="toggleTodo(todo)"
                    color="orange" keep-color/>
            </q-item-section>
            <q-item-section class="todo-item">
                <div class="text-h6 text-weight-bold text-blue-grey-6"
                    :class="{ completed: todo.is_completed }">
                    {{ todo.title }}
                </div>
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
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const info = {
    title: '비지도 학습',
    inputLabel: '모델링 일정을 입력하세요:',
    emptyTodos: '등록된 모델링 일정이 없습니다.',
}

const inputTodo = ref('')
const todos = ref([])
const toggleAll = ref(false)
const filters = {
    all: (todos) => todos,
    active: (todos) => todos.filter((todo) => !todo.is_completed),
    completed: (todos) => todos.filter((todo) => todo.is_completed),
}
const visibility = ref('all')
const filteredTodos = computed(() => filters[visibility.value](todos.value))

function doneEdit(e) {
    if (!inputTodo.value.length) return
    const newTodo = {
        title: inputTodo.value,
        memo: 'test',
    }

    axios
        .post('/api/todo/', newTodo)
        .then(response => {
            todos.value.unshift(response.data)
            // todos.value.push(response.data)
            // todos.value.sort((a, b) => b.id - a.id)
        })
        .catch(error => {
            console.log(error)
        })

    e.target.focus()
    inputTodo.value = ''
}

function toggleTodo(todo) {
    axios 
        .put(`/api/todo/${todo.id}/`, todo)
        .then(response => {})
        .catch(error => {
            console.log(error)
        })
}

function toggleTodos() {
    filteredTodos.value.forEach((todo) => {
        todo.is_completed = toggleAll.value
        toggleTodo(todo)
    })
}

function cancelEdit(e) {
    inputTodo.value = ''
}

function deleteTodo(todo) {
    todos.value.splice(todos.value.indexOf(todo), 1)
    todo.is_delete = true
    axios 
        .put(`/api/todo/${todo.id}/`, todo)
        .then(response => {})
        .catch(error => {
            console.log(error)
        })
}

function getTodosFromServer() {
    axios 
        .get('/api/todo/')
        .then(response => {
            todos.value = response.data 
        })
        .catch(error => {
            console.log(`TodoOriginal.getTodosFromServer ${error}`)
        })
}

onMounted(() => {
    getTodosFromServer()
})
</script>

<style scope>
.todo-item div.completed {
    color: rgb(206, 201, 201) !important;
	text-decoration: line-through;    
}
</style>