// console.log('hello world')
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

let list=[]
const getWeatherInfo = (lat, lon) => {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b1259f102d2dfed9e28cf4bb377baa9e&units=metric&lang=pl`)
  .then(res => res.json())
  .then(res => {
      // console.log(res.city.name)
      // const h2 = Weatherap.queryselector("h2")
      // document.querySelector(".city h2") .innerText = "KATOWICE"

        // USTAWIAMY MAIN HEADER
      console.log(document.querySelector(".city h2").innerText = res.city.name  )
      document.querySelector("img").src = "https://countryflagsapi.com/svg/" +res.city.country
      document.querySelector(".city .sunrise").innerText = timeConverter(res.city.sunrise);
      document.querySelector(".city .sunset").innerText = timeConverter(res.city.sunset);

      list = res.list
      changeCubeInfo(0)

      console.log("RES LISTA: ", res.list)


      // for(const cube of res.list){
      //   console.log(cube)
      //   makeWeatherCube(cube)
      // }

  })
}
// const makeWeatherCube=(params) =>{
//     console.log(params)
//     const cube = document.createElement('div')
//     cube.className = "cube"
//     cube.innerText= "siemanko"
//     document.querySelector('.content').append(cube)

//   // stwórz nowy div (DOM)
//     const dt_txt = document.createElement('div')
//     // stwórz nowy div (DOM)
//     dt_txt.innerText = params.dt_txt
//       // przypnij go do cube'a
//     cube.append(dt_txt)


//     document.querySelector('.content').append(cube)
// }

const changeCubeInfo = index => {
  console.log("list", list)
  console.log("INDEX", index)
  console.log("EL:", list[index].dt_txt)
  document.querySelector(" .cube h3 span").innerHTML = list[index].dt_txt
  document.querySelector(" .cube h3 img").src =   `https://openweathermap.org/img/wn/${list[index].weather[0].icon}.png`

  document.querySelector(" .cube h4").innerHTML = list[index].weather[0].description
  document.querySelector(" .weatherMain h3").innerHTML = list[index].main.feels_like + "°C"
  document.querySelector(" .minMax .min").innerHTML = list[index].main.temp_min + "°C"
  document.querySelector(" .minMax .max").innerHTML = list[index].main.temp_max + "°C"
}

const getLatLonDependOfName = () => { 
  const value = document.querySelector("#location").value
  console.log(value)

  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&appid=b1259f102d2dfed9e28cf4bb377baa9e`)
  .then(res => res.json())
  .then(res => {
    // console.log("lat", res[0].lat)
    // console.log("lon", res[0].lon)
    // console.log(res)
    getWeatherInfo(res[0].lat, res[0].lon)

  })
}
getLatLonDependOfName()
