import Header from "../components/Header";
import NavigationTabs from "../components/NavigationTabs";
import MainContent from "../components/MainContent";
import BottomNavigation from "@/components/BottomNavigation";

export default function Home() {
  return (
    <main className="bg-white min-h-screen text-black">
      <Header />
      <NavigationTabs />
      <MainContent />
      <BottomNavigation />
    </main>
  );
}
