import Link from 'next/link';
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import React, { useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const defaultCenter = { lat: 50.45466, lng: 30.5238 };

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


export default function Summary() {
  return (
    <Container>
      <Head>
        <title>Summary</title>
      </Head>

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
  );
}
