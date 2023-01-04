import axiosService from './axiosService';

export const getModels = async () => {
  return await axiosService.get<Model[]>('/models');
};

export const createModel = async (payload: ModelPayload) => {
  return await axiosService.post<Model>('/models/create', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateModel = async (modelId: string, payload: ModelPayload) => {
  return await axiosService.put<Model>(`/models/${modelId}/update`, payload);
};

export const deleteModel = async (modelId: string) => {
  return await axiosService.delete(`/models/${modelId}/delete`);
};
