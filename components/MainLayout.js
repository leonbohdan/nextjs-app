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
      </Head>

      <Container>
        {/* <nav>
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
        </nav> */}

        <main>{children}</main>
      </Container>
    </>
  );
}