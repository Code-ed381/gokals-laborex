import Container from '@mui/material/Container';
import {Box, Card, CardActions, CardContent, Button, Typography} from '@mui/material';

const Dispatch = ()=> {
    return(
        <>
            <div class="container ">
                <div class="row">
                    <div class="col-6 p-4">
                        <h5>Add Invoice</h5>
                        <div class="row g-2">
                            <div class="col-md">
                                <div class="form-floating">
                                    <input type="email" class="form-control" id="floatingInputGrid" placeholder="name@example.com" value=""/>
                                    <label for="floatingInputGrid">Invoice Number</label>
                                </div>
                            </div>
                            <div class="col-md">
                                <div class="form-floating">
                                    <input type="email" class="form-control" id="floatingInputGrid" placeholder="name@example.com" value=""/>
                                    <label for="floatingInputGrid">Amount</label>
                                </div>
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary btn-lg mt-3">Submit</button>
                    </div>
                    <div class="col p-4 border-start" style={{height: "90vh"}}>
                        <h5>Today's Invoices</h5>
                        <hr/>
                        <div class="form-floating mb-3">
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
                                    <div class="row p-3 m-2 border border-secondary border-2 rounded">
                                        <div class="col">
                                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                                14TH MAY 2024, 12:00PM
                                            </Typography>
                                        </div>
                                        <div class="col">
                                            <Typography variant="h5" component="div">
                                                GL568789
                                            </Typography>
                                        </div>
                                        <div class="col">
                                            <Typography sx={{ color: 'text.secondary',}}>$ 9,000</Typography>
                                        </div>
                                    </div>
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