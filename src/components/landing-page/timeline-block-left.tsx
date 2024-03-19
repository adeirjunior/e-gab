import { Card } from "@nextui-org/react";
import { Text } from "@tremor/react";

type Prop = {
  text: string;
  image?: string;
  Icon: JSX.ElementType;
};

export default function TimelineBlockLeft({ text, image, Icon }: Prop) {
  return (
    <div>
      <div className="flex flex-col items-center sm:flex-row">
        <div className="mx-auto flex w-full items-center justify-start">
          <div className="w-full sm:w-1/2 sm:pr-8">
            <Card shadow="lg" className="rounded bg-white p-4 shadow">
              <Text>{text}</Text>
            </Card>
          </div>
        </div>
        <div className="absolute left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-4 transform items-center justify-center rounded-full border-4 border-white bg-blue-500 sm:translate-y-0">
          <Icon />
        </div>
      </div>
    </div>
  );
}
