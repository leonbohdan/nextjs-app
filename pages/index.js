import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function Index() {
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography>
          <h1>Create Next App</h1>
        </Typography>

        <Box display="flex" flexDirection="row">
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
      </Box>
    </Container>
  );
}
