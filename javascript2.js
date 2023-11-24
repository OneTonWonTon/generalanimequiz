
  // Functions
  function buildQuiz() {
    // variable to store the HTML output
    const output = [];
  
    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // variable to store the list of possible answers
      const answers = [];
  
      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<div class="answer">
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter].text}
            <img src="${currentQuestion.answers[letter].image}" alt="${currentQuestion.answers[letter].text}" class="answer-image">
          </div>`
        );
      }
  
      // add this question and its answers to the output
      output.push(
        `<div class="slide">
          <div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>
        </div>`
      );
      if ((questionNumber + 1) % 2 === 0) {
        output.push('<br>');
      }
    });
  
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "Which family meal is most worth it?",
      answers: {
        a: { 
          text: "Happy Meal",
          image: "happymeal.jpg"
      },
      b: { 
        text: "Burger King Famly Meal",
        image: "burgerking.jpg"
    },
        c: {
          text: "Wendy's Famly Meal",
          image: "Wendys.jpg"
        },
        d: {
          text: "Kamado Famly Meal",
          image: "kamado.jpg"
        }
      },
      correctAnswer: "d"
    },
    {
      question: "Which food anime was the best?",
      answers: {
        a: { 
          text: "Attack on Titan",
          image: "sasha.jpg"
      },
      b: { 
        text: "Shokugeki no Souma",
        image: "shokugeki.jpg"
    },
        c: {
          text: "Restaurant to Another World",
          image: "restaurant.jpg"
        },
        d: {
          text: "Cooking Master Boy",
          image: "master.jpg"
        }
      },
      correctAnswer: "a"
    },
    {
      question: "Which one is the best anime pet?",
      answers: {
        a: { 
          text: "Happy",
          image: "happy.jpg"
      },
      b: { 
        text: "Nina",
        image: "nina.jpg"
    },
        c: {
          text: "Kurama",
          image: "kurama.jpg"
        },
        d: {
          text: "Hamtaro",
          image: "hamtaro.jpg"
        }
      },
      correctAnswer: "b"
    },
    {
      question: "Which anime character is the best family man?",
      answers: {
        a: { 
          text: "Loid Forger",
          image: "spyxfam.jpg"
      },
      b: { 
        text: "Goku",
        image: "goku.jpg"
    },
        c: {
          text: "Uchiha Itachi",
          image: "itachi.jpg"
        },
        d: {
          text: "Kotaro",
          image: "kotaro.jpg"
        }
      },
      correctAnswer: "c"
    },
    {
      question: "Which donut is the best?",
      answers: {
        a: { 
          text: "Chocolate",
          image: "chocolate.jpg"
      },
      b: { 
        text: "Cronut",
        image: "cronut.jpg"
    },
        c: {
          text: "Glazed",
          image: "glazed.jpg"
        },
        d: {
          text: "Rengoku",
          image: "rengoku.jpg"
        }
      },
      correctAnswer: "d"
    }
    
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
