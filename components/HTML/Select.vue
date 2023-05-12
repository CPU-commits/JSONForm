<script lang="ts" setup>
const props = defineProps<{
	onChange?: () => any
	value: string
}>()

const emits = defineEmits<{
	(e: 'update:value', value: string): void
}>()

function change(event: Event) {
	const value = (event.target as HTMLInputElement).value
	emits('update:value', value)
	if (props.onChange) props.onChange()
}
</script>

<template>
	<select :value="value" @change="(event) => change(event)">
		<slot />
	</select>
</template>

<style scoped>
select {
	border: 1px solid var(--color-gray);
	background-color: transparent;
	padding: 8px;
}
</style>
