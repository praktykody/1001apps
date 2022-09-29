// POBIERAMY GAMEPLANE Z HTML'A PO KLASIE
const gamePlane = document.querySelector(".gamePlane");

// Funkcja tworząca ścianę na podstawie argumentów
// x - odległość od lewe
// y - odległość od góry
// w - szerokość ściany
// h - wysokość ściany
// type - rodzaj (start, meta, wall)
function makeWall(x, y, w, h, type = "wall") {
  // ustaw kolor ściany
  let color = "rgba(119, 92, 119, 0.373)"; // domyślny
  if (type == "start") {
    color = "#5A5166";
  }
  if (type == "meta") {
    color = "rgba(113, 46, 113, 0.614)";
  }
  // rgba(199, 65, 199, 0.373)

  // Tworzymy nowy element HTML (div)
  const wall = document.createElement("div");
  // do stworzonego elementu dodajemy style
  wall.style.cssText = `
    /* $ { } - pozwala na dodanie js'owej zmiennej wewnątrz backtick'ów*/
    background:${color};
    width:${w}%;
    height:${h}%;
    left:${x}%;
    top:${y}%;
    position:absolute;
  `;
  // dodajemy klasy do każdego diva
  wall.className = "wall";
  if (type != "wall") {
    // jeżeli ściana nie jest zwykłym wallem, to dodaj
    // jej typ jako klasę ( po spacji )
    wall.className += " " + type;
  }

  // do gameplanu (który jest wpięty w HTML'a)
  // wpinamy walla
  gamePlane.append(wall);
}

// tablica map przechowująca tablice zawierające informacje o ścianie
// (każdy pojedyńczy element tablicy map to jedna ściana)

const map = [
  [0, 0, 13, 20, "start"],
  [5, 20, 8, 80],
  [13, 90, 7, 10],
  [20, 20, 8, 80],
  [20, 0, 20, 20],
  [40, 0, 8, 100],
  [48, 90, 20, 10],
  [60, 0, 8, 90],
  [68, 0, 20, 20],
  [88, 0, 12, 80],
  [88, 80, 12, 20, "meta"],
];

// pętla, pobierająca elementy tablicy map jako wall
for (const wall of map) {
  // w tym miejscu wyciągany jest po kolei każdy element tablicy map
  // jako wall
  // ...wall wyciągają dane z tablicy wall i przekazywane są
  // jako kolejne argumenty funckji makewall
  makeWall(...wall);
}

// detect mobile or desktop
let isMobile = navigator.userAgentData.mobile;
// odśwież stonę po zmianie narzędzi developerskich z mobile na desktop
// i odwrotnie
window.onresize = function () {
  location.reload();
};

// mechanika gry
const game = {
  maxTime: 5,
  init() {
    // init wykonuje się przed każdą grą
    // przygotowuje elementy do naciśnięcia "start"
    game.time = game.maxTime; // ustaw czas na maxa
    gamePlane.querySelector(".time").innerHTML = game.time; // wypełnij kafelek z czasem "nowym czasem"
    gamePlane
      .querySelector(".start")
      .addEventListener(isMobile ? "touchstart" : "click", game.start);
    // TO : isMobile ? 'touchstart' : 'click'
    // JEST TYM SAMYM CO TO
    // if(isMobile) { 'touchstart' }else { 'click' }
  },
  start() {
    // nie słuchaj klikania na start
    gamePlane
      .querySelector(".start")
      .removeEventListener(isMobile ? "touchstart" : "click", game.start);
    // sprawdź ruchy kursora (czy jeździ po mapie czy poza)
    gamePlane.addEventListener(
      isMobile ? "touchmove" : "mousemove",
      game.checkMove
    );
    // sprawdź czy użytkownik urządzenia mobilnego nie odrywa palca od ekranu
    // jeśli puszcza - przegrywa
    gamePlane.addEventListener("touchend", game.release);

    // zacznij odejmować co sekundę (1000 milisekund) czas od game.time
    game.interval = setInterval(function () {
      game.time--;
      // jeśli czas jest mniejszy niż 0 to przegraj grę
      if (game.time < 0) {
        game.over(false);
      }
      // odświeżaj widok w kafelku
      gamePlane.querySelector(".time").innerHTML = game.time;
    }, 1000);
  },
  checkMove(e) {
    let x, y;
    if (isMobile) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      x = e.clientX;
      y = e.clientY;
    }
    // pobierz w tablicy klasy elementu na którym znajduje się kursor
    let underHover = document.elementFromPoint(x, y).classList;
    // pobierz ostatnią klasę z listy klas elementu
    underHover = underHover[underHover.length - 1];
    // jeżeli element jest startem albo wallem, to nie rób nic
    if (underHover == "wall" || underHover == "start") {
      return;
    }
    // jeśli kursor jest nad metą, to wyjdź z metody checkMove wywołując game.over
    if (underHover == "meta") {
      return game.over(true);
    }
    // jeśli żaden z warunków nie jest spełniony to przegraj grę
    game.over(false);
  },
  release() {
    game.over(false);
  },
  over(result) {
    if (result) {
      modal.show("Wygrana! <br/> Gratulacje!", "#5A5166");
      document.body.style.backgroundColor = "#5A5166";
    } else {
      modal.show("Przegrałeś ;( <br/> Spróbuj jeszcze raz", "#5A5166");
      document.body.style.backgroundColor = "#5A5166";
    }
    // ściągamy słuchaczy
    gamePlane.removeEventListener("touchend", game.release);
    gamePlane.removeEventListener(
      isMobile ? "touchmove" : "mousemove",
      game.checkMove
    );
    // przerywamy występowanie interwału
    clearInterval(game.interval);
    // inicuj nową grę
    game.init();
  },
};

// przygotuj grę
// ta metoda wywołuje się po każdym odświeżeniu strony

// KOMUNIKATY
const modal = {
  dom: document.createElement("div"),
  h1: document.createElement("h1"),
  init() {
    modal.dom.style.cssText = `
      border:6px solid #9283A6;
      position:fixed;
      width:80vw;
      height:80vh;
      left:10vw;
      top:10vh;
      background:white;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      display:none;
      text-align:center;
      border-radius:10px;
    `;
    document.body.append(modal.dom);

    modal.h1.innerHTML = "H1";
    modal.dom.append(modal.h1);

    const button = document.createElement("button");
    button.innerHTML = "OK";
    button.style.cssText = ` 
      padding:1rem 4rem;
      border-radius:1rem;
      cursor:pointer;
      border-color: violet;
    width: 30%;
    `;
    button.onclick = function () {
      modal.hide();
    };
    modal.dom.append(button);
  },
  show(text, color = " antiquewhite") {
    modal.dom.style.backgroundColor = color;
    modal.dom.style.display = "flex";
    modal.h1.innerHTML = text;
  },
  hide() {
    modal.dom.style.display = "none";
    document.body.style.backgroundColor = " antiquewhite";
  },
};

// inicuj nową grę
modal.init();

if (isMobile) {
  modal.show(
    "DOTKNIJ ciemny KAFELek, ABY ROZPOCZĄĆ GRĘ <br/> PRZECIĄGNIJ PALEC NA koniec mapy, ABY WYGRAĆ"
  );
} else {
  modal.show(
    "KLIKNIJ NA ciemny KAFELEK, ABY ROZPOCZĄĆ GRĘ <br/> PRZESUŃ KURSOR NA koniec mapy, ABY WYGRAĆ"
  );
}

game.init();
