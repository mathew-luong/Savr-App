import FormInputs from "./FormInputs";

function FormInputList(props){
    let inputLines = [];
    // let formInputObject = <FormInputs areas={props.numItems}/>
    for(let i = 0; i<props.lines; i++){
        inputLines.push(<FormInputs areas={props.numItems} key={i}/>);
    }

    return(
        <div key={Math.random()}>
            {inputLines.map((formLine)=>{
                return formLine;
            })}
        </div>
    );    
}

export default FormInputList;