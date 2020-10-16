import Link from 'next/link';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MainLayout from '../components/MainLayout';
import React, { useContext } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { StateContext, DispatchContext } from "../components/StateContext";

export default function Summary() {
  // const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  console.log("1", state.coordinates);

  // Kyiv coordinates
  // const defaultCenter = { lat: 50.45466, lng: 30.5238 };
  const defaultCenter = state.coordinates;

  const defaultOptions = { scrollwheel: false };

  const RegularMap = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={10}
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
        {/* <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      > */}
        <Typography>
          <h1>Summary</h1>
        </Typography>

        <RegularMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCbTkgp8BSD3i4Cl4Q5ps3qoqOGI94Pa0M"
          loadingElement={<div style={loadingElementStyle} />}
          containerElement={<div style={containerElementStyle} />}
          mapElement={<div style={mapElementStyle} />}
        />

        <Link href="/">
          <Button variant="outlined" color="primary">
            Back Home
          </Button>
        </Link>
        {/* </Box> */}
      </Container>
    </MainLayout>
  );
}
