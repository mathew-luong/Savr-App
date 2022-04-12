import React from 'react';
//import { useState, useEffect } from 'react'
import Popover from '@mui/material/Popover';
import classes from './SupportChatBox.module.css';

import io from 'socket.io-client'

import { useRef, useState } from 'react';

//connect to socket backend 
const socket = io('http://localhost:3100');

let messages = [
    { incoming: true, text: "Welcome to Savr Support!" },
]

export default function SupportChatBox() {


    //get input for submit
    const messageInput = useRef();
    const [list, setList] = useState(messages);

    function addMessage(msg, ifIncoming) {
        const newList = list.concat({ incoming: ifIncoming, text: msg });
        setList(newList);
    }

    socket.on('incomingMessage', message => {
        addMessage(message, true);
    })

    function submitHandler(event) {
        event.preventDefault();

        const messageText = messageInput.current.value;

        socket.emit('message', messageText);

        addMessage(messageText, false);
        messageInput.current.value = "";
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

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
                    <ul className={classes.chatBox} id="messagesList">
                        {
                            list.map((msg, i) => {
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
                    <form className={classes.chatForm} onSubmit={submitHandler}>
                        <input type="text" className={classes.chatInput} ref={messageInput}></input>
                        <button className={classes.chatSendBtn} >Send</button>
                    </form>
                </div>
            </Popover>
        </div>
    )
}
