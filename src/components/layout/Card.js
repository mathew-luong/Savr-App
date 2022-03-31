import classes from './Cards.module.css';



function Card(props) {
    return (
        <div className={classes.cardContainer}>
            {props.children}
        </div>
    );
}

export default Card;