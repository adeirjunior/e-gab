import { Card } from "@nextui-org/react";
import PricingPableSvg from "./pricing-table-svg";

export default function PricingTable() {
  return (
    <div className="container">
      <div className="-mx-4 flex flex-wrap">
        <div className="w-full px-4">
          <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
            <span className="mb-2 block text-lg font-semibold text-blue-900">
              Pricing Table
            </span>
            <h2
              className="
                  text-dark
                  mb-4
                  text-3xl
                  font-bold
                  sm:text-4xl
                  md:text-[40px]
                  "
            >
              Our Pricing Plan
            </h2>
            <p className="text-body-color text-base">
              There are many variations of passages of Lorem Ipsum available but
              the majority have suffered alteration in some form.
            </p>
          </div>
        </div>
      </div>
      <div className="-mx-4 flex flex-wrap justify-center">
        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
          <Card
            className="
               shadow-pricing
               relative
               z-10
               mb-10
               overflow-hidden rounded-xl border
               border-purple-600
               border-opacity-20
               px-8
               py-10
               sm:p-12 lg:px-6
               lg:py-10
               xl:p-12
               "
          >
            <span className="mb-4 block text-lg font-semibold text-blue-900">
              Personal
            </span>
            <h2 className="text-dark mb-5 text-[42px] font-bold">
              $59
              <span className="text-body-color text-base font-medium">
                / year
              </span>
            </h2>
            <p
              className="
                  text-body-color mb-8
                  border-b
                  border-[#F2F2F2]
                  pb-8 text-base
                  "
            >
              Perfect for using in a personal website or a client project.
            </p>
            <div className="mb-7">
              <p className="text-body-color mb-1 text-base leading-loose">
                1 User
              </p>
              <p className="text-body-color mb-1 text-base leading-loose">
                All UI components
              </p>
              <p className="text-body-color mb-1 text-base leading-loose">
                Lifetime access
              </p>
              <p className="text-body-color mb-1 text-base leading-loose">
                Free updates
              </p>
              <p className="text-body-color mb-1 text-base leading-loose">
                Use on 1 (one) project
              </p>
              <p className="text-body-color mb-1 text-base leading-loose">
                3 Months support
              </p>
            </div>
            <a
              href="javascript:void(0)"
              className="
                  block
                  w-full
                  rounded-md
                  border
                  border-[#D4DEFF]
                  bg-transparent
                  p-4 text-center
                  text-base
                  font-semibold
                  text-blue-900
                  transition hover:border-purple-600 hover:bg-purple-600
                  hover:text-white
                  "
            >
              Choose Personal
            </a>
            <PricingPableSvg />
          </Card>
        </div>
        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
          <Card
            className="
               shadow-pricing
               relative
               z-10
               mb-10
               overflow-hidden rounded-xl border
               border-purple-600
               border-opacity-20
               px-8
               py-10
               sm:p-12 lg:px-6
               lg:py-10
               xl:p-12
               "
          >
            <span className="mb-4 block text-lg font-semibold text-blue-900">
              Business
            </span>
            <h2 className="text-dark mb-5 text-[42px] font-bold">
              $199
              <span className="text-body-color text-base font-medium">
                / year
              </span>
            </h2>
            <p
              className="
                  text-body-color mb-8
                  border-b
                  border-[#F2F2F2]
                  pb-8 text-base
                  "
            >
              Perfect for using in a Business website or a client project.
            </p>
            <div className="mb-7">
              <p className="text-body-color mb-1 text-base leading-loose">
                5 Users
              </p>
              <p className="text-body-color mb-1 text-base leading-loose">
                All UI components
              </p>
              <p className="text-body-color mb-1 text-base leading-loose">
                Lifetime access
              </p>
              <p className="text-body-color mb-1 text-base leading-loose">
                Free updates
              </p>
              <p className="text-body-color mb-1 text-base leading-loose">
                Use on 3 (Three) project
              </p>
              <p className="text-body-color mb-1 text-base leading-loose">
                4 Months support
              </p>
            </div>
            <a
              href="javascript:void(0)"
              className="
                  block
                  w-full
                  rounded-md
                  border
                  border-purple-600
                  bg-purple-600
                  p-4 text-center
                  text-base
                  font-semibold
                  text-white
                  transition
                  hover:bg-opacity-90
                  "
            >
              Choose Business
            </a>
            <PricingPableSvg />
          </Card>
        </div>
        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
          <Card
            className="
               shadow-pricing
               relative
               z-10
               mb-10
               overflow-hidden rounded-xl border
               border-purple-600
               border-opacity-20
               px-8
               py-10
               sm:p-12 lg:px-6
               lg:py-10
               xl:p-12
               "
          >
            <span className="mb-4 block text-lg font-semibold text-blue-900">
              Professional
            </span>
            <h2 className="text-dark mb-5 text-[42px] font-bold">
              $256
              <span className="text-body-color text-base font-medium">
                / year
              </span>
            </h2>
            <p
              className="
                  text-body-color mb-8
                  border-b
                  border-[#F2F2F2]
                  pb-8 text-base
                  "
            >
              Perfect for using in a Professional website or a client project.
            </p>
            <div className="mb-7">
              <p className="text-body-color mb-1 text-base leading-loose">
                Unlimited Users
              </p>
              <p className="text-body-color mb-1 text-base leading-loose">
                All UI components
              </p>
              <p className="text-body-color mb-1 text-base leading-loose">
                Lifetime access
              </p>
              <p className="text-body-color mb-1 text-base leading-loose">
                Free updates
              </p>
              <p className="text-body-color mb-1 text-base leading-loose">
                Use on Unlimited project
              </p>
              <p className="text-body-color mb-1 text-base leading-loose">
                12 Months support
              </p>
            </div>
            <a
              href="javascript:void(0)"
              className="
                  block
                  w-full
                  rounded-md
                  border
                  border-[#D4DEFF]
                  bg-transparent
                  p-4 text-center
                  text-base
                  font-semibold
                  text-blue-900
                  transition hover:border-purple-600 hover:bg-purple-600
                  hover:text-white
                  "
            >
              Choose Professional
            </a>
            <PricingPableSvg />
          </Card>
        </div>
      </div>
    </div>
  );
}
