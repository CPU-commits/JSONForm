<script lang="ts" setup>
import { QuestionObject } from '~~/models/form/questions.model'
import { UserForm } from '~~/server/db/adapter/form.adapter'

const props = withDefaults(
	defineProps<{
		isPreview?: boolean
		form: UserForm
	}>(),
	{ isPreview: false },
)

const emit = defineEmits<{
	(e: 'upload', v: void): void
}>()

function sortQuestions(questions: Array<QuestionObject>) {
	if (!props.form.basedOnIndex) return questions
	return questions.sort((a, b) => (a.index as number) - (b.index as number))
}

function submitForm() {
	if (props.isPreview) emit('upload')
}
</script>

<template>
	<section class="Form">
		<header>
			<h2>{{ form.title }}</h2>
			<p>{{ form.description }}</p>
			<footer>
				<small v-if="form.anonymous">
					<i class="fa-solid fa-user-secret"></i>
					Anónimo
				</small>
				<small v-if="!form.isPublic">
					<i class="fa-solid fa-lock"></i>
					No p&uacute;blico
				</small>
				<small v-if="isPreview">
					<i class="fa-solid fa-wand-magic-sparkles"></i>
					Previsualización
				</small>
			</footer>
		</header>
		<HTMLForm class="Form__questions" :submit="submitForm">
			<LazyFormQuestion
				v-for="(question, i) in sortQuestions(form.questions)"
				:key="i"
				:question="question"
				:index="form.basedOnIndex ? question.index as number : i + 1"
			/>
			<footer>
				<HTMLButton v-if="isPreview" type="submit">
					Subir formulario
				</HTMLButton>
			</footer>
		</HTMLForm>
	</section>
</template>

<style scoped lang="scss">
.Form__questions {
	width: 100%;
}

header footer {
	display: flex;
	gap: 10px;
	justify-content: center;
	small {
		background-color: var(--color-black);
		color: white;
		i {
			color: var(--color-main);
		}
		padding: 4px;
		border-radius: 8px;
	}
}

form {
	padding: 0;
}

p {
	padding: 10px;
	border-bottom: 1px solid var(--color-gray);
}

footer {
	margin: 20px 0;
}

button {
	width: 100%;
}
</style>
