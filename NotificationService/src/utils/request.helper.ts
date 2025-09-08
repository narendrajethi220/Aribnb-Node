import { AsyncLocalStorage } from "async_hooks";

type AsyncLocalStorageType = {
  correlatioId: string;
};

export const asyncLocalStorage = new AsyncLocalStorage<AsyncLocalStorageType>();

export const getCorrelationId = () => {
  const asyncStore = asyncLocalStorage.getStore(); //returns the current store for the current async request
  return (
    asyncStore?.correlatioId || "unknown_error_while_creating_correlationID"
  );
};
