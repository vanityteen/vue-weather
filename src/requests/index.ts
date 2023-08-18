function getCity(){
    return fetch('/city/lookup?location=chengdu&key=a2e3fd0b626d4c42ab5d913d0caee934')
}

function getWeather(){
    return fetch('/api/3d?location=chengdu&key=a2e3fd0b626d4c42ab5d913d0caee934')
}


export {
    getCity,
    getWeather
}