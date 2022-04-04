import classes from "./InlineInputs.module.css"

export default function InlineInputs(props){

    return(
        <form className={classes.containerDiv}>
            <label htmlFor="inp" className={classes.label}>{props.label}</label>
            <input id = "inp" className={classes.input}>
            </input>
        </form>
    );

}
