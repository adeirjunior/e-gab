import { Image } from "@nextui-org/react";
import { sidebar } from "@/lib/constants/sidebar";

export const Sidebar = ({ activeStep }: {activeStep: number}) => {
  return (
    <div className="relative h-full w-full  overflow-hidden rounded-md p-4 ">
      <ul className="absolute z-10 h-full">
        {sidebar.map((item, index) => (
          <li key={index} className="mb-5">
            <div className="flex items-center ">
              <div
                className={`mr-2 flex h-8 w-8 items-center justify-center rounded-[50%] border text-sm transition-colors duration-300  ${
                  index + 1 === activeStep
                    ? "bg-primary-Light_blue border-primary-Light_blue text-primary-Marine_blue font-bold"
                    : "text-neutral-Magnolia bg-transparent"
                }  `}
              >
                {item.stepCounter}
              </div>
              <div>
                <span className="text-neutral-Light_gray block text-xs ">
                  step {item.stepCounter}
                </span>
                <span className="text-neutral-White text-sm ">
                  {item.stepTitle}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
