import classes from "./MobileCardInput.module.css"

function MobileCardInput(props){
    
    return(
        <div className={classes.formContainer}>
        <label className={classes.label} htmlFor={props.entryTitle}>{props.entryTitle}</label><br></br>
        <input className={classes.input} id={props.entryTitle}></input>
        </div>
    );
}

export default MobileCardInput;