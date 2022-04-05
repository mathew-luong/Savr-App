import classes from './Cards.module.css';



function Card(props) {
    return (
        <div className={classes.cardContainer} style={{height:`${props.height}`}}>
            {props.children}
        </div>
    );
}

export default Card;