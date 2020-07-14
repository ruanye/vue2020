/* eslint-disable */
import Vue from 'vue';
import App from './App.vue';
/** dispatch 向上通知
 * @param {*} evnetname 事件名
 * @param {*} val  传递的值
 */
Vue.prototype.$dispatch = function (evnetname, val) {
  let parent = this.$parent;
  while (parent) {
    parent.$emit(evnetname, val);
    //如果还有父亲节点 继续向上派发
    parent = parent.$parent;
  }
};
// broadcast 向下通知
/**
 * @param {*} evnetname 事件名
 * @param {*} val  传递的值
 */
// Vue.prototype.$broadcast = function (eventname, val) {
//   const brodcast = function () {
//     let chilren = this.$children;
//    chilren.forEach((child) => {
//        child.$emit(eventname, val);
//       //如果儿子还有儿子 做个判断
//       if (child.$children) {
//            brodcast.call(child, eventname, val);
//       }
//     });
//   };
//   brodcast.call(this, eventname, val);
// };
//创建一个公共的vue实例  
Vue.prototype.$bus = new Vue()

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
new Vue({
  render: (h) => h(App),
}).$mount('#app');
