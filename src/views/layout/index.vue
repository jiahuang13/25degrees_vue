<template>
  <div class="app">
    <MyHeader></MyHeader>
    <router-view></router-view>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyHeader from '@/views/layout/components/MyHeader.vue'
import MyFooter from '@/views/layout/components/MyFooter.vue'
export default {
  name: 'LayoutIndex',
  components: {
    MyHeader, MyFooter
  }
}
</script>

<style>
</style>
