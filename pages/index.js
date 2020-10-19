import 'date-fns';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { useState, useContext } from "react";
import MainLayout from '../components/MainLayout';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
} from '@material-ui/pickers';
import { StateContext, DispatchContext } from "../components/StateContext";

export default function Index() {
  const dispatch = useContext(DispatchContext);
  const { startDate, endDate } = useContext(StateContext);

  const [selectedFirstDate, setSelectedFirstDate] = useState(new Date());
  const [selectedSecondDate, setSelectedSecondDate] = useState(
    new Date(
      selectedFirstDate.getFullYear(),
      selectedFirstDate.getMonth(),
      selectedFirstDate.getDate(),
      selectedFirstDate.getHours(),
      selectedFirstDate.getMinutes(),
    ),
  );

  const firstHandleDateChange = (date) => {
    setSelectedFirstDate(date);
    setSelectedSecondDate(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
      ),
    );

    dispatch({ type: "startDate", payload: date });
  };

  const secondHandleDateChange = (date) => {
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
  };

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
                title="Set the first day"
              />
            </label>

            <label htmlFor="second_date">
              <DateTimePicker
                id="second_date"
                ampm={false}
                label="Choose last day and time"
                inputVariant="outlined"
                value={selectedSecondDate}
                onChange={secondHandleDateChange}
                format="yyyy/MM/dd HH:mm"
                margin="normal"
                minDate={selectedFirstDate}
                autoOk
                title="Duration can not be less than 4 hours"
              />
            </label>
          </Box>
        </MuiPickersUtilsProvider>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box p={4}>
            {Math.abs(selectedSecondDate) - Math.abs(selectedFirstDate) <=
            14360000 ? (
              <Tooltip
                TransitionComponent={Zoom}
                title="Duration can not be less than 4 hours"
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
