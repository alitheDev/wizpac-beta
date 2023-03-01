import React, { useEffect, useState } from "react";
import { Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import ClientInfo from "./ClientInfo";
import OpinionTableOne from "./OpinionTableOne";
import OpinionGroupTable from "./OpinionGroupTable";
import { Skeleton } from "@mui/material";
import Typewriter from "typewriter-effect";
import GetData from "../../../API/GetData";
import SectorDataCard from "./SectorDataCard";
import SadFace from "../../Atoms/SadFace";

export default function Details(props) {
  const [opinionsData, setopinionsData] = useState([]);
  const [DetailsTblOne, setDetailsTblOne] = useState([]);
  const [DetailsTblTwo, setDetailsTblTwo] = useState([]);
  const [sectorsData, setsectorsData] = useState([]);
  const [methodologiesData, setmethodologiesData] = useState([]);
  const [title, settitle] = useState("");
  const [pacraDailyNews, setpacraDailyNews] = useState([]);
  const [sectorDailyNews, setsectorDailyNews] = useState([]);
  const [sendingReq, setsendingReq] = useState([]);

  useEffect(() => {
    setopinionsData(props.opinionsData);
    setDetailsTblOne(props.DetailsTblOne);
    setDetailsTblTwo(props.DetailsGroupTable);
  }, [props.DetailsTblOne, props.opinionsData, props.DetailsGroupTable]);

  useEffect(() => {
    const clientId = props.clientId;
    getTabsData(clientId);
  }, [props.clientId]);

  const getTabsData = async (params) => {
    setsendingReq(true);
    const res = GetData.TabsDetailsApi(params);
    const resp = await res;
    const optitle = resp.data[0];
    const sector = resp.data[1];
    const methodology = resp.data[2];
    const pacraDaily = resp.data[3];
    const sectorDaily = resp.data[4];
    setsendingReq(false);
    setsectorsData(sector);
    setmethodologiesData(methodology);
    setpacraDailyNews(pacraDaily);
    setsectorDailyNews(sectorDaily);
    settitle(optitle);
  };

  // const getTitle = async (params) => {
  //   setsendingReq(true);
  //   const res = GetData.OpinionTitle(params);
  //   const resp = await res;
  //   setsendingReq(false);
  //   if (resp == null) {
  //     settitle(null);
  //   } else {
  //     settitle(resp.name);
  //   }
  // };
  return (
    <div
      style={{ height: `calc(100vh - 150px)`, overflow: "scroll" }}
      className="col-md-10 mx-auto"
    >
      <div className="details_card mt-2">
        {/* Edit Button */}
        {/* <div className="d-md-inline-flex w-100">
          <button
            className="px-2 py-1 ms-auto btn_theme theme_bg border_radius"
            style={{ position: "absolute", top: "107px", right: "22px" }}
          >
            <Link to="/ClientInfo" className="text_grey">
              Client info <Edit />{" "}
            </Link>
          </button>
        </div> */}
        {opinionsData ? (
          <ClientInfo opinionsData={opinionsData} />
        ) : (
          <h4 className="pt-5 mb-5">No Record Found</h4>
          )}
      </div>
      <div className="details_card my-3 p-0">
        {DetailsTblOne ? (
          <OpinionTableOne
            DetailsTblOne={DetailsTblOne}
            screenWidth={props.screenWidth}
          />
        ) : (
          <h4 className="pt-5 mb-5">"No Record Found"</h4>
        )}
      </div>
      <div className="details_card my-3 p-0">
        <h3 className="fw-bold theme_text p-2">
          {props.groupTitle && (
            <Typewriter
              onInit={(typewriter) => {
                typewriter.typeString(props.groupTitle).start();
              }}
            />
          )}
        </h3>
        <OpinionGroupTable
          OpinionGroupTable={DetailsTblTwo}
          screenWidth={props.screenWidth}
        />
      </div>
      <div className="details_card my-3 p-0">
        <SectorDataCard
          sectorsData={sectorsData}
          methodologiesData={methodologiesData}
          pacraDailyNews={pacraDailyNews}
          sectorDailyNews={sectorDailyNews}
          title={title}
          screenWidth={props.screenWidth}
        />
      </div>
    </div>
  );
}
