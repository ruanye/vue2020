## vue 基础
1. 库和框架 
框架framework  vue   库 libary  jquery loadash react  
react+react-router+redux =>框架 
框架和库的区别  
库 是我主动去调用库里面的方法 
框架 在固定的位置去写代码 框架会自动调用方法 
2. mvc 和mvvm  
m model 数据  v view 页面  c controll 控制器  backbone 
vue ->mvvm 框架 不完全遵循mvvm规则(ref 用户可以直接操作dom )
m model(js里面的数据)  v view 视图(页面)  vm   viewmodel 视图模型    
用户不需要操作dom     viewmodel  
3. {{}} 小胡子语法 -> Mustache(发音：ˈmʌstæʃ')
4. vue  模板渲染顺序 
	- 如果有render 会优先查找render 
	- 如果没有render 会找template
	- 如果没有temlate 会找el元素进行渲染  
5. 实例上的方法 
 - $mount 	vm.$mount("#app")  ->el:'#app'
 - $nextTick 确保获取更新后的dom元素
 - $watch  监听数据变化  两个参数 newval  oldval  
 - $options  用户输入所有参数 
- $data _data  
- vm.$set vm.$delete   后添加的属性无法被劫持  需要使用$set   
6. 指令 v-once v-html  v-if v-else v-else-if  v-show   v-for(数组、对象、数字 不要和v-if连用 key尽量不要使用索引)
7. 计算属性computed和watch的区别 
  *  指令和过滤器里面this是 window 

8. 过滤器  filter  全局 局部  Vue.filter(名字,function(){})  局部的在组件里面定义  
filters  作用 不改变原数据的基础上对数据进行格式化(1592878371058=>2020-6-23  100=>100元/$  16.1333->16.13 )   方法/计算属性可以代替过滤器 
9.自定义指令 dircetive(指令)  操作dom   Vue.directive   局部directives




# vue组件间通信方式
#快速原型开发
可以快速识别.vue文件封装组件插件等功能

sudo npm install @vue/cli -g
sudo npm install -g @vue/cli-service-global
vue serve App.vue
1. props 父传子   
2. $attrs $listeners
3. 自定义事件  $emit  $on   子传父   一家的存款都在一个卡里  儿子存钱了 账户也会发生变化  sync v-model 的使用  vue 中可以自定义事件 定义用on定义  触发自定义事件要使用emit
4. $parent 和$children   
5. provide 和inject 依赖注入两个一起使用  允许组先级组件像子孙后代注入一个依赖（跨越多层次网上查找）  provide 提供一个对象   inject接受注入的数据 inject可以是数组 可以是对象   主要在开发高阶插件/组件库时使用。
6. EventBus  一般用来解决同级通信  项目不大的情况下可以考虑使用 
7. vuex 
8. ref 写在组件上拿到的是组件实例 写在dom元素上拿到的是dom元素  
  ref取值 this.$refs.ref对应的名字      
## 一.Props传递数据
components
   ├── Grandson1.vue // 孙子1
   ├── Grandson2.vue // 孙子2
   ├── Parent.vue   // 父亲
   ├── Son1.vue     // 儿子1
   └── Son2.vue     // 儿子2
在父组件中使用儿子组件
```js
<template>
 <div>
  父组件:{{mny}}
  <Son1 :mny="mny"></Son1>
 </div>
</template>
<script>
import Son1 from "./Son1";
export default {
 components: {
  Son1
 },
 data() {
  return { mny: 100 };
 }
};
</script>
子组件接受父组件的属性
子组件1:
#二.$emit使用
子组件触发父组件方法,通过回调的方式将修改的内容传递给父组件

<template>
 <div>
  父组件:{{mny}}
  <Son1 :mny="mny" @input="change"></Son1>
 </div>
</template>
<script>
import Son1 from "./Son1";
export default {
 methods: {
  change(mny) {
   this.mny = mny;
  }
 },
 components: {
  Son1
 },
 data() {
  return { mny: 100 };
 }
};
</script>
```
>子组件触发绑定自己身上的方法
```js
<template>
 <div>
  子组件1: {{mny}}
  <button @click="$emit('input',200)">更改</button>
 </div>
</template>
<script>
export default {
 props: {
  mny: {
   type: Number
  }
 }
};
</script>
```
>这里的主要目的就是同步父子组件的数据,->语法糖的写法

#.sync
<Son1 :mny.sync="mny"></Son1>
<!-- 触发的事件名 update:(绑定.sync属性的名字) -->
<button @click="$emit('update:mny',200)">更改</button>
#v-model
<Son1 v-model="mny"></Son1>
<template>
 <div>
  子组件1: {{value}} // 触发的事件只能是input
  <button @click="$emit('input',200)">更改</button>
 </div>
</template>
<script>
export default {
 props: {
  value: { // 接收到的属性名只能叫value
   type: Number
  }
 }
};
</script>
#三.$parent、$children
继续将属性传递

<Grandson1 :value="value"></Grandson1>
<template>
 <div>
  孙子:{{value}}
  <!-- 调用父组件的input事件 -->
  <button @click="$parent.$emit('input',200)">更改</button>
 </div>
</template>
<script>
export default {
 props: {
  value: {
   type: Number
  }
 }
};
</script>
如果层级很深那么就会出现$parent.$parent.....我们可以封装一个$dispatch方法向上进行派发

# $dispatch
```js
Vue.prototype.$dispatch = function $dispatch(eventName, data) {
  let parent = this.$parent;
  while (parent) {
    parent.$emit(eventName, data);
    parent = parent.$parent;
  }
};
既然能向上派发那同样可以向下进行派发
#$broadcast
Vue.prototype.$broadcast = function $broadcast(eventName, data) {
  const broadcast = function () {
    this.$children.forEach((child) => {
      child.$emit(eventName, data);
      if (child.$children) {
        $broadcast.call(child, eventName, data);
      }
    });
  };
  broadcast.call(this, eventName, data);
};
```
# 四.$attrs、$listeners
# $attrs
批量向下传入属性
```js
<Son2 name="名字" age="10"></Son2>

<!-- 可以在son2组件中使用$attrs属性,可以将属性继续向下传递 -->
<div>
  儿子2: {{$attrs.name}}
  <Grandson2 v-bind="$attrs"></Grandson2>
</div>


<template>
 <div>孙子:{{$attrs}}</div>
</template>
```
#$listeners
批量向下传入方法

<Son2 name="名字" age="10" @c='fn'></Son2>
<!-- 可以在son2组件中使用listeners属性,可以将方法继续向下传递 -->
<Grandson2 v-bind="$attrs" v-on="$listeners"></Grandson2>

<button @click="$listeners.c">更改</button>
#五.Provide & Inject
#Provide
在父级中注入数据

provide() {
  return { parentMsg: "父亲" };
},
#Inject
在任意子组件中可以注入父级数据

inject: ["parentMsg"] // 会将数据挂载在当前实例上
#六.Ref使用
获取组件实例

<Grandson2 v-bind="$attrs" v-on="$listeners" ref="grand2"></Grandson2>
mounted() { // 获取组件定义的属性
  console.log(this.$refs.grand2.name);
}
#七.EventBus
用于跨组件通知(不复杂的项目可以使用这种方式)

Vue.prototype.$bus = new Vue();
Son2组件和Grandson1相互通信

 mounted() {
  this.$bus.$on("my", data => {
   console.log(data);
  });
 },
mounted() {
  this.$nextTick(() => {
   this.$bus.$emit("my", "我是Grandson1");
  });
 },
#八.Vuex通信
状态管理 

vue3.0 api 地址 
 https://vue-composition-api-rfc.netlify.app/zh/#%E6%A6%82%E8%BF%B0   

vue3.0搭建 兼容2.0  

https://github.com/vuejs/vue-next

vue-cli-plugin-vue-next

$ npm install -g @vue/cli
$ vue --version
$ vue create xxx
$ vue add vue-next

使用vite 搭建vue3.0    
 npm init vite-app  项目名  type-moudle  