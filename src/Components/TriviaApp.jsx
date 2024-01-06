import React, { useState, useEffect } from 'react'
import Button from './Button' // Asegúrate de ajustar la ruta correcta del componente Button

const TriviaApp = () => {
  const [questions, setQuestions] = useState([])
  const [score, setScore] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const fetchTrivia = async () => {
    try {
      const URL = 'https://opentdb.com/api.php?amount=10'
      const response = await fetch(URL)
      if (response.ok) {
        const data = await response.json()
        setQuestions(data.results)
        setCurrentQuestionIndex(0)
        setScore(0)
      } else {
        console.log(`Response status code: ${response.status}, ok? ${response.ok}`)
        const alternativeData = await response.json()
        console.log({ alternativeData })
      }
    } catch (error) {
      console.error('Error fetching trivia', error)
    }
  }

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex]
    const correctAnswer = currentQuestion.correct_answer

    if (selectedAnswer === correctAnswer) {
      setScore(score + 100)
    }

    const nextQuestionIndex = currentQuestionIndex + 1

    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex)
    } else {
      // All questions answered
      setQuestions([])
    }
  }

  const resetTrivia = () => {
    fetchTrivia()
  }

  useEffect(() => {
    fetchTrivia()
  }, [])

  if (questions.length === 0) {
    return (
      <div>
        <p>Score: {score}</p>
        <p>No questions left!</p>
        <Button onClick={resetTrivia} text='Generate New Trivia' />
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <>
      <div>
        <p>Score: {score}</p>
        <p>{currentQuestion.question}</p>
        <ul>
          {currentQuestion.incorrect_answers.map((answer, answerIndex) => (
            <li key={answerIndex}>
              <Button onClick={() => handleAnswer(answer)} text={answer} />
            </li>
          ))}
          <li>
            <Button onClick={() => handleAnswer(currentQuestion.correct_answer)} text={currentQuestion.correct_answer} />
          </li>
        </ul>
      </div>
    </>
  )
}

export default TriviaApp
