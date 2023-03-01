import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function ClientInfo(props) {
  const [Ceo, setCeo] = useState("");
  const [LiasonOne, setLiasonOne] = useState("");
  const [LiasonTwo, setLiasonTwo] = useState("");

  useEffect(() => {
    if (props.opinionsData[0]) {
      const LiasonTwo =
        props.opinionsData[0].liaison_two &&
        props.opinionsData[0].liaison_two.split(",");
      setLiasonTwo(LiasonTwo);
      const LiasonOne =
        props.opinionsData[0].liaison_one &&
        props.opinionsData[0].liaison_one.split(",");
      setLiasonOne(LiasonOne);
      const Ceo =
        props.opinionsData[0].ceo && props.opinionsData[0].ceo.split(",");
      setCeo(Ceo);
      // (Ceo[5].includes(!'000'),'CEOO');
    }
  }, [props.opinionsData]);

  return (
    <div className="row container">
      <div className="col-md-4" style={{ borderRight: "2px solid #000078" }}>
        <div className="container">
          <table className="text-white fw-bold ms-3 w-100">
            <tr className="d-inline-flex w-100 text-center">
              <td className="theme_text col-4 text-start">Analyst :</td>
              <td className="theme_text px-2 text-start">
                {props.opinionsData[0] && props.opinionsData[0].analyst_name}
              </td>
            </tr>
            <tr className="d-inline-flex w-100 text-center">
              <td className="theme_text col-4 text-start">Team :</td>
              <td className="theme_text px-2 text-start">
                {props.opinionsData[0] && props.opinionsData[0].lead_name}
              </td>
            </tr>
            <tr className="d-inline-flex w-100 text-center">
              <td className="theme_text col-4 text-start">Chief Ratings :</td>
              <td className="theme_text px-2 text-start">
                {props.opinionsData[0] && props.opinionsData[0].manager_name}
              </td>
            </tr>
            {/* <tr className="d-inline-flex w-100 text-center">
              <td className="theme_text col-4 text-start">
                Director Finance :
              </td>
              <td className="theme_text px-2 text-start">Mr. Kamran Saleem</td>
            </tr> */}
          </table>
        </div>
      </div>
      <div className="col-md-8 px-md-4 py-md-2">
        <table className="text-white fw-bold ms-3 w-100">
          <tr className="d-inline-flex w-100 text-center">
            <td className="theme_text col-4 text-start">
              {Ceo == null ? "President & CEO" : Ceo[3]}
            </td>
            {Ceo == null ? (
              <td className="theme_text px-2 text-start">-----</td>
            ) : (
              <td className="theme_text pe-2 text-start w-100 text-break">
                {Ceo[0]} {Ceo[1]} {Ceo[2]} |{" "}
                {Ceo[4] && Ceo[4].includes("00-0000") ? "" : Ceo[4]} |{" "}
                {Ceo[5] && Ceo[5].includes("00-0000") ? "" : Ceo[5]} | {Ceo[6]}
              </td>
            )}
          </tr>
          <tr className="d-inline-flex w-100 text-center">
            <td className="theme_text col-4 text-start">
              {LiasonOne == null ? "Unit Head-Policies & Procedures" : LiasonOne[3]}
            </td>
            {LiasonOne == null ? (
              <td className="theme_text px-2 text-start">-----</td>
            ) : (
              <td className="theme_text pe-2 text-start w-100 text-break">
                {LiasonOne[0]} {LiasonOne[1]} {LiasonOne[2]} |{" "}
                {LiasonOne[4] && LiasonOne[4].includes("00-0000")
                  ? ""
                  : LiasonOne[4]}{" "}
                |{" "}
                {LiasonOne[5] && LiasonOne[5].includes("00-0000")
                  ? ""
                  : LiasonOne[5]}{" "}
                | {LiasonOne[6]}
              </td>
            )}
          </tr>
          <tr className="d-inline-flex w-100 text-center">
            <td className="theme_text col-4 text-start">
              {LiasonTwo == null ? "Chief Financial Officer" : LiasonTwo[3]}
            </td>
            {LiasonTwo == null ? (
              <td className="theme_text px-2 text-start">-----</td>
            ) : (
              <td className="theme_text pe-2 text-start w-100 text-break">
                {LiasonTwo[0]} {LiasonTwo[1]} {LiasonTwo[2]} |{" "}
                {LiasonTwo[4] && LiasonTwo[4].includes("00-0000")
                  ? ""
                  : LiasonTwo[4]}{" "}
                |{" "}
                {LiasonTwo[5] && LiasonTwo[5].includes("00-0000")
                  ? ""
                  : LiasonTwo[5]}{" "}
                | {LiasonTwo[6]}
              </td>
            )}
          </tr>
          <tr className="d-inline-flex w-100 text-center">
            <td className="theme_text col-4 text-start">Address</td>
            <td className="theme_text px-2 text-start">
              {props.opinionsData[0] && props.opinionsData[0].address}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}
