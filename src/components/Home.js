import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';

const PROJECT_URI = 'https://pedlcwbxzcjuzwdupgwk.supabase.co'
const PROJECT_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlZGxjd2J4emNqdXp3ZHVwZ3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MzEwNzQsImV4cCI6MjAyOTAwNzA3NH0.7GZC7LjXsoUgSHXLHDvblNPoC0y_v9UjDBYiAwLywAw'

const supabase = createClient(PROJECT_URI, PROJECT_ANON);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4, 
};


export default function ButtonAppBar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [employees, setEmployees] = useState([]);


  // Helper function to extract the day, month, and year from a date
  const getDayMonthYear = (date) => ({
    day: date.getUTCDate(),
    month: date.getUTCMonth() + 1, // Months are zero-indexed, so add 1
    year: date.getUTCFullYear(),
  });

  const handleDateChange = async (newDate) => {
    setSelectedDate(newDate);
    console.log(newDate); // Log or use the selected date as needed

    let { data: creditTerms, error } = await supabase
    .from('creditTerms')
    .select('*')

    if (newDate) {
      // Ensure newDate is a Date object
      const selectedDate = new Date(newDate);
  
      // Extract day, month, and year from the selected date
      const selectedDayMonthYear = getDayMonthYear(selectedDate);

      // Filter items based on the created_at date matching the selected date
      const filteredItems = creditTerms.filter((item) => {
        const itemDate = new Date(item.created_at);
        const itemDayMonthYear = getDayMonthYear(itemDate);

        // Compare day, month, and year
        return (
          itemDayMonthYear.day === selectedDayMonthYear.day &&
          itemDayMonthYear.month === selectedDayMonthYear.month &&
          itemDayMonthYear.year === selectedDayMonthYear.year
        );
      });

      console.log(filteredItems); // Logs items that match the selected date
    }
  };


  useEffect(() => {
    const controller = new AbortController();
    var isMounted = true

    const getEmployees = async ()=> {
      try {
        let { data: creditTerms, error } = await supabase
        .from('creditTerms')
        .select('*')
      
        isMounted && setEmployees(creditTerms)  
        console.log(creditTerms)      
          
      } catch (error) {
        console.log(error)
      }
    }

    getEmployees();

    return ()=> {
      isMounted = false
      controller.abort();
    }
  
}, [])


  const opener = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloser = () => {
    setAnchorEl(null);
  };


  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button 
              color="inherit"
              id="fade-button"
              aria-controls={opener ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={opener ? 'true' : undefined}
              onClick={handleClick}
            ><Avatar>H</Avatar></Button>
          </Toolbar>
        </AppBar>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={opener}
          onClose={handleCloser}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleCloser}>Profile</MenuItem>
          <MenuItem onClick={handleCloser}>My account</MenuItem>
          <MenuItem onClick={handleCloser}>Logout</MenuItem>
        </Menu>
      </Box>

      <Container fluid sx={{padding: 2}}>
        {/* <Typography variant="h6" component="h1">Search for receipt</Typography> */}
        <Stack direction="row" spacing={3} mb={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
          <Input placeholder="Saerch receipt..." size='lg' variant="outlined" sx={{maxWidth: 400}}/>
        </Stack>
        <Grid container spacing={2} >
          <Grid size={12}>
            <Button variant="contained" onClick={handleOpen}>New Receipt</Button>
          </Grid>
          {/* <Grid size={8}>
          </Grid> */}
        </Grid>
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Receipt
          </Typography>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Customer</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="cash" control={<Radio />} label="Cash" />
              <FormControlLabel value="credit" control={<Radio />} label="Credit" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
}