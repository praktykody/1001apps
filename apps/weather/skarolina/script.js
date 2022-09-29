// fetch(
//   "https://api.openweathermap.org/data/2.5/forecast?lat=50.2649&lon=19.0238&appid=f7475169b48c1a3e45bdcaa1b374c413&units=metric&lang=pl"
// )
// fetch(
//   "https://api.openweathermap.org/data/2.5/forecast?lat=51.509865&lon=-0.136439&appid=f7475169b48c1a3e45bdcaa1b374c413&units=metric&lang=pl"
// )
// console.log("hello");

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}

let list = [];

const getWeatherInfo = (lat, lon) => {
  // fetch(
  //   `https://raw.githubusercontent.com/apietryga/kurs/master/api/weather/info/lat%3D${lat}%26lon%3D${lon}`
  // )
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=f7475169b48c1a3e45bdcaa1b374c413&units=metric&lang=pl`
  )
    .then((res) => res.json())
    .then((res) => {
      // console.log(res);
      //Ustawiamy main header
      document.querySelector(".city h2").innerText = res.city.name;

      document.querySelector("img").src =
        "https://countryflagsapi.com/svg/" + res.city.country;

      document.querySelector(".city .sunrise").innerText = timeConverter(
        res.city.sunrise
      );

      document.querySelector(".city .sunset").innerText = timeConverter(
        res.city.sunset
      );

      list = res.list;
      changeCubeInfo(0);

      document.querySelector("#range").value = 0;
      // for (const cube of res.list) {
      //   console.log(cube);
      // makeWeatherCube(res.list[0]);
      // }
    });
};

// const makeWeatherCube = (params) => {
//   console.log(params);
//   const cube = document.createElement("div");
//   cube.className = "cube";
//   cube.innerText = "siemanko";
//   document.querySelector(".content").append(cube);

//   //stwórz now div(DOM)
//   const dt_txt = document.createElement("div");
//   //wpisz do niego wartość z API
//   dt_txt.innerText = params.st_txt;
//   //przypnij go do cube'a
//   cube.append(dt_txt);
// };

const changeCubeInfo = (index) => {
  // console.log("list", list);
  // console.log("index", index);

  // console.log("el:", list[index].dt_txt);

  document.querySelector(".cube h3 span").innerHTML = list[index].dt_txt;
  document.querySelector(
    ".cube h3 img"
  ).src = `https://openweathermap.org/img/wn/${list[index].weather[0].icon}.png`;

  document.querySelector(".cube h4").innerText =
    list[index].weather[0].description;

  document.querySelector(" .weatherMain h3").innerHTML =
    list[index].main.feels_like + "°C";

  document.querySelector(" .minMax .min").innerHTML =
    list[index].main.temp_min + "°C";
  document.querySelector(" .minMax .max").innerHTML =
    list[index].main.temp_max + "°C";
};

const getLatLonDependOfName = () => {
  const value = document.querySelector("#location").value;
  document.querySelector("#location").value = "";
  // fetch(
  //   `https://raw.githubusercontent.com/apietryga/kurs/master/api/weather/location/${value.toLowerCase()}`
  // )
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${value}&appid=f7475169b48c1a3e45bdcaa1b374c413`
  )
    .then((res) => res.json())
    .then((res) => {
      getWeatherInfo(res[0].lat, res[0].lon);
    });
};
getLatLonDependOfName();

document.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key == "Enter") {
    getLatLonDependOfName();
  }
});

document.addEventListener("wheel", (e) => {
  console.log(e);
  if (e.deltaY < 0) {
    document.querySelector("#range").value--;
  } else {
    document.querySelector("#range").value++;
  }
  changeCubeInfo(document.querySelector("#range")).value;
});
