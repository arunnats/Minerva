import DropdownButtons from "../dropdownbuttons/Dropdownbuttons";
export default function InfoSection({
    title,
    para1,
    para2,
    img1,
    img2,
    downloadables,
}) {
    return (
        <div className="flex flex-col max-1240:pr-[2vw] mb-[10vh] ">
            <div
                className="text-[3em] sm:text-[5em] font-extrabold text sm:"
                style={{ color: "#800080" }}
            >
                {title}
            </div>
            <div
                className="h-[7px]  w-full mt-1"
                style={{ backgroundColor: "#800080" }}
            ></div>

            <DropdownButtons dropdownContent={downloadables} />

            <div className=" font-jakarta text-[1.2em] leading-[35px] max-800:leading-7">
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 text-justify ">
                    <div className="w-[90%] flex  order-1 sm:order-2 mx-auto sm:justify-self-end sm:mx-0">
                        <img
                            src={img1}
                            className="object-cover h-[300px] shadow-[-20px_20px_0px_#CF92CE]  "
                        />
                    </div>
                    <p className="w-full  pr-5 pl-2 sm:px-0 sm:pr-4 sm:pl-0  font-jakarta order-2 mt-6 sm:order-none sm:my-auto">
                        {para1}
                    </p>
                </div>

                <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 text-justify">
                    <div className="w-[90%] mx-auto">
                        <img
                            src={img2}
                            className="object-cover h-[300px]  shadow-[-20px_20px_0px_#CF92CE]"
                        />
                    </div>
                    <p className="w-full mt-6 sm:my-auto  font-jakarta pl-2 pr-5 ">
                        {para2}
                    </p>
                </div>
            </div>
        </div>
    );
}
