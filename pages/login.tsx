import LoginPage from '@components/Login';
import auth from '@utils/security/auth';

const Login = () => <LoginPage />;

export default Login;

export async function getServerSideProps({ locale, req }) {
  const token = await auth.pageAuth(req);

  if (!token) {
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: `/browse`,
      },
    };
  }
}
