import FormInputs from "./FormInputs";

function FormInputList(props){
    let inputLines = [];
    let formInputObject = <FormInputs areas={props.numItems} />
    for(let i = 0; i<props.lines; i++){
        inputLines.push(formInputObject);
    }

    return(
        <div>
            {inputLines.map((formLine)=>{
                return formLine;
            })}
        </div>
    );    
}

export default FormInputList;