<script setup lang="ts">
import router from '@/router';
import { onMounted, ref } from 'vue';
import { getProvince } from '@/requests/weather';
import { useCountryStore } from '@/stores/country';
import { storeToRefs } from 'pinia';
import { ElLoading } from 'element-plus';

// 类型定义
export type ResultType = {
  location?: Array<any>,
  [key: string]: any,
}

export type ProvinceType = {
  name: string;
  adcode: string;
  [key:string]:any;
}

// 全局状态
const countryStore = useCountryStore();
// const { current_city } = storeToRefs(countryStore);
const { changeCurrentProvince } = countryStore;

const ProvinceList = ref([]);

onMounted(async () => {
  const loadingInstance = ElLoading.service({
    lock: true,
    text: 'Loading...',
    background: 'rgba(0, 0, 0, 0.7)',
  })

  const res = await getProvince()
  !!res && (ProvinceList.value = res)

  loadingInstance.close();
})

const forwardToCity = (province:ProvinceType) => {
  const { name, adcode }  = province
  changeCurrentProvince(province)
  router.push({ name: 'city', query: { name, adcode } });
}

</script>

<template>
  <div class="province-container">
    <h1>Province</h1>
    <li v-for="province in ProvinceList" :key="province.adcode" @click="forwardToCity(province)">
      {{ province.name }}
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