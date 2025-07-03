// ---------- PAGE 1 (quiz setup) ----------
if (document.getElementById('startBtn')) {
  let selectedDifficulty = "";
  const difficultyButtons = document.querySelectorAll('.difficulty');
  const categorySelect = document.getElementById('category');
  const startBtn = document.getElementById('startBtn');

  difficultyButtons.forEach(button => {
    button.addEventListener('click', () => {
      difficultyButtons.forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');
      selectedDifficulty = button.dataset.difficulty;
      if (selectedDifficulty && categorySelect.value) {
        startBtn.disabled = false;
      }
    });
  });

  categorySelect.addEventListener('change', () => {
    if (selectedDifficulty && categorySelect.value) {
      startBtn.disabled = false;
    }
  });

  startBtn.addEventListener('click', () => {
    const category = categorySelect.value;
    const apiURL = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${selectedDifficulty}&type=multiple`;
    sessionStorage.setItem('quizApiUrl', apiURL);
    window.location.href = "quiz.html";
  });
}



// ---------- PAGE 2 (quiz questions) ----------
if (document.getElementById('question-container')) {
  const container = document.getElementById('question-container');
  const submitBtn = document.getElementById('submitBtn');
  const scoreDiv = document.getElementById('score');
  let correctAnswers = {};

  const apiURL = sessionStorage.getItem('quizApiUrl');
  fetch(apiURL)
    .then(res => res.json())
    .then(data => {
      container.innerHTML = '';
      data.results.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        const allAnswers = shuffle([...q.incorrect_answers, q.correct_answer]);

        correctAnswers[`q${index}`] = q.correct_answer;

        questionDiv.innerHTML = `
          <h3>Q${index + 1}: ${decodeHTML(q.question)}</h3>
          <ul>
            ${allAnswers.map(ans => `<li data-q="q${index}">${decodeHTML(ans)}</li>`).join('')}
          </ul>
        `;
        container.appendChild(questionDiv);
      });
    });




  // Handle answer selection and enable submit button when all are answered
  container.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
      const questionKey = e.target.dataset.q;
      const siblings = e.target.parentElement.querySelectorAll('li');
      siblings.forEach(li => li.classList.remove('selected'));
      e.target.classList.add('selected');





      // Check if all questions have a selected answer
      const totalQuestions = Object.keys(correctAnswers).length;
      const selectedAnswers = container.querySelectorAll('li.selected');
      const uniqueSelected = new Set();
      selectedAnswers.forEach(li => uniqueSelected.add(li.dataset.q));

      if (uniqueSelected.size === totalQuestions) {
        submitBtn.disabled = false;
      }
    }
  });





  // Handle submission
  submitBtn.addEventListener('click', () => {
    const allLis = container.querySelectorAll('li');
    let score = 0;

    for (let i = 0; i < Object.keys(correctAnswers).length; i++) {
      const selected = container.querySelector(`li[data-q="q${i}"].selected`);
      const all = container.querySelectorAll(`li[data-q="q${i}"]`);
      all.forEach(li => {
        if (li.textContent === decodeHTML(correctAnswers[`q${i}`])) {
          li.style.backgroundColor = 'green';
          li.style.color = 'white';
        } else if (li.classList.contains('selected')) {
          li.style.backgroundColor = 'red';
          li.style.color = 'white';
        }
        li.style.pointerEvents = 'none';
      });

      if (selected && selected.textContent === decodeHTML(correctAnswers[`q${i}`])) {
        score++;
      }
    }

    scoreDiv.innerHTML = `<h2>Your Score: ${score} / 10</h2>`;
    submitBtn.disabled = true;
  });
}




// ---------- Helper Functions ----------
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function decodeHTML(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}
