
import { Image } from "@nextui-org/react";

export const Header = ({ activeStep }: {activeStep: number}) => {
  return (
    <header className="w-full h-40 relative">
      <div className="absolute top-6 left-0 right-0">
        <ul className=" flex items-center justify-center ">
          {[1, 2, 3, 4].map((step, index) => (
            <li
              key={index}
              className={`transition-colors duration-300 w-8 h-8 rounded-[50%] border flex items-center justify-center mr-2 text-sm  ${
                index + 1 === activeStep
                  ? "bg-primary-Light_blue border-primary-Light_blue text-primary-Marine_blue font-bold"
                  : "text-neutral-Magnolia bg-transparent"
              }  `}
            >
              {step}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};