"use client";
import tabData from "./data";
import { useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import InfoSection from "../components/programmesutil/infosection";

const token = process.env.NEXT_PUBLIC_TOKEN;
const backendUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Programmes() {
  const [selectedTab, setSelectedTab] = useState(tabData["B. Tech"]);

  useEffect(() => {
    const fetchData = async () => {
      const btechcurriculum = await fetch(
        `${backendUrl}/api/btech-curricula?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const btechsyllabus = await fetch(
        `${backendUrl}/api/btech-syllabi?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const btechrules = await fetch(
        `${backendUrl}/api/btech-rules?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const mtechrules = await fetch(
        `${backendUrl}/api/mtech-rules?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const mtechcsesyllabus = await fetch(
        `${backendUrl}/api/mtech-syllabi?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const mtechaidasyllabus = await fetch(
        `${backendUrl}/api/mtechaida-syllabi?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const mtechissyllabus = await fetch(
        `${backendUrl}/api/mtechis-syllabi?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const btechcurriculumData = await btechcurriculum.json();
      const btechsyllabusData = await btechsyllabus.json();
      const btechrulesData = await btechrules.json();
      const mtechrulesData = await mtechrules.json();
      const mtechcsesyllabusData = await mtechcsesyllabus.json();
      const mtechaidasyllabusData = await mtechaidasyllabus.json();
      const mtechissyllabusData = await mtechissyllabus.json();
    };

    fetchData();
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Register the GSAP plugin
      gsap.registerPlugin(ScrollTrigger);

      // Get a reference to the div beneath "Programmes" text
      const contentDiv = document.querySelector(".content-div");

      // GSAP animation for Programmes text
      gsap.fromTo(
        ".programmes-text",
        { y: "0", opacity: 1 }, // Initial state
        {
          y: "45vh",
          x: "13vw", // Move down
          opacity: 1,
          duration: 3,
          scrollTrigger: {
            trigger: ".programmes-text",
            start: "top 0", // Start animation
            end: "bottom 0", // End animation
            scrub: 1, // Sync animation with scroll
            markers: true,
            onUpdate: (self) => {
              // Dynamically adjust padding-top of the content div
              const progress = self.progress; // Animation progress (0 to 1)
              contentDiv.style.paddingTop = `${5 + progress * 23}vh`; // From 5vh to 25vh
            },
          },
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen font-saira text-[18px] max-800:text-[13px] max-1060:text-[15px] mb-9">
      <div className="relative top-0 w-full h-[40vh] sm:h-[70vh]">
        <img
          src="landing.png"
          className=" absolute  w-full h-[40vh] sm:h-full object-cover -z-20"
          alt="Background"
        />
        <div className="absolute  inset-0 h-[40vh] sm:h-full bg-black opacity-35 -z-20"></div>
        <div
          className="font-saira programmes-text text-[4.5em] pt-[17vh] sm:pt-[25vh] font-bold uppercase text-center sm:text-[7em]"
          style={{ color: "#800080" }}
        >
          Programmes
        </div>
      </div>

      <div
        className="content-div  max-w-[1240px] mx-auto relative  -mt-0 pl-5 pt-[27vh]"
        // style={{ borderColor: "#800080", borderLeftWidth: "14px" }}
      >
        {/* Tab Navigation */}
        <div className="flex flex-row w-full  sm:w-[80vw]  ">
          {Object.keys(tabData).map((tab, index) => (
            <div key={tab} className="flex items-center">
              <button
                onClick={() => setSelectedTab(tabData[tab])}
                className={`px-4 max-800:px-2 py-2 font-bold text-[1.5em] max-920:text-[1.3em] rounded-lg transition-colors duration-200 ${
                  selectedTab === tabData[tab]
                    ? "bg-[#800080] text-white"
                    : "hover:bg-[#800080] hover:text-white"
                }`}
              >
                {tab}
              </button>
              {index < Object.keys(tabData).length - 1 && (
                <div className="mx-3 w-[4px] h-[3em] bg-[#800080] opacity-40 rounded-full"></div>
              )}
            </div>
          ))}
        </div>

        <InfoSection
          title={Object.keys(tabData).find(
            (key) => tabData[key] === selectedTab
          )}
          para1={selectedTab.para1}
          para2={selectedTab.para2}
          downloadables={selectedTab.dropdownContent}
          img1={selectedTab.img1link}
          img2={selectedTab.img2link}
        />
      </div>
    </div>
  );
}
