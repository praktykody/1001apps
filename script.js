// PRZYCISKI KARUZELI
// stałą rArr przypisujemy do klasy .right pobranej z dokumentu HTML (stała rArr jest buttonem .right)
const rArr = document.querySelector('.right')
// do pobranego buttona przyczepiamy słuchacza wydarzeń, który pobiera 2 argumenty:
// 1. Rodzaj wydarzenia "click" ( na co słuchacz ma czekać )
// 2. Funkcja - co ma się dziać, jeżeli wydarzenie się wydarzy
rArr.addEventListener('click', function () {
  // ten fragment wykona się dopiero po kliknięciu na prawą strzałkę

  // pobieramy aktywny element z HTMLA ( ten z klasą 'active' )
  const activeElement = document.querySelector('.active');

  // usuwamy z aktywnego elementu klasę 'active'
  activeElement.classList.remove('active')

  // pobieramy element który jako kolejny będzie aktywny (kolejny z rodzeństwa)
  let nextActiveElement = activeElement.nextElementSibling

  // jeżeli nie ma kolejnego rodzeństwa
  if( !nextActiveElement ){
    // to do zmiennej nextActiveElement przypisz pierwszy element z rodzeństwa
    nextActiveElement = document.querySelector('.carousel-inner').firstElementChild
  }

  // do kolejnego aktywnego elementu przypisz klasę active
  nextActiveElement.classList.add('active')

})

const lArr = document.querySelector('.left')
lArr.addEventListener('click', () => {

  const activeElement = document.querySelector('.active');
  activeElement.classList.remove('active')

  let previousActiveElement = activeElement.previousElementSibling ? activeElement.previousElementSibling : document.querySelector('.carousel-inner').lastElementChild;
  previousActiveElement.classList.add('active')

})

// CHOWANIE MENU PO KLIKNIĘCIU GDZIEKOLWIEK
document.addEventListener('click', event => {
  const toggler = document.querySelector("#toggler")
  const menu = document.querySelector("#menu")
  const label = document.querySelector("#label")

  if( // jeżeli
    // nie kliknąłem na label      i   nie kliknąłem na toggler
    ( !event.path.includes(label)  &&  !event.path.includes(toggler) )
    // i jednocześnie nie kliknąłem na menu
    && !event.path.includes(menu)
  ){
    // to schowaj menu
    toggler.checked = false
  }
})