import { Button, Card } from "@nextui-org/react";
import PricingPableSvg from "../table/pricing-table-svg";

export default function SubscriptionCard({
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
  const [firstDescription, ...otherDescription] = description;

  return (
    <div className="w-full lg:w-1/3">
      <Card
        className="
               shadow-pricing
               relative
               z-10
               min-h-[550px]
               h-full
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
            / {type === "month" ? "mês" : "ano"}
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
          {firstDescription}
        </p>
        <div className="mb-7">
          {otherDescription.map((text, index) => (
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
                  absolute
                  bottom-8
                  left-10
                  right-10
                  block
                  rounded-md
                  border
                  border-[#D4DEFF]
                  bg-transparent
                  text-center
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
