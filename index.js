    const apiKey = "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"; // Replace with your actual OpenAI API key
    const endpoint = "https://api.openai.com/v1/chat/completions";

    async function fetchQuizQuestion(prompt) {
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        };
      
        const data = {
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt }
          ],
          max_tokens: 150,
          temperature: 0.7,
        };
      
        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const result = await response.json();
          return result.choices[0].message.content;
        } catch (error) {
          console.error("Error:", error);
          throw error;
        }
      }
  
      let currentAnswer = "";

      generateBtn.addEventListener("click", function(){
        // Directly calling the async function
        fetchQuizQuestion("Generate a simple quiz question about python. Include 4 Answers (A,B,C,D), make sure that the right answer is included within the options, dont mention the right answer")
        .then(quizQuestion => {
          fetchQuizQuestion("You are a highly intelligent quiz solver. I will give you a multiple-choice question, and you must determine the correct answer and respond with only the letter representing the correct choice. Do not explain your reasoning or provide any additional information. Do not add any ponctuation only the letter: "+ quizQuestion)
          .then(ans=>{
            loadingInterface.style.display = "none";
            quizContent.innerText = quizQuestion;
            quizContainer.style.display = "flex";
            currentAnswer = ans;
          })
        })
        .catch(error => {
          console.error("Failed to fetch quiz question:", error);
        }); 
      });

      retryBtn.addEventListener("click", function(){
        quizContainer.style.display = "none";
        loadingInterface.style.display = "flex";
        backToDefault();
        // Directly calling the async function
        fetchQuizQuestion("Generate an easy quiz question about python but with diversified topics not too common and challenging. Include 4 Answers (A,B,C,D), make sure that the right answer is included within the options, dont mention the right answer")
        .then(quizQuestion => {
          fetchQuizQuestion("You are a highly intelligent quiz solver. I will give you a multiple-choice question, and you must determine the correct answer and respond with only the letter representing the correct choice. Do not explain your reasoning or provide any additional information. Do not add any ponctuation only the letter: "+ quizQuestion)
          .then(ans=>{
            loadingInterface.style.display = "none";
            quizContent.innerText = quizQuestion;
            quizContainer.style.display = "flex";
            currentAnswer = ans;
          })
        })
        .catch(error => {
          console.error("Failed to fetch quiz question:", error);
        }); 
      });

      // const choice = document.querySelectorAll(".choice");
      function checkAnswer(index){
        console.log(currentAnswer + " : " + choice[index].dataset.value)
        if(choice[index].dataset.value == currentAnswer.toLowerCase()){
          choice[index].style.backgroundColor = "#4BB543";

          for(i=0; i<choice.length; i++){
            if(i == index){
              continue;
            }
              choice[i].style.backgroundColor = "#0390fd";
              choice[i].style.display = "none";
              retryBtnImg.src = "icons/next.svg"
          }
        }else{
          choice[index].style.backgroundColor = "#F72C5B";
        }
      }

      function backToDefault(){
        for(i=0; i<choice.length; i++){
          choice[i].removeAttribute("style");
        }
        retryBtnImg.src = "icons/retry.svg"
      }