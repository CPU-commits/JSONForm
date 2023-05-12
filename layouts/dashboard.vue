<template>
	<section class="Dashboard">
		<DashNav />
		<slot />
	</section>
</template>

<style lang="scss" scoped>
.Dashboard {
	display: flex;
	gap: 10px;
}
</style>
