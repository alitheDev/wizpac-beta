import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Zoom from "react-reveal/Zoom";
import SadFace from "../../Atoms/SadFace";

export default function Card(props) {
  function FY_Calculate(params) {
    if (params == null) {
      return "-";
    } else {
      const date = new Date(params);
      const getmonth = date.getMonth();
      const month = getmonth + 1;
      const getyear = date.getFullYear();
      const yeartostring = getyear.toString();
      const year = Number(yeartostring[2] + yeartostring[3]);
      // if (year < 10) {
      //   const year = function n(year, len = 2) {
      //     return `${year}`.padStart(len, "0");
      //   };
      // } else return year;

      if (month >= 1 && month < 7) {
        if (year < 10) return `FY-0${year}`;
        else return `FY-${year}`;
      }
      if (month >= 7) {
        if (year + 1 < 10) return `FY-0${year + 1}`;
        else return `FY-${year + 1}`;
      }
    }
  }

  function dateFormat(params) {
    if (params == null || params === "NA" || params == "1970-01-01") return "-";
    else {
      const date = new Date(params);
      const yyyy = date.getFullYear();
      const yy = yyyy.toString();
      const y = yy.slice(2, 4);
      let mm = date.toLocaleString("default", { month: "short" });
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      return dd + "-" + mm + "-" + y;
    }
  }

  // console.log(,'newdata')
  const opinionsData = props.each;
  return (
    <Zoom left>
      {opinionsData ? (
        <Accordion className="card_expandable">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="text_grey" />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="card_expand"
          >
            <div className="d-inline-flex w-100 p-2">
              <div>
                <p className="fw-bold mb-0">
                  {FY_Calculate(opinionsData.notification_date)}
                </p>
                <small>{opinionsData.action_type}</small>
              </div>
              <div className="ms-auto">
                <p className="fw-bold mb-0">Initiation Date</p>
                <small>{dateFormat(opinionsData.rating_initiation_date)}</small>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="card_expanded">
            <table className="table table_style">
              <thead className="theme_text">
                <tr>
                  <th scope="col">File type</th>
                  <th scope="col">Date/Links</th>
                </tr>
              </thead>
              <tbody className="">
                {/* Information */}
                {opinionsData.task.map((x, y) => {
                  return (
                    <div style={{ width: "120%" }}>
                      {x.title === "Information" ? (
                        <tr
                          className="accordion-button collapsed fw-bold theme_text w-100 mx-auto"
                          type="button"
                          colspan="3"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${x.title}${opinionsData.id}`}
                          aria-expanded="true"
                          aria-controls={`${x.title}${opinionsData.id}`}
                        >
                          Information
                        </tr>
                      ) : null}
                      {x.title === "Information" ? (
                        <div
                          id={`${x.title}${opinionsData.id}`}
                          className="accordion-collapse collapse"
                          aria-labelledby="panelsStayOpen-headingOne"
                        >
                          {x.subtask.map((info) => {
                            return (
                              <div className="accordion-body p-0 d-inline-flex w-100">
                                <div className="text-break text-start me-auto">
                                  {info.title}
                                </div>
                                <a
                                  href={`https://209.97.168.200/pacrawizpackv3/storage/app/storage/task_files/${info.task_file}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary ms-auto"
                                >
                                  {dateFormat(info.date)}
                                </a>
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
                {/* Assessment */}
                {opinionsData.task.map((x, y) => {
                  return (
                    <div style={{ width: "120%" }}>
                      {x.title === "Assessment" ? (
                        <tr
                          className="accordion-button collapsed fw-bold theme_text w-100 mx-auto"
                          type="button"
                          colspan="3"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${x.title}${opinionsData.id}`}
                          aria-expanded="true"
                          aria-controls={`${x.title}${opinionsData.id}`}
                        >
                          Assessment
                        </tr>
                      ) : null}
                      {x.title === "Assessment" ? (
                        <div
                          id={`${x.title}${opinionsData.id}`}
                          className="accordion-collapse collapse"
                          aria-labelledby="panelsStayOpen-headingOne"
                        >
                          {x.subtask.map((info) => {
                            return (
                              <div className="accordion-body p-0 d-inline-flex w-100">
                                <div className="text-break text-start me-auto">
                                  {info.title}
                                </div>
                                <a
                                  href={`https://209.97.168.200/pacrawizpackv3/storage/app/storage/task_files/${info.task_file}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary ms-auto"
                                >
                                  {dateFormat(info.date)}
                                </a>
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
                {/* SV */}
                {opinionsData.task.map((x, y) => {
                  return (
                    <div style={{ width: "120%" }}>
                      {x.title === "SV" ? (
                        <tr
                          className="accordion-button collapsed fw-bold theme_text w-100 mx-auto"
                          type="button"
                          colspan="3"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${x.title}${opinionsData.id}`}
                          aria-expanded="true"
                          aria-controls={`${x.title}${opinionsData.id}`}
                        >
                          SV
                        </tr>
                      ) : null}
                      {x.title === "SV" ? (
                        <div
                          id={`${x.title}${opinionsData.id}`}
                          className="accordion-collapse collapse"
                          aria-labelledby="panelsStayOpen-headingOne"
                        >
                          {x.subtask.map((info) => {
                            return (
                              <div className="accordion-body p-0 d-inline-flex w-100">
                                <div className="text-break text-start me-auto">
                                  {info.title}
                                </div>
                                <a
                                  href={`https://209.97.168.200/pacrawizpackv3/storage/app/${info.task_file}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary ms-auto"
                                >
                                  {dateFormat(info.date)}
                                </a>
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
                {/* MM */}
                {opinionsData.task.map((x, y) => {
                  return (
                    <div style={{ width: "120%" }}>
                      {x.title === "MM" ? (
                        <button
                          className="accordion-button collapsed fw-bold theme_text w-100 mx-auto"
                          type="button"
                          colspan="3"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${x.title}${opinionsData.id}`}
                          aria-expanded="true"
                          aria-controls={`${x.title}${opinionsData.id}`}
                        >
                          MM
                        </button>
                      ) : null}
                      {x.title === "MM" ? (
                        <div
                          id={`${x.title}${opinionsData.id}`}
                          className="accordion-collapse collapse"
                          aria-labelledby="panelsStayOpen-headingOne"
                        >
                          {x.subtask.map((info) => {
                            return (
                              <div className="accordion-body p-0 d-inline-flex w-100">
                                <div className="text-break text-start me-auto">
                                  {info.title}
                                </div>
                                {/* <div className="ms-auto my-auto"> */}
                                <a
                                  href={`https://209.97.168.200/pacrawizpackv3/storage/app/storage/task_files/${info.task_file}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary ms-auto"
                                >
                                  {dateFormat(info.date)}
                                </a>
                                {/* </div> */}
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
                {/* RC */}
                {opinionsData.task.map((x, y) => {
                  return (
                    <div style={{ width: "120%" }}>
                      {x.title === "RC" ? (
                        <div
                          className="accordion-button collapsed fw-bold theme_text w-100 mx-auto"
                          type="button"
                          colspan="3"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${x.title}${opinionsData.id}`}
                          aria-expanded="true"
                          aria-controls={`${x.title}${opinionsData.id}`}
                        >
                          RC
                        </div>
                      ) : null}
                      {x.title === "RC" ? (
                        <div
                          id={`${x.title}${opinionsData.id}`}
                          className="accordion-collapse collapse"
                          aria-labelledby="panelsStayOpen-headingOne"
                        >
                          {x.subtask.map((info) => {
                            return (
                              <div className="accordion-body p-0 d-inline-flex w-100">
                                <div className="text-break text-start me-auto">
                                  {info.title}
                                </div>
                                <a
                                  href={`https://209.97.168.200/pacrawizpackv3/storage/app/storage/task_files/${info.task_file}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary ms-auto"
                                >
                                  {dateFormat(info.date)}
                                </a>
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
                {opinionsData.rc_data.map((x) => {
                  return (
                    <tr>
                      <td className="text-start theme_text">RC Cover</td>
                      <td className="text-start">
                        <a
                          href={`https://209.97.168.200/pacrawizpackv3/storage/app/${x.rc_cover_file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary"
                        >
                          {dateFormat(x.date)}
                        </a>
                      </td>
                    </tr>
                  );
                })}
                {/* IC */}
                {opinionsData.IC ? (
                  <tr>
                    <td className="text-start">
                      Notification | Internal Closure
                    </td>
                    <td className="text-start">
                      <a
                        href={`https://209.97.168.200/pacrawizpackv3/public/admin/prnpriview/${opinionsData.id}/${opinionsData.Opinion}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary"
                      >
                        {dateFormat(opinionsData.IC)}
                      </a>
                    </td>
                  </tr>
                ) : null}
                {/* PPL */}
                {opinionsData.ppl_date ? (
                  <tr>
                    <td className="text-start theme_text">
                      Notification | PPL
                    </td>
                    <td className="text-start">
                      <a
                        href={`https://209.97.168.200/pacrawizpackv3/public/admin/viewppl/${opinionsData.ppl_doc}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary"
                      >
                        {dateFormat(opinionsData.ppl_date)}
                      </a>
                    </td>
                  </tr>
                ) : null}
                {/* NL */}
                {opinionsData.notification_date ? null : (
                  <tr>
                    <td className="text-start theme_text">NL</td>
                    <td className="text-start">
                      <a
                        href={`https://209.97.168.200/pacrawizpackv3/public/admin/viewnl/${opinionsData.Opinion}/${opinionsData.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary"
                      >
                        {dateFormat(opinionsData.notification_date)}
                      </a>
                    </td>
                  </tr>
                )}
                {/* PR */}
                {opinionsData.press_release_date ? (
                  <tr>
                    <td className="text-start theme_text">PR</td>
                    <td className="text-start">
                      {opinionsData.press_release_date ? (
                        <a
                          href={`https://209.97.168.200/pacrawizpackv3/public/admin/finalPr/${opinionsData.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary"
                        >
                          {dateFormat(opinionsData.press_release_date)}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ) : null}
                {/* RR */}
                {opinionsData.rr_date ? (
                  <tr>
                    <td className="text-start theme_text">RR</td>
                    <td className="text-start">
                      {opinionsData.rr_date ? (
                        <a
                          href={`https://209.97.168.200/pacrawizpackv3/storage/app/${opinionsData.rr_file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary"
                        >
                          {dateFormat(opinionsData.rr_date)}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ) : null}
                {/* RED */}
                {opinionsData.task.map((x, y) => {
                  return (
                    <div style={{ width: "120%" }}>
                      {x.title === "RED " ? (
                        <div
                          className="accordion-button collapsed fw-bold theme_text w-100 mx-auto"
                          type="button"
                          colspan="3"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${x.title}${opinionsData.id}`}
                          aria-expanded="true"
                          aria-controls={`${x.title}${opinionsData.id}`}
                        >
                          RED
                        </div>
                      ) : null}
                      {x.title === "RED " ? (
                        <div
                          id={`${x.title}${opinionsData.id}`}
                          className="accordion-collapse collapse"
                          aria-labelledby="panelsStayOpen-headingOne"
                        >
                          {x.subtask.map((info) => {
                            return (
                              <div className="accordion-body p-0 d-inline-flex w-100">
                                <div className="text-break text-start me-auto">
                                  {info.title}
                                </div>
                                <a
                                  href={`https://209.97.168.200/pacrawizpackv3/storage/app/storage/task_files/${info.task_file}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary ms-auto"
                                >
                                  {dateFormat(info.date)}
                                </a>
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
                {/* FC 1*/}
                {opinionsData.task.map((x, y) => {
                  return (
                    <div style={{ width: "120%" }}>
                      {x.title === "FC" ? (
                        <div
                          className="accordion-button collapsed fw-bold theme_text w-100 mx-auto"
                          type="button"
                          colspan="3"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${x.title}${opinionsData.id}`}
                          aria-expanded="true"
                          aria-controls={`${x.title}${opinionsData.id}`}
                        >
                          FC
                        </div>
                      ) : null}
                      {x.title === "FC" ? (
                        <div
                          id={`${x.title}${opinionsData.id}`}
                          className="accordion-collapse collapse"
                          aria-labelledby="panelsStayOpen-headingOne"
                        >
                          {x.subtask.map((info) => {
                            return (
                              <div className="accordion-body p-0 d-inline-flex w-100">
                                <div className="text-break text-start me-auto">
                                  {info.title}
                                </div>
                                <a
                                  href={`https://209.97.168.200/pacrawizpackv3/storage/app/storage/task_files/${info.task_file}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary ms-auto"
                                >
                                  {dateFormat(info.date)}
                                </a>
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
                {/* FC 2*/}
                {/* {opinionsData.file_closure_date ? (
                <tr>
                  <td className="text-start theme_text">FC</td>
                  <td className="text-start">
                    {opinionsData.file_closure_date ? (
                      <a
                        href={`https://209.97.168.200/pacrawizpackv3/storage/app/${opinionsData.file_closure_doc}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary"
                      >
                        {dateFormat(opinionsData.file_closure_date)}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ) : null} */}
                <tr>
                  <td className="text-start">LTR</td>
                  <td className="text-start">
                    {opinionsData.LTR ? opinionsData.LTR : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="text-start">STR</td>
                  <td className="text-start">
                    {opinionsData.STR ? opinionsData.STR : "-"}
                  </td>
                </tr>
                <tr>
                  <td className="text-start">Out Look</td>
                  <td className="text-start">{opinionsData.outlook}</td>
                </tr>
                <tr>
                  <td className="text-start">Rating Action</td>
                  <td className="text-start">{opinionsData.rating_action}</td>
                </tr>
              </tbody>
            </table>
          </AccordionDetails>
        </Accordion>
      ) : (
        <SadFace />
      )}
    </Zoom>
  );
}

// {
//   opinionsData.task.map((x, y) => {
//     return (
//       <>

//         <tr
//           className="accordion-button collapsed fw-bold theme_text w-100 mx-auto"
//           type="button"
//           colspan="3"
//           data-bs-toggle="collapse"
//           data-bs-target={`#${x.title}${y}`}
//           aria-expanded="true"
//           aria-controls={`${x.title}${y}`}
//         >
//           {x.title}
//         </tr>
//         <div
//           id={`${x.title}${y}`}
//           className="accordion-collapse collapse"
//           aria-labelledby="panelsStayOpen-headingOne"
//         >
//           {x.subtask.map((info) => {
//             return (
//               <tr className="accordion-body" >
//                 <td className="text-break me-auto">{info.title}</td>
//                 <td className="">
//                   <a
//                     href={`https://209.97.168.200/pacrawizpackv3/storage/app/${info.task_file}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-primary"
//                   >
//                     {dateFormat(info.date)}
//                   </a>
//                 </td>
//               </tr>
//             );
//           })}
//         </div>
//       </>
//     );
//   });
// }
