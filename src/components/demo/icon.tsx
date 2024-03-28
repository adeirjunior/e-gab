import Educacao from "./svg/educacao.svg";
import Infraestrutura from "./svg/infraestrutura.svg";
import Saude from "./svg/saude.svg";

interface IconProps {
  name: string;
}

export const Icon = ({ name, ...rest }: IconProps) => {
  const icons: Record<string, JSX.ElementType> = {
    saude: Saude,
    educacao: Educacao,
    infraestrutura: Infraestrutura,
  };

  const SelectedIcon = icons[name];

  return <SelectedIcon {...rest} />;
};
