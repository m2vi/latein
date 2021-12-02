import { NextApiRequest, NextApiResponse } from 'next';
import cherrio from 'cheerio';
import { getHref } from '@utils/html/page';

export const data = async (_: NextApiRequest, res: NextApiResponse) => {
  const html = await (await fetch(process.env.PAGE_URL)).text();

  const $ = cherrio.load(html);

  const chapters = $('#lektionen a')
    .map(function (i, el) {
      const text = $(this).text();

      return {
        chapter: i + 1,
        title: text.split(' - ')[1],
        url: getHref($(this).attr().href),
      };
    })
    .toArray();

  const repetitions = $('#repetitiones a')
    .map(function (i, el) {
      const text = $(this).text();

      return {
        chapters: text.split(' | ')[1],
        url: getHref($(this).attr().href),
      };
    })
    .toArray();

  const result = {
    chapters,
    repetitions,
  };

  res.status(200).json(result);
};

export default data;
