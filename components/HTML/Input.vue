<script setup lang="ts">
defineProps<{
	labelText?: string
	value: string
	type?: string
}>()

defineEmits<{
	(e: 'update:value', value: any): void
}>()
</script>

<template>
	<article>
		<label class="input">
			<input
				:value="value"
				class="input__field"
				:type="type ? type : 'text'"
				placeholder=" "
				@input="
					$emit(
						'update:value',
						($event.target as HTMLInputElement).value,
					)
				"
			/>
			<span v-if="labelText" class="input__label">{{ labelText }}</span>
		</label>
	</article>
</template>

<style lang="scss" scoped>
$size-bezel: 0.5rem;

article {
	width: 100%;
}

.input {
	width: 100%;
	box-sizing: border-box;
	border: none;
	transition: all 0.2s ease;
	position: relative;
	cursor: text;

	&__label {
		position: absolute;
		left: 0;
		top: 0;
		padding: calc($size-bezel * 0.75) calc($size-bezel * 0.5);
		margin: calc($size-bezel * 0.75 + 3px) calc($size-bezel * 0.5);
		white-space: nowrap;
		transform: translate(0, 0);
		transform-origin: 0 0;
		background: white;
		transition: transform 120ms ease-in;
		font-weight: bold;
		line-height: 1.2;
	}
	&__field {
		box-sizing: border-box;
		display: block;
		width: 100%;
		padding: calc($size-bezel * 1.5) $size-bezel;
		color: currentColor;
		background: transparent;

		&:focus,
		&:not(:placeholder-shown) {
			& + .input__label {
				transform: translate(0.25rem, -65%) scale(0.8);
				color: var(--color-main);
			}
		}
	}
}

input {
	border: 1px solid var(--color-gray);
}

input:focus {
	outline: none;
}

span {
	font-size: 0.9rem;
}
</style>
