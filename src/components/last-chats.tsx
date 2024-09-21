import { Card } from "@nextui-org/react";

export default function LastChats() {
  return (
    <section>
      <h2>Ultimas conversas</h2>
      <div>
        {Array.from({ length: 5 }, (_, i) => (
          <Card className="rounded-full w-20 h-20" key={i}></Card>
        ))}
      </div>
    </section>
  );
}
