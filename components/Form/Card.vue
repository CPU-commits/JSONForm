<script lang="ts" setup>
import { UserForm } from '~/server/db/adapter/form.adapter'

defineProps<{
	form: UserForm
}>()
</script>

<template>
	<article class="Form">
		<header>
			<h3>{{ form.title }}</h3>
			{{ form.description }}
		</header>
	</article>
</template>
