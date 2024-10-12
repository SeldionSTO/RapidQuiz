const answearsElmts = [document.getElementById('ans-1'), document.getElementById('ans-2'), document.getElementById('ans-3'), document.getElementById('ans-4')]
const qElmt = document.getElementById('quiz-ques')
const nextBtnElmt = document.getElementById('btn-next');
const resultScrElm = document.getElementById('user-result-pct');
const resultPctElm = document.getElementById('user-result-point');
const resultElm = document.getElementById('result')
const statusTxt = document.getElementById('status-text')
const statusImg = document.getElementsByClassName('status-icon')[0].querySelector('img')
const quizElm = document.getElementById('quiz');

let quizObj;
let q;
let currentQ = 0;
let userAnswears = [];


let questionsData = 
[
    {
        title : "What is the term for the unequal treatment of individuals based on their race?",
        answears : [
            "Ageism",
            "Sexism",
            "Racism",
            "Ableism"
        ],
        correct : 2
    },
    {
        title : "What does the gender pay gap refer to?",
        answears : [
            "Men being paid more because they work harder",
            "Differences in pay between men and women for similar work",
            "Differences in working hours between men and women",
            "Men getting more promotions than women"
        ],
        correct : 1
    },
    {
        title : "What is ‘implicit bias’?",
        answears : [
            "Conscious discrimination against a group",
            "Unintentional, subconscious stereotypes influencing decisions",
            "Direct actions to marginalize someone",
            "Not seeing any kind of inequality in society"
        ],
        correct : 1
    },
    {
        title : "Which group is most likely to face ‘ableism’?",
        answears : [
            "People from minority races",
            "People with disabilities",
            "People from lower-income backgrounds",
            "People who speak multiple languages"
        ],
        correct : 1
    },
    {
        title : "Which economic term describes the growing income gap between the rich and the poor?",
        answears : [
            "Economic downturn",
            "Inflation",
            "Wealth inequality",
            "Capitalism"
        ],
        correct : 2
    },
    {
        title : "What is one major cause of educational inequality?",
        answears : [
            "Standardized testing",
            "Differences in school funding based on local taxes",
            "School uniforms",
            "Homework policies"
        ],
        correct : 1
    },
    {
        title : "What does ‘intersectionality’ describe?",
        answears : [
            "The combination of multiple identities (e.g., race, gender) that creates unique experiences of discrimination",
            "The point where roads meet",
            "The study of race exclusively",
            "The interaction between different economic classes"
        ],
        correct : 0
    },
    {
        title : "Which of the following is an example of gender inequality?",
        answears : [
            "Equal access to education for men and women",
            "Men receiving longer prison sentences for the same crime",
            "Women being underrepresented in leadership positions",
            "Both genders earning the same salary for the same work"
        ],
        correct : 2
    },
    {
        title : "Which factor can exacerbate housing inequality?",
        answears : [
            "Equal distribution of resources",
            "Racial discrimination in mortgage lending",
            "Improved urban planning",
            "Access to affordable public transportation",
        ],
        correct : 1
    },
    {
        title : "What is a common misconception about poverty?",
        answears : [
            "It only affects people who don’t want to work",
            "It is solely caused by individual choices",
            "It is influenced by systemic factors like job availability and wages",
            "All people in poverty are uneducated"
        ],
        correct : 2
    },
    {
        title : "What is environmental inequality?",
        answears : [
            "Differences in access to nature reserves",
            "Unequal exposure of marginalized communities to environmental hazards like pollution",
            "Restrictions on traveling to national parks",
            "Different access to gardening tools"
        ],
        correct : 1
    },
    {
        title : "Which social factor often leads to health inequality?",
        answears : [
            "Everyone receiving the same healthcare",
            "Limited access to healthcare for low-income groups",
            "Universal healthcare systems",
            "High-quality hospitals in all areas"
        ],
        correct : 1
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