<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

  const route = useRoute()
  const getBreadcrumb = computed(()=>{
    let matched = route.matched.filter(item=> {
      return item.meta && item.meta.title
    }).filter(item=> item.path !== "/")
    return matched
  })  
</script>

<template>
  <div class="main-container">
    <el-breadcrumb separator="/" active-color="#3461ff">
      <el-breadcrumb-item :to="{ path: '/' }">省份</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in getBreadcrumb" :to="item.path" :key="index">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 显示路由 -->
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
