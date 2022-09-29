const gamePlane = document.querySelector('.gamePlane')

//const wall = document.createElement("div")
//wall.style.cssText = `
//background:green;
//width:20%;
//height:20%;
//left:10%;
//top:0%;
//position:absolute;
//`
//gamePlane.append(wall)

//const wall = document.createElement("div")
//wall1.style.cssText = `
//background:green;
//width:20%;
//height:20%;
//left:30%;
//top:40%;
//position:absolute;
//`
//gamePlane.append(wall1)


function makeWall(x, y, w, h, type = 'wall') {
    let color = 'green'
    if(type == 'start') {color = 'blue'}
    if(type == 'meta') {color = 'orange'}
    
    const wall = document.createElement('div')
    wall.style.cssText = `
    background:${color};
    width:${w}%;
    height:${h}%;
    left:${x}%;
    top:${y}%;
    position:absolute;
    `
    wall.className = 'wall'
    if(type != 'wall') {
        wall.className += ' '+type;
    }
    
    gamePlane.append(wall)
     
}

const map = [
    [0,0,20,20, 'start'],
    [10,20,20,10],
    [20,30,20,10],
    [30,40,20,10],
    [40,50,20,10],
    [50,60,20,10],
    [60,70,30,10],
    [80,80,20,20, 'meta']
]

for(const wall of map) {
    makeWall(...wall)
}


const game = {
    buttons: {
        start: document.querySelector('.start'),
        meta: document.querySelector('.meta'),
        walls: document.querySelectorAll('.wall'),
    },

    init(){
        game.buttons.start.onclick = function () { game.start() }
    },

    start (){
        game.buttons.start.onclick =""
        game.buttons.meta.addEventListener ('mousemove', game.metaTrigger)
        console.log("GAME STARTED")
    }, 
    metaTrigger() {
        game.over(true)
    },       
    over (result) {
        if(result){
            console.log("YOU WIN")
        }else{
            console.log("YOU LOSE")
    }
    game.buttons.meta.removeEventListener('mousemove', game.metaTrigger)
    game.init()
    }
}
game.init()