import {Container, Stack, Modal, Input, 
    Button, Box, Typography, Radio, RadioGroup,
    FormControlLabel, FormControl, FormLabel
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from "react";

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

const Receipt = ()=> {
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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


    return(
        <>
            <Grid container spacing={2}>
                <Grid item size={3}>
                    <Container fluid sx={{padding: 2}}>
                        <Typography variant='h4'>History</Typography>
                    </Container>
                </Grid>
                <Grid item size={6}>
                    <Container fluid sx={{padding: 2}}>
                        {/* <Typography variant="h6" component="h1">Search for receipt</Typography> */}
                        <Typography variant='h4'>Today</Typography>
                        {/* <Stack direction="row" spacing={3} mb={3}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                value={selectedDate}
                                onChange={handleDateChange}
                                />
                            </LocalizationProvider>
                            <Input placeholder="Saerch receipt..." size='lg' variant="outlined" sx={{maxWidth: 400}}/>
                        </Stack> */}
                        <Grid container spacing={2} >
                            <Grid size={12}>

                                <div class="accordion" id="accordionExample">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Add New Receipt
                                        </button>
                                        </h2>
                                        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                {/* <Button variant="contained" onClick={handleOpen}>New Receipt</Button> */}
                                                <div class="text-center">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                                                        <label class="form-check-label" for="inlineRadio1">All</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                                                        <label class="form-check-label" for="inlineRadio1">Cash</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                                                        <label class="form-check-label" for="inlineRadio2">Momo</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                                                        <label class="form-check-label" for="inlineRadio3">Bank</label>
                                                    </div>
                                                </div>

                                                <div>
                                                <Stack direction="row" spacing={2}>
                                                    <div class="form-floating mb-3">
                                                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                                                        <label for="floatingInput">Email address</label>
                                                    </div>
                                                    <div class="form-floating">
                                                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                                                        <label for="floatingPassword">Password</label>
                                                    </div>
                                                    <div class="form-floating">
                                                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                                                        <label for="floatingPassword">Password</label>
                                                    </div>
                                                    <div class="form-floating">
                                                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                                                        <label for="floatingPassword">Password</label>
                                                    </div>
                                                </Stack>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div class="accordion-item">
                                        <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Accordion Item #2
                                        </button>
                                        </h2>
                                        <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                        </div>
                                    </div>
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Accordion Item #3
                                        </button>
                                        </h2>
                                        <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                        </div>
                                    </div> */}
                                </div>
                            </Grid>
                            {/* <Grid size={8}>
                            </Grid> */}
                        </Grid>
                    </Container>
                </Grid>
                <Grid item size={3}>
                    <Container fluid sx={{padding: 2}}>
                        <Typography variant='h4'>Receipt</Typography>
                    </Container>
                </Grid>
            </Grid>
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
    )
}

export default Receipt;