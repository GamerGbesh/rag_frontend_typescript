import styles from "../css/questions.module.css"
import Pagination from "./Pagination.tsx";
import {useState} from "react";
import {QuestionsProps} from "../interfaces/Props.ts";



function Questions({question,
                       answers,
                       explanation,
                       currentQuestion,
                       totalQuestions,
                       onQuestionChange,
                       correctAnswer,
                       correct,
                       setCorrect,
                       answered,
                       setAnswered,
                   }: QuestionsProps) {
    const [chosen, setChosen] = useState(false)

    function onClick (num: number){
        setChosen(true)
        if (num === correctAnswer) setCorrect(correct + 1)
        setAnswered(answered + 1)
    }

    if (chosen || currentQuestion <= answered) {
        return (
            <div className={styles.questionSet}>
                <p className={styles.question}>
                    {question}
                </p>
                <div className={styles.answers}>
                    {answers.map((answer: string, index: number) => (
                        <p key={index}
                           className={`${styles.answer} ${index===correctAnswer ? styles.correct : styles.incorrect}`}
                        >
                            {answer}
                        </p>
                    ))}
                </div>
                <span>Click and hold the empty space below to see the explanation</span>
                <div className={styles.explanation}>
                    <span>{explanation}</span>
                </div>
                <Pagination
                    currentQuestion={currentQuestion}
                    totalQuestions={totalQuestions}
                    onQuestionChange={onQuestionChange}
                    setChosen={setChosen}
                />
            </div>
        )
    }

    return (
        <div className={styles.questionSet}>
            <p className={styles.question}>
                {question}
            </p>
            <div className={styles.answers}>
                {answers?.map((answer, index) => (
                    <p key={index} className={styles.answer} onClick={() => onClick(index)}>
                        {answer}
                    </p>
                ))}
            </div>
            <Pagination
                currentQuestion={currentQuestion}
                totalQuestions={totalQuestions}
                onQuestionChange={onQuestionChange}
                setChosen={setChosen}
            />
        </div>
    )
}

export default Questions;