import { Card, CardBody } from "@nextui-org/react";

type Props = {
    data: {
        title: string;
        number: number;
    }
} 

export default function WorkNumberCard({data: {number, title}}: Props) {
  return (
    <Card radius="none" isPressable className="w-[120px] border border-[#D8D8D8] py-4 mx-auto">
      <CardBody className="flex flex-col items-center justify-center gap-6 overflow-visible py-2">
        <p className="m-0 text-center text-3xl font-bold">{number}</p>
        <h2 className="m-0 p-0 text-center text-sm font-bold">{title}</h2>
      </CardBody>
    </Card>
  );
}
