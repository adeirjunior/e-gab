"use client"

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";


export default function ShareButtons({url, message}: {url:string, message: string}) {
  return (
    <section className="flex flex-col gap-4 items-center mx-auto">
        <h4 className="text-center">Compartilhar</h4>
        <div className="space-x-4">
             <FacebookShareButton
        url={url}
        quote={message}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton
        url={url}
        title={message}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton
        url={url}
        title={message}
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
        </div>
     
    </section>
  );
}