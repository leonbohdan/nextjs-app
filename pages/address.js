import { useState, useContext, useMemo, useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Link from 'next/link';
import { makeStyles } from "@material-ui/core/styles";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import MainLayout from "../components/MainLayout";
import PlacesAutocomplete, { 
  geocodeByAddress, getLatLng 
} from 'react-places-autocomplete';
import { StateContext, DispatchContext } from "../components/StateContext";

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export default function Address() {
  const dispatch = useContext(DispatchContext);
  const { URL } = useContext(StateContext);

  const classes = useStyles();
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [active, setActive] = useState(false);
  const loaded = useRef(false);

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);

    dispatch({ type: "coordinates", payload: latLng });
    dispatch({ type: "address", payload: value });
    setActive(true);
  };

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        URL,
        document.querySelector("head"),
        "google-maps",
      );
    }

    loaded.current = true;
  }

  const fetch = useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    [],
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <MainLayout title="Address">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <h1>Step Two</h1>
        <h3>Choose the place you are wanna visit</h3>

        <Paper elevation={3}>
          <Autocomplete
            style={{ width: 300 }}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.description
            }
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            onChange={(event, newValue) => {
              setOptions(newValue ? [newValue, ...options] : options);
              setValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
              handleSelect(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Enter a place"
                variant="outlined"
                fullWidth
              />
            )}
            renderOption={(option) => {
              const matches =
                option.structured_formatting.main_text_matched_substrings;
              const parts = parse(
                option.structured_formatting.main_text,
                matches.map((match) => [
                  match.offset,
                  match.offset + match.length,
                ]),
              );

              return (
                <Grid container alignItems="center">
                  <Grid item>
                    <LocationOnIcon className={classes.icon} />
                  </Grid>

                  <Grid item xs>
                    {parts.map((part, index) => (
                      <span
                        key={index}
                        style={{ fontWeight: part.highlight ? 700 : 400 }}
                      >
                        {part.text}
                      </span>
                    ))}

                    <Typography variant="body2" color="textSecondary">
                      {option.structured_formatting.secondary_text}
                    </Typography>
                  </Grid>
                </Grid>
              );
            }}
          />
        </Paper>

        <Box p={4}>
          {!active ? (
            <Tooltip
              TransitionComponent={Zoom}
              title="Choose the place before the next step"
              leaveDelay={200}
            >
              <span>
                <Button variant="outlined" color="primary" disabled>
                  Go to the next step
                </Button>
              </span>
            </Tooltip>
          ) : (
            <Link href="/summary">
              <Button variant="outlined" color="primary">
                Go to the next step
              </Button>
            </Link>
          )}
        </Box>
      </Box>
    </MainLayout>
  );
}
