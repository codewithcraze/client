import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Select, MenuItem, InputLabel, FormControl, OutlinedInput, Divider, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { sendDialData } from '../store/actions/dial.action'; 
import CountryCodeSelector from "../components/CountryCodeSelector";

const DialNumber = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.api.loading);
    const data = useSelector((state) => state.api.data);
    const [countryCode, setCountryCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [category, setCategory] = useState('direct-call');
    const [openDialog, setOpenDialog] = useState(false);
    const [messageText, setMessageText] = useState('');
    
  

    console.log(data);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            countryCode,
            phoneNumber,
            category,
            messageText: category === 'message' ? messageText : undefined,
        };

        dispatch(sendDialData(data)).then(() => {
            setCountryCode('');
            setPhoneNumber('');
            setCategory('direct-call');
            setMessageText('');
            setOpenDialog(false);
        });
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        if (e.target.value === 'message') {
            setOpenDialog(true);
        }
    };

    return (
        <>
            <h4 className='text-center mt-3'>Calling System</h4>
            <Divider className="mb-5" style={{ backgroundColor: 'black' }} />
            <Container>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-lg-3 mb-3 col-md-3">
                            <CountryCodeSelector value={countryCode} onChange={(e) => setCountryCode(e.target.value)} />
                        </div>
                        <div className="col-lg-4 mb-3 col-md-5">
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Enter User Phone Number"
                                required
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                InputLabelProps={{
                                    shrink: phoneNumber.length > 0,
                                }}
                            />
                        </div>
                        <div className='col-lg-3 mb-3 col-md-3'>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="category-select-label">Select Category</InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    value={category}
                                    onChange={handleCategoryChange}
                                    required
                                    input={<OutlinedInput label="Select Category" />}
                                >
                                    <MenuItem value="message">Message</MenuItem>
                                    <MenuItem value="pre-recorded">Pre-recorded</MenuItem>
                                    <MenuItem value="direct-call">Direct Call</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-lg-2 mb-3 col-md-2">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                required
                                fullWidth
                                style={{ height: "100%" }}
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : category}
                            </Button>
                        </div>
                    </div>
                </form>

                <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>Enter Your Message For Sending User</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Message"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            placeholder="Type your message here..."
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => {
                            setOpenDialog(false);
                            handleSubmit(new Event('submit'));
                        }} color="primary" variant="contained">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
};

export default DialNumber;
