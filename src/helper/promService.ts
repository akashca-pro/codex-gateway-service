import { config } from "@/config";
import axios from "axios";

export const queryPrometheus = async (query: string) => {
  const resp = await axios.get(config.METRICS_URL, {
    params: { query },
  });
  return resp.data.data.result;
};