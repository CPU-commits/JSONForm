<script lang="ts" setup>
import type { UserForm } from '~/server/db/adapter/form.adapter'

// Router
const slug = useRoute().params.form as string

const { data: form } = useFetch(`/api/v1/forms/${slug}`)
</script>

<template>
	<NuxtLayout name="dashboard">
		<DashContainer>
			<DashTitle> {{ form?.title }} </DashTitle>
			<Form v-if="form" :form="form as UserForm" :is-preview="true" />
		</DashContainer>
	</NuxtLayout>
</template>
