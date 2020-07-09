<template>
  <Parent > </Parent>
</template>
<script>
/* eslint-disable */
import Parent from "./Parent";
export default {
   mounted(){
     console.log('执行')
    this.$broadcast('say','111')
   },
  data(){
    return {}
  },
  components: {
    Parent
  }
};
</script>