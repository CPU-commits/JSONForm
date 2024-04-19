<script lang="ts" setup>
// Types
import type { QuestionObject } from '~/models/form/questions.model'

const { question } = defineProps<{
	question: QuestionObject<'Select'>
}>()

// const {} = await useFetch(`/api/v1/questions/${question.}/options`)

const valueRef = ref('')
</script>

<template>
	<HTMLSelect v-model:value="valueRef">
		<option value="">Seleccione una opci&oacute;n</option>
		<option
			v-for="{ value, text } in (question as QuestionObject<'Select'>)
				.options"
			:key="value"
			:value="value"
		>
			{{ text }}
		</option>
	</HTMLSelect>
</template>
