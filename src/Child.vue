<template>
	<div>
		这是子组件{{
			$attrs
		}}
		<button @click="$listeners.c">子组件点击触发事件</button>	
		<!-- ￥attrs和$listenrs 还可以继续往下传递  使用v-bind 绑定attrs 使用v-on传递listeners-->
    <Sunzi v-bind="$attrs" v-on="$listeners"></Sunzi>
	</div>
	
</template>
<script>
/* eslint-disable */
import Sunzi from './Sunzi'
export default {
	data(){
    return {
			msg:'a'
		}
	},
	 components: {
		Sunzi
  }
}
</script>