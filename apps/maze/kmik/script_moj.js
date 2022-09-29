
// wall.style.cssText=`
//     background: green;
//     width:20%;
//     height:20%;
//     left:0%;
//     top:0%;
//     position:absolute;

const gamePlane=document.querySelector('.gamePlane')
// gamePlane.append(wall)
// console.log(wall)

function makeWall(x,y,w,h, type='wall'){
    // console.log(wall)
    let color='green'
    if(type=='start'){color='blue'}
    if(type=='meta'){color='orange'}
    const wall=document.createElement("div")
    wall.style.cssText= `
        background: ${color};
        width: ${w}%;
        height :${h}%;
        left: ${x}%;
        top: ${y}%;
        position: absolute;
        `
    // if(type=='start'){
    //     wall.onclick=function(){game.start()}
    wall.className = 'wall'

    if(type != 'wall'){
        wall.className += ' '+type;
    }
    
    gamePlane.append(wall)
}

const map = [
    [0,0,20,20, 'start'],
    [10,20,20,10],
    [20,30,20,10],
    [30,40,20,11],
    [40,50,20,10],
    [50,60,20,10],
    [60,70,30,10],
    [80,80,20,20, 'meta']   
]

for(const wall of map){
    // console.log("wall",wall)
    makeWall(...wall)
}

const game = {
    buttons:{
        start: document.querySelector('.start'),
        meta: document.querySelector('.meta'),
        walls: document.querySelector('.wall'),
    },

    init(){
        // console.log('initialize')
        // console.log(game.buttons.start)
        // console.log(game.buttons.walls)
        game.buttons.start.onclick = function () { game.start() }
    },

    start(){
        game.buttons.start.onclick = ""
        game.buttons.meta.addEventListener('mousemove', game.metaTrigger)
        gamePlane.addEventListener('mousemove', game.wallListener)
        for(const wall of game.buttons.walls){
            wall.addEventListener('mousemove', game.gamePlaneListener)
        }
        console.log("GAME STARTED")
    },

    wallListener(){
        // console.log('wall listen')
        e.stopPropagation();
    },

    gamePlaneListener(e){
        game.over(false)
    },

    metaTrigger(){
        // console.log("metatrigger")
        game.over(true)
    },

    over(result){
        if(result){
            console.log("YOU WIN!")
        }else{
            console.log("YOU LOSE")
        }
        game.buttons.meta.removeEventListener('mousemove', game.metaTrigger)

        gamePlane.removeEventListener('mousemove', game.wallListener)
        for(const wall of game.buttons.walls){
         wall.removeEventListener('mousemove', game.gamePlaneListener)
    }  
        game.init()
    }
}

game.init()


// KOMUNIKATY
// const modal = {
//     dom: document.createElement("div"),
//     init(){
//         modal.dom.style.cssText=`
//             border:10px dashed red;
//             position: fixed;
//             width: 80vw;
//             height: 80vh;
//             left:10vw;
//             top:10vh;
//             background:red;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             `
//         document.body.append(modal,dom)

//         const h1= document.createElement("h1")
//         modal.dom.append(h1)

//         const button= document.createElement("button")
//         button.innerHTML = "OK"
//         button.onclick = function() {modal.hide()}
//         modal.dom.append(button)

//     }
//     show(){
//         modal.dom.style.display= "flex";
//     }
//     hide(){
//         modal.dom.style.display= "none";
//     }
// }
// modal.init()
// modal.show()