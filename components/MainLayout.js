import Head from 'next/head';
import Container from '@material-ui/core/Container';

export default function MainLayout({ children, title = '' }) {
  return (
    <>
      <Head>
        <title>{title} | Next App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <Container>
        <main>{children}</main>
      </Container>
    </>
  );
}
