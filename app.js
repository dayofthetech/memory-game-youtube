document.addEventListener('DOMContentLoaded', () => {
  //card options
  //by creating an array you can add objects.
  const cardArray = [
    {
      name: 'fries',
      //path to the images
      img: 'images/fries.png'
    },
    //second object
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    //third object, and so on
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    //but then you make a copy of those six, because you want to have 12 pictures 6 of each to match
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    }
  ]

  //to sort the array randonly
  //this is a short cut to sorting an array randomdly
  cardArray.sort(() => 0.5 - Math.random())

  //you are grabbing the div from index.html through its ID
  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  let cardsChosen = []
  //third array
  let cardsChosenId = []
  //fourth array. to check all matches
  let cardsWon = []

  //create your board
  function createBoard() {
    //this is the sintax of a for loop
    //start from 0, as long as i is less than something, then increment byb 1
    for (let i = 0; i < cardArray.length; i++) {
      //js method to create an element, in this it creates an image
      const card = document.createElement('img')

      //once the card img is created, you will get the src and assiant a blank
      card.setAttribute('src', 'images/blank.png')
      //this is to keep track of each card, by adding an ID you are adding a number
      card.setAttribute('data-id', i)
      //you are adding an event listener click to each individual card
      //so you click the card, the flipCard function will be called
      //this is a function within a function
      card.addEventListener('click', flipCard)
      //you are grabing the grid, which is a div
      //and you are appending a card img
      grid.appendChild(card)
    }
  }

  //check for matches
  function checkForMatch() {
    //this search for all the img that live inside grid
    const cards = document.querySelectorAll('img')
    //first and second card, doing this is easy to read
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]

    if(optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      alert('You have clicked the same image!')
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      alert('You found a match')
      //here is setting a white img or in a way taken the card off the grid
      cards[optionOneId].setAttribute('src', 'images/white.png')
      cards[optionTwoId].setAttribute('src', 'images/white.png')
      //when it happends, then you remove the event listener of click
      //so a player wont click again on an empty white space and break the code
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      //same as when you push the name into the new array, here you are pushing the matches
      //from the first array
      cardsWon.push(cardsChosen)
    } else {
      //if its not a match,then you are setAttribute to the blank again,
      //similar to a flip
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      alert('Sorry, try again')
    }
    //empty the array again on both the cardsChosen and ChosenId
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    //checking if all cards are uncover
    //this if is the second in the function
    if  (cardsWon.length === cardArray.length/2) {
      resultDisplay.textContent = 'Congratulations! You found them all!'
    }
  }

  //flip your card
  function flipCard() {
    //whenever the card gets click, the this. part will get whatever you tell it to grab
    // in this case, this.getAttribute grabs the card-id, which is how each card is tell apart
    //  and assign to cardId
    let cardId = this.getAttribute('data-id')
    //from the empty array cardsChosen you are pushing the new array item name
    //so, cardArray is the origianl shuffle array and you are passing through the cardId name
    //so if in the first square you click pizza, you will get only pizza name, rather than the whole
    //array item
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)

    //again, using the this. is to grab set the new attribute src of the cardId img,
    //so similar to above where you are pushing the name into the name array
    //here, all you are doing is setAttribute the img
    //which works like a "flip", because it went from blank, to the img
    this.setAttribute('src', cardArray[cardId].img)
    //check for a match
    if (cardsChosen.length ===2) {
      //here, you are passing a function in a if statement
      //with a timeout of 500
      setTimeout(checkForMatch, 500)
    }
  }

  createBoard()
})
