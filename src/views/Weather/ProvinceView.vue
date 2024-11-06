<script setup lang="ts">
import { getProvince } from '@/requests/weather';
import { useCountryStore } from '@/stores/country';
import { ElLoading } from 'element-plus';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 类型定义
export type ResultType = {
  location?: Array<any>,
  [key: string]: any,
}

export type ProvinceType = {
  name: string;
  adcode: string;
  [key: string]: any;
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

const route = useRoute()
const router = useRouter()

const forwardToCity = (province: ProvinceType) => {
  changeCurrentProvince(province)
  router.push({ name: "city" });
}

const getBreadcrumb = computed(() => {
  let matched = route.matched.filter(item => {
    return item.meta && item.meta.title
  }).filter(item => item.path !== '/weather/province')
  return matched
})  
</script>

<template>
  <el-breadcrumb separator="/" active-color="#3461ff">
    <el-breadcrumb-item :to="{ path:'/weather/province'}">省份</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(item, index) in getBreadcrumb" :to="item.path" :key="index">
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
  <div class="province-container" v-if="route.path === '/weather/province'">
    <h1>Province</h1>
    <ul>
      <li v-for="province in ProvinceList" :key="province.adcode" @click="forwardToCity(province)">
        {{ province.name }}
      </li>
    </ul>
  </div>
  <router-view></router-view>
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

  ul {
    list-style: none;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
    gap: 16px;

    padding: 0;

    >li {
      cursor: pointer;
    }
  }
}
</style>