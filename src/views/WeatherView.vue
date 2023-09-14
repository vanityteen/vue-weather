<script setup lang="ts">
import router from '@/router';
import { onMounted, ref } from 'vue';
const goBack = () => {
  router.go(-1);
}

onMounted(() => {

})

</script>

<template>
  <div class="city-container">
    <el-page-header @back="goBack">
      <template #content>
        <span class="text-large font-600 mr-3"> Weather </span>
      </template>
    </el-page-header>
  </div>
</template>

<style scoped lang="less">
.city-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 16px;

  >h1 {
    font-weight: 700;
  }
}
</style>