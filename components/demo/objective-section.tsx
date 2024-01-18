import { ReactNode } from "react";
import { Icon } from "./icon";

export default function ObjectiveSection({type, children, title}: {type: "educacao" | "saude" | "infraestrutura", title: string, children: ReactNode}) {
  return (
    <div>
      <Icon name={type} />
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
