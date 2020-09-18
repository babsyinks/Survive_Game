var allAnimals = ['Hippo', 'Lion','Lion1', 'Redscary', 'Rex', 'Rexman', 'Scary', 'Snake', 'Snake1','Snake2',
'Tiger','Tiger1','Tiger2','Tiger3', 'Blackleopard','Croc', 'Dog','Bear','Bear1','Bull','Crocodile','Diablo',
'Dino','Dino1','Dino2','Dino3','Dino4','Dino5','Dino6','Dragon','Dragon1','Elephant','Godzilla','Godzilla1',
'Godzilla2','Ghost','Monster','Rhino','Rhinno','White_Lion','Wolf','Wolf1','Zombie','Angry_Cat','Blue_Leo',
'KingKong','KingKong1','KingKong2','KingKong3','KingKong4','KingKong5','Leopard','Leopard1','Leopard2',
'Mammoth','Mammoth1','Panda','Puma','Saber_Tooth','Saber_Tooth1','Shark','Shark1','Shark2','Shark3','Shark4',
'Shark5','Shark6','Vampire','WereWolf','WereWolf1','WereWolf2','WereWolf3','WereWolf4','WereWolf5','WereWolf6',
'WereWolf7',
]

var View = {
  display: function(imgClass, id) {
    var cell = document.getElementById(id)
    cell.setAttribute('class', imgClass)
  },
  displayNeutral: function(){
    let tags = document.getElementsByTagName('tr')
  
    for (var i = 0; i < tags.length; i++) {
  
      var childTags = tags[i].getElementsByTagName('td')
      for (var j = 0; j < childTags.length; j++) {
        
        let id = childTags[j].getAttribute('id')
        View.display('Neutral',id)
      }
    }
  }
}

var Model = {
  hits: 0,
  levelHits:0,
  gameWon: false,
  playAgain:true,
  speed:2100,
  score: function() {
    const hits = this.hits*10
    if(hits<0){
      hits = 0
    }
    return hits
  },

  misses: 0,

  arrayOfIds:[],

  setIds: function() {
    // var k = 0
    var tags = document.getElementsByTagName('tr')
    for (var i = 0; i < tags.length; i++) {

      var childTags = tags[i].getElementsByTagName('td')
      for (var j = 0; j < childTags.length; j++) {
        var x = i + '' + j
        childTags[j].setAttribute('id', x)
        Model.arrayOfIds.push(x)
      }
    }
  },

  setAnimals:function(){

    Model.animalClasses = allAnimals.slice()
  },

  animalClasses: allAnimals.slice(), 

  explosion: 'Explosion',

  cancel: 'X'

}

var Controller = {
  pickAnimal: function() {
    var index = Math.floor(Math.random() * Model.animalClasses.length)
    const pickedAnimal = Model.animalClasses[index]
    Model.animalClasses.splice(index,1)
    return pickedAnimal
  },

  pickACell:function(){

    if(Model.arrayOfIds.length){
      const randomVal = Math.floor(Math.random()*Model.arrayOfIds.length)
      const id = Model.arrayOfIds[randomVal]
      Model.arrayOfIds.splice(randomVal,1)
      return id
    }
    else{
      
      return ''
    }
    
  }
}

function coolFunction() {

  //handle successful click on the right cell
  function myHandler() {
    isClicked = true
    View.display(Model.explosion, myId)
    currentCell.removeEventListener('click', myHandler)
    Model.hits++
    Model.levelHits++
  }

  //handle unsuccessful timely click on cell
  function forTimer() {
    if (!isClicked) {
      View.display(Model.cancel, myId)
      currentCell.removeEventListener('click', myHandler)
      Model.misses++
    }
  }

  var isClicked = false
 
  var myId = Controller.pickACell()
  
  if(myId){

    var animalClass = Controller.pickAnimal()

    View.display(animalClass, myId)

  //Attach event handler to cell
  var currentCell = document.getElementById(myId)

  currentCell.addEventListener('click', myHandler)

  timeOut = setTimeout(forTimer, 1500)
  timeOuts.push(timeOut)
  }
  else{
    Model.gameWon = true
        alert('You Win!!! Your score is '+ Model.score())
        const anotherGame = confirm('Will you like to play another game?') 
        if(anotherGame){
          Model.playAgain = true
          if(Model.speed>0){
            const faster = confirm('Will you like to play at a faster speed?')
            if(faster){
            Model.speed-=300
        }
          }
          else{
            return alert('You have completed the game.Congratulations!!!')
          }
        }
        else{
          Model.playAgain = false
          window.location = "index.html"
        }
  }
  
}

function myFunction() {
  Model.setIds()
  var timer = setInterval(newTimer,Model.speed)
 
  function newTimer() {
    if (Model.misses >= 3) {
      //displayNeutral()
      timeOuts.forEach(to=>clearTimeout(to))
      
      clearInterval(timer)
        alert('Gameover!!! Your score is  '+ Model.score())
        const replay = confirm("Will you want to retry this level?")
        if(replay){
          
          Model.hits -= Model.levelHits
          reinitialize()
        }
        else{
          window.location = "index.html"
        }
      return
    }else if(Model.gameWon){
        timeOuts.forEach(to=>clearTimeout(to))
        clearInterval(timer)
        if(Model.playAgain){
          reinitialize()
        }
      return
    }
    coolFunction()
  }
}

function reinitialize(){
  Model.setAnimals()
  Model.levelHits = 0
  Model.misses = 0
  Model.gameWon = false
  Model.arrayOfIds = []
  View.displayNeutral()
  myFunction()
}

var timeOut
var timeOuts = []
