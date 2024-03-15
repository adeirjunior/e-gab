"use client"

import { Button, Input, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { default as emojiData } from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import i18n from "@emoji-mart/data/i18n/pt.json";
import { useState, useTransition } from "react";
import LoadingDots from "../icons/loading-dots";
i18n.search_no_results_1 = "Escolha um emoji...";

interface MessageFieldProps {
  roomId: string;
  userId: string;
}

export default function ChatFooter({ roomId, userId }: MessageFieldProps) {
const [inputText, setInputText] = useState<string>('')
const [pending, start] = useTransition()

  const sendMessage = async (formData: FormData) => {
    const text = formData.get("message") as string;

    try {
      start(async() => {
        await fetch("/api/message", {
     method: "POST",
     body: JSON.stringify({ text, roomId, userId }),
   });
      })
      
    } catch (error) {
      
    }
   
   setInputText('')
  };

  return (
    <>
      <div className="relative flex w-full">
        <form className="w-full" action={sendMessage}>
          <span className="absolute inset-y-0 flex items-center">
            <Button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full text-gray-500 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none"
              isIconOnly
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                ></path>
              </svg>
            </Button>
          </span>
          <Input
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
          disabled={pending}
            type="text"
            name="message"
            placeholder="Escreva sua mensagem!"
            className="w-full rounded-md bg-gray-200 py-3 pl-12 text-gray-600 placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none"
          />
          <div className="absolute inset-y-0 right-0 hidden items-center space-x-2 sm:flex">
            <Button
              isIconOnly
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                ></path>
              </svg>
            </Button>
            <Button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none"
              isIconOnly
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </Button>
            <Popover>
              <PopoverTrigger>
                <Button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none"
                  isIconOnly
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Picker
                  i18n={i18n}
                  data={emojiData}
                  onEmojiSelect={(e:any) => setInputText((prev) => prev + String(e.native))}
                  locale="pt"
                  theme="light"
                />
              </PopoverContent>
            </Popover>

            <Button
              disabled={pending || inputText.length <= 0}
      type="submit"
      spinner={<LoadingDots color="#fff" />}
      isLoading={pending}
              className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-4 py-3 text-white transition duration-500 ease-in-out hover:bg-blue-400 focus:outline-none"
            >
              {!pending && (<><span className="font-bold">Enviar</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="ml-2 h-6 w-6 rotate-90 transform"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg></>)}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
