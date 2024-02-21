import { Icon } from "@/components/website/icon";
import { Proposal, ProposalTypes } from "@prisma/client";

const proposalTypeTranslate = (type: ProposalTypes) => {
  switch (type) {
    case "education":
      return "Educação";
    case "health":
      return "Saúde";
    case "security":
      return "Segurança";
    case "infrastructure":
      return "Infraestrutura";
    default:
      return "Erro";
  }
};

export default function ProposalSection({ proposal }: { proposal: Proposal }) {
  return (
    <div>
      <Icon name={proposal.type} />
      <h3>{proposalTypeTranslate(proposal.type)}</h3>
      <p>{proposal.description}</p>
    </div>
  );
}
