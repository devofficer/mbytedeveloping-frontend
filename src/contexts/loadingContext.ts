import React from 'react';

type Props = {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  loadingMessage: string;
  setLoadingMessage: (message: string) => void;
};

export const LoadingContext = React.createContext<Props>({
  isLoading: false,
  setLoading: (loading: boolean) => loading,
  loadingMessage: '',
  setLoadingMessage: (message: string) => message,
});

export default LoadingContext;
