import Link from 'next/link';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from "@material-ui/core/Divider";
import Paper from '@material-ui/core/Paper';
import MainLayout from '../components/MainLayout';
import React, { useContext, useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { StateContext, DispatchContext } from "../components/StateContext";

export default function Summary() {
  const { coordinates, address, startDate, endDate } = useContext(StateContext);
  console.log("1", coordinates);
  console.log(address);
  console.log(startDate);
  console.log(endDate);

  const date1 = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    startDate.getDate(),
  );
  const date2 = new Date(
    endDate.getFullYear(),
    endDate.getMonth() + 1,
    endDate.getDate(),
  );
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Kyiv coordinates
  // const defaultCenter = { lat: 50.45466, lng: 30.5238 };
  const defaultCenter = coordinates;

  const defaultOptions = { scrollwheel: false };

  const RegularMap = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={defaultCenter}
        defaultOptions={defaultOptions}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    )),
  );

  const loadingElementStyle = { height: "100%" };
  const containerElementStyle = { height: "480px" };
  const mapElementStyle = { height: "100%" };

  return (
    <MainLayout title="Summary">
      <Container>
        <Box p={4}>
          <Paper elevation={3}>
            <Typography>
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
                  From{": "}
                  {`${startDate.getDate()}.${
                    startDate.getMonth() + 1
                  }.${startDate.getFullYear()}`}
                </div>
                <Divider orientation="vertical" flexItem />

                <div>
                  To{": "}
                  {`${endDate.getDate()}.${
                    endDate.getMonth() + 1
                  }.${endDate.getFullYear()}`}
                </div>
                <Divider orientation="vertical" flexItem />

                <div>Total days: {diffDays}</div>
              </Box>
              <Divider />

              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-around"
              >
                <p>{address}</p>
              </Box>
            </Typography>
          </Paper>
        </Box>

        <Paper elevation={3}>
          <RegularMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCbTkgp8BSD3i4Cl4Q5ps3qoqOGI94Pa0M"
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
            <Link href="/">
              <Button variant="outlined" color="primary">
                Back Home
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
}
