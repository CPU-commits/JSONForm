<script lang="ts" setup>
import type { UserForm } from '~~/server/db/adapter/form.adapter'

// NuxtApp
// const { $formService } = useNuxtApp()
// Data
const form = ref<UserForm | null>(null)

async function saveForm() {
	// if (form.value) await $formService.saveForm(form.value)
}
</script>

<template>
	<NuxtLayout name="dashboard">
		<DashContainer>
			<DashTitle>{{ $t('form.new') }}</DashTitle>
			<br>
			<Form
				v-if="form"
				:form="form"
				:is-preview="true"
				@upload="saveForm"
			/>
		</DashContainer>
	</NuxtLayout>
</template>
