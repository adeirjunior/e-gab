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
    <div className="text-center mx-auto px-6 lg:flex lg:flex-row lg:items-center lg:text-start gap-6 lg:justify-start text-primary-800">
      <span className="min-w-60 w-fit lg:min-w-96"><Icon name={proposal.type} /></span> 
      <div className="space-y-4 max-w-[500px]">
        <h3 className="text-xl sm:text-4xl font-bold">{proposalTypeTranslate(proposal.type)}</h3>
        <p className="font-medium sm:text-xl">{proposal.description}</p>
      </div>
    </div>
  );
}
