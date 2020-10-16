import Link from 'next/link';
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import MainLayout from '../components/MainLayout';
import React, { useState } from 'react';
import PlacesAutocomplete, { 
  geocodeByAddress, getLatLng 
} from 'react-places-autocomplete';

export default function Address() {
  const [address, setAddress ] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);

    console.log(latLng);
  };

  console.log(coordinates);

  return (
    <MainLayout title="Address">
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography>
            <h1>Choose the place</h1>
          </Typography>

          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <p>Latitude: {coordinates.lat}</p>
                <p>Longitude: {coordinates.lng}</p>

                {/* <input {...getInputProps({ placeholder: "Enter a place" })} /> */}
                <TextField
                  {...getInputProps()}
                  label="Enter a place"
                  id="autocomplete"
                  // defaultValue="Enter a place"
                  variant="outlined"
                  size="small"
                />

                <div>
                  {loading ? <div>...Loading</div> : null}

                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                    };
                    // console.log(suggestion);

                    return (
                      <div
                        key={suggestion.placeId}
                        {...getSuggestionItemProps(suggestion, { style })}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>

          {/* <input id="autocomplete" placeholder="Enter a place" type="text" /> */}

          {/* <Box> */}
          {/* <TextField
            label="Enter a place"
            id="autocomplete"
            // defaultValue="Enter a place"
            variant="outlined"
            size="small"
          /> */}
          {/* </Box> */}

          <Box p={1}>
            <Link href="/summary">
              <Button variant="outlined" color="primary">
                Go to the next step
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
}
