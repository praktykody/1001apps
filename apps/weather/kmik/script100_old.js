//! STANDARDOWA FUKCJA
// function test (word) {
//   console.log('Hello '+word)
// }
//! TA SAMA FUNKCJA STRZAŁKOWA
// const test = word => {
//   console.log('Hello '+word)
// }
// test('world')

// funkcja pobrana z internetu
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

// deklarujemu list tutaj, żeby mieć do niego dostęp z całej aplikacji
let list = []

// Pobieramy infomacje nt długiści i szerokości geo. na podstawie nazwy
const getLatLonDependOfName = () => {
  const value = document.querySelector("#location").value
  // document.querySelector("#location").value = ""
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${value}&appid=b1259f102d2dfed9e28cf4bb377baa9e`)
  // fetch(`https://raw.githubusercontent.com/apietryga/kurs/master/api/weather/location/${value.toLowerCase()}`)
  .then(res => res.json())
  .then(res => { getWeatherInfo(res[0].lat, res[0].lon) })
}

// funkcja pobierająca informacje pogodowe na podstawie długości i szerokości geograficznej
const getWeatherInfo = (lat, lon) => {
  // fetch jest funkcją pobierającą informacje z innego miejsca w internetcie (głównie z api)
  // ten konkretny pobiera informacje nt pogody na podstawie lat i lon
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b1259f102d2dfed9e28cf4bb377baa9e&units=metric&lang=pl`)
  // fetch(`https://raw.githubusercontent.com/apietryga/kurs/master/api/weather/info/lat%3D${lat}%26lon%3D${lon}`)
  // development fetch (do pracy)
  .then(res => res.json()) // przerabiamy otrzymane informacje na postać JSON
  .then(res => {  // wewnątrz tej funkcji operujemy zmienną res, która zawiera informacje zwrotne z API

    // USTAWIAMY MAIN HEADER
    // document.querySelector("...") - taki "CSS'owy" slektor tylko w dłużej formie
    document.querySelector(".city h2").innerText = res.city.name
    document.querySelector("img").src = "https://countryflagsapi.com/svg/"+res.city.country
    document.querySelector(".city .sunrise").innerText = timeConverter(res.city.sunrise);
    document.querySelector(".city .sunset").innerText = timeConverter(res.city.sunset);

    // przypisujemy zwrot z funkcji do list, dzięki czemu
    // z całj aplikacji mamy dostęp do pobranych z API wartości
    list = res.list

    // za każdym razem gdy zmieni się lokalizacja
    // to pokazujemy obecną pogodę w tym miejscu
    changeCubeInfo(0)

    // to samo z suwakiem - niech zmienia się na 0
    document.querySelector("#range").value = 0
  })
}

// funkcja podmieniająca informacje w głównym kafelku (.cube)
const changeCubeInfo = index => {
  // list[index] - jest pojedyńczą informacją pogodową dla każdych 3 godzin

  document.querySelector(".cube h3 span").innerHTML = list[index].dt_txt
  document.querySelector(".cube h3 img").src = `https://openweathermap.org/img/wn/${list[index].weather[0].icon}.png`
  document.querySelector(".cube h4").innerText = list[index].weather[0].description;
  document.querySelector(".weatherMain h3").innerHTML = list[index].main.feels_like + "°C"
  document.querySelector(".minMax .min").innerHTML = list[index].main.temp_min + "°C"
  document.querySelector(".minMax .max").innerText = list[index].main.temp_max + "°C"
}

// przy załadowaniu strony, załaduj pogodę domyślnej lokalizacji (wpisanej w #location)
getLatLonDependOfName()

// pobierz z całego dokumentu wydarzenie polegające na wciśnieciu przycisku klawiatury
document.addEventListener("keydown", e => { // info o wydarzeniu jest w zmiennej e
  // jeśli ten przysk był enterem
  if(e.key == "Enter"){
    // poszukaj lokalizacji o wpisanej w #location nazwie
    getLatLonDependOfName()
  }
})

// pobierz z całego dokumentu wydarzenie polegające na przesunięciu "kółeczka myszy"
document.addEventListener("wheel", e => { // info o wydarzeniu jest w zmiennej e
  if(e.deltaY < 0){ // jeśli przesuwam wheel "od siebie"
    document.querySelector("#range").value-- // przesuń belkę w lewo
  }else{ // jeśli przesuwam wheel "do siebie"
    document.querySelector("#range").value++ // przesuń belkę w prawo
  }
  // uaktualnij informacje wewnątrz .cube
  changeCubeInfo(document.querySelector("#range").value)
})