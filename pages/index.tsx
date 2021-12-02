import { Button } from '@components/Button';
import Full from '@components/Full';
import { baseUrl, hasCookie } from '@utils/tools/utils';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

const Index = ({ data }) => {
  const r = (url: string) => window.open(url, '_blank').focus();

  return (
    <Full className="py-8 flex  flex-col justify-center items-center w-full">
      <Head>
        <title>Latein Lösungen</title>
      </Head>

      <div className="flex flex-col w-full max-w-xl h-full p-4 bg-primary-800 rounded-8 mb-4">
        {data.chapters.map(({ chapter, title, url }, i: number) => {
          return (
            <a href={url} key={i} className="text-accent hover:text-accent-hover">
              Lektion {chapter} - {title}
            </a>
          );
        })}
      </div>
      <div className="flex flex-col w-full max-w-xl h-full p-4 bg-primary-800 rounded-8 mb-4">
        {data.repetitions.map(({ chapters, url }, i: number) => {
          return (
            <a href={url} key={i} className="text-accent hover:text-accent-hover">
              Repetitiones {chapters}
            </a>
          );
        })}
      </div>
      <div className="flex w-full max-w-xl h-full p-4 bg-primary-800 rounded-8 mb-4">
        <span className="text-default font-bold">ACHTUNG: Lösungen nur zur Überprüfung geeignet!</span>
      </div>
      <div className="flex flex-col w-full max-w-xl h-full p-4 bg-primary-800 rounded-8">
        <div className="flex justify-between items-center mb-2">
          <span>MiR Vokabular (1-20)</span>
          <Button color="secondary" onClick={() => r('/MiR_Vokabular-1-20.pdf')}>
            Herunterladen
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <span>MiR Vokabular (21-40)</span>
          <Button color="secondary" onClick={() => r('/MiR_Vokabular-21-40.pdf')}>
            Herunterladen
          </Button>
        </div>
      </div>
    </Full>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const token = hasCookie(context);
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: `/login`,
      },
    };
  } else {
    return {
      props: {
        data: await (await fetch(`${baseUrl(context.req)}/api/data`)).json(),
      },
    };
  }
};

export default Index;
