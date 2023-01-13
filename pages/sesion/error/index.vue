<script setup lang="ts">
// Route
const route = useRoute()

const error = route.query.error
</script>

<template>
	<section class="Error">
		<h1>
			<i class="fa-solid fa-bomb"></i> Parece que algo sali&oacute; mal...
		</h1>
		<h3>
			{{ error }}
			<HTMLAnchor href="/sesion" :with-background="true">
				Volver a sesi&oacute;n
			</HTMLAnchor>
		</h3>
	</section>
</template>

<style scoped lang="scss">
.Error {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;
	h1 {
		font-size: 2rem;
	}
	h3 {
		margin-top: 20px;
		display: flex;
		justify-content: center;
		gap: 10px;
		align-items: center;
	}
}
</style>
