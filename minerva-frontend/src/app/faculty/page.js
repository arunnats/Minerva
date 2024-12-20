"use client";
import { useState, useEffect, useRef, use } from "react";
import gsap from "gsap";
import FacultyDetails from "../components/facultydetails/FacultyDetails";
import axios from "axios";
import https from "https";



export default function Home() {
    const [isHodInfoVisible, setIsHodInfoVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const hodDetailsRefs = useRef([]);
    const [strokeSize, setStrokeSize] = useState("4px");
    const [facultyData, setFacultyData] = useState([]);
    const [hod, setHod] = useState([]);

    const backend_url = process.env.NEXT_PUBLIC_API_URL;
    const token = process.env.NEXT_PUBLIC_TOKEN;

    useEffect(() => {
        const fetchData = async () => {      
            try {
                const response = await fetch(`${backend_url}/api/faculty-pages?populate=photograph`, {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                });
      
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
      
                const result = await response.json();
                console.log(result);
        
                if (result && result.data && Array.isArray(result.data)) {
                setFacultyData(result.data);
                } else {
                console.error("Data structure is unexpected:", result);
                }
        
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };
      
        fetchData();
    }, []);

    useEffect(() => {
        const fetchHodData = async () => {
            try {   
                const response = await fetch(`${backend_url}/api/hod?populate=photograph`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                const result = await response.json();
                console.log("something has happened");
                console.log(result.data);
                setHod(result.data);
            } catch (error) {   
                console.error("Error fetching hod data:", error);
            }
        }

        fetchHodData();
    }, []);

    useEffect(() => {
        const updateStrokeSize = () => {
            if (window.innerWidth >= 1024) {
                setStrokeSize("4px");
            } else if (window.innerWidth >= 768) {
                setStrokeSize("3px");
            } else {
                setStrokeSize("2px");
            }
        };

        updateStrokeSize();

        window.addEventListener("resize", updateStrokeSize);

        return () => {
            window.removeEventListener("resize", updateStrokeSize);
        };
    }, []);

    const handleImageClick = () => {
        setIsHodInfoVisible(!isHodInfoVisible);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                hodDetailsRefs.current.every(
                    (ref) => ref && !ref.contains(event.target)
                )
            ) {
                setIsHodInfoVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative overflow-hidden bg-white">
            <div className={`p-8 `}>
                <h1
                    className={` ${
                        isHodInfoVisible ? "blur-[2px]" : ""
                    } font-saira ${
                        activeIndex !== null ? "blur-[2px]" : ""
                    } font-extrabold text-[12vw] md:text-[10vw] lg:text-[8vw] text-[#800080] transition-all duration-300 ease-in-out`}
                >
                    FACULTY
                </h1>
                <div
                    className={`flex flex-col-reverse md:flex-row justify-around ${
                        activeIndex !== null ? "blur-[2px]" : ""
                    } `}
                    ref={(el) => (hodDetailsRefs.current[0] = el)}
                >
                    <div className="hod-info flex justify-center items-center">
                        <div
                            className={`cursor-pointer flex justify-center items-center rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                            onClick={handleImageClick}
                        >
                            <img
                                src={`${backend_url}/${hod?.photograph?.[0]?.url}`}
                                alt={hod.name}
                                className="h-[25rem] w-[20rem] object-cover border-[10px] border-[#800080] object-top rounded-[10px]"
                            />
                            <div className="absolute  text-white bg-[#800080] left-2 bottom-2 font-bold rounded-[3px] pr-1">
                                <h1 className="text-[1.5rem] text-center">
                                    {hod.name}
                                </h1>
                                <p className="text-[1.2rem] text-center">
                                    {hod.designation}
                                </p>
                            </div>
                        </div>
                    </div>
                    <h2
                        className={`${isHodInfoVisible ? "blur-[2px]" : ""} ${
                            activeIndex !== null ? "blur-[2px]" : ""
                        } font-saira font-extrabold text-[11vw] md:text-[8vw] lg:text-[7vw]`}
                    >
                        <span
                            style={{
                                WebkitTextStroke: `${strokeSize} #800080`,
                                color: "white",
                            }}
                        >
                            HEAD OF
                            <br /> DEPARTMENT
                        </span>
                    </h2>
                </div>
                {isHodInfoVisible && (
                    <div
                        className={`flex flex-wrap bg-gray-100 mt-4 w-[90%] m-auto ${
                            activeIndex !== null ? "blur-[2px]" : ""
                        } `}
                        ref={(el) => (hodDetailsRefs.current[1] = el)}
                    >
                        <div className="fac-det-name bg-[#800080] flex flex-col justify-evenly items-center text-center md-lg:w-1/3 w-full">
                            <h1 className="text-white lg-xl:text-[3.5rem] md:text-[2.5rem] text-[2rem] font-bold">
                                {hod.name}
                            </h1>
                            <h2 className="text-white lg-xl:text-[2rem] md:text-[1.5rem] text-[1.3rem]">
                                {hod.designation}
                            </h2>
                        </div>
                        <div className="fac-det-details bg-[#d9d9d9] text-black md-lg:w-2/3 w-full font-bold">
                            <ul className="text-sm md:text-base p-4">
                            {hod.contact_email && (
                                <li className="m-4">Email: {hod.contact_email}</li>
                            )}
                            {hod.office_location && (
                                <li className="m-4">Office Location: {hod.office_location}</li>
                            )}

                            {hod.office_no && (
                                <li className="m-4">Office Contact: {hod.office_no}</li>
                            )}

                            {hod.education && (
                                <li className="m-4">Education: {hod.education}</li>
                            )}

                            {hod.specialisation && (
                                <li className="m-4">Specialization: {hod.specialisation}</li>
                            )}

                            {hod.associated_frgs && (
                                <li className="m-4">Associated FRGs: {hod.associated_frgs}</li>
                            )}

                            {hod.external_links && (
                                <li className="m-4">
                                    External Links: {hod.external_links}
                                </li>
                            )}

                            {hod.additional_info && (
                                <li className="m-4">Additional Info: {hod.additional_info}</li>
                            )}
                            </ul>
                        </div>
                    </div>
                )}

                <h2
                    className={`${isHodInfoVisible ? "blur-[2px]" : ""} ${
                        activeIndex !== null ? "blur-[2px]" : ""
                    } my-8 font-saira font-extrabold text-[10vw] md:text-[8vw] lg:text-[6vw]`}
                >
                    <span
                        style={{
                            WebkitTextStroke: `${strokeSize} #800080`,
                            color: "white",
                        }}
                    >
                        FACULTY
                    </span>
                </h2>
            </div>
            <FacultyDetails
                data={ {facultyData} }
                className={`${isHodInfoVisible ? "blur-[2px]" : ""}`}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            />
            <div
                className={`${isHodInfoVisible ? "blur-[2px]" : ""} ${
                    activeIndex !== null ? "blur-[2px]" : ""
                } absolute top-0 h-[100%] w-[10px] bg-[#800080]`}
            ></div>
        </div>
    );
}
