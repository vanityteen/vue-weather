<script setup lang="ts">
import router from '@/router';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useCountryStore } from '@/stores/country';
import { storeToRefs } from 'pinia';
import { getCityWeatherForecast, getCityLocationByAdcode, getCityWeatherNow } from '@/requests/weather';
import { ResultType } from './ProvinceView.vue';
import { ElLoading } from 'element-plus'

const goBack = () => {
  router.go(-1);
}

type WeatherForecastResultType = {
  fxDate: string; // 预报日期
  daily: Array<any>;
  fxLink: string; // 当前数据的响应式页面，便于嵌入网站或应用
  [key: string]: any;
}

type WeatherNowType = {
  temp: string; // 温度，默认单位：摄氏度
  text: string; // 天气状况的文字描述，包括阴晴雨雪等天气状态的描述
  [key: string]: any;
}

type WeatherNowResultType = {
  now: WeatherNowType;
  fxLink: string;
  [key: string]: any;
}

// 全局状态
const countryStore = useCountryStore();
const { current_city, current_province } = storeToRefs(countryStore);
// const { changeCurrentCity } = countryStore;

const cityLocations = ref<number>();
const cityWeatherForecastList = ref<Array<any>>([]);
const cityWeatherNow = ref<WeatherNowType>();
const count = ref<number>(3);

async function getCurCityWeather() {
  await getCityLocationByAdcode(current_city.value.adcode).then((res: ResultType) => {
    cityLocations.value = res.location[0].id;
  })

  //@ts-ignore
  await getCityWeatherForecast(count.value, cityLocations.value).then((res: WeatherForecastResultType) => {
    cityWeatherForecastList.value = res.daily
  })

  //@ts-ignore
  await getCityWeatherNow(cityLocations.value).then((res: WeatherNowResultType) => {
    cityWeatherNow.value = res.now
  });
}


onBeforeMount(() => {
  getCurCityWeather();
})


</script>

<template>
  <div class="city-container">
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
        <span>({{ current_city.name }})</span>
      </div>
    </div>
    <div class="content">
      <div>
        <span>当前温度：{{ cityWeatherNow.temp }}℃</span>
        <span>当前天气: {{ cityWeatherNow.text }}</span>
        <span>{{ cityWeatherForecastList[0].tempMax }}/{{ cityWeatherForecastList[0].tempMin }}</span>
      </div>
      <div class="weather-item" v-for="weather in cityWeatherForecastList" :key="weather.fxDate">
        <span>{{ weather.fxDate }}</span>
        <span>{{ weather.textDay }}/{{ weather.textNight }}</span>
        <span>{{ weather.tempMax }}/{{ weather.tempMin }}</span>
      </div>
    </div>
  </div>
</template>

<style src="./city.less" scoped lang="less"></style>