import Link from 'next/link';
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

export default function Address() {

  // const googleMapURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCbTkgp8BSD3i4Cl4Q5ps3qoqOGI94Pa0M&libraries=places&callback=initAutocomplete";
  
  // let autocomplete;
  // function initAutocomplete() {
  //   autocomplete = new google.maps.places.Autocomplete(
  //     document.getElementById("autocomplete"),
  //     {
  //       types: ["establishment"],
  //       componentRestrictions: { country: ["AU"] },
  //       fields: ["place_id", "geometry"],
  //     },
  //   );
  // }

  return (
    <Container>
      <Head>
        <title>Address</title>
        <script
          defer
          // src={googleMapURL}
          // src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCbTkgp8BSD3i4Cl4Q5ps3qoqOGI94Pa0M&libraries=places&callback=initAutocomplete"
        >
        </script>
      </Head>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography>
          <h1>Address</h1>
        </Typography>

        {/* <input id="autocomplete" placeholder="Enter a place" type="text" /> */}

        {/* <Box> */}
        <TextField
          label="Enter a place"
          id="autocomplete"
          // defaultValue="Enter a place"
          variant="outlined"
          size="small"
        />
        {/* </Box> */}

        <Link href="/">
          <Button
            variant="outlined"
            color="primary"
          >
            Back Home
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
