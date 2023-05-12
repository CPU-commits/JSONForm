<script lang="ts" setup>
defineProps<{
	icon: string
	click: () => any
}>()
</script>

<template>
	<button type="button" @click="click">
		<i :class="icon"></i>
	</button>
</template>

<style scoped lang="scss">
button {
	background-color: transparent;
	border: none;
	i {
		color: white;
	}
}
</style>
