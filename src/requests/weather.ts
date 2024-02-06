import { get } from './request'

/**
 * @note 城市搜索API提供全球地理位位置、全球城市搜索服务，支持经纬度坐标反查、多语言、模糊搜索等功能。
 * @param location: 需要查询地区的名称，支持文字、以英文逗号分隔的经度,纬度坐标（十进制，
 * 最多支持小数点后两位）、LocationID或Adcode（仅限中国城市)。
 * 例如 location=北京 或 location=116.41,39.92
 * @link https://dev.qweather.com/docs/api/weather/weather-now/
 */
function getCityLocationByAdcode(location: string | number = 'chengdu') {
  return get(`/city`, { location: location, key: 'a2e3fd0b626d4c42ab5d913d0caee934' })
}

/**
 * @note 实时天气预报API
 * @param location : 通过 getCityLocationByAdcode 接口获取
 * @link https://dev.qweather.com/docs/api/weather/weather-now/
 * @returns
 */
function getCityWeatherNow(location: number = 101270101) {
  return get(`/api/now`, { location: location, key: 'a2e3fd0b626d4c42ab5d913d0caee934' })
}

/**
 * @note 每日天气预报API
 * @param count : 3-30天天气预报
 * @param location : 通过 getCityLocationByAdcode 接口获取
 * @link https://dev.qweather.com/docs/api/weather/weather-daily-forecast/
 * @returns
 */
function getCityWeatherForecast(count: number, location: number = 101270101) {
  return get(`/api/${count}d`, { location: location, key: 'a2e3fd0b626d4c42ab5d913d0caee934' })
}

/**
 * @note 行政区域查询
 * @param province: 只支持单个关键词语搜索关键词支持：行政区名称、citycode、adcode
 * @param subdistrict: 设置显示下级行政区级数（行政区级别包括：国家、省/直辖市、市、区/县、乡镇/街道多级数据）
                        可选值：0、1、2、3等数字，并以此类推
                        0：不返回下级行政区；
                        1：返回下一级行政区；
                        2：返回下两级行政区；
                        3：返回下三级行政区；
 * @link https://lbs.amap.com/api/webservice/guide/api/district
 * @returns 
 */
function getCityByProvince(province: number | string = '四川', subdistrict: 0 | 1 | 2 = 1) {
  // 获取省份下的各地级市
  return get(`/province`, {
    keywords: province,
    key: 'd1c11f906effa6c50f400d4016991320',
    subdistrict: subdistrict
  })
}

async function getProvince() {
  // 获取全国省份
 const res =  await get(`/country`, { key: 'd1c11f906effa6c50f400d4016991320' });
 return res?.districts.length ? res?.districts?.[0].districts : null;
}

export {
  getCityWeatherNow,
  getCityWeatherForecast,
  getCityLocationByAdcode,
  getCityByProvince,
  getProvince
}
