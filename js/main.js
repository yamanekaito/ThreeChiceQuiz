'use strict'
{
  const number = document.getElementById('number');
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');

  const quizSet = [
    {q:'What is A?',c: ['A0','A1','A2']},
    {q:'What is B?',c: ['B0','B1','B2']},
    {q:'What is C?',c: ['C0','C1','C2']},
  ];

  let currentNum = 0;
  let isAnswered;

  // question.textContent = quizSet[currentNum].q;
  
  
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i --) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i],arr[j]] = [arr[j],arr[i]];
    }
    return arr;
  }                            //シャッフル処理　　配列の中身をシャフルする

  function checkAnswer(li) {
    // if (isAnswered === true) {
    if (isAnswered === true) {    // === true　は省略可能
      return;　　　　//後の処理はスキップ
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
    }else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;

    while(choices.firstChild) {   //単一のオブジェクトをwhileに入れる場合false,null以外の場合は処理をする
      choices.removeChild(choices.firstChild);
    }　　　//choicesの子要素がある限り、子要素の最初の要素を消していく
    //choices の子要素が無くなるまで処理が続く

    // 配列.foreach(x => {
    //  console.log(x);  //配列の要素すべてをコンソールに表示
    // })

    // const shuffledChices = shuffle(quizSet[currentNum].c);
    const shuffledChices = shuffle([...quizSet[currentNum].c]);    //同じだが違う配列が代入される
    console.log(quizSet[currentNum].c);

    shuffledChices.forEach(choice => {   
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click',() => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    })

    const h1 = document.createElement('h1');
    h1.textContent = '問１';
    number.appendChild(h1);
  }

  setQuiz();

  btn.addEventListener('click',() => {
    currentNum ++ ;
    setQuiz();
  });




}