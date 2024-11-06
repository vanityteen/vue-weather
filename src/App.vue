<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

  const route = useRoute()

</script>

<template>
  <div class="main-container">
    <router-view></router-view>
  </div>
</template>

<style scoped lang="less">
  // .main-container {
  //   display: flex;
  //   flex-direction: column;
  //   row-gap: 16px;
  //   width: 100%;
  //   height: 100%;
  //   min-height: 100vh;
  //   padding: 24px;
  //   background-color: #f0f2f4;
  // }
</style>
