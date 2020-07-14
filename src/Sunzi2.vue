<template>
	<div>这是第二个孙子
		<button @click='change'>二孙子存钱</button>
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
	
	},
	mounted(){
		//监听eventbus上面的事件 
		this.$bus.$on('my',(data)=>{
      console.log(data)
		})
	}
}
</script>