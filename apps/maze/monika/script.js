const gamePlane = document.querySelector('.gamePlane')

function makewall(x, y, w, h, type ='wall'){
   
    let color = 'green'
    if(type =='start') {color = 'blue'}
    if(type =='meta') {color = 'red'}
    if(type == 'time'){color = 'purple'}
    
    
    const wall = document.createElement('div')
    wall.style.cssText = `
    background : ${color};
    width : ${w}%;
    height : ${h}%;
    left : ${x}%;
    top : ${y}%;
    position:absolute;
    border-radius:10px;

    `
    wall.className = 'wall'
    if(type != 'wall'){
        wall.className += ' '+type;
    }
    gamePlane.append(wall)
}
//makewall(50,30,20,20)
//makewall(50,30,20,20)
const map = [
    [80,0,20,20,'time'],
    [0,0,20,20,'start'],
    [10,20,20,10],
    [20,30,20,10],
    [30,40,20,10],
    [40,50,20,10],
    [50,60,20,10],
    [60,70,30,10],
    [80,80,20,20,'meta']
  ]
  
for(const wall of map){
    makewall(...wall)
}
const game = {
    maxTime : 5,
    buttons :  {
        time: document.querySelector('.time'),
        start : document.querySelector('.start'),
        meta : document.querySelector('.meta'),
        walls: document.querySelectorAll('.wall'),
    },
    init(){
        game.buttons.start.onclick = function(){game.start()}
        game.time = game.maxTime
    },
    start(){
        game.buttons.start.onclick = ""
        game.buttons.meta.addEventListener('mousemove', game.over)
        gamePlane.addEventListener('mousemove', game.gamePlaneListener)
        for(const wall of game.buttons.walls){
            wall.addEventListener('mousemove', game.wallListener)
        }

        game.interval = setInterval(function(){
            game.time--
            if(game.timre< 0 ){game.over(false)}
            game.buttons.time.interHTML =game.time}, 1000)
        
        console.log("GAME STARTED")
    },
    wallListener(e){
        e.stopPropagation()
    },

    gamePlaneListener(e){
        game.over(false)
    },
    over(result){
        if(result){
            modal.show('WYGRANA', 'green')
            document.body.style.backgroundColor = 'green'
        }
        else{
            modal.show('PRZEGRANA' , 'red')
            document.body.style.backgroundColor = 'red'
        }
        game.buttons.meta.removeEventListener('mousemove', game.over)
        gamePlane.removeEventListener('mousemove', game.gamePlaneListener)
        for(const wall of game.buttons.walls){
            wall.removeEventListener('mousemove', game.wallListener)
        }
        game.init()
    }
}

const modal = {
    dom : document.createElement('div'),
    h1 :  document.createElement("h1"),
    init(){
        modal.dom.style.cssText = `
        background-color: rgba(202, 89, 252, 1);
        background-image: radial-gradient(circle, rgba(202, 89, 252, 1) 0%, rgba(174, 0, 255, 1) 50%, rgba(81, 0, 139, 1) 100%);
        text-align: center;
        border: 5px dashed pink;
        position: fixed;
        width: 80vw;
        height: 50vh;
        left: 10vw;
        top: 25vh;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        border-radius:10px;
        display:none;
        -webkit-box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
        -moz-box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
        box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
        font-family: 'Black Ops One', cursive;
       
        text-shadow: 4px 4px 6px rgba(66, 68, 90, 1);
        
        `
        document.body.append(modal.dom)
        modal.h1 = document.createElement("h1")
        modal.h1.innerHTML = "XX"
        modal.dom.append(modal.h1)

        const button = document.createElement("button")
        button.innerHTML = "OK"
        button.style.cssText = 
        `padding:1rem 4rem;
        border-radius:1rem;
        cursor:pointer;
        -webkit-box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
        -moz-box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
        box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
        background: yellow;
        text-shadow: 4px 4px 6px rgba(66, 68, 90, 1);
        font-family: 'Bungee Spice', cursive;
        `
        button.onclick = function (){ modal.hide() }
        modal.dom.append(button)

    },
    show(text, color = 'yellow'){
        modal.dom.style.backgroundColor = color
        modal.dom.style.display = "flex";
        modal.h1.innerHTML = text
       
    },
    hide(){modal.dom.style.display = "none";
    document.body.style.backgroundColor ='#fff'
    }
}

modal.init()
modal.show('KLIKNIJ NA NIEBISEKI KAFELEK, <br/> ABY ROZPOCZĄĆ GRĘ. <br/> Dojedź do pola czerwonego nie wyjeżdżając z pola zielonego :)')
game.init()
