'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Correct import for app directory
import Header from "@/components/Header";
import NavigationTabs from "@/components/NavigationTabs";
import BottomNavigation from "@/components/BottomNavigation";
import Link from 'next/link'; // Import Link for navigation

export default function QuizView() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const param = useParams();
  const { id } = param; // Assuming the ID is for fetching quizzes related to a specific context

  useEffect(() => {
    async function fetchQuizzes() {
      if (!id) return;
      try {
        const response = await fetch(`/api/quiz?quizRoomId=${id}`); // API to fetch quiz data
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQuizzes(data.quizzes);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuizzes();
  }, [id]);

  if (loading) return <p>Loading quizzes...</p>;

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
              {/* Display quizzes and add attempt button */}
              {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                  <div key={quiz.id} className="mb-8 p-4 border rounded-lg shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-700">{quiz.name}</h4>
                    <p className="text-gray-600">Choice Questions: {quiz.choiceQuestion}</p>
                    <p className="text-gray-600">Essay Questions: {quiz.essayQuestion}</p>
                    <Link href={`/quiz/attempt/${quiz.id}`} passHref>
                      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out">
                        Attempt Quiz
                      </button>
                    </Link>
                  </div>
                ))
              ) : (
                <p>No quizzes available.</p>
              )}
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
