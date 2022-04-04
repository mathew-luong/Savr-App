import classes from "./FormInputs.module.css"

function FormInputs(props){

    let textAreas = [];
    let areaDiv;
    let textAreaWidth = (1/props.areas)*100-1;
    let textAreaWidthString = textAreaWidth + '%'

    for (let i = 0; i< props.areas;i++){
        areaDiv = <textarea style={{width:textAreaWidthString}} className={classes.textAreas} key={i}></textarea>
        textAreas.push(areaDiv);
    }  
    return(
        <div key={Math.random()}>
            <form className={classes.formFlex} key={Math.random()}>
                {textAreas}
            </form>
        </div>

    );
}

export default FormInputs;