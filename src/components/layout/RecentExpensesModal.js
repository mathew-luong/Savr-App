import * as React from 'react';
import Modal from '@mui/material/Modal';

import classes  from './ExpenseModal.module.css';

export default function RecentExpensesModal(props) {
    // Handle states for opening and closing the modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const recentExpenses = [
        {name: "Shopping", category: "Transportation", amount: "500"},
        {name: "Eating", category: "Food", amount: "50"},
        {name: "Laundry", category: "Other", amount: "10"},
        {name: "Shoes", category: "Personal", amount: "100"},
        {name: "Takeout", category: "Food", amount: "50"},
        {name: "Clothing", category: "Personal", amount: "90"}
    ]

    return (
        <div>
            <button onClick={handleOpen} className={classes.recentExpBtn}>Check Recent Expenses</button>
            <Modal open={open} onClose={handleClose}>
                <div className={classes.recentExpModal}>
                    <h3>Your recent expenses</h3>
                    <button onClick={handleClose} className={classes.recentExpCloseBtn}>Close</button>
                    <div className={classes.recentExpModalContainer}>
                        <table className={classes.recentExpModalTable}>
                            <tbody>
                            <tr className={classes.expModalTableRow}>
                            <td className={classes.expModalTableHeader1}>Expense Name</td>
                                <td className={classes.expModalTableHeader1}>Category</td>
                                <td className={classes.expModalTableHeader}>Amount</td>
                            </tr>
                            {
                                recentExpenses.map((expense,i) =>(
                                <tr key={i} className={classes.expModalTableRow}>
                                    <td className={classes.expModalTableCategoryName}>{expense.name}</td>
                                    <td className={classes.expModalTableCategoryCat}>{expense.category}</td>
                                    <td className={classes.expModalTableCategoryAmt}>${expense.amount}</td>
                                </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>
        </div>
    );
}