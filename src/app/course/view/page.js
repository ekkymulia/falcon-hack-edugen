'use client';
import { useEffect, useState } from 'react';

import Header from "@/components/Header";
import NavigationTabs from "@/components/NavigationTabs";
import BottomNavigation from "@/components/BottomNavigation";

export default function CourseView() {
  const [course, setCourse] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  useEffect(() => {
    async function fetchCourse() {
      if (!id) return;
      try {
        const response = await fetch(`/api/course/${id}`); // API to fetch course data
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCourse(data.course);
        setPdfUrl(data.course.pdfUrl); // Assume the API returns the URL to the PDF
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    }

    fetchCourse();
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <main className="bg-white min-h-screen text-black">
      <div className="fixed top-0 w-full z-20">
        <Header />
      </div>
      <div className="flex h-screen pt-14">
        <div className="fixed left-0 border-r-2 h-full bg-white">
          <NavigationTabs />
        </div>
        <div className="flex-grow ml-[5.25rem] p-4">
          <div className="bg-white p-4">
            <div className="flex items-center justify-between">
              <h3 className="mt-8 text-xl font-bold text-gray-600">{course.name}</h3>
            </div>
            <div className="mt-2 py-10">
              {pdfUrl ? (
                <iframe
                  src={pdfUrl}
                  width="100%"
                  height="600px"
                  frameBorder="0"
                />
              ) : (
                <p>No PDF available for this course.</p>
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
