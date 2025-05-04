export type TFetchCache = 'force-cache' | 'no-store';
export type TFetchOptions = {
  cache?: TFetchCache;
};

export const methodGET = async <T>(endpoint: string, options?: TFetchOptions): Promise<T> => {
  //console.log(`${process.env.BACKEND_URL}/${process.env.BACKEND_VERSION_API}/${endpoint}`);
  const res = await fetch(`${process.env.BACKEND_URL}/${process.env.BACKEND_VERSION_API}/${endpoint}`, {
    ...options
  });
  if (!res.ok) {
    console.error(`Erro ao requisitar dado, erro: -> ${  res.text}`);
  }
  const data = (await res.json()) as T;
  return await data;
};

export const methodPUT = async <T, R>(endpoint: string, data: T): Promise<[Response, R]> => {
  //console.log(`${process.env.BACKEND_URL}/${process.env.BACKEND_VERSION_API}/${endpoint}`);
  const res = await fetch(`${process.env.BACKEND_URL}/${process.env.BACKEND_VERSION_API}/${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Erro ao atualizar o dado, erro: -> ${  errorText}`);
  }

  const responseData = (await res.json()) as R;
  return [res, responseData];
};