<template>
  <div>
    <!-- 二級路由出口 -->
    <router-view :key="key"></router-view>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key () {
      return this.$route.path
    }
  }
}
</script>
