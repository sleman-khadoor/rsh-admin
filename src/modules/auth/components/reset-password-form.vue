<template>
	<q-card style="width: 60vw; max-width: 500px" class="q-pa-md">
		<q-card-section class="flex items-center q-pb-none">
			<div class="text-h6 text-primary">
				{{ $t('actions.reset')  }}
			</div>
			<q-space />
			<q-btn icon="close" flat round dense v-close-popup />
		</q-card-section>
		<q-card-section>
			<q-form @submit="submitHandler">
				<div class="row justify-between q-mt-sm">
					<div class="col-12">
					<q-input
						color="primary"
						v-model="form.old_password"
						dense
						outlined
						:type="!passwordVisible ? 'password' : 'text'"
						:label="$t('fields.oldPass')"
						:rules="[
							(val) => !!val || $t('rules.required'),
							(val) => val.length >= 8 || $t('rules.minChar'),
							(val) => isValidPassword(val) || $t('rules.invalidPass'),
						]"
						lazy-rules
					>
						<template v-slot:append>
							<q-icon
								color="primary"
								:name="!passwordVisible ? 'visibility_off' : 'visibility'"
								class="cursor-pointer"
								@click="passwordVisible = !passwordVisible"
							/>
						</template>
					</q-input>
					</div>
					<div class="col-12">
					<q-input
						color="primary"
						v-model="form.new_password"
						dense
						outlined
						:type="!passwordVisible ? 'password' : 'text'"
						:label="$t('fields.newPass')"
						:rules="[
							(val) => !!val || $t('rules.required'),
							(val) => val.length >= 8 || $t('rules.minChar'),
							(val) => isValidPassword(val) || $t('rules.invalidPass'),
						]"
						lazy-rules
					>
						<template v-slot:append>
							<q-icon
								color="primary"
								:name="!passwordVisible ? 'visibility_off' : 'visibility'"
								class="cursor-pointer"
								@click="passwordVisible = !passwordVisible"
							/>
						</template>
					</q-input>
					</div>
					<div class="col-12">
					<q-input
						color="primary"
						v-model="form.new_password_confirmation"
						dense
						outlined
						:type="!passwordVisible2 ? 'password' : 'text'"
						:label="$t('fields.confirmPass')"
						:rules="[
							(val) => !!val || $t('rules.required'),
							(val) => val.length >= 8 || $t('rules.minChar'),
							(val) => val === form.new_password || $t('rules.passNoMatch'),
						]"
						lazy-rules
					>
						<template v-slot:append>
							<q-icon
								color="primary"
								:name="!passwordVisible2 ? 'visibility_off' : 'visibility'"
								class="cursor-pointer"
								@click="passwordVisible2 = !passwordVisible2"
							/>
						</template>
					</q-input>
					</div>
				</div>
				<div class="q-mt-md">
					<q-btn
						type="submit"
						:label="$t('actions.reset')"
						color="primary"
						class="full-width"
					/>
				</div>
			</q-form>
		</q-card-section>

		<q-inner-loading :showing="isLoading">
			<q-spinner-gears size="50px" color="primary" />
		</q-inner-loading>
	</q-card>
</template>

<script>
import { isValidPassword } from '@/utils/validators';
export default {
	props: {
		isLoading: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			form: {
				old_password: null,
				new_password: null,
				new_password_confirmation: null,
			},
			passwordVisible: false,
			passwordVisible2: false,
		};
	},

	methods: {
		isValidPassword,
		submitHandler() {
			const payload = {
				...this.form,
			};
			console.log('object reset component', payload);
			this.$emit('reset', payload);
		},
	},
};
</script>

<style lang="scss"></style>
