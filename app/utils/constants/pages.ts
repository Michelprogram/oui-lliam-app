export const Pages = {
  Bot: {
    name: "Bot",
    link: "/",
    icon: "Bot",
  },
  Swords: {
    name: "Swords",
    link: "/swords",
    icon: "Swords",
  },
  Settings: {
    name: "Settings",
    link: "/settings",
    icon: "Settings",
  },
};
export type Pages = (typeof Pages)[keyof typeof Pages];
