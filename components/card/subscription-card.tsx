import { Button, Card } from "@nextui-org/react";
import PricingPableSvg from "../table/pricing-table-svg";

export default function SubscriptionCard({
  selectedPlan,
  product,
}: {
  selectedPlan: {
    plan: string;
    setPlan: React.Dispatch<React.SetStateAction<string>>;
  };
  product: {
    name: string;
    type: string;
    price: string;
    productId: string;
    description: string[];
    active: boolean;
  };
}) {
  const { name, price, type, description } = product;

  return (
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
          {name}
        </span>
        <h2 className="text-dark mb-5 text-[42px] font-bold">
          R${price}
          <span className="text-body-color text-base font-medium">
            / {type === "monthly" ? "mês" : "ano"}
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
          {description}
        </p>
        <div className="mb-7">
          {description.map((text, index) => (
            <p
              key={index}
              className="text-body-color mb-1 text-base leading-loose"
            >
              {text}
            </p>
          ))}
        </div>
        <Button
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
          Escolha {name}
        </Button>
        <PricingPableSvg />
      </Card>
    </div>
  );
}
