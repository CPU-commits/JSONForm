<script setup lang="ts">
defineProps<{
	withBorder?: boolean
	submit: () => any
}>()
</script>

<template>
	<form :class="{ WithBorder: withBorder }" @submit.prevent="submit">
		<slot />
	</form>
</template>

<style lang="scss">
form {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 15px;
	gap: 15px;
	box-sizing: border-box;
}

.WithBorder {
	border: 1px solid var(--color-gray);
}
</style>
