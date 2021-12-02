import LoginPage from '@components/Login';
import { hasCookie } from '@utils/tools/utils';
import jwt from 'jsonwebtoken';
import { GetServerSideProps } from 'next';

const Login = () => <LoginPage />;

export default Login;

export const getServerSideProps: GetServerSideProps = async context => {
  const token = hasCookie(context);

  if (!token) {
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }
};
