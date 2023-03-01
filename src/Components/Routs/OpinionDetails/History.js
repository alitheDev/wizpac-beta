import React, { useEffect, useState } from "react";
import GetData from "../../../API/GetData";
import HistoryTable from "./HistoryTable";

export default function history(props) {
  const [historyData, sethistoryData] = useState([]);

  useEffect(() => {
    sethistoryData(props.historyData);
  }, [props.historyData]);


  return (
    <HistoryTable
      HistoryTable={historyData}
      open={props.open}
      screenWidth={props.screenWidth}
    />
  );
}
