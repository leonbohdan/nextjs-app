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
  DateTimePicker,
  DatePicker,
  KeyboardDateTimePicker,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { StateContext, DispatchContext } from "../components/StateContext";

export default function Index() {
  const dispatch = useContext(DispatchContext);
  const { startDate, endDate } = useContext(StateContext);
  console.log(startDate);
  console.log(endDate);

  const [selectedFirstDate, setSelectedFirstDate] = useState(new Date());
  const [selectedSecondDate, setSelectedSecondDate] = useState(
    new Date(
      selectedFirstDate.getFullYear(),
      selectedFirstDate.getMonth(),
      selectedFirstDate.getDate(),
      selectedFirstDate.getHours() + 4,
      selectedFirstDate.getMinutes(),
    ),
  );
  const [active, setActive] = useState(false);
  const [firstDateChoose, setFirstDateChoose] = useState(false);

  const firstHandleDateChange = (date) => {
    setSelectedFirstDate(date);
    setFirstDateChoose(true);
    setSelectedSecondDate(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours() + 4,
        date.getMinutes(),
      ),
    );

    dispatch({ type: "startDate", payload: date });
  };

  const secondHandleDateChange = (date) => {
    if (firstDateChoose) {
      setSelectedSecondDate(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours() - 2,
          date.getMinutes(),
        ),
      );

      dispatch({
        type: "endDate",
        payload: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours() - 2,
          date.getMinutes(),
        ),
      });
    } else {
      setSelectedSecondDate(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
        ),
      );

      dispatch({
        type: "endDate",
        payload: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
        ),
      });
    }

    setActive(true);
  };

  console.log(selectedFirstDate, selectedSecondDate);

  return (
    <MainLayout title="Start page">
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <h1>Choose the start and end date</h1>
        </Box>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <label htmlFor="first_date">
              <DateTimePicker
                id="first_date"
                ampm={false}
                label="Choose first day and time"
                inputVariant="outlined"
                value={selectedFirstDate}
                onChange={firstHandleDateChange}
                format="yyyy/MM/dd HH:mm"
                margin="normal"
                minDate={new Date()}
                autoOk
              />
            </label>

            <label htmlFor="second_date">
              <DatePicker
                id="second_date"
                ampm={false}
                label="Choose last day"
                inputVariant="outlined"
                value={selectedSecondDate}
                onChange={secondHandleDateChange}
                format="yyyy/MM/dd HH:mm"
                margin="normal"
                minDate={selectedFirstDate}
                autoOk
              />
            </label>
          </Box>
          {/* <label htmlFor="first">
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

          <label htmlFor="second">
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
          </label> */}
        </MuiPickersUtilsProvider>

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
