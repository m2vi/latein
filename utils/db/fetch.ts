import cache from 'memory-cache';

export const fetchWithCache = async (url: string, minutes: number = 30, dontCache?: boolean) => {
  const value = cache.get(url);
  if (value && !dontCache) {
    return value;
  } else {
    const data = await (await fetch(url)).text();
    cache.put(url, data, 1000 * 60 * minutes);
    return data;
  }
};

export const basicFetch = async (input: RequestInfo, init?: RequestInit) => {
  return await (await fetch(input, init)).json();
};
