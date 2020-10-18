import Link from 'next/link';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import err from '../styles/error.module.scss';
import Box from '@material-ui/core/Box';
import Divider from "@material-ui/core/Divider";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    maxWidth: "100vw",
    maxHeight: "100vh",
    marginTop: "30vh",
  },
}));

export default function ErrorPage() {
  const classes = useStyles();

  return (
    <Container>
      <Box
        className={classes.root}
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        alignItems="center"
      >
        <div>
          <h2 className={err.error}>Error 404</h2>
        </div>

        <div>
          <p className={err.text}>
            Please{" "}
            <Link href={"/"}>
              <Button variant="outlined">go back</Button>
            </Link>{" "}
            to safety
          </p>
        </div>
      </Box>
    </Container>
  );
}
