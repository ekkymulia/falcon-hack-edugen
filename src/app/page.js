import Image from "next/image";
import Header from '../components/Header';
import NavigationTabs from '../components/NavigationTabs';
import MainContent from '../components/MainContent';

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <Header />
      <NavigationTabs />
      <MainContent />
    </main>
  );
}
