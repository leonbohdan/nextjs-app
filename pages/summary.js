import Link from 'next/link';
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function Summary() {
  return (
    <Container>
      <Head>
        <title>Summary</title>
      </Head>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography>
          <h1>Summary</h1>
        </Typography>

        <Link href="/">
          <Button variant="outlined" color="primary">
            Back Home
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
