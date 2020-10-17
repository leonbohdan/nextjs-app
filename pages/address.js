import Link from 'next/link';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import MainLayout from '../components/MainLayout';
import React, { useState, useContext } from "react";
import PlacesAutocomplete, { 
  geocodeByAddress, getLatLng 
} from 'react-places-autocomplete';
import { StateContext, DispatchContext } from "../components/StateContext";

export default function Address() {
  const dispatch = useContext(DispatchContext);
  const { coordinates, startDate, endDate, address } = useContext(StateContext);
  console.log(coordinates);
  // console.log(address[0].long_name);
  console.log(startDate);
  console.log(endDate);

  const [localAddress, setAddress ] = useState('');
  const [localCoordinates, setCoordinates] = useState({ lat: null, lng: null });

  console.log(localAddress, localCoordinates);
  
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);

    dispatch({ type: "coordinates", payload: latLng });
    dispatch({ type: "address", payload: results[0].address_components });

    console.log(results);
    console.log(results[0].address_components);
  };

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

          <Paper elevation={3}>
            <PlacesAutocomplete
              value={localAddress}
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
                  {/* <p>Latitude: {coordinates.lat}</p>
                  <p>Longitude: {coordinates.lng}</p> */}

                  <TextField
                    {...getInputProps()}
                    label="Enter a place"
                    id="autocomplete"
                    // defaultValue="Enter a place"
                    variant="outlined"
                    size="small"
                    fullWidth
                    // margin="normal"
                  />

                  <div>
                    {loading ? <div>...Loading</div> : null}

                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active ? "#3f51b5" : "#fff",
                        color: suggestion.active ? "#fff" : "#000",
                      };
                      console.log(suggestion);

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
          </Paper>

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
              {!address ? (
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Choose the place before next step"
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
            </Link>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
}
