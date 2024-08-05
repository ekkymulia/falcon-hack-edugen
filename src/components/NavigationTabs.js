"use client";
import Link from "next/link";

import { Ellipsis } from "lucide-react";

import { Notebook, NotebookPen, NotebookText } from "lucide-react";

const NavigationTabs = () => {
  const tabs = [
    { name: "Course", icon: Notebook, href: "/course" },
    { name: "Quiz", icon: NotebookPen, href: "/quiz" },
    { name: "Report", icon: NotebookText, href: "/report" },
  ];

  return (
    <div className="bg-white px-2 py-4 flex flex-col justify-around">
      {tabs.map((tab) => (
        <Link key={tab.name} href={tab.href} passHref className="py-2">
          <div className="flex flex-col items-center cursor-pointer">
            { tab.icon ? <tab.icon size={24} /> : <Ellipsis size={24} /> }
            <span>{tab.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NavigationTabs;
