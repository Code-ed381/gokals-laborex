import React, { useState } from 'react';
import Container from '@mui/material/Container';
import {Box, Card, CardActions, CardContent, Button, Typography, Stack} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SendIcon from '@mui/icons-material/Send';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';


const Dispatch = ()=> {
    // Initialize the state with an initial field
    const [fields, setFields] = useState([
        { id: 1, invoice_no: '', amount: '' }
    ]);

    const [allInvoices, setAllInvoices] = useState([]);

    const handleAddAllInvoices = () => {
        // Create a new array of invoices, copying the current fields
        const newInvoices = fields.map(field => ({
          invoiceNumber: field.invoice_no,
          invoiceAmount: field.amount
        }));
    
        // Add the new invoices to the allInvoices array
        setAllInvoices([...allInvoices, ...newInvoices]);
    
        // Clear the current fields
        setFields([{ id: 1, invoice_no: '', amount: '' }]);
    };

    // Handle changes to input field values
    const handleChange = (id, field, value) => {
        const newFields = fields.map(f => {
          if (f.id === id) {
            return { ...f, [field]: value };
          }
          return f;
        });
        setFields(newFields); 
    };

    // Add a new field to the state
    const handleAddFields = () => {
        const newFieldId = fields.length + 1;
        setFields([...fields, { id: newFieldId, invoice_no: '', amount: '' }]);
    };

    // Remove the last field from the state
    const handleRemoveField = () => {
        if (fields.length > 1) {
        const newFields = fields.slice(0, -1);
        setFields(newFields);
        }
    };


    return(
        <>
            <div class="container ">
                <div class="row">
                    <div class="col-6 p-4 rounded" style={{color: "#000", backgroundColor: "#cacfcc"}}>
                        <h5>Add Invoice</h5>
                        <div class="row g-2">
                            <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Select dispatch rider..."/>
                            <datalist id="datalistOptions">
                                <option value="San Francisco"/>
                                <option value="New York"/>
                                <option value="Seattle"/>
                                <option value="Los Angeles"/>
                                <option value="Chicago"/>
                            </datalist>
                            <hr/>
                            {fields?.map((field)=>
                                <div key={field.id}>
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <input 
                                                type="email" 
                                                class="form-control" 
                                                id="floatingInputGrid" 
                                                placeholder="name@example.com" 
                                                value={field.invoice_no}
                                                onChange={(e) => handleChange(field.id, 'invoice_no', e.target.value)}
                                            />
                                            <label for="floatingInputGrid">Invoice Number</label>
                                        </div>
                                    </div>
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <input 
                                                type="email" 
                                                class="form-control" 
                                                id="floatingInputGrid" 
                                                placeholder="name@example.com" 
                                                value={field.amount}
                                                onChange={(e) => handleChange(field.id, 'amount', e.target.value)}
                                            />
                                            <label for="floatingInputGrid">Amount</label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Stack direction="row" spacing={2} mt={3}>
                            <Button variant="contained" onClick={handleAddFields} color="success" startIcon={<AddBoxIcon/>}>
                                Add more fields
                            </Button>
                            <Button variant="contained" onClick={handleRemoveField} color="error" startIcon={<PlaylistRemoveIcon/>}>Remove fields</Button>
                            <Button variant="contained" onClick={handleAddAllInvoices} color="primary" endIcon={<SendIcon/>}>
                                Submit
                            </Button>
                        </Stack>
                    </div>
                    <div class="col p-4 border-start" style={{height: "90vh"}}>
                        <h5>Today's Invoices</h5>
                        <hr/>
                        <div class="form-floating mb-3 text-dark">
                            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                            <label for="floatingInput">Search Invoice</label>

                            <div
                                style={{ 
                                    overflowY: 'scroll', 
                                    height: "70vh",
                                    scrollbarWidth: '5px',
                                    scrollbarColor: '#fff #fff',
                                }}
                                class=" mt-3"
                            >
                                {/* <Card >
                                    <CardContent class="bg-primary">
                                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                        Word of the Day
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                        benevolent
                                        </Typography>
                                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
                                        
                                    </CardContent>
                                </Card> */}

                                <div class="container text-center">
                                    {allInvoices?.map((invoice)=>
                                        <div class="row p-3 m-2 bg-dark border border-light border-2 rounded">
                                            <div class="col">
                                                <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                                                    12:00PM
                                                </Typography>
                                            </div>
                                            <div class="col">
                                                <Typography variant="h5" sx={{ color: 'text.secondary' }} component="div">
                                                    {invoice.invoiceNumber}
                                                </Typography>
                                            </div>
                                            <div class="col">
                                                <Typography variant="h6" sx={{ color: 'text.secondary',}}>$ {invoice.invoiceAmount}</Typography>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dispatch;