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
interface CityType{
  name: string;
  adcode: string;
  level: string;
  center?: string;
  citycode?: Array<any>;
  [key:string]:any;
}

interface ProvinceType extends CityType{
  districts: Array<CityType>;
}



export const useCountryStore = defineStore('country', () => {
  const current_province = ref<ProvinceType>();
  const current_city = ref<CityType>();

  function changeCurrentProvince(province: Object<any>) {
    current_province.value = province;
  }

  function changeCurrentCity(city: Object<any>) {
    current_city.value = city;
  }

  return {
    current_province,
    current_city,
    changeCurrentProvince,
    changeCurrentCity
  }
})