import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })

interface ProvinceType {
  name: string;
  adcode: string;
  [key:string]:any;
}

interface CityType extends ProvinceType{
  level: string;
  center?: string;
  citycode?: Array<any>;
  [key:string]:any;
}

export const useCountryStore = defineStore('country', () => {
  const current_province = ref<ProvinceType>();
  const current_city = ref<CityType>();

  function changeCurrentProvince(province: ProvinceType) {
    current_province.value = province;
  }

  function changeCurrentCity(city: CityType) {
    current_city.value = city;
  }

  return {
    current_province,
    current_city,
    changeCurrentProvince,
    changeCurrentCity
  }
})