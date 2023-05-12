<script setup lang="ts">
const spinner = useSpinner()
const spinnerGet = useSpinnerGet()
</script>

<template>
	<main class="Main">
		<Loading v-if="spinner || spinnerGet" />
		<Header />
		<ToastToasts />
		<div class="Main__container">
			<slot />
		</div>
	</main>
</template>

<style scoped lang="scss">
.Main {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.Main__container {
	margin-top: 20px;
	max-width: 800px;
	width: 100%;
}
</style>
