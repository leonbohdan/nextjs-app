import Link from 'next/link';
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

export default function MainLayout({ children, title = '' }) {
  return (
    <>
      <Head>
        <title>{title} | Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name='keywords' content='next,javascript,nextjs,react,redux' />
        <meta name='description' content='this is nextjs app' />
        <meta charSet='utf-8' />

        {/* <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCbTkgp8BSD3i4Cl4Q5ps3qoqOGI94Pa0M&libraries=places"
        ></script> */}
      </Head>

      <Container>
        <nav>
          <Box display="flex" flexDirection="row">
            <Box p={1}>
              <Link href="/">
                <Button variant="outlined" color="primary">
                  Back Home
                </Button>
              </Link>
            </Box>

            <Box p={1}>
              <Link href="/address">
                <Button variant="outlined" color="primary">
                  To address
                </Button>
              </Link>
            </Box>

            <Box p={1}>
              <Link href="/summary">
                <Button variant="outlined" color="primary">
                  To summary
                </Button>
              </Link>
            </Box>
          </Box>
        </nav>

        <main>{children}</main>
      </Container>
    </>
  );
}