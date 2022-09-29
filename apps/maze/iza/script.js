const gamePlane = document.querySelector(".gamePlane");

//const wall = document.createElement("div");
//wall.style.cssText = `background: green;
//width: 20%;
//height:20%;
//left:40%;
//top: 20%;
//position: absolute;`;

//gamePlaneDOM.append(wall);

//const wall1 = document.createElement("div");
//wall1.style.cssText = `
//background: green;
//width: 20%;
//height:20%;
//left:30%;
//top: 40%;
//position: absolute;`;

//gamePlaneDOM.append(wall1);
//console.log(wall);

function makeWall(x, y, w, h, type = "wall") {
  //console.log(type);

  //ustaw kolor ściany
  let color = "red";
  if (type == "start") {
    color = "blue";
  }
  if (type == "meta") {
    color = "orange";
  }

  //Tworzymy nowy element html
  const wall = document.createElement("div");
  //do stworzonego elementu dodajemy style
  wall.style.cssText = `background:${color};
    width:${w}%;
    height:${h}%;
    left:${x}%;
    top:${y}%;
    position:absolute;
    `;

  //dodajemy klasy do każdego diva
  wall.className = "wall";

  if (type != "wall") {
    //jeżeli ściana nie jest zwykłym wallem dodaj jej typ jako klasę po spacji
    wall.className += " " + type;
  }

  gamePlane.append(wall);
}
//makeWall(50, 30, 40, 20);
//makeWall(0, 0, 40, 20);

//tablica map przechowująca tablice zawierające informacje o ścianie. każdy pojedyńczy element tablicy map to jest ściana
const map = [
  [80, 0, 20, 20, "time"],
  [0, 0, 20, 20, "start"],
  [10, 20, 20, 10],
  [20, 30, 20, 10],
  [30, 40, 20, 10],
  [40, 50, 20, 10],
  [50, 60, 20, 10],
  [60, 70, 30, 10],
  [80, 80, 20, 20, "meta"],
];

// pętla pobierająca elementy tablicy map jako wall
for (const wall of map) {
  //w tym miejscy wyciągany jest po kolei każdy element tablicy map jako wall
  makeWall(...wall);
}

//detect mobile or desktop
let isMobile = navigator.userAgentData.mobile;
//odśwież stronę po zmianie narzędzi deweloperskich z mobile na desktop i odwrotnie
window.onresize = function (){
  location.reload()
}

//mechanika gry
const game = {
  maxTime: 5,
  //metoda przygotowująca grę
  init() {
    game.time =game.maxTime
    gamePlane.querySelector(".timr").innerHTML = game.time
    gamePlane.querySelector(".start").addEventListener(isMobile ? "touchstart": "click", game.start)
  
  }
  start() {
    gamePlane.querySelector(".start").removeEventListener(isMobile ? "touchstart":"click", game.start)
    gamePlane.addEventListener(isMobile ? 'touchmove':"mousemove", game.checkMove);
    gamePlane.addEventListener("touchend", game.release)
    game.interval = setInterval(function(){
      game.time--
      game.buttons.time.innerHTML = game.time
      console.log("loguje", game.time)
    }, 1000)
    
    checkMove(e){
      let x,y;
      if(isMobile){
        x = e.touches[0].clientX
        y = e.touches[0].clientY
      }else{
        x = e.clientX
        y = e.clientY
      }
      console.log("GAME STARTED");
    }
    for (const wall of game.buttons.walls) {
      //Jeżeli  Twój kurs jest na klasie wall to nie wyzwalaj żadnych innych słuchaczy
      wall.addEventListener(isMobile ? 'touchmove':"mousemove", game.wallListener);
    }
    console.log ("className", document.elementFromPoint(x, y).className)
    console.log ("classList", document.elementFromPoint(x, y).classList)
    let underHover = document.elementFromPoint (x,y).classList;
    underHover = underHover[underHover.length-1]
    if( underHover == "wall" || underHover == "start") {return}
    if( underHover == "meta") { return game.over(true)}
    game.over(false)
      }
    }
    
    wallListener(e) {
      e.stopPropagation();
    }
  gamePlaneListener(e) {
    game.over(false);
  }
  //   metaTrigger(result) {
  //     if(result{
  //         console.log("YOU WIN");
  //     })
  over(result) {
    if (result) {
      modal.show("wygrana", green);
      document.body.style.backgroundColor = "red";
    } else {
      modal.show("przegrana", red);
    }
    game.buttons.meta.removeEventListener(isMobile ? 'touchend', game.release);
    gamePlane.removeEventListener(isMobile ? 'touchmove':"mousemove", game.checkMove);
    clearInterval(game.interval)
    game.init();
  }
//komunikaty

const modal = {
  dom: document.createElement("div"),
  h1: document.createElement("h1"),
  init() {
    modal.dom.style.cssText = `
        border: 10px dashed green;
        position: fixed;
        width: 80vw;
        height: 80vh;
        left: 10vw;
        top: 10vh;
        background: #aa6969;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        border-radious: 10px;
        font-family: 'Nabla', cursive;
        `;

    document.body.append(modal.dom);

    modal.h1.innerHTML = "h1";
    modal.dom.append(modal.h1);

    const button = document.createElement("button");
    button.innerHTML = "OK";
    button.style.cssText = `
    padding:1rem 4rem
    border-radious:1rem;
    cursor:pointer;
    `;
    button.onclick = function () {
      modal.hide();
    };
    modal.dom.append(button);
  },
  show(text, color = "ffffff") {
    modal.dom.style.backgroundColor = color;
    modal.dom.style.display = "flex";
    modal.h1.innerHTML = text;
  },

  hide() {
    modal.dom.style.display = "none";
    document.body.style.backgroundColor = "blue";
  },
};
modal.init()
if(isMobile){
  modal.show
} ("Dotknij niebieskiego kafelka aby rozpocząć grę<br/>Przeciągnij palec na pomarańczowy kafelek aby wygrać")
modal.show(
  "Kliknij na niebieski kafelek aby rozpocząć grę<br/>Przesuń kursor na pomarańczowy kafelek aby wygrać"
);
game.init();
