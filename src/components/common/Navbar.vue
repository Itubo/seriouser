<template>
	<div class="all">
		<slot></slot>
		<h2>{{title}}</h2>
	</div>
</template>

<script>
	export default {
		name: 'NavBar',
		props: ['title'],
	}
</script>

<style scoped="scoped">
	.all {
		height: 50px;
		margin-bottom: 20px;
		position: relative;
	}
	.all i:before {
		text-align: center;
		/* vertical-align: middle; */
		line-height: 50px;
		width: 50px;
		height: 50px;
		font-size: 20px;
	}
	h2 {
		height: 50px;
		/* background-color: skyblue; */
		font-weight: 400;
		font-size: 20px;
		line-height: 50px;
		text-align: center;
		margin: 0 0 20px 0;
		display: inline-block;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
	
</style>