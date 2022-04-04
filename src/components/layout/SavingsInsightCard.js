
function SavingsInsightCard(props) {
  let firstLine = props.firstLine;
  let insightFigure = props.insightFigure;
  let lastLine = props.lastLine;
  let finalLine = null;

  if (typeof lastLine != undefined) {
    finalLine = <p style={{ fontsize: "14", color: "#ACACAC" }}>{lastLine}</p>;
  }

  return (
    <div
      style={{
        borderRadius: "25px",
        backgroundColor: "#FFFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height:"7rem",
        marginTop: "1rem"
      }}
    >
      <p style={{color: "#ACACAC", marginBottom: "4px", marginTop:"4px"}}>{firstLine}</p>
      <h4 style={{marginBottom:"4px"}}>{insightFigure}</h4>
      {finalLine}
    </div>
  );
}

export default SavingsInsightCard;
