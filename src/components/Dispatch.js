import React, { useState } from 'react';
import Container from '@mui/material/Container';
import {Box, Card, CardActions, CardContent, Button, Typography, Stack} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SendIcon from '@mui/icons-material/Send';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { useSelector, useDispatch } from 'react-redux';
import { addField, deleteField, updateField, submitInvoices } from '../redux/invoicesSlice';


const Dispatch = ()=> {
    // // Initialize the state with an initial field
    // const [fields, setFields] = useState([{ id: 1, invoice_no: "", amount: "" }]);
    // const [idCounter, setIdCounter] = useState(2); // Start with 2 since 1 is already used

    // const [allInvoices, setAllInvoices] = useState([]);

    // // Submit all invoices
    // const handleAddAllInvoices = () => {
    //     const newInvoices = fields.map((field) => ({
    //     invoiceNumber: field.invoice_no,
    //     invoiceAmount: field.amount,
    //     }));

    //     console.log("Submitted Invoices:", newInvoices);

    //     // Add the new invoices to the allInvoices array
    //     setAllInvoices([...allInvoices, ...newInvoices]);

    //     // Clear fields and reset with a new unique ID for the first field
    //     setFields([{ id: idCounter, invoice_no: "", amount: "" }]);
    //     setIdCounter((prev) => prev + 1);

    //     console.table(allInvoices)
    // };

    // // Update a specific field by ID and field name
    // const handleChange = (id, fieldName, value) => {
    //     const updatedFields = fields.map((f) =>
    //     f.id === id ? { ...f, [fieldName]: value } : f
    //     );
    //     setFields(updatedFields);
    // };

    // // Add a new field with a controlled unique ID
    // const handleAddFields = () => {
    //     setFields([...fields, { id: idCounter, invoice_no: "", amount: "" }]);
    //     setIdCounter((prev) => prev + 1); // Increment the counter for the next field
    // };

    // // Remove a specific field by ID
    // const handleDeleteField = (id) => {
    //     const newFields = fields.filter((field) => field.id !== id);
    //     setFields(newFields);
    // };

    const fields = useSelector((state) => state.invoices.fields);
    const allInvoices = useSelector((state) => state.invoices.allInvoices);
    const dispatch = useDispatch();
  
    const handleAddField = () => {
      dispatch(addField());
    };
  
    const handleDeleteField = (id) => {
      dispatch(deleteField(id));
    };
  
    const handleChange = (id, key, value) => {
      dispatch(updateField({ id, key, value }));
    };
  
    const handleSubmit = () => {
      dispatch(submitInvoices());
    };


    return(
        <>
            <div class="container ">
                <div class="row">
                    <div class="col-6 p-4 rounded" style={{color: "#000", backgroundColor: "#cacfcc"}}>
                        <h5>ADD INVOICE(S)</h5>
                        <div class="row g-2">
                            <div class="hstack gap-1 mb-3">
                                <div class="w-100">
                                    <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Select dispatch rider"/>
                                    <datalist id="datalistOptions">
                                        <option value="San Francisco"/>
                                        <option value="New York"/>
                                        <option value="Seattle"/>
                                        <option value="Los Angeles"/>
                                        <option value="Chicago"/>
                                    </datalist>
                                </div>
                            </div>
                            {/* {fields?.map((field)=>
                                <div class="input-group input-group-lg" key={field.id}>
                                    <input 
                                        type="text" 
                                        aria-label="First name" 
                                        placeholder="Invoice Number" 
                                        class="form-control"
                                        value={field.invoice_no}
                                        onChange={(e) => handleChange(field.id, 'invoice_no', e.target.value)}
                                    />
                                    <input 
                                        type="text" 
                                        aria-label="Last name" 
                                        placeholder="Amount" 
                                        class="form-control"
                                        value={field.amount}
                                        onChange={(e) => handleChange(field.id, 'amount', e.target.value)}
                                    />
                                    <button class="btn btn-danger" type="button" onClick={() => handleDeleteField(field.id)}>Delete</button>
                                </div>
                            )} */}
                            {fields.map((field) => (
                                <div className="input-group input-group-lg" key={field.id}>
                                <input
                                    type="text"
                                    placeholder="Invoice Number"
                                    className="form-control"
                                    value={field.invoice_no}
                                    onChange={(e) => handleChange(field.id, 'invoice_no', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Amount"
                                    className="form-control"
                                    value={field.amount}
                                    onChange={(e) => handleChange(field.id, 'amount', e.target.value)}
                                />
                                <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => handleDeleteField(field.id)}
                                >
                                    Delete
                                </button>
                                </div>
                            ))}
                        </div>
                        <Stack direction="row" spacing={2} mt={3}>
                            <Button variant="contained" onClick={handleAddField} color="success" startIcon={<AddBoxIcon/>}>
                                {fields.length > 0 ? 'ADD MORE INVOICE' : 'ADD INVOICE'}
                            </Button>
                            {/* <Button variant="contained" onClick={handleRemoveField} color="error" startIcon={<PlaylistRemoveIcon/>}>Remove fields</Button> */}
                            <Button variant="contained" onClick={handleSubmit} color="primary" endIcon={<SendIcon/>}>
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