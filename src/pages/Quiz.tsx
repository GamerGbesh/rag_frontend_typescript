import Questions from "../components/Questions.tsx";
import {useEffect, useState} from "react";
import api from "../services/api.js";
import {useLocation} from "react-router-dom";
import Popup from "../components/Popup.tsx";
import Loader from "../components/Loader.tsx";
import { Question } from "../interfaces/DataTypes.ts";

function Quiz() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [question, setQuestion] = useState<string | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[] | null>(null);
    const [explanation, setExplanation] = useState<string | null>(null);
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
    const [done, setDone] = useState(false);
    const [correct, setCorrect] = useState(0);
    const [answered, setAnswered] = useState(0);

    const location = useLocation();
    const document_id = location.state.document_id;
    const number_of_questions = location.state.number_of_questions;
    const library_id = location.state.library_id;
    const quizTitle = location.state?.title

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            api.get("/quiz", {
                params: {
                    document_id: document_id,
                    number_of_questions: number_of_questions,
                    library_id:library_id,
                }
            })
                .then((res) => {
                    setQuestions(res.data);
                    setCurrentQuestion(1);
                    setError(false);
                    setLoading(false)
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                    setError(true);
                })
                .finally(() => setLoading(false));
        }
        fetchQuestions();
    }, []);


    useEffect(() => {
        function fetchQuestions() {
            setQuestion(questions[currentQuestion-1].question);
            setAnswers(questions[currentQuestion-1].options);
            setExplanation(questions[currentQuestion-1].explanation);
            switch (questions[currentQuestion-1].answer){
                case "A": setCorrectAnswer(0); break;
                case "B": setCorrectAnswer(1); break;
                case "C": setCorrectAnswer(2); break;
                case "D": setCorrectAnswer(3); break;
            }
            console.log(correctAnswer);

        }
        if (!loading) fetchQuestions();
    }, [currentQuestion]);

    function onQuestionChange(question: number)
    {
        if (question > number_of_questions) setDone(true);

        else setCurrentQuestion(question);
    }

    return (
        <div className="w-full min-h-screen  flex flex-col items-center py-8 px-4 sm:px-6 overflow-y-auto">
            {loading ? (
                <Loader text={"Generating Questions..."} />
            ) : (
                <>
                    {done && <Popup count={number_of_questions} correct={correct} library_id={library_id} />}

                    {error ? <p className={"dark:text-white font-bold text-3xl"}>"Something went wrong! Refresh the page!"</p> : (
                        <>
                            <div className="w-full max-w-4xl mb-6 text-center">
                                <h1 className="text-2xl sm:text-3xl font-bold py-4 dark:text-white text-gray-800 mb-2 flex items-center relative bottom-2/4">
                                    {quizTitle || "Quiz Time"}
                                </h1>

                            </div>

                            <Questions
                                question={question!}
                                answers={answers!}
                                explanation={explanation!}
                                currentQuestion={currentQuestion}
                                totalQuestions={number_of_questions}
                                correctAnswer={correctAnswer!}
                                onQuestionChange={onQuestionChange}
                                setCorrect={setCorrect}
                                correct={correct}
                                answered={answered}
                                setAnswered={setAnswered}
                            />
                        </>
                    )}

                </>
            )}
        </div>
    )
}

export default Quiz;