import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Divider from "@material-ui/core/Divider";
import Paper from '@material-ui/core/Paper';
import MainLayout from '../components/MainLayout';
import React, { useContext } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { StateContext } from "../components/StateContext";

export default function Summary() {
  const { coordinates, address, startDate, endDate, URL } = useContext(
    StateContext,
  );

  const date1 = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    startDate.getDate(),
    startDate.getHours(),
    startDate.getMinutes(),
  );
  const date2 = new Date(
    endDate.getFullYear(),
    endDate.getMonth() + 1,
    endDate.getDate(),
    endDate.getHours(),
    endDate.getMinutes(),
  );

  const msec = date2.getTime() - date1.getTime();
  const mins = Math.floor(msec / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);

  const defaultCenter = coordinates;
  const defaultOptions = { scrollwheel: false };

  const RegularMap = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={17}
        defaultCenter={defaultCenter}
        defaultOptions={defaultOptions}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    )),
  );

  const loadingElementStyle = { height: "100%" };
  const containerElementStyle = { height: "480px" };
  const mapElementStyle = { height: "100%", marginTop: "40px" };

  return (
    <MainLayout title="Summary">
      <Container>
        <Box p={0} style={mapElementStyle}>
          <Paper elevation={3}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
            >
              <h1>Summary</h1>
            </Box>
            <Divider />

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
            >
              <div>
                From{`: `}
                {` ${startDate.getFullYear()}/${
                  startDate.getMonth() + 1
                }/${startDate.getDate()} ` +
                  `0${startDate.getHours()}`.slice(-2) +
                  ":" +
                  `:0${startDate.getMinutes()}`.slice(-2)}
              </div>
              <Divider orientation="vertical" flexItem />

              <div>
                To{": "}
                {`${endDate.getFullYear()}/${
                  endDate.getMonth() + 1
                }/${endDate.getDate()} ` +
                  `0${endDate.getHours()}`.slice(-2) +
                  ":" +
                  `0${endDate.getMinutes()}`.slice(-2)}
              </div>
              <Divider orientation="vertical" flexItem />

              <div>
                {`Duration: ${days} days, ${hrs % 24} hours, ${
                  mins % 60
                } minutes`}
              </div>
            </Box>
            <Divider />

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
            >
              <p>{address}</p>
            </Box>
          </Paper>
        </Box>

        <Paper elevation={3}>
          <RegularMap
            googleMapURL={URL}
            loadingElement={<div style={loadingElementStyle} />}
            containerElement={<div style={containerElementStyle} />}
            mapElement={<div style={mapElementStyle} />}
          />
        </Paper>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box p={4}>
            <Button variant="outlined" color="primary" href="/">
              Back Home
            </Button>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
}
