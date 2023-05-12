<script lang="ts" setup>
import { UserForm } from '~~/server/db/adapter/form.adapter'
import { HandleError } from '~~/models/validation/error'

// NuxtApp
const { $formService } = useNuxtApp()
// Data
const form = ref<UserForm | null>(null)
const error = ref<HandleError | null>(null)

async function loadJsonFile(jsonFile: File) {
	error.value = null
	try {
		form.value = await validateJSON(jsonFile)
	} catch (err) {
		error.value = handleError(err)
	}
}

function unloadJsonFile() {
	form.value = null
}

async function saveForm() {
	if (form.value) await $formService.saveForm(form.value)
}
</script>

<template>
	<NuxtLayout name="dashboard">
		<DashContainer>
			<DashTitle>{{ $t('form.new_form') }}</DashTitle>
			<HTMLInputFile
				:validation="{
					icon: 'file-icons:json-1',
					name: 'JSON',
					message: 'Debe seleccionar un archivo tipo JSON',
					type: 'application/json',
				}"
				:replace-all="true"
				@file="(file) => loadJsonFile(file)"
				@delete="unloadJsonFile"
			/>
			<br />
			<pre v-if="error">{{ error.message }}</pre>
			<Form
				v-if="form"
				:form="form"
				:is-preview="true"
				@upload="saveForm"
			/>
		</DashContainer>
	</NuxtLayout>
</template>
