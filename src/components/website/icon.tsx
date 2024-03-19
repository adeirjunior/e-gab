import Educacao from "./svg/educacao.svg";
import Infraestrutura from "./svg/infraestrutura.svg";
import Saude from "./svg/saude.svg";
import Seguranca from "./svg/seguranca.svg";

interface IconProps {
  name: string;
}

export const Icon = ({ name, ...rest }: IconProps) => {
  const icons: Record<string, JSX.ElementType> = {
    health: Saude,
    education: Educacao,
    infrastructure: Infraestrutura,
    security: Seguranca,
  };

  const SelectedIcon = icons[name];

  return <SelectedIcon {...rest} />;
};
