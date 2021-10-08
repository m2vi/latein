import Full from '@components/Full';
import { basicFetch } from '@utils/db/fetch';
import auth from '@utils/security/auth';
import { baseUrl } from '@utils/tools/utils';
import Head from 'next/head';

const Index = ({ data }) => {
  return (
    <Full className="py-8 flex justify-center items-center w-full">
      <Head>
        <title>Latein Lösungen</title>
      </Head>
      <div className="flex flex-col w-full max-w-xl h-full p-6 bg-primary-600 rounded-8">
        {data.lektionen.map(({ text, href }, i: number) => {
          return (
            <a href={href} key={i}>
              {text}
            </a>
          );
        })}
        <br />
        {data.repetitiones.map(({ text, href }, i: number) => {
          return (
            <a href={href} key={i}>
              {text}
            </a>
          );
        })}
      </div>
    </Full>
  );
};

export async function getServerSideProps({ locale, req }) {
  const token = await auth.pageAuth(req);
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
        data: await basicFetch(`${baseUrl(req)}/api/data?token=${process.env.API_TOKEN}`),
      },
    };
  }
}

export default Index;
