<script setup lang="ts">
  import router from '@/router';
  import { onMounted,ref } from 'vue';
  import { getCityByProvince } from '@/requests/weather';

  type CityResultType = {
    location?: Array<any>,
    [key: string]: any,
  }

  const cityNumberList = ref([]);

  onMounted(() => {
    getCityByProvince().then((res:CityResultType)=>{      
      cityNumberList.value = res.districts[0].districts;
    });
  })

  
</script>

<template>
  <div class="province-container">
    <h1>Province</h1>
    <li v-for="city in cityNumberList" :key="city.adcode">
      {{ city.name }}
    </li>
  </div>
</template>

<style scoped lang="less">
  .province-container{
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 16px;
    >h1{
      font-weight: 700;
    }
  }
</style>