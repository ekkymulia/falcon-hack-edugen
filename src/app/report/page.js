import Header from "@/components/Header";
import NavigationTabs from "@/components/NavigationTabs";
import MainContent from "@/components/MainContent";
import BottomNavigation from "@/components/BottomNavigation";

export default function Report() {
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
            <h3 className="mt-8 text-xl font-bold text-gray-600">Hello, Ekky</h3>
            <div className="mt-2 py-10 grid grid-cols-4 gap-6">
              <div className="col-span-2 bg-white rounded shadow p-2">
                <div className="h-48 bg-blue-300"></div>
                <p className="mt-2 text-gray-600">Hello, Ekky</p>
              </div>
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
