import type { User } from "#shared/db/user";

type UserStore =
  | {
      kind: "anonymous";
    }
  | {
      kind: "authenticated";
      user: User;
    };

export const useUserStore = defineStore("user", () => {
  const state = useState<UserStore>("user", () => ({
    kind: "anonymous",
  }));

  return {
    state,
  };
});
