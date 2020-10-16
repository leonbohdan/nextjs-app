import 'date-fns';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useState } from 'react';
import { Formik } from 'formik';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function Index() {
  const [selectedFirstDate, setSelectedFirstDate] = useState(new Date());
  const [selectedSecondDate, setSelectedSecondDate] = useState(new Date());
  // const [selectedTime, setSelectedTime] = React.useState(new Date("2014-08-18T21:11:54"));
  
  const firstHandleDateChange = (date) => {
    setSelectedFirstDate(date);
  };

  const secondHandleDateChange = (date) => {
    setSelectedSecondDate(date);
  };

  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      > */}
        <Typography>
          <h1>Create Next App</h1>
        </Typography>

        {/* <Formik
          initialValues={{ name: "jared" }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                name="name"
              />
              {props.errors.name && (
                <div id="feedback">{props.errors.name}</div>
              )}
              <button type="submit">Submit</button>
            </form>
          )}
        </Formik> */}

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedFirstDate}
              onChange={firstHandleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={selectedSecondDate}
              onChange={secondHandleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            {/* <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={selectedTime}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            /> */}
          </Grid>
        </MuiPickersUtilsProvider>

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
      {/* </Box> */}
    </Container>
  );
}
