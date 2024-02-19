import { Avatar, Button } from '@nextui-org/react';
import Image from 'next/image';

export default function ChatHeader() {
  return (
    <>
      <div className="relative flex items-center space-x-4">
        <div className="relative">
          <span className="absolute bottom-0 right-0 text-green-500">
            <svg width="20" height="20">
              <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
            </svg>
          </span>
          <Avatar size='lg' src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        </div>
        <div className="flex flex-col leading-tight">
          <div className="mt-1 flex items-center text-2xl">
            <span className="mr-3 text-gray-700">
              Vereador Claudinho da Cascalheira
            </span>
          </div>
          <span className="text-lg text-gray-600">Sendo atendido por</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border text-gray-500 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none"
          isIconOnly
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </Button>
        <Button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border text-gray-500 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none"
          isIconOnly
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </Button>
        <Button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border text-gray-500 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none"
          isIconOnly
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            ></path>
          </svg>
        </Button>
      </div>
    </>
  );
}