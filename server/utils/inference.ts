import { ofetch } from "ofetch";
import { eq } from "drizzle-orm";

import { postgres } from "../db";
import { config as configTable, GPUStatus } from "../db/user/schema";

import type { ProcessingRiotEventJob } from "~~/shared/sse/inference/type";

export const useInferenceApi = () => {
  const conf = useRuntimeConfig();

  const url = async () => {
    const { gpuId } = conf;
    const res = await postgres
      .select({ ip: configTable.ip })
      .from(configTable)
      .where(eq(configTable.id, gpuId));

    return res[0].ip;
  };

  const getLLMAvailableModels = async () => {
    const ip = await url();
    const response = await ofetch<{ llm: string[] }>(`http://${ip}/llm/list`, {
      headers: {
        Authorization: `Bearer ${conf.inferenceAuthToken}`,
      },
    });
    return response;
  };

  const getTTSAvailableModels = async () => {
    const ip = await url();

    const response = await ofetch<{ tts: string[] }>(`http://${ip}/tts/list`, {
      headers: {
        Authorization: `Bearer ${conf.inferenceAuthToken}`,
      },
    });
    return response;
  };

  const getCurrentLLM = async () => {
    const ip = await url();

    const response = await ofetch<{ current_llm: string }>(`http://${ip}/llm`, {
      headers: {
        Authorization: `Bearer ${conf.inferenceAuthToken}`,
      },
    });
    return response;
  };

  const getCurrentTTS = async () => {
    const ip = await url();

    const response = await ofetch<{ current_tts: string }>(`http://${ip}/tts`, {
      headers: {
        Authorization: `Bearer ${conf.inferenceAuthToken}`,
      },
    });
    return response;
  };

  const setCurrentLLM = async (model: string) => {
    const ip = await url();

    const response = await ofetch<{
      status: string;
      current_llm: string;
      is_loaded: boolean;
    }>(`http://${ip}/llm`, {
      method: "PUT",
      body: { name: model },
      headers: {
        Authorization: `Bearer ${conf.inferenceAuthToken}`,
      },
    });
    return response;
  };

  const setCurrentTTS = async (model: string) => {
    const ip = await url();

    const response = await ofetch<{
      status: string;
      current_tts: string;
      is_loaded: boolean;
    }>(`http://${ip}/tts`, {
      method: "PUT",
      body: { name: model },
      headers: {
        Authorization: `Bearer ${conf.inferenceAuthToken}`,
      },
    });
    return response;
  };

  const listEvents = async () => {
    const ip = await url();

    const response = await ofetch<{
      events: ProcessingRiotEventJob[];
    }>(`http://${ip}/events/list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${conf.inferenceAuthToken}`,
      },
    });
    return response;
  };

  const resetEvents = async () => {
    const ip = await url();

    const response = await ofetch<{
      status: "success";
    }>(`http://${ip}/events/clear`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${conf.inferenceAuthToken}`,
      },
    });
    return response;
  };

  return {
    getLLMAvailableModels,
    getTTSAvailableModels,
    getCurrentLLM,
    getCurrentTTS,
    setCurrentLLM,
    setCurrentTTS,
    listEvents,
    resetEvents,
  };
};
