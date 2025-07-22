import { AsyncLocalStorage } from "async_hooks";

type AsyncLocalStorageType = {
  correlationId: String;
};

export const asyncLocalStorage = new AsyncLocalStorage<AsyncLocalStorageType>();

export const getCorrelationId = () => {
  const asyncStore = asyncLocalStorage.getStore();
  return (
    asyncStore?.correlationId || "unknown_error_while_creating_correlation_id"
  );
};
