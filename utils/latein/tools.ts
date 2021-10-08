import { getHref } from '@utils/html/page';

export const lektionen = (json: any) => {
  const target = (json.child[0].child[3].child[3].child[5].child[3].child[3].child[5].child as any[]).filter(o => {
    return (
      o.node === 'element' &&
      o.tag === 'p' &&
      (o.child as any[]).find(o => {
        return o.node === 'element' && o.tag === 'a';
      })
    );
  });

  const out = (target as any[]).map(o => {
    const href = o.child[1].attr.href;
    const text = o.child[1].child[0].text;

    return { href: getHref(href), text: text };
  });

  return out;
};

export const repetitiones = (json: any) => {
  const target = (json.child[0].child[3].child[3].child[5].child[3].child[3].child[9].child as any[]).filter(o => {
    return (
      o.node === 'element' &&
      o.tag === 'p' &&
      (o.child as any[]).find(o => {
        return o.node === 'element' && o.tag === 'a';
      })
    );
  });

  const out = (target as any[]).map(o => {
    const href = o.child[1].attr.href;
    const text = o.child[1].child[0].text;

    return { href: getHref(href), text: text };
  });

  return out;
};
