<template>
	<div class="q-pa-md flex column">
		<two-fa-form @back-to-login="$router.push('/login')" />
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import TwoFaForm from 'src/modules/auth/components/two-fa-form.vue';

export default {
	components: {
		TwoFaForm,
	},
	methods: {
		...mapActions('Auth/TwoFactorAuth', ['towFactorAuth']),
	},
};
</script>

<style></style>
