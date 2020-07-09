<template>
  <Parent > </Parent>
</template>
<script>
/* eslint-disable */
import Parent from "./Parent";
export default {
   mounted(){
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