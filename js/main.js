'use strict'
{
  const number = document.getElementById('number');
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result >p');

  const numbers = ['問１','問２','問３'];
  const quizSet = shuffle([
    {q:'世界で一番大きな湖は？',c: ['カスピ海','カリブ海','琵琶湖']},
    {q:'２の８乗は？',c: ['256','1024','64']},
    {q:'次のうち、最初にリリースされた言語は？',c: ['Python','javaScript','HTML']},
  ]);

  let currentNum = 0;
  let isAnswered;
  let score = 0;

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
      score ++ ;
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

    while(number.firstChild) {
      number.removeChild(number.firstChild);
    }

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
    h1.textContent = numbers[currentNum];
    number.appendChild(h1);


    if (currentNum === quizSet.length -1 ) {
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  btn.addEventListener('click',() => {
    if (btn.classList.contains('disabled')) {
      return;     
    }      //btnにdisabledクラスが含まれていたらスキップ

    if (currentNum === quizSet.length -1 ) {
      // console.log(`Score:${score} / ${quizSet.length}`);
      scoreLabel.textContent = `Score:${score} / ${quizSet.length}`
      result.classList.remove('hidden');
    }else {
      btn.classList.add('disabled');
      currentNum ++ ;
      setQuiz();
    }
  });




}