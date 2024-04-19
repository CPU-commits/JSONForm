<script lang="ts" setup>
// Route
const route = useRoute()
// i18n
const localePath = useLocalePath()

const path = ref(route.path)

watch(
	() => route.path,
	(value) => {
		path.value = value
	},
)
</script>

<template>
	<nav class="DashNav">
		<HTMLAnchor
			:class="{ Selected: path.includes(localePath('/dashboard')) }"
			href="/dashboard"
		>
			<i class="fa-solid fa-clipboard"></i>
		</HTMLAnchor>
		<!--
		<HTMLAnchor
			:class="{ Selected: path === localePath('/dashboard/forms/new') }"
			href="/dashboard/forms/new"
		>
			<i class="fa-solid fa-square-plus"></i>
		</HTMLAnchor>
		-->
		<HTMLAnchor
			:class="{ Selected: path === localePath('/dashboard/forms/docs') }"
			href="/dashboard/forms/docs"
		>
			<i class="fa-solid fa-book"></i>
		</HTMLAnchor>
	</nav>
</template>

<style lang="scss" scoped>
.DashNav {
	height: 100%;
	position: sticky;
	width: 40px;
	border-radius: 8px;
	display: flex;
	top: 50px;
	flex-direction: column;
	align-items: center;
	background: rgba(10, 10, 10, 0.9);
	-webkit-backdrop-filter: blur(5px);
	backdrop-filter: blur(5px);
	border: 1px solid rgba(10, 10, 10, 0.45);
	border: 1px solid rgba(34, 34, 34, 0.45);
	i {
		color: white;
		padding: 8px;
		transition: all 0.3s ease;
		font-size: 1rem;
	}
	i:hover {
		color: var(--color-main);
	}
}

.Selected i {
	color: var(--color-main);
}
</style>
