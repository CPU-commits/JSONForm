<script setup lang="ts">
defineProps<{
	withBackground?: boolean
	href: string
}>()
</script>

<template>
	<NuxtLink :class="{ WithBackground: withBackground }" :href="href">
		<slot />
	</NuxtLink>
</template>

<style scoped lang="scss">
a {
	background-color: transparent;
	border: none;
	padding: 5px;
	font-size: 0.8rem;
	text-decoration: none;
}

.WithBackground {
	background-color: var(--color-black);
	color: white;
}
</style>
