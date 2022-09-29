function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}
console.log(timeConverter(0));


let list = []


const getWeatherInfo = (lat, lon) => {
  
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=70e5b97ff739ae2d836bed3a3f1cf33d&lang=pl&units=metric`)
  // fetch(`https://raw.githubusercontent.com/apietryga/kurs/master/api/weather/info/lat%3D${lat}%26lon%3D${lon}`)

      .then(res => res.json())
      .then(res => {
          // console.log(res)
        console.log(document.querySelector(".city h2").innerText = res.city.name  )
          document.querySelector(".mainInfo img").src = "https://countryflagsapi.com/svg/" +res.city.country
          document.querySelector(".city .sunrise").innerText = timeConverter(res.city.sunrise);
        document.querySelector(".city .sunset").innerText = timeConverter(res.city.sunset);
  
        list = res.list
        changeCubeInfo(0)
  
        console.log("RES LISTA: ", res.list)
  
      })
}


const changeCubeInfo = index => {
  console.log("list", list)
  console.log("INDEX", index)
  console.log("EL:", list[index].dt_txt)
  document.querySelector(" .cube h3 span").innerHTML = list[index].dt_txt
  document.querySelector(" .cube h3 img").src = `https://openweathermap.org/img/wn/${list[index].weather[0].icon}.png`
  document.querySelector(" .cube h4").innerHTML = list[index].weather[0].description
  document.querySelector(" .weatherMain h3").innerHTML = list[index].main.feels_like + "°C"
  document.querySelector(" .minMax .min").innerHTML = list[index].main.temp_min + "°C"
  document.querySelector(" .minMax .max").innerHTML = list[index].main.temp_max + "°C"


    }


const getLatLonDependOfName = () => { 
  const value = document.querySelector("#location").value
  // document.querySelector("#location").value =""
  console.log(value)
 fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${value}&appid=70e5b97ff739ae2d836bed3a3f1cf33d`)
    // fetch(`https://raw.githubusercontent.com/apietryga/kurs/master/api/weather/location/${value.toLowerCase()}`)



    .then(res => res.json())
   .then(res => {
      getWeatherInfo(res[0].lat, res[0].lon)
      // console.log("lat",res[0].lat)
      // console.log("lon", res[0].lon)
      
    })

  
  
}
getLatLonDependOfName()

document.addEventListener("keydown", e => { 
  console.log(e.key)
  if (e.key == "Enter") {
    getLatLonDependOfName()
  }
})

document.addEventListener("wheel", e => { 
  if(e.deltaY > 0){
    document.querySelector("#range").value--
  }
  else {
    document.querySelector("#range").value++
  }
  changeCubeInfo(document.querySelector("#range").value)
  
}
)
