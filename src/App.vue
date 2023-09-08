<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

onMounted(() => {
})

const counterStore = useCounterStore();
const { count, doubleCount } = storeToRefs(counterStore)
const { increment } = counterStore

</script>

<template>
  <div class="main-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">Province</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/city' }">City</el-breadcrumb-item>
      <el-breadcrumb-item>Weather</el-breadcrumb-item>
    </el-breadcrumb>
    <!--显示路由-->
    <router-view></router-view>
  </div>
</template>

<style scoped lang="less">
.main-container {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 24px;
  background-color: #f0f2f4;
}
</style>
