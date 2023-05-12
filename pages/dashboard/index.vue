<script lang="ts" setup>
// Auth
definePageMeta({
	auth: true,
	middleware: 'auth',
})
// Fetch data
const { data: forms } = await useFetch('/api/v1/forms', {
	transform: (forms) =>
		forms.map((form) => ({
			...form,
			createdAt: new Date(form.createdAt as string),
			updatedAt: new Date(form.updatedAt as string),
		})),
})
</script>

<template>
	<NuxtLayout name="dashboard">
		<DashContainer>
			<DashTitle> Formularios </DashTitle>
			<FormCard v-for="form in forms" :key="form.id" :form="form" />
		</DashContainer>
	</NuxtLayout>
</template>
