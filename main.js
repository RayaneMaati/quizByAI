const timer = document.querySelector(".timerCount");
const faqAnswer = document.querySelectorAll(".faqItem .answer");
const recommandedTopic = document.querySelectorAll(".topicCard div");
const inp = document.querySelector(".topic input");
const quizWrapper = document.querySelector(".quizBoxSection");
const pickQuizTitle = document.querySelector(".topic h2");
const generateBtn = document.querySelector(".topic .generateBtn");
const quizContainer = document.querySelector(".quizContainer");
const quizContent = document.querySelector(".quizContent .questionHolder");
const loadingInterface = document.querySelector(".quizLoad");
const retryBtn = document.querySelector(".retry");
const retryBtnImg = document.querySelector(".retry img");
const choice = document.querySelectorAll(".choice");

function toggleFaq(i){
    if(faqAnswer[i].style.display == "none"){
        faqAnswer[i].style.display = "flex";
    }else{
        faqAnswer[i].style.display = "none";
    }   
}

function fillTopic(i){
    inp.value = recommandedTopic[i].innerText;
}

function showQuiz(){
    if(inp.value != ""){
        quizWrapper.style.display = "flex";
        window.location.href = "#quizBoxSection";
    }else{
        pickQuizTitle.innerText = "Pick a subject and try again!"
        pickQuizTitle.style.color = "#F72C5B";
        generateBtn.style.backgroundColor = "#F72C5B";
        generateBtn.innerText = "Try Again!";

        setTimeout(function(){
            pickQuizTitle.innerText = "Pick the subject you'd like to study :";
            pickQuizTitle.style.color = "#4cb1ff";
            generateBtn.style.backgroundColor = "#0390fd";
            generateBtn.innerText = "Generate";
        }, 3000)
    }
}