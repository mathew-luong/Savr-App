import React from 'react';
import Popover from '@mui/material/Popover';
import classes from './SupportChatBox.module.css';


export default function SupportChatBox() {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    // Array of messages
    // Incoming bool indicates whether this user is the sender or not
    let messages = [
            {incoming: false, text: "Hey i need some help bro"},
            {incoming: true, text: "Np man whats your problem"},
            {incoming: false, text: "Idk how to use this"},
            {incoming: true, text: "Damn me too gl then"},
            {incoming: false, text: "Oh wow "},
            {incoming: false, text: "hey you still there?"}
        ]

    return (
        <div>
            <button onClick={handleClick} className={classes.chatBtn}>Start a Live Chat</button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
            <div className={classes.chatContainer}>
                <div className={classes.chatHeader}>
                    Welcome<br></br>
                    Our team is currently available for any questions.
                </div>
                <ul className={classes.chatBox}>
                    {
                        messages.map((msg,i) => {
                            return (
                                <li key={i} className={msg.incoming ? classes.messageLi : classes.messageSenderLi}>
                                    <span className={msg.incoming ? classes.messageText : classes.messageSenderText}>
                                        {msg.text}
                                    </span>
                                </li>
                            );
                        })
                    }
                </ul>
                <form className={classes.chatForm}>
                    <input type="text" className={classes.chatInput}></input>
                    <button className={classes.chatSendBtn} type="button">Send</button>
                </form>
            </div>
            </Popover>
        </div>
    )
}
