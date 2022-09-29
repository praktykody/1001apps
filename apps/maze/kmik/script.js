// POBIERAMY GAMEPLANE Z HTML'A PO KLASIE
const gamePlane = document.querySelector('.gamePlane')

// Funkcja tworząca ścianę na podstawie argumentów 
// x - odległość od lewe
// y - odległość od góry
// w - szerokość ściany
// h - wysokość ściany
// type - rodzaj (start, meta, wall)
function makeWall(x, y, w, h, type = 'wall') {  

  // ustaw kolor ściany
  let color = 'rgb(190, 108, 108)' // domyślny
  if(type == 'start') { color = 'blue'  }
  if(type == 'meta') { color = 'orange' }

  // Tworzymy nowy element HTML (div)
  const wall = document.createElement('div')
  // do stworzonego elementu dodajemy style
  wall.style.cssText = `
    /* $ { } - pozwala na dodanie js'owej zmiennej wewnątrz backtick'ów*/
    background:${color};
    width:${w}%;
    height:${h}%;
    left:${x}%;
    top:${y}%;
    position:absolute;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
  `
  // dodajemy klasy do każdego diva
  wall.className = 'wall'
  if(type != 'wall'){
    // jeżeli ściana nie jest zwykłym wallem, to dodaj
    // jej typ jako klasę ( po spacji )
    wall.className += ' '+type;
  }

  // do gameplanu (który jest wpięty w HTML'a)
  // wpinamy walla
  gamePlane.append(wall)
}

// tablica map przechowująca tablice zawierające informacje o ścianie
// (każdy pojedyńczy element tablicy map to jedna ściana)
const map = [
  [80,0,20,20,'time'],
  [0,0,20,20, 'start'],
  [10,20,20,10],
  [20,30,20,10],
  [30,40,20,11],
  [40,50,20,10],
  [50,60,20,10],
  [60,70,30,10],
  [80,80,20,20, 'meta'] 
  
  // [0,15,10,10, 'start'],
  // [0,10,40,5],
  // [40,10,10,80],
  // [20,70,50,5],
  // [20,70,5,20],
  // [20,90,70,5],
  // [90,20,5,75],
  // [50,20,50,5],
  // [20,10,5,70],
  // [70,20,10,55],
  // [70,15,20,10],
  // [90,15,10,10, 'meta'] 
]

// pętla, pobierająca elementy tablicy map jako wall
for(const wall of map){
  // w tym miejscu wyciągany jest po kolei każdy element tablicy map
  // jako wall
  // ...wall wyciągają dane z tablicy wall i przekazywane są 
  // jako kolejne argumenty funckji makewall
  makeWall(...wall)
}

// detect mobile or desktop

// mechanika gry
const game = {
  // definiujemy wszystkie aktywne elementy gry
  maxTime:5,
  buttons: {
    time: document.querySelector('.time'),
    start: document.querySelector('.start'),
    meta: document.querySelector('.meta'),
    walls: document.querySelectorAll('.wall'),
  },

  // metoda przygotowująca grę
  init(){
    // przypisz do pola start możliwość kliknięcia i rozpoczęcia gry
    game.buttons.start.onclick = function () { game.start() }
    game.time=game.maxTime
    game.buttons.time.innerHTML = game.time
  },

  start(){ // start gry
    // zablokuj możliwość rozpoczęcia nowej gry
    game.buttons.start.onclick = ""
    // "nasłuchuj" kursora na polu meta (jeśli się tam pojawi, wywoła 
    // metodę game.metaTrigger)
    // game.buttons.meta.addEventListener('mousemove', game.metaTrigger)
    game.buttons.meta.addEventListener('mousemove', game.over)
    // jeśli nakierujesz myszkę na gamePlane po starcie to przegrywasz grę
    gamePlane.addEventListener('mousemove', game.gamePlaneListener)
    // wyciągamy jako wall każdą ścianę osobno
    for(const wall of game.buttons.walls){
      // jeżeli twoj kursor jest na klasie wall, to nie wyzwalaj żadnych innych 
      // słuchaczy (eventListenerów)
        wall.addEventListener('mousemove', game.wallListener )
    }

    game.interval = setInterval(function(){
      game.time--
        if (game.time < 0){game.over(false)}
      // console.log("LOGUJĘ")
      game.buttons.time.innerHTML = game.time
    }, 1000)

    console.log("GAME STARTED")
  },

  wallListener(e){
    e.stopPropagation();
  },

  gamePlaneListener(e){
    game.over(false)
  },

  // metoda wywołująca się po nakierowaniu myszką na metę
  // metaTrigger(){
  //   // zakończ grę z pozytywnym wynikiem
  //   game.over(true)
  // },
  
  // zakończ grę - wynik zależy od result - może być true - wygrana,
  // lub false - przegrana
  over(result){
    // wyświetl odpowiedni komunikat
    if(result){
      // console.log("YOU WIN!")
      modal.show('WYGRANA!', 'rgb(130, 214, 130)')
      document.body.style.backgroundColor = "rgb(130, 214, 130)"
    }else{
      // console.log("YOU LOSE")
      modal.show('PRZEGRANA', 'red')
      document.body.style.backgroundColor = "red"
    }
    // zdejmij słuchacza z pola meta (przestajemy nasłuchiwać kursor 
    // na polu meta)
    // game.buttons.meta.removeEventListener('mousemove', game.metaTrigger)
    game.buttons.meta.removeEventListener('mousemove', game.over)

    gamePlane.removeEventListener('mousemove', game.gamePlaneListener)
    for(const wall of game.buttons.walls){
        wall.removeEventListener('mousemove', game.wallListener)
    }

    clearInterval(game.interval)

    // przygotuj nową grę
    game.init()
  }
}
// przygotuj grę
// ta metoda wywołuje się po każdym odświeżeniu strony
game.init()

// KOMUNIKATY 
const modal = {
  dom : document.createElement("div"),
  h1 : document.createElement("h1"),
  init(){
    modal.dom.style.cssText = `
      // border:10px dashed;
      position:fixed;
      width:80vw;
      height:80vh;
      left:10vw;
      top:10vh;
      background:rgb(180, 108, 108);
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      text-align:center;
      text:center;
      box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

    `

      // display:none;
    document.body.append(modal.dom)

    const h1 = document.createElement("h1")
    modal.h1.innerHTML = "show"
    modal.dom.append(modal.h1)

    const button = document.createElement("button")
    button.innerHTML = "OK"
    button.style.cssText=`
      padding:1rem 4 rem;
      border-radius:1rem;
      cursor:pointer;
      text-aling:center;
      `
    button.onclick = function () { modal.hide() }
    modal.dom.append(button)
  },

  show(text,) { 
    modal.dom.style.display = "flex";
    modal.h1.innerHTML=text
  },

  hide(){
    modal.dom.style.display = "none";
    document.body.style.backgroundColor = "#fff"
  }

}

modal.init()
modal.show('KLIKNIJ NA NIEBIESKI KAFELEK, ABY ROZPOCZĄĆ GRĘ. PRZESUŃ KURSOR NA POMARAŃCZOWY, ABY WYGRAĆ')
game.init()