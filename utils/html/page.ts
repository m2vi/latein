export const getHref = (href: string) => {
  return new URL(`https://foo.bar${href}`).searchParams.get('url');
};
