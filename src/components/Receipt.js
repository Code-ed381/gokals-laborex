import {Container, Stack, Modal, Input, 
    Button, Box, Typography, Radio, RadioGroup,
    FormControlLabel, FormControl, FormLabel, Chip,
    Avatar, AlertTitle, Alert 
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
    const [cash, setCash] = useState(false);
    const [momo, setMomo] = useState(false);
    const [bank, setBank] = useState(false);
    const [searchType, setSearchType] = useState('');
    const [customer, setCustomer] = useState('old');
    const [selectedDate, setSelectedDate] = useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCashToggle = ()=> {
        setCash(prevState => !prevState);
    }

    const handleMomoToggle = ()=> {
        setMomo(prevState => !prevState);
    }

    const handleBankToggle = ()=> {
        setBank(prevState => !prevState);
    }

    // Helper function to extract the day, month, and year from a date
    const getDayMonthYear = (date) => ({
        day: date.getUTCDate(),
        month: date.getUTCMonth() + 1, // Months are zero-indexed, so add 1
        year: date.getUTCFullYear(),
    });

    // function to filter date
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
                    <Container fluid sx={{padding: 2}} >
                        <div>

                        <Chip sx={{fontSize: 22, padding: 3, width: '100%'}} avatar={<Avatar>M</Avatar>} color="success" label="Receipts" />
                        </div>
                        <hr/>
                        {/* Search method radio buttons */}
                        <div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" onClick={(e)=> setSearchType(e.target.value)} name="inlineRadioOptions" id="inlineRadio1" value="keyword" />
                                <label class="form-check-label" for="inlineRadio1"><h6>Search by keyword</h6></label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" onClick={(e)=> setSearchType(e.target.value)} name="inlineRadioOptions" id="inlineRadio2" value="date" />
                                <label class="form-check-label" for="inlineRadio2"><h6>Search by date</h6></label>
                            </div>
                        </div>
                        <hr/>

                        {searchType === 'keyword' ? (
                            <div class="form-floating mb-3 mt-3">
                                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                                <label for="floatingInput">Type keyword</label>
                            </div>
                        ) : searchType === 'date' ? (
                            <div class='mt-3'>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        fullWidth
                                    />
                                </LocalizationProvider>
                            </div>
                        ) : ('')}
                        

                        <div 
                            class="mt-4"
                            style={{ 
                                overflowY: 'scroll', 
                                height: 580,
                                scrollbarWidth: '5px',
                                scrollbarColor: '#fff #fff',
                            }}
                        >
                            <div class="accordion accordion-flush" id="accordionFlushExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        Accordion Item #1
                                    </button>
                                    </h2>
                                    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        Accordion Item #2
                                    </button>
                                    </h2>
                                    <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        Accordion Item #3
                                    </button>
                                    </h2>
                                    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        Accordion Item #3
                                    </button>
                                    </h2>
                                    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        Accordion Item #3
                                    </button>
                                    </h2>
                                    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        Accordion Item #3
                                    </button>
                                    </h2>
                                    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        Accordion Item #3
                                    </button>
                                    </h2>
                                    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        Accordion Item #3
                                    </button>
                                    </h2>
                                    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        Accordion Item #3
                                    </button>
                                    </h2>
                                    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Container>
                </Grid>
                <Grid item size={6}>
                    <Container fluid sx={{padding: 2}} class="shadow p-3 mb-5 bg-body-tertiary rounded">
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
                                                {/* <Alert severity="success" variant="filled" >
                                                    <AlertTitle>Success</AlertTitle>
                                                    This is a success Alert with an encouraging title.
                                                </Alert> */}
                                                {/* <Typography variant="h5">Customer Details</Typography> */}
                                                <FormControl>
                                                <FormLabel id="demo-row-radio-buttons-group-label">Customer Details</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="row-radio-buttons-group"
                                                    >
                                                        <FormControlLabel value="old" control={<Radio />} label="Legacy Customer" />
                                                        <FormControlLabel value="new" control={<Radio />} label="First-Time Customer" />
                                                    </RadioGroup>
                                                </FormControl>
                                                {/* <label for="exampleDataList" class="form-label">Datalist example</label> */}
                                                <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..."/>
                                                <datalist id="datalistOptions">
                                                    <option value="San Francisco"/>
                                                    <option value="New York"/>
                                                    <option value="Seattle"/>
                                                    <option value="Los Angeles"/>
                                                    <option value="Chicago"/>
                                                </datalist>
                                                <div class="row g-3">
                                                    <div class="col">
                                                        <input type="text" class="form-control" placeholder="Customer name" aria-label="Customer name"/>
                                                    </div>
                                                    <div class="col">
                                                        <input type="text" class="form-control" placeholder="Email" aria-label="Email"/>
                                                    </div>
                                                </div>
                                                {/* Checkboxes for payment methods */}
                                                {/* <Typography variant="h5" mt={4}></Typography> */}
                                                <div class="mt-4" style={{fontSize: 20}}>
                                                    <FormLabel id="demo-row-radio-buttons-group-label" mt={4}>Payment methods</FormLabel>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" onChange={handleCashToggle} id="inlineCheckbox2" value="option2"/>
                                                        <label class="form-check-label" for="inlineRadio1">Cash</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" onChange={handleMomoToggle} id="inlineCheckbox3" value="option3"/>
                                                        <label class="form-check-label" for="inlineRadio2">Momo</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" onChange={handleBankToggle} id="inlineCheckbox1" value="option1"/>
                                                        <label class="form-check-label" for="inlineRadio1">Bank</label>
                                                    </div>
                                                </div>

                                                <div>
                                                    {/* Cash fields */}
                                                    {cash ? (
                                                        <div class="row g-2 mb-3">
                                                            <div class="col-md">
                                                                <div class="form-floating">
                                                                <input type="email" class="form-control" id="floatingInputGrid" placeholder="name@example.com" value=""/>
                                                                <label for="floatingInputGrid">Cash Amount</label>
                                                                </div>
                                                            </div>
                                                            <div class="col-md">
                                                                <div class="form-floating">
                                                                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                                                                    <label for="floatingPassword">Cash Receipt ID</label>
                                                                </div>
                                                            </div>
                                                        </div>     
                                                    ) : ('')}


                                                    {/* Momo fields */}
                                                    {momo ? (
                                                        <div class="row g-2 mb-3">
                                                            <div class="col-md">
                                                                <div class="form-floating">
                                                                <input type="email" class="form-control" id="floatingInputGrid" placeholder="name@example.com" />
                                                                <label for="floatingInputGrid">Momo Amount</label>
                                                                </div>
                                                            </div>
                                                            <div class="col-md">
                                                                <div class="form-floating">
                                                                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                                                                    <label for="floatingPassword">Momo Transaction ID</label>
                                                                </div>
                                                            </div>
                                                        </div>   
                                                    ) : ('')}

                                                    {/* Bank fields */}
                                                    {bank ? (
                                                        <div class="row g-2 mb-3">
                                                            <div class="col-md">
                                                                <div class="form-floating">
                                                                <input type="email" class="form-control" id="floatingInputGrid" placeholder="name@example.com" value=""/>
                                                                <label for="floatingInputGrid">Bank Amount</label>
                                                                </div>
                                                            </div>
                                                            <div class="col-md">
                                                                <div class="form-floating">
                                                                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                                                                    <label for="floatingPassword">Bank Transaction ID</label>
                                                                </div>
                                                            </div>
                                                        </div>                                                  
                                                    ) : ('')}

                                                    {bank || momo || cash ? (
                                                        <button type="button" class="btn btn-primary">Submit</button>
                                                    ) : ('')}
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
                        {/* <Typography variant='h4'>Receipt</Typography> */}
                        <Chip sx={{fontSize: 22, padding: 3, width: '100%'}} avatar={<Avatar>M</Avatar>} color="warning" label="Pending Approvals" />
                        <div 
                            class="mt-4"
                            style={{ 
                                overflowY: 'scroll', 
                                height: 580,
                                scrollbarWidth: '5px',
                                scrollbarColor: '#fff #fff',
                            }}
                        >
                            <div class="accordion accordion-flush" id="accordionFlushExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        Accordion Item #1
                                    </button>
                                    </h2>
                                    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        Accordion Item #2
                                    </button>
                                    </h2>
                                    <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        Accordion Item #3
                                    </button>
                                    </h2>
                                    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        Accordion Item #3
                                    </button>
                                    </h2>
                                    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        Accordion Item #3
                                    </button>
                                    </h2>
                                    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        Accordion Item #3
                                    </button>
                                    </h2>
                                    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        Accordion Item #3
                                    </button>
                                    </h2>
                                    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        Accordion Item #3
                                    </button>
                                    </h2>
                                    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                                    </div>
                                </div>
                                <div class="accordion-item bg-warning">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        Accordion Item #3
                                    </button>
                                    </h2>
                                    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
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