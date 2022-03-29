import classes from './Cards.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';

// Below function is taken from:
// https://css-tricks.com/snippets/javascript/lighten-darken-color/
// By: Chris Coyier
function LightenDarkenColor(col, amt) {
    var usePound = false;
  
    if (col[0] === "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    let num = parseInt(col,16);
    let r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    let b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    let g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

function DBCardSm(props) {
    let icon;
    let textColor;
    let iconColor = LightenDarkenColor(props.color,-80);

    // If trending up, set color and icons to up and green
    if(props.trendingUp) {
        icon = faArrowTrendUp;
        textColor = "#56D57C";
    }
    // If trending down, set color and icons to down and red
    else {
        icon = faArrowTrendDown;
        textColor = "#FF2828";
    }

    return (
        <div className={classes.smCardContainer}>
            <div>
                <FontAwesomeIcon icon={icon} width="2.5rem" className={classes.cardIcon} style={{backgroundColor: props.color, color:iconColor}}/>
            </div>
            <div className={classes.smCardContent}>
                <p className={classes.contentHeader}>{props.header}</p>
                <h4 className={classes.statTime}>${props.value}</h4>
                <p><span style={{color: textColor}} className={classes.statTime}>{props.stat}</span>{props.time}</p>
            </div>
        </div>
    );
}

export default DBCardSm;