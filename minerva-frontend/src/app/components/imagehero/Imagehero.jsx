"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";

export default function ImageHero({
    title,
    font,
    mobileFont,
    contentdiv,
    increasedHeight = 0,
}) {
    const heightClasses =
        increasedHeight == 1
            ? `h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]`
            : `h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]`;
    return (
        <>
            {/* Fixed Hero Section */}
            <div className={`fixed top-0 w-full ${heightClasses} z-0`}>
                <img
                    src="landing.png"
                    className="absolute w-full h-full object-cover -z-20"
                    alt="Background"
                />
                <div
                    className="absolute inset-0 h-full -z-10"
                    style={{
                        backgroundColor: "#800080",
                        opacity: 0.45,
                    }}
                ></div>
                <div
                    className="font-saira flex justify-center items-center h-full font-bold uppercase text-center"
                    style={{
                        color: "white",
                        fontSize: `clamp(${mobileFont}, 10vw, ${font})`,
                    }}
                >
                    {title}
                </div>
            </div>
        </>
    );
}
