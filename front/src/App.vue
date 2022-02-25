<template>
<q-layout view="hHh lpR fFf">
	<q-header elevated class="bg-primary text-white" height-hint="98">
		<q-toolbar>
			<q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
			<q-toolbar-title>
				<q-avatar>
					<img src="/img/icons/favicon-32x32.png" />
				</q-avatar>
				공부방
			</q-toolbar-title>
			<q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
		</q-toolbar>
		<q-tabs align="center">
			<q-route-tab to="/" label="할일 목록" />
			<q-route-tab to="/about" label="생각중" />
		</q-tabs>
	</q-header>
</q-layout>
</template>

<script setup>
const toggleLeftDrawer = () => {}
const toggleRightDrawer = () => {}
</script>

<style lang="scss">
html, body {
	height: 100%;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	background-color: rgb(231, 230, 230);
	height: 100%;
}

#container {
	border-width: 0 0 0 1px;
	border-style: solid;
	border-color: orangered;
	min-width: 1000px;
	max-width: 1000px;
	background-color: white;
	padding: 10px;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
