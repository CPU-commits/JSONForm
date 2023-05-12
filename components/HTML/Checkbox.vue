<script setup lang="ts">
defineProps<{
	value: string
}>()

defineEmits<{
	(e: 'update:value', value: any): void
}>()
</script>

<template>
	<label class="checkbox path">
		<input
			:value="value"
			type="checkbox"
			@change="
				$emit('update:value', ($event.target as HTMLInputElement).value)
			"
		/>
		<svg viewBox="0 0 21 21">
			<path
				d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"
			></path>
		</svg>
		<p><slot /></p>
	</label>
</template>

<style lang="scss" scoped>
.checkbox {
	--background: #fff;
	--border: #d1d6ee;
	--border-hover: #bbc1e1;
	--border-active: var(--color-black);
	--tick: #fff;
	position: relative;
	display: flex;
	gap: 10px;
	input,
	svg {
		width: 18px;
		height: 18px;
		display: block;
	}
	input {
		appearance: none;
		position: relative;
		outline: none;
		background: var(--background);
		border: none;
		margin: 0;
		padding: 0;
		cursor: pointer;
		border-radius: 4px;
		transition: box-shadow 0.3s;
		box-shadow: inset 0 0 0 var(--s, 1px) var(--b, var(--border));
		&:hover {
			--s: 2px;
			--b: var(--border-hover);
		}
		&:checked {
			--b: var(--border-active);
		}
	}
	svg {
		pointer-events: none;
		fill: none;
		stroke-width: 2px;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke: var(--stroke, var(--border-active));
		position: absolute;
		top: 0;
		left: 0;
		width: 18px;
		height: 18px;
		transform: scale(var(--scale, 1)) translateZ(0);
	}
	&.path {
		input {
			&:checked {
				--s: 2px;
				transition-delay: 0.4s;
				& + svg {
					--a: 16.1 86.12;
					--o: 102.22;
				}
			}
		}
		svg {
			stroke-dasharray: var(--a, 86.12);
			stroke-dashoffset: var(--o, 86.12);
			transition: stroke-dasharray 0.6s, stroke-dashoffset 0.6s;
		}
	}
}

p {
	font-size: 0.9rem;
}

@keyframes bounce {
	50% {
		transform: scale(1.2);
	}
	75% {
		transform: scale(0.9);
	}
	100% {
		transform: scale(1);
	}
}
</style>
