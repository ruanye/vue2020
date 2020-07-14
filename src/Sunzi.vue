
<template>
	<div>
		这是孙子组件
		{{$attrs}}
 <button @click="$listeners.c">孙子组件触发</button>
 <br/>
 <br/>
 <span style="color:blue">这是通过provide提供的数据:{{foo}} 祖先组件上面的money{{app.$data.money}}
 </span>
 <br/>
 <br/> 
</div>
</template>
<script>
/* eslint-disable */
export default {
	 inject:['foo','app']
	// inject:{
	//  foo: {
  //     from: 'bar',
  //     default: 'foo'
  //   }
	// }
}
</script>