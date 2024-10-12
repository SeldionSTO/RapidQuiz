const answearsElmts = [document.getElementById('ans-1'), document.getElementById('ans-2'), document.getElementById('ans-3'), document.getElementById('ans-4')]
const qElmt = document.getElementById('quiz-ques')
const nextBtnElmt = document.getElementById('btn-next');
const resultScrElm = document.getElementById('user-result-pct');
const resultPctElm = document.getElementById('user-result-point');
const resultElm = document.getElementById('result')
const statusTxt = document.getElementById('status-text')
const statusImg = document.getElementsByClassName('status-icon')[0].querySelector('img')
const quizElm = document.getElementById('quiz');
const progressElm = document.getElementById('quiz-status');

let quizObj;
let q;
let currentQ = 0;
let userAnswears = [];


let questionsData = 
[
    {
        "title": "What is the capital city of Japan?",
        "answears": [
            "Seoul",
            "Tokyo",
            "Beijing",
            "Bangkok"
        ],
        "correct": 1
    },
    {
        "title": "Which planet is known as the Red Planet?",
        "answears": [
            "Earth",
            "Venus",
            "Mars",
            "Jupiter"
        ],
        "correct": 2
    },
    {
        "title": "In which year did the Titanic sink?",
        "answears": [
            "1912",
            "1905",
            "1920",
            "1915"
        ],
        "correct": 0
    },
    {
        "title": "Who wrote the play 'Romeo and Juliet'?",
        "answears": [
            "Charles Dickens",
            "William Shakespeare",
            "Mark Twain",
            "Jane Austen"
        ],
        "correct": 1
    },
    {
        "title": "Which element has the chemical symbol 'O'?",
        "answears": [
            "Oxygen",
            "Osmium",
            "Oganesson",
            "Oxide"
        ],
        "correct": 0
    },
    {
        "title": "What is the largest ocean on Earth?",
        "answears": [
            "Atlantic",
            "Indian",
            "Pacific",
            "Arctic"
        ],
        "correct": 2
    },
    {
        "title": "Which country hosted the 2016 Summer Olympics?",
        "answears": [
            "China",
            "Brazil",
            "Russia",
            "Japan"
        ],
        "correct": 1
    },
    {
        "title": "What is the freezing point of water in Celsius?",
        "answears": [
            "0°C",
            "32°C",
            "100°C",
            "-1°C"
        ],
        "correct": 0
    },
    {
        "title": "Who painted the Mona Lisa?",
        "answears": [
            "Vincent van Gogh",
            "Pablo Picasso",
            "Leonardo da Vinci",
            "Claude Monet"
        ],
        "correct": 2
    },
    {
        "title": "Which is the smallest planet in our solar system?",
        "answears": [
            "Mercury",
            "Venus",
            "Mars",
            "Pluto"
        ],
        "correct": 0
    },
    {
        "title": "What is the main ingredient in guacamole?",
        "answears": [
            "Tomato",
            "Onion",
            "Avocado",
            "Lime"
        ],
        "correct": 2
    },
    {
        "title": "How many continents are there on Earth?",
        "answears": [
            "5",
            "6",
            "7",
            "8"
        ],
        "correct": 2
    }
]

class quiz {
    constructor(obj) {
        this.quizDOM = obj
        this.totalScore = 0;
        this.passRate;
        this.name;
    }

    showResult() {
        let usrCorrectRate = (this.totalScore / questionsData.length);

        resultElm.style.display = "Flex";

        
        if (usrCorrectRate >= this.passRate) {
            statusTxt.innerText = 'Congratulations, you passed the quiz! :)'
            statusTxt.classList.add('passed')
            statusImg.src = 'assets/img/accept.png'
        } else if (usrCorrectRate <= this.passRate) {
            statusTxt.innerText = "Unfortunately, you didn't passed the quiz :("
            statusTxt.classList.add('failed')
            statusImg.src = 'assets/img/close.png'
        }



        resultScrElm.innerHTML = `${this.totalScore} / ${questionsData.length}`;
        resultPctElm.innerHTML = `${Math.round(usrCorrectRate * 100)}%`;

    }

    validateAns() {
        for (let i = 0; i < userAnswears.length; i++) {
            if (userAnswears[i] === questionsData[i].correct) {
                this.totalScore++;
            }
        }
    }
}

class questions extends quiz {
    constructor(obj) {
        super();
        this.title = obj.title;
        this.answears = obj.answears;
        this.correct = obj.correct;
        this.userSelection;
    }
    
    displayQuestion() {
    
        qElmt.innerText = this.title;
    
        for (let i = 0; i < this.answears.length; i++) {
            answearsElmts[i].innerText = this.answears[i];
        }
    }

    userSelected(input) {
        this.userSelection = input;
        for (let index = 0; index < answearsElmts.length; index++) {
            answearsElmts[index]?.classList.remove('selected');
        }
        answearsElmts[this.userSelection].classList.add('selected');

        return this.userSelection;
    }

    storeUserAns(userAns) {
        userAnswears.push(userAns)
    }

}



function loadQues(nr = 0) {
    for (let index = 0; index < answearsElmts.length; index++) {
        answearsElmts[index]?.classList.remove('selected');
    }
    
    q = new questions(questionsData[nr]);
    q.displayQuestion();
}



function handleNextBtn() {
    if (currentQ < questionsData.length - 1) {
        
        if (currentQ === questionsData.length - 2) {
        }
        
        currentQ += 1;
        progressElm.innerText = `${currentQ}/${questionsData.length}`;
        q.storeUserAns(q.userSelection);
        loadQues(currentQ)
    } 
    else if (currentQ === questionsData.length - 1) {
        q.storeUserAns(q.userSelection);
        quizObj.quizDOM.style.display = "None";


        quizObj.validateAns();
        quizObj.showResult();
    }
}

function startQuiz(name = 'default', passRate = 0.6) {
    quizObj = new quiz(quizElm) 
    quizObj.name = name;
    quizObj.passRate = passRate;
   
    quizObj.quizDOM.style.display = 'Flex'
    progressElm.innerText = `${currentQ}/${questionsData.length}`;

    loadQues();
}

function resetQuiz() {
    quizObj = undefined;
    resultElm.style.display = "none";
    quizElm.style.display = 'none';
    statusTxt.classList.remove('passed')
    statusTxt.classList.remove('failed')
    currentQ = 0;
    userAnswears = [];
    q = undefined;
}

startQuiz();

//Listerners
for (let i = 0; i < answearsElmts.length; i++) {
    answearsElmts[i].addEventListener('click', () => q.userSelected(i));
}
 
nextBtnElmt.addEventListener('click', () => handleNextBtn());





document.getElementById('restart-btn').addEventListener('click', () => {
    resetQuiz();
    startQuiz();
})