import 'date-fns';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { useState, useContext } from "react";
import { Formik } from 'formik';
import MainLayout from '../components/MainLayout';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { StateContext, DispatchContext } from "../components/StateContext";

export default function Index() {
  const dispatch = useContext(DispatchContext);
  const { startDate, endDate } = useContext(StateContext);
  console.log(startDate);
  console.log(endDate);

  
  // const [selectedTime, setSelectedTime] = React.useState(new Date("2014-08-18T21:11:54"));

  const getYear = () => {
    return selectedFirstDate.getFullYear();
  };

  const getMonth = () => {
    return selectedFirstDate.getMonth();
  };

  const getDay = () => {
    return selectedFirstDate.getDate();
  };

  const [selectedFirstDate, setSelectedFirstDate] = useState(new Date());
  const [selectedSecondDate, setSelectedSecondDate] = useState(
    new Date(getYear(), getMonth(), getDay() + 1),
  );

  const firstHandleDateChange = (date) => {
    setSelectedFirstDate(date);
    setSelectedSecondDate(date);

    dispatch({ type: "startDate", payload: date });
  };

  const secondHandleDateChange = (date) => {
    setSelectedSecondDate(date);

    dispatch({ type: "endDate", payload: date });
  };

  // const longText = `Choose first and last date`;

  console.log(selectedFirstDate, selectedSecondDate);

  return (
    <MainLayout title="Start page">
      <Container>
        {/* <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      > */}
        <Typography>
          <h1>Choose the start and end date</h1>
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

        <Paper elevation={3}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                // disableToolbar
                // variant="inline"
                margin="normal"
                minDate={new Date()}
                label="Choose first day"
                format="MM/dd/yyyy"
                // id="date-picker-inline"
                value={selectedFirstDate}
                onChange={firstHandleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />

              <KeyboardDatePicker
                margin="normal"
                // id="date-picker-dialog"
                label="Choose last day"
                minDate={selectedFirstDate}
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
        </Paper>

        <Box display="flex" flexDirection="row">
          <Box p={1}>
            <Link href="/address">
              {startDate === "" || endDate === "" ? (
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Choose first and last date before next step"
                >
                  <span>
                    <Button variant="outlined" color="primary" disabled>
                      Go to the next step
                    </Button>
                  </span>
                </Tooltip>
              ) : (
                <Button variant="outlined" color="primary">
                  Go to the next step
                </Button>
              )}
              {/* <Button
                variant="outlined"
                color="primary"
                // onClick={onClick}
                className={CN("", { disabled: endDate === "" })}
                // {endDate === '' ? disabled : ''}
                // disabled
              >
                Go to the next step
              </Button> */}
            </Link>
          </Box>
        </Box>
        {/* </Box> */}
      </Container>
    </MainLayout>
  );
}
