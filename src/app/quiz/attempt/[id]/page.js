'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from "@/components/Header";
import NavigationTabs from "@/components/NavigationTabs";
import BottomNavigation from "@/components/BottomNavigation";

export default function QuizAttempt() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [queueQuizzes, setQueueQuizzes] = useState([]);
  const { id } = useParams();
  const router = useRouter();

  const fetchNextQuestion = async (questionType) => {
    if (!id || !questionType) return;
    try {
      const response = await fetch(`/api/quiz/attempt?quizRoomId=${id}&formatWanted=${questionType}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const rawQuestionData = data.question.choices[0].message.content;
      const [questionText, , , context, , ...choices] = rawQuestionData.split('|').map(part => part.trim());
      const formattedChoices = choices.map(choice => choice.replace(/^\w\)/, '').trim());

      setQuestions(prev => [...prev, {
        text: questionText,
        context: context,
        options: formattedChoices.length > 0 ? formattedChoices : null
      }]);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      if (!id) return;
      try {
        const response = await fetch(`/api/quiz?quizRoomId=${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);

        // Initialize the queueQuizzes with a for loop
        const newQueueQuizzes = [];
        for (let i = 0; i < data.quizzes[0].choiceQuestion; i++) {
          newQueueQuizzes.push('choice-answer');
        }
        for (let i = 0; i < data.quizzes[0].essayQuestion; i++) {
          newQueueQuizzes.push('essay-answer');
        }
        setQueueQuizzes(newQueueQuizzes);

        // Fetch the first question if available
        if (newQueueQuizzes.length > 0) {
          await fetchNextQuestion(newQueueQuizzes[0]);
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [id]);

  useEffect(() => {
    if (queueQuizzes.length > 0 && currentQuestionIndex > 0) {
      fetchNextQuestion(queueQuizzes[currentQuestionIndex]);
    }
  }, [queueQuizzes, currentQuestionIndex]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setAnswers(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < queueQuizzes.length) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/quiz/submit/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      router.push(`/quiz/success`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (loading) return <p>Loading quiz...</p>;

  const isLastQuestion = currentQuestionIndex === queueQuizzes.length - 1;

  return (
    <main className="bg-white min-h-screen text-black">
      <div className="fixed top-0 w-full z-20">
        <Header />
      </div>
      <div className="flex h-auto pt-14">
        <div className="fixed left-0 border-r-2 h-full bg-white">
          <NavigationTabs />
        </div>
        <div className="flex-grow ml-[5.25rem] p-4">
          <div className="bg-white p-4">
            <div className="mt-2 py-10">
              {questions.length > 0 && (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">{currentQuestionIndex + 1}</h2>
                  {questions[currentQuestionIndex] ? (
                    <>
                      <p className="text-gray-700 mb-4">{questions[currentQuestionIndex].context}</p>
                      {questions[currentQuestionIndex].options ? (
                        questions[currentQuestionIndex].options.map((option, index) => (
                          <div key={index} className="mt-2">
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name={questions[currentQuestionIndex].text}
                                value={option}
                                onChange={handleChange}
                                className="form-radio"
                              />
                              <span className="ml-2">{option}</span>
                            </label>
                          </div>
                        ))
                      ) : (
                        <textarea
                          name={questions[currentQuestionIndex].text}
                          onChange={handleChange}
                          className="mt-2 w-full border border-gray-300 rounded-lg p-2"
                        ></textarea>
                      )}
                    </>
                  ) : (
                    <p>Loading question...</p>
                  )}
                  <div className="mt-4">
                    {isLastQuestion ? (
                      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out">
                        Submit Answer
                      </button>
                    ) : (
                      <button type="button" onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out">
                        Next
                      </button>
                    )}
                  </div>
                </form>
              )}
              {questions.length === 0 && <p>Loading.</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full">
        <BottomNavigation />
      </div>
    </main>
  );
}
