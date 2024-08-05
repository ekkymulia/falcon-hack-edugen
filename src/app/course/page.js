'use client'
import { useEffect, useState } from 'react';
import Header from "@/components/Header";
import NavigationTabs from "@/components/NavigationTabs";
import { FilePlus2 } from "lucide-react";
import Link from "next/link";
import BottomNavigation from "@/components/BottomNavigation";

export default function Course() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch('/api/course'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCourses(data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, []);

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
                <h3 className="mt-8 text-xl font-bold text-gray-600">Browse Course</h3>
                <Link href="/course/create" passHref>
                    <div className="flex gap-3 items-center cursor-pointer p-3 bg-cyan-400 text-white rounded-md shadow-md hover:bg-cyan-500 transition duration-300 ease-in-out w-auto max-w-xs">
                        <FilePlus2 className="text-xl" />
                        <span className="text-sm font-medium">Create New Course</span>
                    </div>
                </Link>
            </div>
            <div className="mt-2 py-10 grid grid-cols-12 gap-6">
              {courses.length > 0 ? courses.map((course) => (
                <Link href={`/course/view/${course.id}`} passHref className="col-span-3">
                    <div key={course.id} className="bg-white rounded shadow p-2">
                    <div className="h-48 bg-blue-300"></div>
                    <p className="mt-2 text-gray-600">{course.name}</p>
                    </div>
                    </Link>
              )) : 'Oops, No Courses Yet!'}
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
