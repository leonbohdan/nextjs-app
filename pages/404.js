import Link from 'next/link';
import Button from '@material-ui/core/Button';
import err from '../styles/error.module.scss';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export default function ErrorPage() {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={0}
    >
      <h1 className={err.error}>Error 404</h1>
      <p className={err.text}>
        Please{" "}
        <Link href={"/"}>
          <Button variant="outlined">go back</Button>
        </Link>{" "}
        to safety
      </p>
    </Grid>
  );
}
