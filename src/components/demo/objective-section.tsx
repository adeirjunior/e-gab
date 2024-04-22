import { ReactNode } from "react";
import { Icon } from "./icon";

export default function ObjectiveSection({
  type,
  children,
  title,
}: {
  type: "educacao" | "saude" | "infraestrutura";
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="text-center lg:flex lg:flex-row lg:items-center lg:text-start">
      <Icon name={type} />
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="font-medium">{children}</p>
      </div>
    </div>
  );
}
