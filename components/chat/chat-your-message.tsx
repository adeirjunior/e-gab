import { Card } from "@nextui-org/react";

export default function ChatYourMessage() {
  return (
    <>
      <div className="chat-message">
        <div className="flex items-end justify-end">
          <Card isPressable className="order-1 mx-2 flex max-w-xs flex-col items-end space-y-2 text-xs">
            <div>
              <span className="inline-block rounded-lg rounded-br-none bg-blue-600 px-4 py-2 text-white ">
                Your error message says permission denied, npm global installs
                must be given root privileges.
              </span>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
