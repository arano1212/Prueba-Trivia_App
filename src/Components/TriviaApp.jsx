import React, { useState, useEffect } from 'react'

const TriviaApp = () => {
  const [questions, setQuestions] = useState([])
  const [score, setScore] = useState(0)

  const fetchTrivia = async (category, difficulty, type) => {
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`)
      const data = await response.json()
      setQuestions(data.results)
    } catch (error) {
      console.error('Error fetching trivia', error)
    }
  }
  const handleAnswer = (questionIndex, selectedAnswer) => {
    const correctAnswer = questions[questionIndex].correct_answer
    if (selectedAnswer === correctAnswer) {
      setScore(score + 100)
    }
  }

  const resetTrivia = () => {
    setQuestions([])
    setScore(0)
  }

  useEffect(() => {
    fetchTrivia('any', 'easy', 'multiple')
  }, [])

  return (
    <>
      <div>
        <p>Score: {score}</p>
        <ul>
          {questions.map((question, index) => (
            <li key={index}>
              <p>{question.question}</p>
              <ul>
                {question.incorrect_answers.map((answer, answerIndex) => (
                  <li key={answerIndex}>
                    <button onClick={() => handleAnswer(index, answer)}>{answer}</button>
                  </li>
                ))}
                <li>
                  <button onClick={() => handleAnswer(index, question.correct_answer)}>
                    {question.correct_answer}
                  </button>
                </li>
              </ul>
            </li>
          ))}
        </ul>
        <button onClick={() => resetTrivia()}>Crear Nueva Trivia</button>
      </div>
    </>
  )
}

export default TriviaApp
