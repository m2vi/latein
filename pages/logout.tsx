import auth from '@utils/security/auth';
import { GetServerSideProps } from 'next';

const Logout = () => null;

export default Logout;

export const getServerSideProps: GetServerSideProps = async ctx => {
  auth.logout(ctx);

  return {
    redirect: {
      permanent: false,
      destination: '/',
    },
  };
};
