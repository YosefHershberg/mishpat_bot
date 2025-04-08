import { useState, useCallback, useEffect } from 'react';

type ServerActionOptions<T, Args extends any[]> = {
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  executeImmediately?: boolean;
  initialArgs?: Args;
};

export function useServerAction<T, Args extends any[]>(
  action: (...args: Args) => Promise<T>,
  options: ServerActionOptions<T, Args> = {}
) {
  const [isLoading, setIsLoading] = useState(!!options.executeImmediately);
  const [error, setError] = useState<unknown>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(
    async (...args: Args) => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await action(...args);
        setData(result);
        options.onSuccess?.(result);
        return result;
      } catch (err) {
        setError(err);
        options.onError?.(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [action, options]
  );

  useEffect(() => {
    if (options.executeImmediately && options.initialArgs) {
      execute(...options.initialArgs).catch(() => {
        // Error is already handled in execute
      });
    }
  }, []);

  if (options.executeImmediately) {
    return {
      isLoading,
      error,
      data,
      reset: () => {
        setError(null);
        setData(null);
      },
    };
  }

  return {
    execute,
    isLoading,
    error,
    data,
    reset: () => {
      setError(null);
      setData(null);
    },
  };
}