import React from 'react';

type Props = {
  models: Model[];
  setModels: (models: Model[]) => void;
  activeModel: string;
  setActiveModel: (modelId: string) => void;
};

export const ModelContext = React.createContext<Props>({
  models: [],
  setModels: (models: Model[]) => models,
  activeModel: '',
  setActiveModel: (modelId: string) => modelId,
});

export default ModelContext;
