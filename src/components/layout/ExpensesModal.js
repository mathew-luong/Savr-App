import * as React from 'react';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { updateExpPieChart } from '../Charts';
import { expPieTargetData, expPieChartLabels } from '../../pages/ExpensesPage';
import classes  from './ExpenseModal.module.css';
import { useRef } from 'react';

export default function ExpensesModal(props) {
    // Handle states for opening and closing the modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [category, setCategory] = React.useState("");

    // Reference to input expense amount 
    let inputValue = useRef("");

    // When the user selects an expense category udpate state
    const handleSelection = (event) => {
      setCategory(event.target.value);
    };

    // Submit button handler for changing the chosen target expense
    function changeTargetExp() {
        console.log(expPieTargetData);
        console.log("AFTER" + expPieTargetData);
        if(inputValue.current.value !== "" && category !== "") {
            console.log("SELECTED STATE: " + category + " AMOUNT: " + inputValue.current.value);
            updateExpPieChart(expPieTargetData, category, inputValue.current.value);
        }
    }


    return (
        <div>
            <button onClick={handleOpen} className="expManageBtn">Change Targets</button>
            <Modal open={open} onClose={handleClose}>
                <div className={classes.expModal}>
                    <h3>Manage your expenses</h3>
                    <h6 className="cardSubHeader">Choose a category and change the target expense</h6>
                    <div className={classes.expModalContainer}>
                        <table className={classes.expModalTable}>
                            <tbody>
                            <tr className={classes.expModalTableRow}>
                                <td className={classes.expModalTableHeader1}>Expense Category</td>
                                <td className={classes.expModalTableHeader}>Amount</td>
                            </tr>
                            {
                                expPieTargetData.map((numList,i) =>(
                                <tr key={i} className={classes.expModalTableRow}>
                                    <td className={classes.expModalTableCategory}>{expPieChartLabels[i]}</td>
                                    <td>${numList}</td>
                                </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        <div className={classes.expModalFormSection}>
                            <label htmlFor="expenseAmount" className={classes.expModalFormLabel}>Expense Target Amount</label>
                            <input id="expenseAmount" ref={inputValue} type="number" placeholder="Enter an amount $" className={classes.expModalInput}></input>
                            <FormControl className={classes.expModalDropdown}>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="Category"
                                onChange={handleSelection}
                                >
                                <MenuItem value={"Transportation"}>Transportation</MenuItem>
                                <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                                <MenuItem value={"Food"}>Food</MenuItem>
                                <MenuItem value={"Rent"}>Rent</MenuItem>
                                <MenuItem value={"Gas"}>Gas</MenuItem>
                                <MenuItem value={"Travel"}>Travel</MenuItem>
                                <MenuItem value={"Groceries"}>Groceries</MenuItem>
                                <MenuItem value={"Household"}>Household</MenuItem>
                                <MenuItem value={"Utilities"}>Utilities</MenuItem>
                                <MenuItem value={"Education"}>Education</MenuItem>
                                <MenuItem value={"Family"}>Family</MenuItem>
                                <MenuItem value={"Bills"}>Bills</MenuItem>
                                <MenuItem value={"Personal"}>Personal</MenuItem>
                                <MenuItem value={"Other"}>Other</MenuItem>
                                </Select>
                            </FormControl>
                            <button onClick={changeTargetExp} className={classes.expModalSubmitBtn}>Submit</button> 
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}