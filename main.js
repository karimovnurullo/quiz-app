"use strict";

const leftNumber = document.querySelector('.top-left');
const rightNumber = document.querySelector('.top-right');
const operationNumber = document.querySelector('.top-center');
const centerDivs = document.querySelectorAll('.center-item');
const trueDiv = document.querySelector(".true");
const falseDiv = document.querySelector(".false");
const close = document.querySelectorAll(".close");
const answer = document.querySelector(".answer");
const generateBtn = document.querySelector(".generate-btn");
const countdownDiv = document.querySelector(".counter");
const falseAnswerDiv = document.querySelector(".false-answer");
const trueAnswerDiv = document.querySelector(".true-answer");
const theEnd = document.querySelector(".the-end");
const startBtn = document.querySelector(".start-btn");
const game = document.querySelector(".game");
const timerDiv = document.querySelector(".timer");
// const soundCount = new Audio("./count.mp3");
const soundCount = new Audio("./s.m4a");
soundCount.load();


let operationArray = ['+', '-', '*'];

function options() {
    return Math.floor(Math.random() * 4);
}

let operationValue;
let resultNumber;
let trueArr = [];
let trueAnswer = 0;
let falseAnswer = 0;
let step = 0;

function randomMain() {
    return Math.floor(Math.random() * (300 - (-100) + 1)) + (-100);
}
let firstNumberRandom;
let secondNumberRandom;

function generateOperation() {
    let operationRandom = Math.floor(Math.random() * operationArray.length);
    firstNumberRandom = randomMain();
    secondNumberRandom = randomMain();
    leftNumber.textContent = firstNumberRandom;
    rightNumber.textContent = secondNumberRandom;
    if (operationRandom === 0) {
        resultNumber = firstNumberRandom + secondNumberRandom;
        operationValue = "+";
    } else if (operationRandom === 1) {
        resultNumber = firstNumberRandom - secondNumberRandom;
        operationValue = "-";
    } else if (operationRandom === 2) {
        resultNumber = firstNumberRandom * secondNumberRandom;
        operationValue = "*";
    }
    return operationNumber.innerHTML = operationValue;
}

function notogriJavoblarRandom(n) {
    return Math.floor(Math.random() * (n + 30 - (n - 30) + 1)) + (n - 30);
}

function generateMainNumbers() {
    let togriJavob = centerDivs[options()];
    togriJavob.textContent = resultNumber;
    for (let i = 0; i < centerDivs.length; i++) {
        const element = centerDivs[i];
        if (togriJavob !== element) {
            element.textContent = notogriJavoblarRandom(resultNumber);
            element.addEventListener('click', () => {
                console.log("xato javob");
                trueDiv.classList.remove("active");
                falseDiv.classList.add("activexato");
            });
        } else {
            element.addEventListener('click', () => {
                console.log("To'g'ri javob");
                trueDiv.classList.add("active");
                falseDiv.classList.remove("activexato");
                answer.innerHTML = `<h4>${firstNumberRandom} ${operationValue} ${secondNumberRandom} = <span>${resultNumber}</span></h4>`;
            });
        }
        element.addEventListener('click', (e) => {
            if (step === 10) {
                trueDiv.classList.remove("active");
                falseDiv.classList.remove("activexato");
                step = 0;
                countdownDiv.textContent = step;
                trueAnswerDiv.textContent = trueAnswer;
                falseAnswerDiv.textContent = falseAnswer;
                trueAnswer = 0;
                falseAnswer = 0;
                theEnd.classList.add("active");
                init();
            }
        });
    }
}
let trueDivClose = document.querySelector('.true .close');
trueDivClose.addEventListener('click', () => {
    trueAnswer++;
    countdownDiv.textContent = trueAnswer;
    step++;
    countdownDiv.textContent = step;
    console.log("To'g'ri topdi :", trueAnswer);
})
let falseDivClose = document.querySelector('.false .close');
falseDivClose.addEventListener('click', () => {
    falseAnswer++;
    countdownDiv.textContent = falseAnswer;
    console.log("xato topdi :", falseAnswer);
    step++;
    countdownDiv.textContent = step;
})
let theEndDivClose = document.querySelector('.the-end .close');
theEndDivClose.addEventListener('click', () => {
    theEnd.classList.remove("active");
})
close.forEach(element => {
    element.addEventListener('click', () => {
        trueDiv.classList.remove("active");
        falseDiv.classList.remove("activexato");
        generateOperation();
        generateMainNumbers();
        generateMainNumbers();
        console.log("To'g'ri", resultNumber);
    })
});


let count = 15;
timerDiv.textContent = count;

function countdown() {
    const timer = setInterval(() => {
        count--;
        if (count === 0) {
            count = 0;
            timerDiv.textContent = 0;
            clearInterval(timer);
            trueAnswer++;
            step++;
            countdownDiv.textContent = step;
            console.log('Time up!');
            count = 15;
            init();
           
        } else {
            timerDiv.textContent = count;
        }
        if (step === 10) {
            trueDiv.classList.remove("active");
            falseDiv.classList.remove("activexato");
            step = 0;
            countdownDiv.textContent = step;
            trueAnswerDiv.textContent = trueAnswer;
            falseAnswerDiv.textContent = falseAnswer;
            trueAnswer = 0;
            falseAnswer = 0;
            theEnd.classList.add("active");
            clearInterval(timer);
            init();
        }
    }, 1000);
}


function init() {
    countdown();
    randomMain();
    generateOperation();
    generateMainNumbers();
    notogriJavoblarRandom(resultNumber)
    console.log("To'g'ri javob", resultNumber);
}

generateBtn.addEventListener("click", init);
startBtn.addEventListener("click", ()=>{
    init();
    game.classList.add('active');
    startBtn.classList.add('active');
});