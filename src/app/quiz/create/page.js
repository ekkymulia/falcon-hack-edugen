'use client';
import { useEffect, useState } from 'react';
import Header from "@/components/Header";
import NavigationTabs from "@/components/NavigationTabs";
import BottomNavigation from "@/components/BottomNavigation";

export default function CreateQuiz() {
  const [quizRoomName, setQuizRoomName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [modules, setModules] = useState([]); // Available modules
  const [selectedModules, setSelectedModules] = useState([{ moduleId: '', choiceQuestion: 0, essayQuestion: 0 }]);

  useEffect(() => {
    // Fetch available modules
    async function fetchModules() {
      try {
        const response = await fetch('/api/module');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setModules(data.modules);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    }

    fetchModules();
  }, []);

  const handleAddQuiz = () => {
    setSelectedModules([...selectedModules, { moduleId: '', choiceQuestion: 0, essayQuestion: 0 }]);
  };

  const handleQuizChange = (index, field, value) => {
    const updatedModules = [...selectedModules];
    updatedModules[index][field] = value;
    setSelectedModules(updatedModules);
  };

  const handleModuleChange = (index, value) => {
    const updatedModules = [...selectedModules];
    updatedModules[index].moduleId = value;
    setSelectedModules(updatedModules);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: quizRoomName,
      roomCode: roomCode,
      quizzes: selectedModules.map(quiz => ({
        moduleId: quiz.moduleId,
        choiceQuestion: quiz.choiceQuestion,
        essayQuestion: quiz.essayQuestion,
      })),
    };

    try {
      const response = await fetch('/api/quiz/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Quiz created successfully:', result);
      // Handle success (e.g., clear form, redirect)
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <main className="bg-white min-h-screen text-black">
      <div className="fixed top-0 w-full z-20">
        <Header />
      </div>
      <div className="flex h-auto pt-14">
        <div className="fixed left-0 border-r-2 h-full bg-white">
          <NavigationTabs />
        </div>
        <div className="flex-grow ml-[5.25rem] p-4 bg-white">
          <div className="bg-white p-4">
            <h3 className="mt-8 text-xl font-bold text-gray-600">Create Quiz</h3>
            <form onSubmit={handleSubmit} className="mt-10 w-1/2">
              <div className="flex items-center gap-2 mt-5">
                <div className="flex-grow">
                  <h3 className="text-default-800 font-medium text-small mb-2">
                    Quiz Room Name <span className="text-red-500">*</span>
                  </h3>
                  <input
                    type="text"
                    placeholder="Please Enter Quiz Room Name"
                    required
                    value={quizRoomName}
                    onChange={(e) => setQuizRoomName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-5">
                <div className="flex-grow">
                  <h3 className="text-default-800 font-medium text-small mb-2">
                    Room Code <span className="text-red-500">*</span>
                  </h3>
                  <input
                    type="text"
                    placeholder="Please Enter Room Code"
                    required
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddQuiz}
                className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out"
              >
                Add Another Quiz
              </button>

              {selectedModules.map((quiz, index) => (
                <div key={index} className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-700">Quiz {index + 1}</h4>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor={`module-select-${index}`} className="text-default-800 font-medium text-small">
                        Module
                      </label>
                      <select
                        id={`module-select-${index}`}
                        value={quiz.moduleId}
                        onChange={(e) => handleModuleChange(index, e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                      >
                        <option value="" disabled>Select Module</option>
                        {modules.map(module => (
                          <option key={module.id} value={module.id}>
                            {module.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor={`choice-question-${index}`} className="text-default-800 font-medium text-small">
                        Number of Choice Questions
                      </label>
                      <input
                        type="number"
                        id={`choice-question-${index}`}
                        value={quiz.choiceQuestion}
                        onChange={(e) => handleQuizChange(index, 'choiceQuestion', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor={`essay-question-${index}`} className="text-default-800 font-medium text-small">
                        Number of Essay Questions
                      </label>
                      <input
                        type="number"
                        id={`essay-question-${index}`}
                        value={quiz.essayQuestion}
                        onChange={(e) => handleQuizChange(index, 'essayQuestion', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="submit"
                className="mt-5 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 ease-in-out"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full">
        <BottomNavigation />
      </div>
    </main>
  );
}
