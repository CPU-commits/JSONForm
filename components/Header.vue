<template>
	<header class="Header">
		<h1><span class="Header__brackets">{ }</span> json<span>form</span></h1>
		<div class="Header__user">
			<HTMLAnchor href="/sesion?iniciar=true">
				Iniciar sesi&oacute;n
			</HTMLAnchor>
			<HTMLAnchor href="/sesion" :with-background="true">
				Registrarse
			</HTMLAnchor>
		</div>
	</header>
</template>

<style scoped lang="scss">
.Header {
	margin: 5px;
	box-sizing: border-box;
	height: 40px;
	width: 100%;
	top: 0;
	position: sticky;
	display: flex;
	justify-content: space-around;
	align-items: center;
	h1 {
		font-size: 1.1rem;
		font-weight: 500;
		display: flex;
		align-items: center;
		.Header__brackets {
			color: var(--color-main);
			font-family: 'Overpass', sans-serif;
			font-weight: 500;
			font-size: 1.5rem;
			margin-right: 5px;
			margin-top: 3px;
		}
		span {
			font-weight: 300;
			font-family: 'Roboto', sans-serif;
		}
	}
}
</style>
