export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore();

  const session = useCookie("auth", { readonly: true });

  const { data } = await useFetch("/api/auth/me", {
    headers: {
      Cookie: session.value ?? "",
    },
  });

  if (isPresent(data.value) && data.value.type === "success") {
    userStore.state = {
      kind: "authenticated",
      user: {
        ...data.value.data,
      },
    };
  }

  if (to.path === "/") return;
  if (userStore.state.kind === "anonymous") return navigateTo("/");
});
