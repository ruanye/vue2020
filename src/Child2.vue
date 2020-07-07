<template>
	<div>这是二儿子
		{{value}}
		<button @click="changeParent">儿子存钱</button>
	</div>
</template>
<script>
/* eslint-disable */
export default {
	 props:{
		 value:{
			  type:Number,
				default:0
		 }
	 },
	methods:{
		changeParent(){
			//第一版触发方式 
			 this.$emit('input',300)
			//第二版触发方式
			 this.$emit('update:value',400)
			// 对比的方式触发aaa 
			 this.$emit('update:aaa',500)
	  }
	}
}
</script>