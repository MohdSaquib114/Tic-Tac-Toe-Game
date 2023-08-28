const ticTacContainer = document.querySelector('.container')
const playAgain = document.querySelector('#play-again')
const quitBtn = document.querySelector('#quit')
const windowModal = document.querySelector('.modal-window')
const winner = document.querySelector('#winner')
const selectBtn =  document.querySelector('.selector')
const selectorContainer = document.querySelector('.selector-container')
const form = document.querySelector('.form')
const formHeading = document.querySelector('.form-heading')
const toaster = document.querySelector('.toaster')
const scoreBoard = document.querySelector('.score-board')
const preLoader = document.querySelector('.pre-loader')

const submitBtn = document.createElement('button')
submitBtn.innerHTML = 'SUBMIT'
submitBtn.classList.add('btn', 'form-btn')


window.addEventListener('load',()=>{
    preLoader.style.display = 'none'
    selectorContainer.style.display = 'block'
})


const boxes = [];
const scoreOfPlayers=[0,0]
let numberOfPlayer;
let input=[];
let label;
let span = []


let toggler = false
function ticorTac(){
   const crossOrcircle = toggler ? 'O':'X';
   toggler=!toggler
   return crossOrcircle
}


const ticTacAudio = new Audio('./public/sounds/mixkit-gear-fast-lock-tap-2857.wav')
const clickAudio  = new Audio('./public/sounds/mixkit-classic-click-1117.wav')
const errorSound  = new Audio('./public/sounds/mixkit-failure-arcade-alert-notification-240.wav')

ticTacContainer.addEventListener('click',(e)=>{
    let timeOutId
   

      if(e.target.tagName === 'DIV'){
       
      
      
       if(!boxes[e.target.id].hasChildNodes()){
           
           screenUpdater(boxes,e.target.id) 
           if(numberOfPlayer<2){
         timeOutId=  setTimeout(()=>{

                computerMove(boxes)
            },2000)
         
        } 

            
        }
      
           const isWin = winnerCheck(boxes)
           if(isWin!==''){
              clearTimeout(timeOutId)
           }
            tieOrWin(isWin);
       
      
         scoreUpdate()
     
     
     
    }


})

function screenUpdater(boxArr,id){
    ticTacAudio.play();
    const h1  = document.createElement('h1')
    h1.textContent=ticorTac()
    boxArr[id].appendChild(h1)
}

selectBtn.addEventListener('click',(e)=>{
    if(e.target.tagName === 'BUTTON'){
        clickAudio.play();
        numberOfPlayer = e.target.id;
        selectorContainer.style.display = 'none'
        for(let i=0; i<numberOfPlayer; i++){
             input[i] = document.createElement('input')
            label = document.createElement('label')
            label.innerHTML = `ENTER NAME OF PLAYER ${i+1} :`
            input[i].classList.add('input');
            form.appendChild(label)
            form.appendChild(input[i])
           
            
        }
        if(numberOfPlayer<2) formHeading.innerHTML='ENTER NAME OF PLAYER'
        else formHeading.innerHTML = 'ENTER NAME OF PLAYER'
        form.appendChild(submitBtn)
       
       form.style.display= 'block'

    }
 
  
})

submitBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    clickAudio.play()
   
   
 if(inputChecker()){
toaster.style.display = 'block'
errorSound.play()
setTimeout(()=>{
    toaster.style.display = 'none'
},3000)
 }else{
    playerScoreBoard()
    scoreBoard.style.display='flex'
    ticTacContainer.style.display = 'grid'
    for(let i=0; i<9; i++){
        const box = document.createElement('div')
        box.setAttribute('role','button')
        
        boxes.push(box)
      
    box.classList.add('box')
    box.setAttribute('id',i)
        ticTacContainer.appendChild(box)
    }}
})

playAgain.addEventListener('click', ()=>{
  boxes.forEach(box=> box.textContent='')
  windowModal.style.display = 'none'
})

function inputChecker(){
    let flag=false;
    for(let i=0; i<input.length; i++){
        if(input[i].value === ''){
            flag = true
        }
    }
    return flag;

}

quitBtn.addEventListener('click', ()=>{
    window.location.reload();
})

function winnerCheck(moves){
const winningPosibilities = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]]

let winner =''
winningPosibilities.forEach(arr=>{
    const[indexA,indexB,indexC ] = arr
    
  if(moves[indexA].textContent === moves[indexB].textContent && moves[indexA].textContent === moves[indexC].textContent){
   
   winner =   moves[indexA].textContent
  }
})

return winner
}

function playerScoreBoard(){
    
    for(let i =0; i<numberOfPlayer; i++){
        
        const h1 = document.createElement('h3');
        span[i] = document.createElement('span');
        span.textContent = scoreOfPlayers[i]
        h1.textContent = `${input[i].value.toUpperCase()} : `;
        h1.appendChild(span[i])
        scoreBoard.appendChild(h1)
    }
    if(numberOfPlayer<2){
        const h1 = document.createElement('h3');
         span[1] = document.createElement('span');
        span.textContent = scoreBoard[1]
        h1.textContent = `COMPUTER : `;
        h1.appendChild(span[1])
        scoreBoard.appendChild(h1)
    }
}
function isTied(){
return boxes.every(box=> box.hasChildNodes())
}
function tieOrWin(isWin){
    let winnerName ;
    if(isWin === 'O'||isWin ==='X'){
        if(isWin==='X') {
            scoreOfPlayers[0]++
            winnerName = input[0].value.toUpperCase()
        } 
        else {
            scoreOfPlayers[1]++
            winnerName = input[1].value.toUpperCase()
        }

        winner.innerHTML = `${winnerName} is Winner`
        windowModal.style.display = 'block'
       
    }
   else if(isTied() && isWin ===''){
        winner.innerHTML = 'MATCH TIE'
        windowModal.style.display = 'block'
    }
  
    
}
function scoreUpdate(){
    span.forEach((spn,i)=>spn.textContent = scoreOfPlayers[i] )
}

function computerMove(boxes){
const emptyBoxes = boxes.filter((box)=>!box.hasChildNodes())
const randomboxId =Math.floor( (Math.random()  * ((emptyBoxes.length-1) - 0) + 0))
screenUpdater(emptyBoxes,randomboxId)
}