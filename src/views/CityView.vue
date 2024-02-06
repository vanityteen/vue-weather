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
const { changeCurrentCity, current_province } = countryStore;

const cityNumberList = ref([]);

onMounted(() => {
  const loadingInstance = ElLoading.service({
    lock: true,
    text: 'Loading...',
    background: 'rgba(0, 0, 0, 0.7)',
  })

  getCityByProvince(current_province.adcode).then((res: ResultType) => {
    cityNumberList.value = res.districts[0].districts;
    loadingInstance.close();
  });
})

const getCurCityWeather = (city) => {
  city && changeCurrentCity(city);
  router.push({ name: 'weather', query: { name: city.name, adcode: city.adcode } });
}

const goBack = () => {
  router.go(-1);
}
</script>

<template>
  <div class="province-container">
    <div class="header">
      <div class="back">
        <el-icon @click="goBack" :size="24" class="el-back-icon-hover">
          <Back />
        </el-icon>
        <span>Back</span>
      </div>
      <i class="split"></i>
      <div class="info">
        <h1>{{ current_province.name }}</h1>
      </div>
    </div>
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

  .header {
    display: flex;
    align-items: center;
    column-gap: 16px;
    .back{
      display: flex;
      align-items: center;
      column-gap: 8px;
      >span{
        font-size: 18px;
        font-weight: 700;
      }
      .el-back-icon-hover:hover{
        background-color: #f5f5f5;
        border: 1px solid #d9d9d9;
        border-radius: 5px;
        cursor: pointer;
      }
    }
    .split {
      width: 1px;
      height: 18px;
      background-color: #c5c5c5;
    }
    .info{
      display: flex;
      align-items: center;
      column-gap: 16px;
      >h1 {
        font-weight: 700;
        font-size: 18px;
      }
      >span{
        color: #c5c5c5;
      }
    }
  }
}
</style>