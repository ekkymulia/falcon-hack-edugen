'use client'
import { useEffect, useState } from 'react';
import Header from "@/components/Header";
import NavigationTabs from "@/components/NavigationTabs";
import BottomNavigation from "@/components/BottomNavigation";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  const [modules, setModules] = useState([{ name: '', file: null }]);
  const [files, setFiles] = useState([]);

  const handleAddModule = () => {
    setModules([...modules, { name: '', file: null }]);
  };

  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...modules];
    updatedModules[index][field] = value;
    setModules(updatedModules);
  };

  const handleFileChange = (index, file) => {
    const updatedModules = [...modules];
    updatedModules[index].file = file;
    setModules(updatedModules);
  };

  const handleSubjectChange = (e) => {
    setSubjectName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('subjectName', subjectName);

    modules.forEach((module, index) => {
      formData.append(`modules[${index}].name`, module.name);
      if (module.file) {
        formData.append(`modules[${index}].file`, module.file);
      }
    });

    try {
      const response = await fetch('/api/course/create', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Course added successfully:', result);
      // Handle success (e.g., clear form, redirect)
    } catch (error) {
      console.error('Error adding course:', error);
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
            <h3 className="mt-8 text-xl font-bold text-gray-600">Add Course</h3>
            <form onSubmit={handleSubmit} className="mt-10 w-1/2">
              <div className="flex items-center gap-2 mt-5">
                <div className="flex-grow">
                  <h3 className="text-default-800 font-medium text-small mb-2">
                    Subject Name <span className="text-red-500">*</span>
                  </h3>
                  <input
                    type="text"
                    placeholder="Please Enter Subject Name"
                    required
                    aria-describedby="input-description"
                    id="nama_pelajaran"
                    value={subjectName}
                    onChange={handleSubjectChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  />
                  <span id="input-description" className="text-sm text-gray-500 mt-1">e.g.: Math, Web Development, etc.</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddModule}
                className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out"
              >
                Add Another Module
              </button>

              {modules.map((module, index) => (
                <div key={index} className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-700">Module {index + 1}</h4>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col items-start gap-2">
                      <label htmlFor={`module-name-${index}`} className="text-default-800 font-medium text-small">
                        Module Name
                      </label>
                      <input
                        type="text"
                        id={`module-name-${index}`}
                        placeholder="Module Name"
                        value={module.name}
                        onChange={(e) => handleModuleChange(index, 'name', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                      />
                    </div>
                    <div className="flex  flex-col items-start gap-2">
                      <label htmlFor={`file-upload-${index}`} className="text-default-800 font-medium text-small">
                        File
                      </label>
                      <input
                        type="file"
                        id={`file-upload-${index}`}
                        onChange={(e) => handleFileChange(index, e.target.files[0])}
                        className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
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
