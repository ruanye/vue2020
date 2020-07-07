<template>
  <div>
    在父组件 使用v-on 定义事件 事件会通过listenrs传递下 去
    <Child @c="fn" name="我是谁"></Child>
    <!-- v-on 和emit   -->
    <!--  -->
    父亲的存款  {{money}} 
    <!-- 第一版写法 -->
    <!-- <Child2 :value ='money' @input='change'></Child2> -->
    <!-- 第二版写法 -->
    <!-- <Child2 :value ='money' @update:value="(value)=>{this.money= value}"></Child2> -->
    <!-- sync 同步的意思  第二版简化写法 -->
      <Child2 :value.sync ='money'></Child2>
     <!-- v-model  值是value 事件是input的简写   -->
     v-modle双向绑定 第一版的简写     
      <Child2 v-model ='money'></Child2>
      <!-- sync 和v-model的使用  v-model 值必须是value  -->
       对比sync和v-model 
      <Child2 :aaa.sync ='money'></Child2>
    </div>
</template>
<script>
import Child from "./Child";
import Child2 from "./Child2";
export default {
  data(){
    return {money:100}
  },
  components: {
		Child,
		Child2
  },
  methods: {
    fn() {
      alert("我是listeners触发的fn");
    },
    //父组件上面需要有一个改变存款的方法 
     change(val){
      this.money=val
    }

  }
};
</script>