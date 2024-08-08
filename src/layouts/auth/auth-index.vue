<template>
	<div class="row fullscreen relative-position">
		<div class="col-12 bg-primary">
			<router-view />
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style>
.line {
	content: '';
	display: block;
	position: absolute;
	bottom: 0;
	left: 0;
	height: 70px;
	width: 100%;
	background: rgba(0, 0, 0, 0.1);
}
</style>
