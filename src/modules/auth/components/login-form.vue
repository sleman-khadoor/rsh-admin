<template>
	<q-card class="form-container q-pa-lg bg-transparent">
		<q-form @submit="$emit('submit', loginForm)" class="custom-form full-height">
			<q-input
				v-model="loginForm.email"
				autocomplete="username"
				type="text"
				:label="$t('fields.email')"
				:rules="[
					(val) => !!val || $t('rules.required'),
					(val) => isValidEmail(val) || $t('rules.invalidEmail'),
				]"
				lazy-rules
				color="primary"
			/>
			<q-input
				v-model="loginForm.password"
				autocomplete="new-password"
				:type="!passwordVisible ? 'password' : 'text'"
				:label="$t('fields.password')"
				:rules="[
					(val) => !!val || $t('rules.required'),
					(val) => val.length >= 8 || $t('rules.minChar'),
				]"
				lazy-rules
				class="q-mt-sm"
				color="primary"
			>
				<template v-slot:append>
					<q-icon
						:name="!passwordVisible ? 'visibility_off' : 'visibility'"
						class="cursor-pointer"
						color="primary"
						@click="passwordVisible = !passwordVisible"
					/>
				</template>
			</q-input>
			<!-- <div class="flex">
				<q-space></q-space>
				<span class="custom-link" @click="$router.push('/reset-password')">{{
					$t('fields.forgotPass')
				}}</span>
			</div> -->
			<q-btn
				type="submit"
				color="primary"
				:label="$t('actions.login')"
				class="custom-btn q-mx-auto q-mt-xl"
			/>
		</q-form>

		<q-inner-loading :showing="loading">
			<q-spinner-gears size="50px" color="primary" />
		</q-inner-loading>
	</q-card>
</template>

<script>
import { isValidEmail } from '@/utils/validators';
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			loginForm: {
				email: '',
				password: '',
			},
			passwordVisible: false,
		};
	},
	computed: {
		...mapGetters('Auth/Login', ['loading']),
	},
	methods: {
		isValidEmail,
	},
};
</script>

<style lang="scss" scoped>
.form-container {
	width: 100%;
	max-width: 450px;
	border-radius: 20px;
	box-shadow: 2px 2px 8px rgba(255, 255, 255, 0.5);
}

.custom-form {
	width: 450px;
	padding: 0px 40px;
	margin: auto;
}
.custom-link {
	font-size: 15px;
	text-decoration: none;
	font-weight: 500 !important;
	color: $primary;
	cursor: pointer;
}
.line {
	height: 2px;
	background: $grey-7;
	flex: 1 auto;
}
.icon {
	width: 30px;
	height: 30px;
	border-radius: 50%;
	background: black;
}

.icon-small {
	width: 25px;
	height: 25px;
	border-radius: 50%;
	background: black;
}

.text-small {
	font-size: 10px;
}
.custom-btn {
	border-radius: 10px !important;
	text-transform: capitalize !important;
	font-size: 18px;
	width: 160px;
	display: block;
}
</style>
