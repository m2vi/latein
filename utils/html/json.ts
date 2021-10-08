import html2json from 'html2json';

export const toJSON = (html: string) => {
  return html2json.html2json(html);
};
