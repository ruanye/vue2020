<template>
	<div>
		这是孙子组件
		{{$attrs}}
 <button @click="$listeners.c">孙子组件触发</button>
	</div>
</template>