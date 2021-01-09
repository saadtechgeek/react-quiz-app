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

  }

  const nextQuestion = () => {

  }

  return (
    <div className='App'>
        <h1>React Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
            Start
        </button>) : null}
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (<p className="score">Score:</p>) : null}
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
        <button className='next' onClick={nextQuestion}>Next Question</button>
    </div>
  );
}

export default App;
