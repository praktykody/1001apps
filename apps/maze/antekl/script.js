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
  let color = 'green' // domyślny
  if(type == 'start') { color = 'blue' }
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
  [80, 0, 20, 20, 'time'],
  [0,0,20,21, 'start'],
  [10,20,20,11],
  [20,30,20,11],
  [30,40,20,11],
  [40,50,20,11],
  [50,60,20,11],
  [60,70,30,11],
  [80,80,20,21, 'meta']
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
let isMobile = navigator.userAgentData.mobile;
// odśwież stonę po zmianie narzędzi developerskich z mobile na desktop
// i odwrotnie
window.onresize = function () { 
  location.reload()
}

// mechanika gry
const game = {
  maxTime : 5,
  init(){
    // init wykonuje się przed każdą grą 
    // przygotowuje elementy do naciśnięcia "start"
    game.time = game.maxTime // ustaw czas na maxa
    gamePlane.querySelector('.time').innerHTML = game.time // wypełnij kafelek z czasem "nowym czasem"
    gamePlane.querySelector('.start').addEventListener(isMobile ? 'touchstart' : 'click', game.start)
    // TO : isMobile ? 'touchstart' : 'click'
    // JEST TYM SAMYM CO TO 
    // if(isMobile) { 'touchstart' }else { 'click' }
  },
  start(){
    // nie słuchaj klikania na start
    gamePlane.querySelector('.start').removeEventListener(isMobile ? 'touchstart' : 'click', game.start)
    // sprawdź ruchy kursora (czy jeździ po mapie czy poza)
    gamePlane.addEventListener(isMobile ? 'touchmove' : 'mousemove', game.checkMove)
    // sprawdź czy użytkownik urządzenia mobilnego nie odrywa palca od ekranu
    // jeśli puszcza - przegrywa
    gamePlane.addEventListener('touchend', game.release)

    // zacznij odejmować co sekundę (1000 milisekund) czas od game.time
    game.interval = setInterval(function(){
      game.time--
      // jeśli czas jest mniejszy niż 0 to przegraj grę
      if(game.time < 0) { game.over(false) }
      // odświeżaj widok w kafelku
      gamePlane.querySelector('.time').innerHTML = game.time
    }, 1000)
  },
  checkMove(e){
    let x,y;
    if(isMobile){
      x = e.touches[0].clientX
      y = e.touches[0].clientY
    }else{
      x = e.clientX
      y = e.clientY
    }
    // pobierz w tablicy klasy elementu na którym znajduje się kursor 
    let underHover = document.elementFromPoint(x, y).classList;
    // pobierz ostatnią klasę z listy klas elementu
    underHover = underHover[underHover.length-1]
    // jeżeli element jest startem albo wallem, to nie rób nic
    if( underHover == 'wall' || underHover == 'start' ) { return }
    // jeśli kursor jest nad metą, to wyjdź z metody checkMove wywołując game.over
    if( underHover == 'meta' ) { return game.over( true ) }
    // jeśli żaden z warunków nie jest spełniony to przegraj grę
    game.over( false )
  },
  release(){
    game.over(false)
  },
  over(result){
    if(result){
      modal.show('WYGRANA!', 'green')
      document.body.style.backgroundColor = "green"
    }else{
      modal.show('PRZEGRANA!', 'red')
      document.body.style.backgroundColor = "red"
    }
    // ściągamy słuchaczy
    gamePlane.removeEventListener('touchend', game.release)
    gamePlane.removeEventListener(isMobile ? 'touchmove' : 'mousemove', game.checkMove)
    // przerywamy występowanie interwału
    clearInterval(game.interval)
    // inicuj nową grę
    game.init();
  }
}



// przygotuj grę
// ta metoda wywołuje się po każdym odświeżeniu strony


// KOMUNIKATY 
const modal = {
  dom : document.createElement("div"),
  h1 : document.createElement("h1"),
  init(){
    modal.dom.style.cssText = `
      border:10px solid blue;
      position:fixed;
      width:80vw;
      height:80vh;
      left:10vw;
      top:10vh;
      background:#aa6969;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      display:none;
      text-align:center;
      border-radius:10px;
    `
    document.body.append(modal.dom)

    modal.h1.innerHTML = "H1"
    modal.dom.append(modal.h1)

    const button = document.createElement("button")
    button.innerHTML = "OK"
    button.style.cssText = ` 
      padding:1rem 4rem;
      border-radius:1rem;
      cursor:pointer;
    `
    button.onclick = function () { modal.hide() }
    modal.dom.append(button)
  },
  show(text, color = '#aa6969') { 
    modal.dom.style.backgroundColor = color
    modal.dom.style.display = "flex";
    modal.h1.innerHTML = text
  },
  hide(){
    modal.dom.style.display = "none";
    document.body.style.backgroundColor = "#fff"
  }

}


// inicuj nową grę
modal.init()

if(isMobile){
  modal.show('DOTKNIJ NIEBIESKIEGO KAFELKA, ABY ROZPOCZĄĆ GRĘ <br/> PRZECIĄGNIJ PACLEC NA POMARAŃCZOWY, ABY WYGRAĆ')
}else{
  modal.show('KLIKNIJ NA NIEBIESKI KAFELEK, ABY ROZPOCZĄĆ GRĘ <br/> PRZESUŃ KURSOR NA POMARAŃCZOWY, ABY WYGRAĆ')
}


game.init()