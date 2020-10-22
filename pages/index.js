import { isSameDay, startOfToday, endOfDay } from 'date-fns';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from 'next/link';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from "@material-ui/core/Paper";
import Zoom from '@material-ui/core/Zoom';
import { useState, useContext, useEffect } from "react";
import MainLayout from '../components/MainLayout';
import { StateContext, DispatchContext } from "../components/StateContext";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function Index() {
  const dispatch = useContext(DispatchContext);
  const { startDate, endDate } = useContext(StateContext);
  const canGoNext = (endDate - startDate) > (4 * 60 * 60 * 1000) - 60000;

  const [selectedFirstDate, setSelectedFirstDate] = useState(new Date());
  const [selectedSecondDate, setSelectedSecondDate] = useState(new Date());
  const [minTime, setMinTime] = useState(new Date());

  const calculateMinTime = (date) =>
    isSameDay(date, new Date()) ? new Date() : startOfToday();

  useEffect(() => {
    setSelectedSecondDate(
      new Date(selectedSecondDate.setHours(selectedFirstDate.getHours() + 4)),
    );

    dispatch({
      type: "endDate",
      payload: new Date(selectedSecondDate.setHours(
        selectedFirstDate.getHours() + 4,
      )),
    });
  }, []);

  const firstHandleDateChange = (date) => {
    setSelectedFirstDate(date);
    setMinTime(calculateMinTime(date));

    dispatch({ type: "startDate", payload: date });
  };

  const secondHandleDateChange = (date) => {
    setSelectedSecondDate(date);

    dispatch({
      type: "endDate",
      payload: date,
    });
  };

  const date1 = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    startDate.getDate(),
    startDate.getHours(),
    startDate.getMinutes(),
  );

  const msec1 = date1.getTime();
  const mins1 = Math.floor(msec1 / 60000);
  const hrs1 = Math.floor(mins1 / 60) % 24;

  const date2 = new Date(
    endDate.getFullYear(),
    endDate.getMonth() + 1,
    endDate.getDate(),
    endDate.getHours(),
    endDate.getMinutes(),
  );

  const msec2 = date2.getTime();
  const mins2 = Math.floor(msec2 / 60000);
  const hrs2 = Math.floor(mins2 / 60) % 24;

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

        <Paper elevation={3}>
          <Box
            p={4}
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <label htmlFor="first_date">
              Check-in time
              <DatePicker
                id="first_date"
                withPortal
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy HH:mm"
                selected={selectedFirstDate}
                minDate={new Date()}
                minTime={minTime}
                maxTime={endOfDay(new Date())}
                showDisabledMonthNavigation
                onChange={(date) => {
                  firstHandleDateChange(date);
                }}
              />
            </label>

            <label htmlFor="second_date">
              Check-out time
              <DatePicker
                id="second_date"
                withPortal
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                minTime={selectedFirstDate}
                maxTime={endOfDay(selectedFirstDate)}
                dateFormat="MMMM d, yyyy HH:mm"
                selected={selectedSecondDate}
                minDate={selectedFirstDate}
                showDisabledMonthNavigation
                onChange={(date) => {
                  secondHandleDateChange(date);
                }}
              />
            </label>
          </Box>
        </Paper>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box p={4}>
            <Paper elevation={3}>
              <Box
                p={1}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <div>Pay attention.</div>
                <div>1. The duration can not be less than 4 hours</div>
                <div>
                  2. Сheck-out time can not be less than 2 hours than check-in
                  time
                </div>
              </Box>
            </Paper>
          </Box>

          <Box>
            {!canGoNext ||
            hrs2 - hrs1 < 2 ||
            (mins2 % 60) - (mins1 % 60) < 0 ? (
              <Tooltip
                TransitionComponent={Zoom}
                title="The duration can not be less than 4 hours or check-out time can not be less than 2 hours than check-in time"
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
