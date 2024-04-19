<script lang="ts" setup>
import type { UserForm } from '~/server/db/adapter/form.adapter'

defineProps<{
	form: Omit<UserForm, 'questions'>
}>()
</script>

<template>
	<article class="Form">
		<NuxtLink :to="`/dashboard/${form.uid}`">
			<header>
				<h3>{{ form.title }}</h3>
				<span v-if="form.isPublic">
					<i class="fa-solid fa-globe"></i>
					P&uacute;blico
				</span>
			</header>
		</NuxtLink>
		<footer class="Form__footer">
			<small v-if="form.updatedAt">
				{{ formatDate(form.updatedAt) }}
			</small>
			<small v-if="form.anonymous" class="Form__footer--anon">
				<i class="fa-solid fa-user-secret"></i>
				An&oacute;nimo
			</small>
		</footer>
	</article>
</template>

<style scoped lang="scss">
.Form {
	border-bottom: 1px solid var(--color-gray);
	padding: 15px;
}

a {
	text-decoration: none;
}

.Form header {
	display: flex;
	justify-content: space-between;
}

.Form__footer {
	display: flex;
	gap: 10px;
	align-items: center;
}

.Form__footer--anon {
	background-color: var(--color-black);
	border-radius: 3px;
	padding: 2px 4px;
	color: white;
}

i {
	color: var(--color-main);
}
</style>
