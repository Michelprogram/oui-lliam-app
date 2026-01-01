export default useDefineHandler<{ status: "success" }>(async () => {
  const { resetEvents } = useInferenceApi();

  return apiSuccess(await resetEvents());
});
