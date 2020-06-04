var View = {
  display: function(imgClass, id) {
    var cell = document.getElementById(id)
    cell.setAttribute('class', imgClass)
  },

  unDisplay: function(id) {
    document.getElementById(id).removeAttribute('class')
  }
}

var Model = {
  hits: 0,
  gameWon: false,

  score: function() {
    return (this.hits * 10)
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

  animalClasses: ['Hippo', 'Lion', 'Redscary', 'Rex', 'Rexman', 'Rhinno', 'Scary', 'Snake', 'Tiger', 'Blackleopard', 'Croc', 'Dog'],

  explosion: 'Explosion',

  middleFinger: 'Middlefinger'

}

var Controller = {
  pickAnimal: function() {
    var index = Math.floor(Math.random() * Model.animalClasses.length)
    return Model.animalClasses[index]
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

  function myHandler() {
    isClicked = true
    View.display(Model.explosion, myId)
    currentCell.removeEventListener('click', myHandler)
    Model.hits++
  }

  function forTimer() {
    if (!isClicked) {
      View.display(Model.middleFinger, myId)
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

  setTimeout(forTimer, 1500)
  }
  else{
    Model.gameWon = true
        alert('You Win!!!')
        alert('Your score is ' + Model.score()) 
  }
  
}

function myFunction() {
  Model.setIds()
  var timer = setInterval(newTimer, 2000)
 
  function newTimer() {
    if (Model.misses === 3) {
      clearInterval(timer)
        alert('Gameover')
        alert('Your score is ' + Model.score())
      
      return
    }else if(Model.gameWon){
        clearInterval(timer)
        
      return
    }
    coolFunction()
  }
}