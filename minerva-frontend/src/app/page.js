import Sidebar from "./components/sidebar/Sidebar";
import Profile from "./components/profile/Profile";
import Vision from "./components/vision/Vision";
import Mission from "./components/mission/Mission";
import History from "./components/history/History";
import McaProgramme from "./components/mca_programme/mcaProgramme";
import Hero from "./components/heropage/Hero";
import Data from "./data.json";

export default function Home() {
  return (
    <div>
      <Hero props={Data} />
       <div className="overflow-hidden">
            <div>
                <Sidebar />
                <main className="m-0 p-0 bg-white">
                    {/* <h1 className="text-black">Test</h1> */}
                    <Profile />
                    <Vision />
                    <Mission />
                    <History />
                    <McaProgramme />
                </main>
            </div>
        </div>
    </div>
  );
}
