<script lang="ts" setup>
const props = defineProps<{
	validation?: {
		name: string
		icon: string
		message: string
		type: string
	}
	replaceAll?: boolean
}>()

// Emits
const emit = defineEmits<{
	(e: 'file', file: File): void
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	(e: 'delete', file: File): void
}>()
// Stores
const { addToast } = useToastsStore()

// Data
const inputFile = ref<HTMLInputElement | null>(null)
const filesRef = ref<Array<File>>([])

function validateFile() {
	if (props.replaceAll) filesRef.value = []
	const files = inputFile.value?.files
	if (files && (files?.length ?? 0) > 0) {
		try {
			const file = files[0]
			if (props.validation && props.validation.type !== file.type)
				throw new Error(props.validation?.message)

			filesRef.value.push(file)
			emit('file', file)
		} catch (err) {
			addToast({
				type: 'error',
				message: (err as Error).message,
			})
		} finally {
			if (inputFile.value) inputFile.value.value = ''
		}
	}
}
</script>

<template>
	<div class="InputFile">
		<div class="InputFile__select" @click="inputFile?.click">
			<Icon v-if="validation" :name="validation.icon" />
			<input ref="inputFile" type="file" @change="validateFile" />
			<span>
				Seleccionar archivo
				<span v-if="validation">({{ validation.name }})</span>
			</span>
		</div>
		<div v-if="filesRef.length > 0" class="InputFile__file">
			<span v-for="(file, i) in filesRef" :key="i">
				{{ file.name }}
				<HTMLButtonIcon
					:click="
						() => {
							$emit('delete', file)
							filesRef.splice(i, 1)
						}
					"
					icon="fa-solid fa-xmark"
				/>
			</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.InputFile {
	border: 1px solid var(--color-gray);
	padding: 8px;
	cursor: default;
}

.InputFile__select {
	display: flex;
	justify-content: center;
	gap: 10px;
}

.InputFile__file {
	display: flex;
	justify-content: center;
	gap: 10px;
	span {
		color: white;
		padding: 4px;
		display: flex;
		align-items: center;
		gap: 5px;
		border-radius: 5px;
		background-color: var(--color-black);
	}
}

input {
	display: none;
}
</style>
