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
// import { Formik } from 'formik';
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

  const [selectedFirstDate, setSelectedFirstDate] = useState(new Date());
  const [selectedSecondDate, setSelectedSecondDate] = useState(new Date());
  const [active, setActive] = useState(false);

  const firstHandleDateChange = (date) => {
    setSelectedFirstDate(date);
    setSelectedSecondDate(date);

    dispatch({ type: "startDate", payload: date });
  };

  const secondHandleDateChange = (date) => {
    setSelectedSecondDate(date);
    setActive(true);

    dispatch({ type: "endDate", payload: date });
  };

  console.log(selectedFirstDate, selectedSecondDate);

  return (
    <MainLayout title="Start page">
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography>
            <h1>Choose the start and end date</h1>
          </Typography>
        </Box>

        <Paper elevation={2}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <label for="first">
                <KeyboardDatePicker
                  id="first"
                  margin="normal"
                  minDate={new Date()}
                  label="Choose first day"
                  format="MM/dd/yyyy"
                  value={selectedFirstDate}
                  onChange={firstHandleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </label>

              <label for="second">
                <KeyboardDatePicker
                  id="second"
                  margin="normal"
                  label="Choose last day"
                  minDate={selectedFirstDate}
                  format="MM/dd/yyyy"
                  value={selectedSecondDate}
                  onChange={secondHandleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </label>
            </Grid>
          </MuiPickersUtilsProvider>
        </Paper>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box p={4}>
            {!active ? (
              <Tooltip
                TransitionComponent={Zoom}
                title="Choose the first and the last date before the next step"
                leaveDelay={200}
              >
                <span>
                  <Button variant="outlined" color="primary" disabled>
                    Go to the next step
                  </Button>
                </span>
              </Tooltip>
            ) : (
              <Link href="/address">
                <Button variant="outlined" color="primary">
                  Go to the next step
                </Button>
              </Link>
            )}
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
}
