export const Pages = {
  Bot: {
    name: "Bot",
    link: "/",
    icon: "Bot",
  },
  Rounds: {
    name: "Rounds",
    link: "/rounds",
    icon: "UsersRound",
  },
  Video: {
    name: "Video",
    link: "/video",
    icon: "Video",
  },
  Settings: {
    name: "Settings",
    link: "/settings",
    icon: "Settings",
  },
  Clipper: {
    name: "Clipper",
    link: "/clipper",
    icon: "Clapperboard",
  },
};
export type Pages = (typeof Pages)[keyof typeof Pages];
