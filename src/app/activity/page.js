import ActivitiesList from "@/components/ActivitiesList";
import BottomNavigation from "@/components/BottomNavigation";

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <ActivitiesList />
      <BottomNavigation />
    </main>
  );
}
