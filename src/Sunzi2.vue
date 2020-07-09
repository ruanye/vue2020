<template>
	<div>这是第二个孙子
		<button @click='change' @say='say'>二孙子存钱</button>
</div>
</template>
<script>
/* eslint-disable */
  //$dispath 向上派发  
export default {
	methods:{
		change(){
		  // this.$parent.$emit('input',30000)
		   this.$dispatch('input',50000)
		},
		say(){
		    console.log('aa')
		}
	}
}
</script>