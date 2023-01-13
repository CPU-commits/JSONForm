<script setup lang="ts">
type ButtonType = 'button' | 'submit' | 'reset'

defineProps<{
	withBackground?: boolean
	type: ButtonType
	click?: () => any
}>()
</script>

<template>
	<button
		:type="type"
		:class="{
			WithBackground: withBackground,
			WithoutBackground: !withBackground,
		}"
		@click="click"
	>
		<slot />
	</button>
</template>

<style scoped lang="scss">
button {
	background-color: transparent;
	border: none;
	padding: 6px;
	font-size: 0.8rem;
	transition: all 0.3s;
	position: relative;
	border-bottom: 1px solid transparent;
}

.WithoutBackground::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	height: 1px;
	width: 100%;
	transform: scaleX(0);
	background-color: var(--color-main);
	transform-origin: bottom right;
	transition: transform 0.4s ease-out;
}

.WithoutBackground:hover::after {
	transform: scaleX(1);
	transform-origin: bottom left;
}

.WithBackground {
	background-color: var(--color-black);
	color: white;
}
</style>
