<script lang="ts" setup>
// Types
// import type { LocaleObject } from '#i18n'
// Stores
const authStore = useAuthStore()
// Route
const route = useRoute()
// const router = useRouter()
// i18n
// const { locale } = useI18n()
// const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()

// Form
// const selectedLocale = ref(locale.value)

const path = ref(route.path)

watch(
	() => route.path,
	(value) => {
		path.value = value
	},
)

/* function switchLocale() {
	router.push(switchLocalePath(selectedLocale.value))
} */
</script>

<template>
	<header class="Header">
		<h1><span class="Header__brackets">{ }</span> json<span>form</span></h1>
		<div v-if="!authStore.isAuth" class="Header__user">
			<HTMLAnchor :href="localePath('/sesion?iniciar=true')">
				Iniciar sesi&oacute;n
			</HTMLAnchor>
			<HTMLAnchor :href="localePath('/sesion')" :with-background="true">
				Registrarse
			</HTMLAnchor>
		</div>
		<div v-else class="Header__user">
			<HTMLAnchor
				:class="{ Selected: path.includes('dashboard') }"
				title="Dashboard"
				:href="localePath('/dashboard')"
			>
				<i class="fa-brands fa-dashcube" />
			</HTMLAnchor>
			<HTMLAnchor
				:class="{ Selected: path.includes('perfil') }"
				title="Perfil"
				:href="localePath('/perfil')"
			>
				<i class="fa-solid fa-user-astronaut" />
			</HTMLAnchor>
			<!--
			<ClientOnly>
				<HTMLSelect
					v-model:value="selectedLocale"
					:on-change="() => switchLocale()"
				>
					<option
						v-for="locale_ in locales"
						:key="(locale_ as LocaleObject).code"
						:value="(locale_ as LocaleObject).code"
					>
						{{ (locale_ as LocaleObject).code }}
					</option>
				</HTMLSelect>
			</ClientOnly>
			-->
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
	background-color: white;
	z-index: var(--z-6);
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
	i {
		font-size: 1.05rem;
		transition: all 0.4s ease;
	}
	i:hover {
		color: var(--color-main);
	}
}

.Selected i {
	color: var(--color-main);
}
</style>
