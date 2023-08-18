<script setup lang="ts">
  import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
  } from '@element-plus/icons-vue';
  import { onMounted} from 'vue'
  import {getCity} from '@/requests'

  onMounted(()=>{
    getCity()
  })


</script>

<template>
  <div class="main-container">

  </div>
</template>

<style scoped lang="less">

  .main-container {
    width: 100%;
    height: 100%;
    min-height: 100vh;
  }
</style>
