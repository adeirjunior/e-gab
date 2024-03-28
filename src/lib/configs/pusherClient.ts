import PusherClient from "pusher-js";

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  {
    cluster: "sa1",
    authEndpoint: "/api/pusher-auth",
    authTransport: "ajax",
    auth: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  },
);
