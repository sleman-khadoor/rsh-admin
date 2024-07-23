<template>
	<q-card class="form-container q-pa-lg bg-transparent">
		<div class="text-subtitle1 text-grey-6 text-center q-mb-lg">
			{{ $t('sentences.twoFA') }}
			<br />
			{{ $t('sentences.sentCode') }}
		</div>

		<q-form @submit="handleSubmit" class="custom-form">
			<q-input
				color="primary"
				v-model="verificationCode"
				type="text"
				:label="$t('fields.code')"
				lazy-rules
				:rules="[(val) => !!val || $t('rules.required')]"
			/>
			<span
				class="float-right text-white-bold custom-link cursor-pointer text-grey-5"
				@click="$emit('back-to-login')"
			>
				{{ $t('actions.backToLogin') }}
			</span>
			<q-btn
				type="submit"
				color="primary"
				:label="$t('actions.send')"
				size="md"
				class="custom-btn q-mx-auto q-mt-xl"
			/>
			<q-inner-loading :showing="loading">
				<q-spinner-gears size="50px" color="primary" />
			</q-inner-loading>
		</q-form>
	</q-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	data() {
		return {
			verificationCode: '',
		};
	},
	computed: {
		...mapGetters('Auth/TwoFactorAuth', ['loading']),
	},
	methods: {
		...mapActions('Auth/TwoFactorAuth', ['towFactorAuth']),
		handleSubmit() {
			this.towFactorAuth(this.verificationCode)
				.then(() => {
					this.$emit('submit');
				})
				.catch((err) => {
					console.log(err);
				});
		},
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
.custom-link {
	font-size: 16px;
	text-decoration: none;
	font-weight: 500 !important;
	color: #2cd889 !important;
}
.custom-form {
	width: 300px;
	margin: auto;
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
