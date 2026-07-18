import api from "./api";

export const predictDisease = async (symptoms) => {
  const response = await api.post("/ai/predict", {
    symptoms,
  });

  return response.data;
};