<script setup lang="ts">
import router from '@/router';
import { onBeforeMount, onMounted, ref } from 'vue';
import { getCityByProvince } from '@/requests/weather';
import { useCountryStore } from '@/stores/country';
import { storeToRefs } from 'pinia';
import { ElLoading } from 'element-plus';

// 类型定义
export type ResultType = {
  location?: Array<any>,
  [key: string]: any,
}

// 全局状态
const countryStore = useCountryStore();
// const { current_city } = storeToRefs(countryStore);
const { changeCurrentCity, changeCurrentProvince } = countryStore;

const cityNumberList = ref([]);

onMounted(() => {
  const loadingInstance = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  getCityByProvince().then((res: ResultType) => {
    changeCurrentProvince(res.districts[0]);
    cityNumberList.value = res.districts[0].districts;
    loadingInstance.close();
  });
})

const getCurCityWeather = (city) => {
  city && changeCurrentCity(city);
  router.push({ name: 'city', query: { name: city.name, adcode: city.adcode } });
}

</script>

<template>
  <div class="province-container">
    <h1>Province</h1>
    <li v-for="city in cityNumberList" :key="city.adcode" @click="getCurCityWeather(city)">
      {{ city.name }}
    </li>
  </div>
</template>

<style scoped lang="less">
.province-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 16px;

  >h1 {
    font-weight: 700;
  }
}
</style>