<script lang="ts" setup>
import type { QuestionObject } from '~~/models/form/questions.model'

defineProps<{
	question: QuestionObject
	index: number
}>()

const valueRef = ref<any | null>(null)
</script>

<template>
	<article class="Question">
		<header>
			<span>
				{{ index }}.
				{{ question.description }}
			</span>
		</header>
		{{ question }}
		<!-- Inputs -->
		<HTMLInput v-if="question.kind === 'Text'" v-model:value="valueRef" />
		<HTMLInput
			v-else-if="question.kind === 'Date'"
			v-model:value="valueRef"
			type="date"
		/>
		<HTMLInputFile
			v-else-if="question.kind === 'File'"
			@file="(file) => (valueRef = file)"
		/>
		<FormQuestionSelect
			v-else-if="question.kind === 'Select'"
			:question="question as QuestionObject<'Select'>"
		/>
		<div v-else-if="question.kind === 'Multiple'" class="Multiple">
			<HTMLCheckbox
				v-for="{ value, text } in (
					question as QuestionObject<'Multiple'>
				).options"
				:key="value"
				:value="value"
				@update:value="
					() => {
						if (valueRef === null) valueRef = [value]
						else valueRef.push(value)
					}
				"
			>
				{{ text }}
			</HTMLCheckbox>
		</div>
		<HTMLInput
			v-else-if="question.kind === 'Number'"
			v-model:value="valueRef"
			type="number"
		/>
		<HTMLInput
			v-else-if="question.kind === 'Email'"
			v-model:value="valueRef"
			type="email"
		/>
		<HTMLInput
			v-else-if="question.kind === 'URL'"
			v-model:value="valueRef"
			type="url"
		/>
	</article>
</template>

<style scoped>
.Question {
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
	padding: 10px;
}

.Multiple {
	display: flex;
	flex-direction: column;
	gap: 10px;
	border: 1px solid var(--color-gray);
	padding: 8px;
	border-radius: 5px;
}
</style>
