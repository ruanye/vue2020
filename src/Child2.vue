<template>
	<div>这是二儿子
		{{value}}
		<br/>
		<br/>
		
			<br/>
				<br/>	<br/>
		<button @click="changeParent">儿子存钱</button>
		<Sunzi2  @say='say'></Sunzi2>
	</div>
</template>
<script>
/* eslint-disable */

import Sunzi2 from './Sunzi2'
export default {
	

	components:{
		Sunzi2
	},
	 props:{
		 value:{
			  type:Number,
				default:0
		 }
	 },
	 mounted(){
		  // 触发eventbus上面监听的事件 my 
			this.$nextTick(()=>{
        	this.$bus.$emit('my','我是emit')
			})
		},
	methods:{
			say(){
		    console.log('我被通知了')
		},
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