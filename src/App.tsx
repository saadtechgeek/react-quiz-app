import React,{useState} from 'react';
import {fetchQuizQuestions} from './API';
//Component
import  QuestionCard from './components/QuestionCard';
// types
import { QuestionsState, Difficulty } from './API';
// Styles
import { GlobalStyle, Wrapper } from './App.styles';


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS=10

const App=()=> {
  //setting states;
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

//  console.log(fetchQuizQuestions(10,Difficulty.EASY));

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestion = await fetchQuizQuestions(10,Difficulty.EASY);
    setQuestions(newQuestion);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver){
      // user answers
      const answer=e.currentTarget.value;
      // check answer against the correct answer
      const correct = questions[number].correct_answer=== answer;
      // Add score if the answer is correct;

      if (correct) setScore(prev => prev +1);

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer:questions[number].correct_answer
      };

      setUserAnswers((prev) => [...prev,answerObject]);
    }
  }

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <>
    <GlobalStyle />
    <div className='App'>
        <h1>React Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
            Start
        </button>) : null}
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (<p className="score">Score: {score}</p>) : null}
        {loading ? <p>Loading Question...</p>:null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
    </div>
    </>
  );
}

export default App;
