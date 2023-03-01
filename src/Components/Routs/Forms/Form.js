import React, { useState, useEffect } from "react";
import "./form.css";
import logo from "../../../Assets/Images/PACRA_logo.png";
import { useParams } from "react-router-dom";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CommentIcon from "@mui/icons-material/Comment";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { AlertTitle, Skeleton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ExpandIcon from "@mui/icons-material/Expand";

export default function Form(props) {
  const { id, client_id, og_rating_id } = useParams();
  localStorage.setItem("id", id);
  const [data, setdata] = useState([]);
  const [status, setstatus] = useState("");
  const [counter, updateCounter] = useState(0);
  const [comment, setcomment] = useState("empty");
  const [taskdata, settaskdata] = useState([]);
  const [information, setinformation] = useState(true);
  const [assessment, setassessment] = useState(true);
  const [sitevisit, setsitevisit] = useState(true);
  const [meetings, setmeetings] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState();
  const [opens, setOpens] = React.useState(false);
  const [rc, setrc] = useState(true);
  const [pr, setpr] = useState(true);
  const [ppl, setppl] = useState(true);
  const [nl, setnl] = useState(true);
  const [rr, setrr] = useState(true);
  const [red, setred] = useState(true);
  const [nl_date, setnl_date] = useState(true);
  const [ppl_date, setppl_date] = useState(true);
  const [rc_sign_data, setrc_sign] = useState(false);
  const [submitstatus, resubmitstatus] = useState();
  const [rc_data, set_rc_data] = useState([]);

  function DateFormat(params) {
    if (params == null) {
      return "-";
    } else {
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
  function useWindowSize() {
    const [size, setsize] = useState([window.innerWidth]);
    useEffect(() => {
      const handleResize = () => {
        setsize([window.innerWidth]);
      };
      window.addEventListener("resize", handleResize);
    }, []);
    return size;
  }
  const [screenWidth] = useWindowSize();

  useEffect(() => {
    const func = async function () {
      const res = await fetch(
        `https://209.97.168.200/pacrawizpackv3/public/api/addTask/FC/${client_id}/${og_rating_id}`,
        {
          method: "GET",
        }
      );
      const api = await res.json();
      setdata(api);
      let approval_id = null;
      if (api[0].approvalIds !== null) {
        approval_id = api[0].approvalIds.split(",");
      }
      let internal_id = null;
      if (api[0].rc_internal !== null) {
        internal_id = api[0].rc_internal.split(",");
      }
      let external_id = null;
      if (api[0].rc_external !== null) {
        external_id = api[0].rc_external.split(",");
      }
      let merged = null;
      if (api[0].rc_external == null && api[0].rc_internal !== null) {
        merged = [...internal_id, null];
      }
      if (api[0].rc_external !== null && api[0].rc_internal == null) {
        merged = [null, ...external_id];
      }
      if (api[0].rc_external == null && api[0].rc_internal == null) {
        merged = null;
      }
      if (api[0].rc_external !== null && api[0].rc_internal !== null) {
        merged = [...internal_id, ...external_id];
      }
      if (api[0].approvalIds !== null) {
        for (let i in merged) {
          const rc_sign = approval_id.includes(merged[i]);
          setrc_sign(rc_sign);
          if (rc_sign == false) {
            break;
          }
        }
      }

      let fieldarray = [
        "Information",
        "Assessment",
        "Site Visit",
        "MM",
        "RC",
        "RED",
      ];
      let array = [];
      for (let i in fieldarray) {
        const res = await fetch(
          `https://209.97.168.200/pacrawizpackv3/public/api/addTask/FC_tasks/${fieldarray[i]}/${client_id}/${og_rating_id}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        array.push(data);
      }
      settaskdata(array);
      const res3 = await fetch(
        `https://209.97.168.200/pacrawizpackv3/public/api/addTask/FC_info/comments/${client_id}/${og_rating_id}`,
        {
          method: "GET",
        }
      );
      let obj = {};
      const commentdata = await res3.json();
      for (let i in commentdata) {
        const value = {};
        value[commentdata[i].task] = commentdata[i].comment;
        obj = { ...obj, ...value };
      }
      setcomment(obj);
      const keys = Object.keys(obj);
      const rc_cover = await fetch(
        `https://209.97.168.200/pacrawizpackv3/public/api/FC/RC_cover/${client_id}/${og_rating_id}`,
        {
          method: "GET",
        }
      );
      const rc_cover_resp = await rc_cover.json();
      set_rc_data(rc_cover_resp);
      console.log(rc_cover_resp, "rc_cover");

      const submit_date_res = await fetch(
        `https://209.97.168.200/pacrawizpackv3/public/api/addTask/submitdata/${client_id}/${og_rating_id}`,
        {
          method: "GET",
        }
      );
      const submit_date_res1 = await submit_date_res.json();
      if (submit_date_res1.data !== null) {
        setstatus(submit_date_res1.data.status)
        if (submit_date_res1.data.resubmit == "0") {
          resubmitstatus(false);
        }
        if (submit_date_res1.data.resubmit == "1") {
          resubmitstatus(true);
        }
        if (submit_date_res1.data.approval_date !== null) {
          if(document.getElementById("approve") !== null){
            document.getElementById(
              "approve"
            ).innerHTML = `File Closure Form (${DateFormat(
              submit_date_res1.data.approval_date
            )})`;
          }
        }
        if (submit_date_res1.data.status !== null) {
          if (document.getElementById("submitform") !== null)
            document.getElementById("submitform").style.display = "none";
        }
        if (submit_date_res1.data.status == "Submit") {
          if (document.getElementById("approveform") !== null) {
            document.getElementById("approveform").disabled = false;
            document.getElementById("declineform").style.display = "unset";
            document.getElementById("submitform").style.display = "none";
          }
        }
        if (submit_date_res1.data.status == null) {
          if (document.getElementById("approveform") !== null) {
            document.getElementById("approveform").disabled = true;
          }
        }
        if (submit_date_res1.data.status == "Approved") {
          if (document.getElementById("approveform") !== null) {
            document.getElementById("approveform").style.display = "none";
          }
          if (document.getElementById("submitform") !== null) {
            document.getElementById("submitform").style.display = "none";
          }
          setOpen(true);
          setmessage("File is Approved!");
          for (let i = 1; i <= 10; i++) {
            if (document.getElementById(`btn${i}`) !== null)
              document.getElementById(`btn${i}`).style.display = "none";
            if (document.getElementById(`na${i}`) !== null)
              document.getElementById(`na${i}`).style.display = "none";
          }
        }
      }
      if (submit_date_res1.data == null) {
        if (document.getElementById("approveform") !== null)
          document.getElementById("approveform").disabled = true;
      }
    };
    func();
  }, []);

  const incrementCounter = () => {
    updateCounter(counter + 1);
}

  function FY_Calculate(params) {
    if (params == null) {
      return "-";
    } else {
      const date = new Date(params);
      const getmonth = date.getMonth();
      const month = getmonth + 1;
      const getyear = date.getFullYear();
      const yeartostring = getyear.toString();
      const year = yeartostring[2] + yeartostring[3];
      if (month >= 1 && month < 7) {
        return `FY-${Number(year)}`;
      }
      if (month >= 7) {
        return `FY-${Number(year) + 1}`;
      }
    }
  }
  const click = async (state) => {
    if (state[0].value == "") {
      alert("Can't add empty comment");
    } else {
      if (state[1].id == `btn1`) {
        setinformation(!information);
        state[0].disabled = !information;
        if (document.getElementById("table1") !== null) {
          document.getElementById("table1").className =
            "table table-bordered border-dark";
        }
        document.getElementById("comment1").innerHTML = state[0].value;
        document.getElementById("nodata1").style.display = "none";
      }
      if (state[1].id == `btn2`) {
        setassessment(!assessment);
        state[0].disabled = !assessment;
        document.getElementById("table2").className =
          "table table-bordered border-dark";
        document.getElementById("comment2").innerHTML = state[0].value;
        document.getElementById("nodata2").style.display = "none";
      }
      if (state[1].id == `btn3`) {
        setsitevisit(!sitevisit);
        state[0].disabled = !sitevisit;
        document.getElementById("table3").className =
          "table table-bordered border-dark";
        document.getElementById("comment3").innerHTML = state[0].value;
        document.getElementById("nodata3").style.display = "none";
      }
      if (state[1].id == `btn4`) {
        setmeetings(!meetings);
        state[0].disabled = !meetings;
        document.getElementById("table4").className =
          "table table-bordered border-dark";
        document.getElementById("comment4").innerHTML = state[0].value;
        document.getElementById("nodata4").style.display = "none";
      }
      if (state[1].id == `btn5`) {
        setrc(!rc);
        state[0].disabled = !rc;
        document.getElementById("table5").className =
          "table table-bordered border-dark";
        document.getElementById("comment5").innerHTML = state[0].value;
        document.getElementById("nodata5").style.display = "none";
      }
      if (state[1].id == `btn6`) {
        setppl(!ppl);
        state[0].disabled = !ppl;
        document.getElementById("table6").className =
          "table table-bordered border-dark";
        document.getElementById("comment6").innerHTML = state[0].value;
        document.getElementById("nodata6").style.display = "none";
      }
      if (state[1].id == `btn7`) {
        setnl(!nl);
        state[0].disabled = !nl;
        document.getElementById("table7").className =
          "table table-bordered border-dark";
        document.getElementById("comment7").innerHTML = state[0].value;
        document.getElementById("nodata7").style.display = "none";
      }
      if (state[1].id == `btn8`) {
        setrr(!rr);
        state[0].disabled = !rr;
        document.getElementById("table8").className =
          "table table-bordered border-dark";
        document.getElementById("comment8").innerHTML = state[0].value;
        document.getElementById("nodata8").style.display = "none";
      }
      if (state[1].id == `btn9`) {
        setred(!red);
        state[0].disabled = !red;
        document.getElementById("table9").className =
          "table table-bordered border-dark";
        document.getElementById("comment9").innerHTML = state[0].value;
        document.getElementById("nodata9").style.display = "none";
      }
      if (state[1].id == `btn10`) {
        setpr(!pr);
        state[0].disabled = !pr;
        document.getElementById("table10").className =
          "table table-bordered border-dark";
        document.getElementById("comment10").innerHTML = state[0].value;
        document.getElementById("nodata10").style.display = "none";
      }
      const obj = {
        task: state[0].id,
        comment: state[0].value,
        record_id: og_rating_id,
        analyst_id: data[0].analyst_id,
        client_id: client_id,
      };

      const res = await fetch(
        "https://209.97.168.200/pacrawizpackv3/public/api/addTask/FC_info/add_comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(obj),
        }
      );
      const resp = await res.json();
      console.log(resp);
    }
  };
  const clickupdate = async () => {
    document.getElementById("submitform").style.display = "unset";
    if (document.getElementById("approveform") !== null) {
      document.getElementById("approveform").disabled = true;
    }
    if (document.getElementById("declineform") !== null) {
      document.getElementById("declineform").style.display = "none";
    }
    // document.getElementById("sign1").innerHTML = "";

    const res = await fetch(
      `https://209.97.168.200/pacrawizpackv3/public/api/FC/submit/reset/${client_id}/${og_rating_id}`,
      {
        method: "POST",
      }
    );
    const resp = await res.json();
    setOpen(false);
  };

  const submit = async () => {
    const date = new Date();
    var month = date.getMonth() + 1
    if(month < 10){
      month = `0${month}`
    }
    var current_date = date.getDate();
    if(current_date < 10){
      current_date = `0${current_date}`
    }
    const getdate = `${date.getFullYear()}-${
      month
    }-${current_date}`;
    const obj = {
      record_id: og_rating_id,
      client_id: client_id,
      analyst_id: data[0].analyst_id,
      manager_id: data[0].manager_id,
      submit_date: getdate,
      submitted_by: id,
      status: "Submit",
    };
    const res = await fetch(
      "https://209.97.168.200/pacrawizpackv3/public/api/FC/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(obj),
      }
    );
    const resp = await res.json();
    console.log(resp);
    if (resp.status == true) {
      setOpen(true);

      document.getElementById("submitform").style.display = "none";
      if (document.getElementById("approveform")) {
        document.getElementById("approveform").innerHTML = "Please Wait...";
      }
      if (document.getElementById("declineform")) {
        document.getElementById("declineform").style.display = "unset";
      }
      let link = null;
      let object = null;
      if (localStorage.getItem("id") == data[0].analyst_id) {
        setmessage(
          "Your Request has been Submitted. Sending Mail to Team Lead please wait..."
        );
        link = `${window.location.origin}/FC/${data[0].manager_id}/${client_id}/${og_rating_id}`;
        object = {
          email: data[0].manager_email,
          // email: "mohsin.rehman@pacra.com",
          subject: "File Closure Approve Request",
          text: `<b>${data[0].username}</b> has sent you the approval request for File Closure Form,
  Please approve the form by Clicking on the Link
  <br></br> ${link}
  <br></br>
  <b>Note:</b> Please make sure you're login to wizPAC`,
        };
      }
      if (localStorage.getItem("id") == data[0].manager_id) {
        setmessage(
          "Your Request has been Submitted. Sending Mail to your Analyst please wait..."
        );
        link = `${window.location.origin}/FC/${data[0].analyst_id}/${client_id}/${og_rating_id}`;
        object = {
          email: data[0].user_email,
          subject: "File Closure Submitted",
          text: `Dear <b>${data[0].username}</b><br></br> your Team Lead <b>${data[0].manager_name}</b> has submitted File Closure Form on your behalf. Please contact your Team Lead for any query.<br></br>
  File Closure Link: ${link}`,
        };
      }
      if (localStorage.getItem("id") == data[0].unit_head_id) {
        setmessage(
          "Your Request has been Submitted. Sending Mail to your Analyst please wait..."
        );
        link = `${window.location.origin}/FC/${data[0].analyst_id}/${client_id}/${og_rating_id}`;
        object = {
          email: data[0].user_email,
          subject: "File Closure Submitted",
          text: `Dear <b>${data[0].username}</b> <br></br> your Unit Head <b>${data[0].lead_name}</b> has submitted File Closure Form on your behalf. Please contact your Unit Head or Team Lead for any query. <br></br>
  File Closure Link: ${link}`,
        };
      }
      try {
        const email_res = await fetch(
          "https://209.97.168.200/pacrawizpackv3/public/api/sendmail",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
            },
            body: JSON.stringify(object),
          }
        );

        const email_resp = await email_res.json();
        console.log(email_resp);
        if (document.getElementById("approveform")) {
          document.getElementById("approveform").innerHTML = "Approve";
          document.getElementById("approveform").disabled = false;
        }
        if (email_resp.status == true) {
          if (localStorage.getItem("id") == data[0].analyst_id) {
            setmessage(
              `Your Request has been Submitted and an Email for approval has been sent to ${data[0].manager_name}!`
            );
          }
          if (localStorage.getItem("id") == data[0].manager_id) {
            setmessage(
              `Your Request has been Submitted and an Email to infrom your Analyst has been sent to ${data[0].username}!`
            );
          }
          if (localStorage.getItem("id") == data[0].unit_head_id) {
            setmessage(
              `Your Request has been Submitted and Email to infrom your Analyst has been sent to ${data[0].username}!`
            );
          }
        } else {
          setOpen(false);
          setOpens(true);
          if (localStorage.getItem("id") == data[0].analyst_id) {
            setmessage(
              `Your Request has been Submitted but unable to send Approval Email to ${data[0].manager_name}!`
            );
          }
          if (localStorage.getItem("id") == data[0].manager_id) {
            setmessage(
              `Your Request has been Submitted but unable to send Email to infrom your Analyst!`
            );
          }
          if (localStorage.getItem("id") == data[0].unit_head_id) {
            setmessage(
              `Your Request has been Submitted but unable to send Email to infrom your Analyst!`
            );
          }
        }
      } catch (error) {
        setOpen(false);
        setOpens(true);
        setmessage(`Your Request has been Submitted but unable to send Email`);
        if (document.getElementById("approveform")) {
          document.getElementById("approveform").innerHTML = "Approve";
          document.getElementById("approveform").disabled = false;
        }
      }
    } else {
      setmessage("An Error Occure while processing your Request!");
      setOpens(true);
    }
  };
  const approve = async () => {
    const date = new Date();
    var month = date.getMonth() + 1
    if(month < 10){
      month = `0${month}`
    }
    var current_date = date.getDate();
    if(current_date < 10){
      current_date = `0${current_date}`
    }
    const getdate = `${date.getFullYear()}-${
      month
    }-${current_date}`;
    const obj = {
      record_id: og_rating_id,
      client_id: client_id,
      analyst_id: data[0].analyst_id,
      team_lead_id: data[0].manager_id,
      unit_head_id: data[0].unit_head_id,
      approval_date: getdate,
      approved_by: data[0].manager_id,
      status: "Approved",
    };
    const res = await fetch(
      "https://209.97.168.200/pacrawizpackv3/public/api/FC/approve",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(obj),
      }
    );
    const resp = await res.json();
    console.log(resp);
    if (resp.status == true) {
      setOpens(false);
      setOpen(true);
      setmessage("File is Approved!");
      document.getElementById(
        "approve"
      ).innerHTML = `File Closure Form (${DateFormat(getdate)})`;
      document.getElementById("approveform").style.display = "none";
      document.getElementById("submitform").style.display = "none";
      document.getElementById("declineform").style.display = "none";
      for (let i = 1; i <= 10; i++) {
        document.getElementById(`btn${i}`).style.display = "none";
      }
      if (screenWidth > 600) {
        document.getElementById("commenttd").innerHTML = "";
      }
    } else {
      setmessage("An Error Occure while processing your Request!");
      setOpens(true);
    }
  };

  const decline = async () => {
    const obj = {
      task: "Decline",
      comment: document.getElementById("comment-box").value,
      record_id: og_rating_id,
      analyst_id: data[0].analyst_id,
      client_id: client_id,
    };

    const res1 = await fetch(
      "https://209.97.168.200/pacrawizpackv3/public/api/addTask/FC_info/add_comments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(obj),
      }
    );
    const resp1 = await res1.json();
    console.log(resp1);

    const res = await fetch(
      `https://209.97.168.200/pacrawizpackv3/public/api/FC/submit/reset/${client_id}/${og_rating_id}`,
      {
        method: "POST",
      }
    );
    const resp = await res.json();
    if (resp.status == true) {
      setOpens(false);
      setOpen(true);
      setmessage(
        `Submition Declined. Please wait while sending decline email to your Analyst...`
      );
      document.getElementById("declineform").style.display = "none";
      document.getElementById("submitform").style.display = "unset";
      document.getElementById("approveform").disabled = true;
      document.getElementById("btnbtn").click();
      const link = `${window.location.origin}/FC/${data[0].analyst_id}/${client_id}/${og_rating_id}`;
      let object = null;
      if (localStorage.getItem("id") == data[0].unit_head_id) {
        object = {
          email: data[0].user_email,
          // email: "mohsin.rehman@pacra.com",
          subject: "File Closure Submition Declined!",
          text: `Dear <b>${data[0].username}</b> <br></br> your Unit Head <b>${
            data[0].lead_name
          }</b> has declined your File Closure submition.<br></br> <br></br>
                <b>Comment from ${data[0].lead_name}</b>: ${
            document.getElementById("comment-box").value
          } <br></br> <br></br>
                 File Closure Link: ${link}`,
        };
      }
      if (localStorage.getItem("id") == data[0].manager_id) {
        object = {
          email: data[0].user_email,
          subject: "File Closure Submition Declined!",
          text: `Dear <b>${data[0].username}</b> <br></br> your Team Lead <b>${
            data[0].manager_name
          }</b> has declined your File Closure submition.<br></br>
                <b>Comment from ${data[0].manager_name}</b>: ${
            document.getElementById("comment-box").value
          } <br></br> 
                 File Closure Link: ${link}`,
        };
      }

      const email_res = await fetch(
        "https://209.97.168.200/pacrawizpackv3/public/api/sendmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(object),
        }
      );
      const email_resp = await email_res.json();
      if (email_resp.status == true) {
        if (localStorage.getItem("id") == data[0].manager_id) {
          setmessage(
            `Submition Declined and an Email to infrom your Analyst has been sent to ${data[0].username}!`
          );
        }
        if (localStorage.getItem("id") == data[0].unit_head_id) {
          setmessage(
            `Submition Declined and Email to infrom your Analyst has been sent to ${data[0].username}!`
          );
        }
      } else {
        setOpen(false);
        setOpens(true);
        if (localStorage.getItem("id") == data[0].manager_id) {
          setmessage(
            `Submition Declined but unable to send Email to infrom your Analyst!`
          );
        }
        if (localStorage.getItem("id") == data[0].unit_head_id) {
          setmessage(
            `Submition Declined but unable to send Email to infrom your Analyst!`
          );
        }
      }
    } else {
      setOpen(false);
      setOpens(true);
      setmessage(
        `Unable to Proceed your Request. Their might be internet problem or server error.`
      );
    }
  };
  return (
    <div className="container text bodyPadding">
      
      {data[0]? id == data[0].unit_head_id && localStorage.getItem("userID") == data[0].unit_head_id || id == data[0].manager_id && localStorage.getItem("userID") == data[0].manager_id || id == data[0].analyst_id && localStorage.getItem("userID") == data[0].analyst_id || localStorage.getItem("userID") == id && status == "Approved"? <div>
      <div className="printNone">
        <div className="d-inline-flex w-100">
          <img src={logo} height="60px" width="60px" />
          <h3 className="mx-auto">THE PAKISTAN CREDIT RATING AGENCY</h3>
        </div>
      </div>
      <div className="">
        <h4 className="mb-2 text-center" id="approve">
          File Closure Form
        </h4>
        <div className="row mx-auto borderr p-4">
          <div className="row mx-auto">
            <div
              className={
                screenWidth > 600 ? `col-2 mb-1 text` : `col-md-2 mb-1 text`
              }
            >
              <label className="text ms-md-2">Opinion Name:</label>
            </div>
            <div
              className={
                screenWidth > 600 ? `col-4 mb-1 text px-3` : `col-md-4 mb-1`
              }
            >
              <input
                className="form-control mb-2 forminput form_input me-md-2"
                id="data1"
                value={data[0] ? data[0].company_name : null}
                type="text"
                placeholder="......"
                aria-label=".form-control-sm example"
                disabled
              />
            </div>
            <div
              className={
                screenWidth > 600 ? `col-2 mb-1 text` : `col-md-2 mb-1`
              }
            >
              <label className="text ms-md-2">Rating Type:</label>
            </div>
            <div
              className={
                screenWidth > 600 ? `col-4 mb-1 text px-3` : `col-md-4 mb-1`
              }
            >
              <input
                className="form-control mb-2 forminput form_input me-md-2"
                type="text"
                defaultValue={data[0] ? data[0].rating_scales : null}
                placeholder="......"
                aria-label=".form-control-sm example"
                disabled
              />
            </div>
          </div>
          <div className="row mx-auto">
            <div
              className={
                screenWidth > 600 ? `col-2 mb-1 text` : `col-md-2 mb-1 text`
              }
            >
              <label className="text ms-md-2">Period:</label>
            </div>
            <div
              className={
                screenWidth > 600 ? `col-4 mb-1 text px-3` : `col-md-4 mb-1`
              }
            >
              <input
                className="form-control mb-2 forminput form_input me-md-2"
                type="text"
                placeholder="......"
                aria-label=".form-control-sm example"
                value={
                  data[0]
                    ? data[0].notification_date == null
                      ? "......"
                      : FY_Calculate(data[0].notification_date)
                    : null
                }
                disabled
              />
            </div>
            <div
              className={
                screenWidth > 600 ? `col-2 mb-1 text` : `col-md-2 mb-1 text`
              }
            >
              <label className="text ms-md-2">Team Lead:</label>
            </div>
            <div
              className={
                screenWidth > 600 ? `col-4 mb-1 text px-3` : `col-md-4 mb-1`
              }
            >
              <input
                className="form-control mb-2 forminput form_input me-md-2"
                type="text"
                defaultValue={data[0] ? data[0].manager_name : null}
                placeholder="......"
                aria-label=".form-control-sm example"
                disabled
              />
            </div>
          </div>
          <div className="row mx-auto">
            <div
              className={
                screenWidth > 600 ? `col-2 mb-1 text` : `col-md-2 mb-1 text`
              }
            >
              <label className="text ms-md-2">Review Type:</label>
            </div>
            <div
              className={
                screenWidth > 600 ? `col-4 mb-1 text px-3` : `col-md-4 mb-1`
              }
            >
              <input
                className="form-control mb-2 forminput form_input me-md-2"
                type="text"
                value={data[0] ? data[0].ratingUpdateType_title : null}
                placeholder="......"
                aria-label=".form-control-sm example"
                disabled
              />
            </div>
            <div
              className={
                screenWidth > 600 ? `col-2 mb-1 text` : `col-md-2 mb-1 text`
              }
            >
              <label className="text ms-md-2">Analyst:</label>
            </div>
            <div
              className={
                screenWidth > 600 ? `col-4 mb-1 text px-3` : `col-md-4 mb-1`
              }
            >
              <input
                className="form-control mb-2 forminput form_input me-md-2"
                type="text"
                value={data[0] ? data[0].username : null}
                placeholder="......"
                aria-label=".form-control-sm example"
                disabled
              />
            </div>
          </div>
        </div>
        <h5 className="my-2 text-center">Key Contents of Rating Process</h5>
        <div className="table-responsive-xl">
          <table className="table borderr p-5 overflow-scroll">
            <thead>
              <tr>
                <th scope="col" className="col text-start">
                  Process
                </th>
                {screenWidth > 600 && (
                  <th
                    scope="col-3"
                    id="commenttd"
                    colSpan={2}
                    className={
                      comment == "empty"
                        ? `text-center d-print-none`
                        : `text-start d-print-none`
                    }
                  >
                    Comments (in case of NA)
                  </th>
                )}
                <th
                  scope="col"
                  className={`${
                    screenWidth > 600 ? "text-center" : "text-center"
                  } d-print-none`}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="borderr" id="tabledata">
              {/* {comment == "empty" ? (
                <tr>
                  <td>
                    <div className="text-center" />
                  </td>
                  <td>
                    <div className="text-center">
                      
                      <span className="loader_"></span>
                    </div>
                  </td>
                </tr>
              ) : ( */}
              <>
                <tr>
                  <th scope="row">
                    {comment == "empty" ? (
                      <Skeleton width={310} height={50} />
                    ) : (
                      "1- Information"
                    )}
                  </th>
                  {screenWidth > 600 && (
                    <td colSpan={2} className="text-start">
                      {comment == "empty" ? (
                        <Skeleton width={50} height={50} />
                      ) : (
                        <button
                          type="button"
                          className={`hover_btn btn btn-primary btn-block d-print-none`}
                          style={
                            taskdata.length > 0
                              ? taskdata[0].length == 0
                                ? { display: "unset" }
                                : { display: "none" }
                              : { display: "none" }
                          }
                          id="btn1"
                          data-bs-toggle={"modal"}
                          data-bs-target={"#commentfield1"}
                        >
                          <CommentIcon />
                        </button>
                      )}
                    </td>
                  )}
                  <td className="text-center col-3">
                    {screenWidth <= 600 && (
                      <>
                        <button
                          type="button"
                          className={`btn btn-primary btn-block d-print-none`}
                          style={
                            taskdata.length > 0
                              ? taskdata[0].length == 0
                                ? { display: "unset" }
                                : { display: "none" }
                              : { display: "none" }
                          }
                          id="btn1"
                          data-bs-toggle={"modal"}
                          data-bs-target={"#commentfield1"}
                        >
                          <CommentIcon />
                        </button>
                      </>
                    )}
                    {comment == "empty" ? (
                      <Skeleton className="mx-auto" width={60} height={50} />
                    ) : (
                      <button
                        className="btn btn-secondary btn-block d-print-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                        controls="collapseOne"
                      >
                        <ExpandIcon />
                      </button>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="brdr_btm">
                    <div className="accordion" id="accordionExample1">
                      <div className=" ">
                        <div
                          id="collapseOne"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample1"
                        >
                          <div className=" " id="info">
                            <table className="table table-striped ">
                              {taskdata.length > 0 ? (
                                taskdata[0].length > 0 ? (
                                  <thead>
                                    <tr>
                                      <th className="col-1 text-center">#</th>
                                      {screenWidth > 991 && (
                                        <th className="col-2 text-center">
                                          Date
                                        </th>
                                      )}
                                      <th className=" text-center">File</th>
                                    </tr>
                                  </thead>
                                ) : (
                                  <>
                                    <h6
                                      className={`text-center ms-auto ${
                                        comment.Information && "d-none"
                                      }`}
                                      id="nodata1"
                                    >
                                      No data Available
                                    </h6>
                                    <div
                                      className="d-flex"
                                      style={{ marginLeft: "20px" }}
                                    >
                                      <table
                                        className={`table table-bordered border-dark ${
                                          comment.Information == null
                                            ? "d-none"
                                            : null
                                        }`}
                                        id="table1"
                                      >
                                        <tbody>
                                          <tr>
                                            <th
                                              scope="row"
                                              className="col-2 table-active"
                                            >
                                              <h6> Comment:</h6>
                                            </th>
                                            <td className="col table-active">
                                              <div
                                                className="text-wrap text-capitalize "
                                                style={{ width: "auto" }}
                                              >
                                                <h6 id="comment1">
                                                  {comment.Information}
                                                </h6>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </>
                                )
                              ) : null}
                              <tbody>
                                {taskdata.length > 0 ? (
                                  taskdata[0].map((value, index) => {
                                    return (
                                      <tr>
                                        <td className="fw-normal text-center col-1">
                                          {screenWidth < 992 && <br />}
                                          {index + 1 + ")"}
                                        </td>
                                        {screenWidth > 991 && (
                                          <td className="col text-center">
                                            <div className="card">
                                              <div className="button btn text">
                                                {DateFormat(value.date)}
                                              </div>
                                            </div>
                                          </td>
                                        )}
                                        <td className="col text-center">
                                          <div className="card d-flex">
                                            <div className="button btn text">
                                              {screenWidth <= 991 && (
                                                <>
                                                  {DateFormat(value.date)}
                                                  <br />
                                                </>
                                              )}
                                              {value.title}
                                              {value.task_file !== "" &&
                                              value.task_file !== null ? (
                                                <a
                                                  href={`https://209.97.168.200/pacrawizpackv3/storage/app/storage/task_files/${value.task_file}`}
                                                  style={{
                                                    textDecoration: "none",
                                                  }}
                                                  target="_blank"
                                                >
                                                  <AttachFileIcon className="link" />
                                                </a>
                                              ) : (
                                                " -File Missing"
                                              )}
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })
                                ) : (
                                  <tr>
                                    <td className="fw-normal text-center col-1">
                                      No data Available
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                {/* Assessment */}
                <tr>
                  <th scope="row">
                    {comment == "empty" ? (
                      <Skeleton width={310} height={50} />
                    ) : (
                      "2- Assessment"
                    )}
                  </th>
                  {screenWidth > 600 && (
                    <td colSpan={2} className="text-start">
                      {comment == "empty" ? (
                        <Skeleton width={50} height={50} />
                      ) : (
                        <button
                          type="button"
                          className={`hover_btn btn btn-primary btn-block d-print-none`}
                          style={
                            taskdata.length > 0
                              ? taskdata[1].length == 0
                                ? { display: "unset" }
                                : { display: "none" }
                              : { display: "none" }
                          }
                          id="btn2"
                          data-bs-toggle={"modal"}
                          data-bs-target={"#commentfield2"}
                        >
                          <CommentIcon />
                        </button>
                      )}
                    </td>
                  )}
                  <td scope="row" className="text-center col-3">
                    {screenWidth <= 600 && (
                      <>
                        <button
                          type="button"
                          className={`btn btn-primary btn-block d-print-none`}
                          style={
                            taskdata.length > 0
                              ? taskdata[1].length == 0
                                ? { display: "unset" }
                                : { display: "none" }
                              : { display: "none" }
                          }
                          id="btn2"
                          data-bs-toggle={"modal"}
                          data-bs-target={"#commentfield2"}
                        >
                          <CommentIcon />
                        </button>
                      </>
                    )}
                    {comment == "empty" ? (
                      <Skeleton className="mx-auto" width={60} height={50} />
                    ) : (
                      <button
                        className="btn btn-secondary btn-block d-print-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="true"
                        aria-controls="collapseTwo"
                        controls="collapseTwo"
                      >
                        <ExpandIcon />
                      </button>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="brdr_btm">
                    <div className="accordion" id="accordionExample2">
                      <div className=" ">
                        {/* <h2 className="accordion-header" id="headingOne"> */}

                        {/* </h2> */}
                        <div
                          id="collapseTwo"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingTwo"
                          data-bs-parent="#accordionExample2"
                        >
                          <div className=" " id="info">
                            <table className="table table-striped">
                              {taskdata.length > 0 ? (
                                taskdata[1].length > 0 ? (
                                  <thead>
                                    <tr>
                                      <th className="col-1 text-center">#</th>
                                      {screenWidth > 991 && (
                                        <th className="col-2 text-center">
                                          Date
                                        </th>
                                      )}
                                      <th className=" text-center">File</th>
                                    </tr>
                                  </thead>
                                ) : (
                                  <>
                                    <h6
                                      className={`text-center ms-auto ${
                                        comment.Assessment && "d-none"
                                      }`}
                                      id="nodata2"
                                    >
                                      No data Available
                                    </h6>
                                    <div
                                      className="d-flex"
                                      style={{ marginLeft: "20px" }}
                                    >
                                      <table
                                        className={`table table-bordered border-dark ${
                                          comment.Assessment == null
                                            ? "d-none"
                                            : null
                                        }`}
                                        id="table2"
                                      >
                                        <tbody>
                                          <tr>
                                            <th
                                              scope="row"
                                              className="col-2 table-active"
                                            >
                                              <h6> Comment:</h6>
                                            </th>
                                            <td
                                              className="col table-active"
                                              style={{ width: "100px" }}
                                            >
                                              <h6 id="comment2">
                                                {comment.Assessment}
                                              </h6>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </>
                                )
                              ) : null}
                              <tbody>
                                {taskdata.length > 0 ? (
                                  taskdata[1].map((value, index) => {
                                    return (
                                      <tr>
                                        <td className="fw-normal text-center col-1">
                                          {screenWidth < 992 && <br />}
                                          {index + 1 + ")"}
                                        </td>
                                        {screenWidth > 991 && (
                                          <td className="col text-center">
                                            <div className="card">
                                              <div className="button btn text">
                                                {DateFormat(value.date)}
                                              </div>
                                            </div>
                                          </td>
                                        )}
                                        <td>
                                          <div className="card text-center d-flex text">
                                            <div className="button btn text">
                                              {screenWidth <= 991 && (
                                                <>
                                                  {DateFormat(value.date)}
                                                  <br />
                                                </>
                                              )}
                                              {value.title}
                                              <a
                                                href={`https://209.97.168.200/pacrawizpackv3/storage/app/storage/task_files/${value.task_file}`}
                                                style={{
                                                  textDecoration: "none",
                                                }}
                                                target="_blank"
                                              >
                                                <AttachFileIcon />
                                              </a>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })
                                ) : (
                                  <tr>
                                    <td className="fw-normal text-center col-1">
                                      No data Available
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    {comment == "empty" ? (
                      <Skeleton width={310} height={50} />
                    ) : (
                      "3- Site Visit"
                    )}
                  </th>
                  {screenWidth > 600 && (
                    <td colSpan={2} className="text-start">
                      {comment == "empty" ? (
                        <Skeleton width={50} height={50} />
                      ) : (
                        <button
                          type="button"
                          className={`hover_btn btn btn-primary d-print-none`}
                          id="btn3"
                          data-bs-toggle={"modal"}
                          data-bs-target={"#commentfield3"}
                          style={
                            taskdata.length > 0
                              ? taskdata[2].length == 0
                                ? { display: "unset" }
                                : { display: "none" }
                              : { display: "none" }
                          }
                        >
                          <CommentIcon />
                        </button>
                      )}
                    </td>
                  )}
                  <td scope="row" className="text-center col-3">
                    {screenWidth <= 600 && (
                      <>
                        <button
                          type="button"
                          className={`btn btn-primary btn-block d-print-none`}
                          id="btn3"
                          data-bs-toggle={"modal"}
                          data-bs-target={"#commentfield3"}
                          style={
                            taskdata.length > 0
                              ? taskdata[2].length == 0
                                ? { display: "unset" }
                                : { display: "none" }
                              : { display: "none" }
                          }
                        >
                          <CommentIcon />
                        </button>
                      </>
                    )}
                    {comment == "empty" ? (
                      <Skeleton className="mx-auto" width={60} height={50} />
                    ) : (
                      <button
                        className="btn btn-secondary btn-block d-print-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="true"
                        aria-controls="collapseThree"
                        controls="collapseThree"
                      >
                        <ExpandIcon />
                      </button>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="brdr_btm">
                    <div className="accordion" id="accordionExample3">
                      <div className=" ">
                        <div
                          id="collapseThree"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingThree"
                          data-bs-parent="#accordionExample3"
                        >
                          <div className=" " id="info">
                            <table className="table table-striped">
                              {taskdata.length > 0 ? (
                                taskdata[2].length > 0 ? (
                                  <thead>
                                    <tr>
                                      <th className="col-1 text-center">#</th>
                                      {screenWidth > 991 && (
                                        <th className="col-2 text-center">
                                          Date
                                        </th>
                                      )}
                                      <th className=" text-center">File</th>
                                    </tr>
                                  </thead>
                                ) : (
                                  <>
                                    <h6
                                      className={`text-center ms-auto ${
                                        comment["Site Visit"] && "d-none"
                                      }`}
                                      id="nodata3"
                                    >
                                      No data Available
                                    </h6>
                                    <div
                                      className="d-flex"
                                      style={{ marginLeft: "20px" }}
                                    >
                                      <table
                                        className={`table table-bordered border-dark ${
                                          comment["Site Visit"] == null
                                            ? "d-none"
                                            : null
                                        }`}
                                        id="table3"
                                      >
                                        <tbody>
                                          <tr>
                                            <th
                                              scope="row"
                                              className="col-2 table-active"
                                            >
                                              <h6> Comment:</h6>
                                            </th>
                                            <td
                                              className="col table-active"
                                              style={{ width: "100px" }}
                                            >
                                              <h6 id="comment3">
                                                {comment["Site Visit"]}
                                              </h6>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </>
                                )
                              ) : null}
                              <tbody>
                                {taskdata.length > 0 ? (
                                  taskdata[2].map((value, index) => {
                                    return (
                                      <tr>
                                        <td className="fw-normal text-center col-1">
                                          {screenWidth < 992 && <br />}
                                          {index + 1 + ")"}
                                        </td>
                                        {screenWidth > 991 && (
                                          <td className="col text-center">
                                            <div className="card">
                                              <div className="button btn text">
                                                {DateFormat(value.date)}
                                              </div>
                                            </div>
                                          </td>
                                        )}
                                        <td>
                                          <div className="card text-center d-flex text">
                                            <div className="button btn text">
                                              {screenWidth <= 991 && (
                                                <>
                                                  {DateFormat(value.date)}
                                                  <br />
                                                </>
                                              )}
                                              {value.title}
                                              <a
                                                href={`https://209.97.168.200/pacrawizpackv3/storage/app/storage/task_files/${value.task_file}`}
                                                style={{
                                                  textDecoration: "none",
                                                }}
                                                target="_blank"
                                              >
                                                <AttachFileIcon />
                                              </a>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })
                                ) : (
                                  <tr>
                                    <td className="fw-normal text-center col-1">
                                      No data Available
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    {comment == "empty" ? (
                      <Skeleton width={310} height={50} />
                    ) : (
                      "4- Management Meeting (MM)"
                    )}
                  </th>
                  {screenWidth > 600 && (
                    <td colSpan={2} className="text-start">
                      {comment == "empty" ? (
                        <Skeleton width={50} height={50} />
                      ) : (
                        <button
                          type="button"
                          className={`hover_btn btn btn-primary btn-block d-print-none`}
                          id="btn4"
                          data-bs-toggle={"modal"}
                          data-bs-target={"#commentfield4"}
                          style={
                            taskdata.length > 0
                              ? taskdata[3].length == 0
                                ? { display: "unset" }
                                : { display: "none" }
                              : { display: "none" }
                          }
                        >
                          <CommentIcon />
                        </button>
                      )}
                    </td>
                  )}
                  <td scope="row" className="text-center col-3">
                    {screenWidth <= 600 && (
                      <>
                        <button
                          type="button"
                          className={`btn btn-primary btn-block d-print-none`}
                          id="btn4"
                          data-bs-toggle={"modal"}
                          data-bs-target={"#commentfield4"}
                          style={
                            taskdata.length > 0
                              ? taskdata[3].length == 0
                                ? { display: "unset" }
                                : { display: "none" }
                              : { display: "none" }
                          }
                        >
                          <CommentIcon />
                        </button>
                      </>
                    )}
                    {comment == "empty" ? (
                      <Skeleton className="mx-auto" width={60} height={50} />
                    ) : (
                      <button
                        className="btn btn-secondary btn-block d-print-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="true"
                        aria-controls="collapseFour"
                        controls="collapseFour"
                      >
                        <ExpandIcon />
                      </button>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="brdr_btm">
                    <div className="accordion" id="accordionExample4">
                      <div className=" ">
                        {/* <h2 className="accordion-header" id="headingOne"> */}

                        {/* </h2> */}
                        <div
                          id="collapseFour"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingFour"
                          data-bs-parent="#accordionExample4"
                        >
                          <div className=" " id="info">
                            <table className="table table-striped">
                              {taskdata.length > 0 ? (
                                taskdata[3].length > 0 ? (
                                  <thead>
                                    <tr>
                                      <th className="col-1 text-center">#</th>
                                      {screenWidth > 991 && (
                                        <th className="col-2 text-center">
                                          Date
                                        </th>
                                      )}
                                      <th className=" text-center">File</th>
                                    </tr>
                                  </thead>
                                ) : (
                                  <>
                                    <h6
                                      className={`text-center ms-auto ${
                                        comment.MM && "d-none"
                                      }`}
                                      id="nodata4"
                                    >
                                      No data Available
                                    </h6>
                                    <div
                                      className="d-flex"
                                      style={{ marginLeft: "20px" }}
                                    >
                                      <table
                                        className={`table table-bordered border-dark ${
                                          comment.MM == null ? "d-none" : null
                                        }`}
                                        id="table4"
                                      >
                                        <tbody>
                                          <tr>
                                            <th
                                              scope="row"
                                              className="col-2 table-active"
                                            >
                                              <h6> Comment:</h6>
                                            </th>
                                            <td
                                              className="col table-active"
                                              style={{ width: "100px" }}
                                            >
                                              <h6 id="comment4">
                                                {comment.MM}
                                              </h6>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </>
                                )
                              ) : null}
                              <tbody>
                                {taskdata.length > 0 ? (
                                  taskdata[3].map((value, index) => {
                                    return (
                                      <tr>
                                        <td className="fw-normal text-center col-1">
                                          {screenWidth < 992 && <br />}
                                          {index + 1 + ")"}
                                        </td>
                                        {screenWidth > 991 && (
                                          <td className="col text-center">
                                            <div className="card text">
                                              <div className="button btn text">
                                                {DateFormat(value.date)}
                                              </div>
                                            </div>
                                          </td>
                                        )}
                                        <td>
                                          <div className="card text-center d-flex text">
                                            <div className="button btn text">
                                              {screenWidth <= 991 && (
                                                <>
                                                  {DateFormat(value.date)}
                                                  <br />
                                                </>
                                              )}
                                              {value.title}
                                              <a
                                                href={`https://209.97.168.200/pacrawizpackv3/storage/app/storage/task_files/${value.task_file}`}
                                                style={{
                                                  textDecoration: "none",
                                                }}
                                                target="_blank"
                                              >
                                                <AttachFileIcon />
                                              </a>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })
                                ) : (
                                  <tr>
                                    <td className="fw-normal text-center col-1">
                                      No data Available
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    {comment == "empty" ? (
                      <Skeleton width={310} height={50} />
                    ) : (
                      "5- Rating Committee (RC)"
                    )}
                  </th>
                  {screenWidth > 600 && (
                    <td colSpan={2} className="text-start">
                      {comment == "empty" ? (
                        <Skeleton width={50} height={50} />
                      ) : (
                        <button
                          type="button"
                          className={`hover_btn btn btn-primary btn-block d-print-none`}
                          id="btn5"
                          data-bs-toggle={"modal"}
                          data-bs-target={"#commentfield5"}
                          style={
                            taskdata.length > 0
                              ? taskdata[4].length == 0 && rc_data.length == 0
                                ? { display: "unset" }
                                : { display: "none" }
                              : { display: "none" }
                          }
                        >
                          <CommentIcon />
                        </button>
                      )}
                    </td>
                  )}
                  <td scope="row" className="text-center col-3">
                    {screenWidth <= 600 && (
                      <>
                        {console.log(rc_data.length, "log")}
                        <button
                          type="button"
                          className={`btn btn-primary btn-block d-print-none`}
                          id="btn5"
                          data-bs-toggle={"modal"}
                          data-bs-target={"#commentfield5"}
                          style={
                            taskdata.length > 0
                              ? taskdata[4].length == 0 && rc_data.length == 0
                                ? { display: "unset" }
                                : { display: "none" }
                              : { display: "none" }
                          }
                        >
                          <CommentIcon />
                        </button>
                      </>
                    )}
                    {comment == "empty" ? (
                      <Skeleton className="mx-auto" width={60} height={50} />
                    ) : (
                      <button
                        className="btn btn-secondary btn-block d-print-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFive"
                        aria-expanded="true"
                        aria-controls="collapseFive"
                        controls="collapseFive"
                      >
                        <ExpandIcon />
                      </button>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="brdr_btm">
                    <div className="accordion" id="accordionExample5">
                      <div className=" ">
                        {/* <h2 className="accordion-header" id="headingOne"> */}

                        {/* </h2> */}
                        <div
                          id="collapseFive"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingFive"
                          data-bs-parent="#accordionExample5"
                        >
                          <div className=" " id="info">
                            <table className="table table-striped">
                              {taskdata.length > 0 ? (
                                taskdata[4].length > 0 || rc_data.length > 0 ? (
                                  <thead>
                                    <tr>
                                      <th className="col-1 text-center">#</th>
                                      {screenWidth > 991 && (
                                        <th className="col-2 text-center">
                                          Date
                                        </th>
                                      )}
                                      <th className=" text-center">File</th>
                                    </tr>
                                  </thead>
                                ) : (
                                  <>
                                    <h6
                                      className={`text-center ms-auto ${
                                        comment.RC && "d-none"
                                      }`}
                                      id="nodata5"
                                    >
                                      No data Available
                                    </h6>
                                    <div
                                      className="d-flex"
                                      style={{ marginLeft: "20px" }}
                                    >
                                      <table
                                        className={`table table-bordered border-dark ${
                                          comment.RC == null ? "d-none" : null
                                        }`}
                                        id="table5"
                                      >
                                        <tbody>
                                          <tr>
                                            <th
                                              scope="row"
                                              className="col-2 table-active"
                                            >
                                              <h6> Comment:</h6>
                                            </th>
                                            <td
                                              className="col table-active"
                                              style={{ width: "100px" }}
                                            >
                                              <h6 id="comment5">
                                                {comment.RC}
                                              </h6>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </>
                                )
                              ) : null}
                              <tbody>
                                {rc_data.length > 0
                                  ? rc_data.map((value, index) => {
                                      return (
                                        <tr>
                                          <td className="fw-normal text-center col-1">
                                            {screenWidth < 992 && <br />}
                                            {index + 1 + ")"}
                                          </td>
                                          {screenWidth > 991 && (
                                            <td className="col text-center">
                                              <div className="card">
                                                <div className="button btn text">
                                                  {DateFormat(value.date)}
                                                </div>
                                              </div>
                                            </td>
                                          )}
                                          <td>
                                            <div className="card text-center d-flex text">
                                              <div className="button btn text">
                                                {screenWidth <= 991 && (
                                                  <>
                                                    {DateFormat(value.date)}
                                                    <br />
                                                  </>
                                                )}
                                                <a
                                                  href={`https://209.97.168.200/pacrawizpackv3/storage/app/${value.rc_cover_file}`}
                                                  style={{
                                                    textDecoration: "none",
                                                  }}
                                                  target="_blank"
                                                >
                                                  RC Cover
                                                </a>
                                                - {value.rc_type_status}
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    })
                                  : null}
                                {taskdata.length > 0 ? (
                                  taskdata[4].map((value, index) => {
                                    return (
                                      <tr>
                                        <td className="fw-normal text-center col-1">
                                          {screenWidth < 992 && <br />}
                                          {index + 1 + ")"}
                                        </td>
                                        {screenWidth > 991 && (
                                          <td className="col text text-center text">
                                            <div className="card text">
                                              <div className="button btn text">
                                                {DateFormat(value.date)}
                                              </div>
                                            </div>
                                          </td>
                                        )}
                                        <td>
                                          <div className="card text-center d-flex text">
                                            <div className="button btn text">
                                              {screenWidth <= 991 && (
                                                <>
                                                  {DateFormat(value.date)}
                                                  <br />
                                                </>
                                              )}
                                              {value.title}
                                              <a
                                                href={`https://209.97.168.200/pacrawizpackv3/storage/app/storage/task_files/${value.task_file}`}
                                                style={{
                                                  textDecoration: "none",
                                                }}
                                                target="_blank"
                                              >
                                                <AttachFileIcon />
                                              </a>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })
                                ) : (
                                  <tr>
                                    <td className="fw-normal text-center col-1">
                                      No data Available
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    {comment == "empty" ? (
                      <Skeleton width={310} height={50} />
                    ) : (
                      "6- Pre Publication Letter (PPL)"
                    )}
                  </th>
                  {screenWidth > 600 && (
                    <td colSpan={2} className="text-start">
                      {comment == "empty" ? (
                        <Skeleton width={50} height={50} />
                      ) : (
                        <button
                          type="button"
                          className={`hover_btn btn btn-primary btn-block d-print-none`}
                          id="btn6"
                          data-bs-toggle={"modal"}
                          data-bs-target={"#commentfield6"}
                          style={
                            data[0] && data[0].ppl_date == null
                              ? { display: "unset" }
                              : { display: "none" }
                          }
                        >
                          <CommentIcon />
                        </button>
                      )}
                    </td>
                  )}
                  <td scope="row" className="text-center col-3">
                    {screenWidth <= 600 && (
                      <>
                        <button
                          type="button"
                          className={`btn btn-primary btn-block d-print-none`}
                          id="btn6"
                          data-bs-toggle={"modal"}
                          data-bs-target={"#commentfield6"}
                          style={
                            data[0] && data[0].ppl_date == null
                              ? { display: "unset" }
                              : { display: "none" }
                          }
                        >
                          <CommentIcon />
                        </button>
                      </>
                    )}
                    {comment == "empty" ? (
                      <Skeleton className="mx-auto" width={60} height={50} />
                    ) : (
                      <button
                        className="btn btn-secondary btn-block d-print-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseSix"
                        aria-expanded="true"
                        aria-controls="collapseSix"
                        controls="collapseSix"
                      >
                        <ExpandIcon />
                      </button>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="brdr_btm">
                    <div className="accordion" id="accordionExample6">
                      <div className=" ">
                        {/* <h2 className="accordion-header" id="headingOne"> */}

                        {/* </h2> */}
                        <div
                          id="collapseSix"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingSix"
                          data-bs-parent="#accordionExample6"
                        >
                          <div className=" " id="info">
                            <table className="table table-striped">
                              {data[0] && data[0].ppl_date !== null ? (
                                <thead>
                                  <tr>
                                    <th className="col-1 text-center">#</th>
                                    {screenWidth > 991 && (
                                      <th className="col-2 text-center">
                                        Date
                                      </th>
                                    )}
                                    <th className=" text-center">File</th>
                                  </tr>
                                </thead>
                              ) : (
                                <>
                                  <h6
                                    className={`text-center ms-auto ${
                                      comment.PPL && "d-none"
                                    }`}
                                    id="nodata6"
                                  >
                                    No data Available
                                  </h6>
                                  <div
                                    className="d-flex"
                                    style={{ marginLeft: "20px" }}
                                  >
                                    <table
                                      className={`table table-bordered border-dark ${
                                        comment.PPL == null ? "d-none" : null
                                      }`}
                                      id="table6"
                                    >
                                      <tbody>
                                        <tr>
                                          <th
                                            scope="row"
                                            className="col-2 table-active"
                                          >
                                            <h6> Comment:</h6>
                                          </th>
                                          <td
                                            className="col table-active"
                                            style={{ width: "100px" }}
                                          >
                                            <h6 id="comment6">{comment.PPL}</h6>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </>
                              )}
                              {data[0] && data[0].ppl_date !== null ? (
                                <tbody>
                                  <tr>
                                    <td className="fw-normal text-center col-1">
                                      1)
                                    </td>
                                    {screenWidth > 991 && (
                                      <td className="text-center">
                                        <div className="card">
                                          <div className="button btn text">
                                            {data[0]
                                              ? DateFormat(data[0].ppl_date)
                                              : null}
                                          </div>
                                        </div>
                                      </td>
                                    )}
                                    <td>
                                      <div className="card text-center d-flex">
                                        <div className="button btn text">
                                          {screenWidth <= 991 && (
                                            <>
                                              {data[0]
                                                ? DateFormat(data[0].ppl_date)
                                                : null}
                                            </>
                                          )}
                                          <a
                                            href={
                                              data[0]
                                                ? `https://209.97.168.200/pacrawizpackv3/public/admin/viewppl/${data[0].ppl_doc}`
                                                : null
                                            }
                                            style={{ textDecoration: "none" }}
                                            target="_blank"
                                          >
                                            <AttachFileIcon />
                                          </a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              ) : null}
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    {comment == "empty" ? (
                      <Skeleton width={310} height={50} />
                    ) : (
                      "7- Notification Letter (NL)"
                    )}
                  </th>
                  {screenWidth > 600 && (
                    <td colSpan={2} className="text-start">
                      {comment == "empty" ? (
                        <Skeleton width={50} height={50} />
                      ) : (
                        <button
                          type="button"
                          className={`hover_btn btn btn-primary btn-block d-print-none`}
                          id="btn7"
                          data-bs-toggle={"modal"}
                          data-bs-target={"#commentfield7"}
                          style={
                            data[0] && data[0].notification_date == null
                              ? { display: "unset" }
                              : { display: "none" }
                          }
                        >
                          <CommentIcon />
                        </button>
                      )}
                    </td>
                  )}
                  <td scope="row" className="text-center col-3">
                    {screenWidth <= 600 && (
                      <>
                        <button
                          type="button"
                          className={`btn btn-primary btn-block d-print-none`}
                          id="btn7"
                          data-bs-toggle={"modal"}
                          data-bs-target={"#commentfield7"}
                          style={
                            data[0] && data[0].notification_date == null
                              ? { display: "unset" }
                              : { display: "none" }
                          }
                        >
                          <CommentIcon />
                        </button>
                      </>
                    )}
                    {comment == "empty" ? (
                      <Skeleton className="mx-auto" width={60} height={50} />
                    ) : (
                      <button
                        className="btn btn-secondary btn-block d-print-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseSeven"
                        aria-expanded="true"
                        aria-controls="collapseSeven"
                        controls="collapseSeven"
                      >
                        <ExpandIcon />
                      </button>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="brdr_btm">
                    <div className="accordion" id="accordionExample7">
                      <div className=" ">
                        {/* <h2 className="accordion-header" id="headingOne"> */}

                        {/* </h2> */}
                        <div
                          id="collapseSeven"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingSeven"
                          data-bs-parent="#accordionExample7"
                        >
                          <div className=" " id="info">
                            <table className="table table-striped">
                              {data[0] && data[0].notification_date !== null ? (
                                <thead>
                                  <tr>
                                    <th className="col-1 text-center">#</th>
                                    {screenWidth > 991 && (
                                      <th className="col-2 text-center">
                                        Date
                                      </th>
                                    )}
                                    <th className=" text-center">File</th>
                                  </tr>
                                </thead>
                              ) : (
                                <>
                                 <h6 className={`text-center ms-auto ${comment.NL && 'd-none'}`} id="nodata7"> No data Available</h6>
                                  <div
                                    className="d-flex"
                                    style={{ marginLeft: "20px" }}
                                  >
                                    <table
                                      className={`table table-bordered border-dark ${
                                        comment.NL == null ? "d-none" : null
                                      }`}
                                      id="table7"
                                    >
                                      <tbody>
                                        <tr>
                                          <th
                                            scope="row"
                                            className="col-2 table-active"
                                          >
                                            <h6> Comment:</h6>
                                          </th>
                                          <td
                                            className="col table-active"
                                            style={{ width: "100px" }}
                                          >
                                            <h6 id="comment7">{comment.NL}</h6>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </>
                              )}
                              {data[0] && data[0].notification_date !== null ? (
                                <tbody>
                                  <tr>
                                    <td className="fw-normal text-center col-1">
                                      1)
                                    </td>
                                    {screenWidth > 991 && (
                                      <td className="col-2 text-center">
                                        <div className="card">
                                          <div className="button btn text">
                                            {data[0]
                                              ? DateFormat(
                                                  data[0].notification_date
                                                )
                                              : null}
                                          </div>
                                        </div>
                                      </td>
                                    )}
                                    <td>
                                      <div className="card text-center d-flex">
                                        <div className="button btn text">
                                          {screenWidth <= 991 && (
                                            <>
                                              {data[0]
                                                ? DateFormat(
                                                    data[0].notification_date
                                                  )
                                                : null}
                                            </>
                                          )}
                                          <a
                                            href={
                                              data[0]
                                                ? data[0].ratingUpdateType_title == "Biannual "? `https://209.97.168.200/pacrawizpackv3/public/admin/prnpriview/${og_rating_id}/${client_id}` : `https://209.97.168.200/pacrawizpackv3/public/admin/viewnl/${client_id}/${og_rating_id}`
                                                : null
                                            }
                                            style={{ textDecoration: "none" }}
                                            target="_blank"
                                          >
                                            <AttachFileIcon />
                                          </a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              ) : null}
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    {comment == "empty" ? (
                      <Skeleton width={310} height={50} />
                    ) : (
                      "8- Press Release (PR)"
                    )}
                  </th>
                  {screenWidth > 600 && (
                    <td colSpan={2} className="text-start">
                      {comment == "empty" ? (
                        <Skeleton width={50} height={50} />
                      ) : (
                        <button
                          type="button"
                          className={`hover_btn btn btn-primary btn-block d-print-none`}
                          id="btn10"
                          data-bs-toggle={"modal"}
                          data-bs-target={"#commentfield10"}
                          style={
                            data[0] && data[0].p_release_upload_date == null
                              ? { display: "unset" }
                              : { display: "none" }
                          }
                        >
                          <CommentIcon />
                        </button>
                      )}
                    </td>
                  )}
                  <td scope="row" className="text-center col-3">
                    {screenWidth <= 600 && (
                      <>
                        <button
                          type="button"
                          className={`btn btn-primary btn-block d-print-none`}
                          id="btn10"
                          data-bs-toggle={"modal"}
                          data-bs-target={"#commentfield10"}
                          style={
                            data[0] && data[0].p_release_upload_date == null
                              ? { display: "unset" }
                              : { display: "none" }
                          }
                        >
                          <CommentIcon />
                        </button>
                      </>
                    )}
                    {comment == "empty" ? (
                      <Skeleton className="mx-auto" width={60} height={50} />
                    ) : (
                      <button
                        className="btn btn-secondary btn-block d-print-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTen"
                        aria-expanded="true"
                        aria-controls="collapseTen"
                        controls="collapseTen"
                      >
                        <ExpandIcon />
                      </button>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="brdr_btm">
                    <div className="accordion" id="accordionExample8">
                      <div className=" ">
                        {/* <h2 className="accordion-header" id="headingOne"> */}

                        {/* </h2> */}
                        <div
                          id="collapseTen"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingTen"
                          data-bs-parent="#accordionExample8"
                        >
                          <div className=" " id="info">
                            <table className="table table-striped">
                              {data[0] &&
                              data[0].p_release_upload_date !== null ? (
                                <thead>
                                  <tr>
                                    <th className="col-1 text-center">#</th>
                                    {screenWidth > 991 && (
                                      <th className="col-2 text-center">
                                        Date
                                      </th>
                                    )}
                                    <th className=" text-center">File</th>
                                  </tr>
                                </thead>
                              ) : (
                                <>
                                  <h6
                                    className={`text-center ms-auto ${
                                      comment["Press Release"] && "d-none"
                                    }`}
                                    id="nodata10"
                                  >
                                    No data Available
                                  </h6>
                                  <div
                                    className="d-flex"
                                    style={{ marginLeft: "20px" }}
                                  >
                                    <table
                                      className={`table table-bordered border-dark ${
                                        comment["Press Release"] == null
                                          ? "d-none"
                                          : null
                                      }`}
                                      id="table10"
                                    >
                                      <tbody>
                                        <tr>
                                          <th
                                            scope="row"
                                            className="col-2 table-active"
                                          >
                                            <h6> Comment:</h6>
                                          </th>
                                          <td
                                            className="col table-active"
                                            style={{ width: "100px" }}
                                          >
                                            <h6 id="comment10">
                                              {comment["Press Release"]}
                                            </h6>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </>
                              )}
                              {data[0] &&
                              data[0].p_release_upload_date !== null ? (
                                <tbody>
                                  <tr>
                                    <td className="fw-normal text-center col-1">
                                      1)
                                    </td>

                                    {screenWidth > 991 && (
                                      <td className="col-2 text-center">
                                        <div className="card">
                                          <div className="button btn text">
                                            {data[0]
                                              ? DateFormat(
                                                  data[0].p_release_upload_date
                                                )
                                              : null}
                                          </div>
                                        </div>
                                      </td>
                                    )}
                                    <td>
                                      <div className="card text-center d-flex">
                                        <div className="button btn text">
                                          {screenWidth <= 991 && (
                                            <>
                                              {data[0]
                                                ? DateFormat(
                                                    data[0]
                                                      .dissemination_date
                                                  )
                                                : null}
                                            </>
                                          )}
                                          <a
                                            href={
                                              data[0]
                                                ? `https://209.97.168.200/pacrawizpackv3/public/admin/finalPr/${og_rating_id}`
                                                : null
                                            }
                                            style={{ textDecoration: "none" }}
                                            target="_blank"
                                          >
                                            <AttachFileIcon />
                                          </a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              ) : null}
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    {comment == "empty" ? (
                      <Skeleton width={310} height={50} />
                    ) : (
                      "9- Rating Report (RR)"
                    )}
                  </th>
                  {screenWidth > 600 && (
                    <td colSpan={2} className="text-start">
                      {comment == "empty" ? (
                        <Skeleton width={50} height={50} />
                      ) : (
                        <button
                          type="button"
                          className={`hover_btn btn btn-primary btn-block d-print-none`}
                          id="btn8"
                          data-bs-toggle={"modal"}
                          data-bs-target={"#commentfield8"}
                          style={
                            data[0] && data[0].rr_date == null
                              ? { display: "unset" }
                              : { display: "none" }
                          }
                        >
                          <CommentIcon />
                        </button>
                      )}
                    </td>
                  )}
                  <td scope="row" className="text-center col-3">
                    {screenWidth <= 600 && (
                      <>
                        <button
                          type="button"
                          className={`btn btn-primary btn-block d-print-none`}
                          id="btn8"
                          data-bs-toggle={"modal"}
                          data-bs-target={"#commentfield8"}
                          style={
                            data[0] && data[0].rr_date == null
                              ? { display: "unset" }
                              : { display: "none" }
                          }
                        >
                          <CommentIcon />
                        </button>
                      </>
                    )}
                    {comment == "empty" ? (
                      <Skeleton className="mx-auto" width={60} height={50} />
                    ) : (
                      <button
                        className="btn btn-secondary btn-block d-print-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseEight"
                        aria-expanded="true"
                        aria-controls="collapseEight"
                        controls="collapseEight"
                      >
                        <ExpandIcon />
                      </button>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="brdr_btm">
                    <div className="accordion" id="accordionExample9">
                      <div className=" ">
                        <div
                          id="collapseEight"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingEight"
                          data-bs-parent="#accordionExample9"
                        >
                          <div className=" " id="info">
                            <table className="table table-striped">
                              {data[0] && data[0].rr_date !== null ? (
                                <thead>
                                  <tr>
                                    <th className="col-1 text-center">#</th>
                                    {screenWidth > 991 && (
                                      <th className="col-2 text-center">
                                        Date
                                      </th>
                                    )}
                                    <th className=" text-center">File</th>
                                  </tr>
                                </thead>
                              ) : (
                                <>
                                  <h6
                                    className={`text-center ms-auto ${
                                      comment.RR && "d-none"
                                    }`}
                                    id="nodata8"
                                  >
                                    No data Available
                                  </h6>
                                  <div
                                    className="d-flex"
                                    style={{ marginLeft: "20px" }}
                                  >
                                    <table
                                      className={`table table-bordered border-dark ${
                                        comment.RR == null ? "d-none" : null
                                      }`}
                                      id="table8"
                                    >
                                      <tbody>
                                        <tr>
                                          <th
                                            scope="row"
                                            className="col-2 table-active"
                                          >
                                            <h6> Comment:</h6>
                                          </th>
                                          <td
                                            className="col table-active"
                                            style={{ width: "100px" }}
                                          >
                                            <h6 id="comment8">{comment.RR}</h6>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </>
                              )}
                              {data[0] && data[0].rr_date !== null ? (
                                <tbody>
                                  <tr>
                                    <td className="fw-normal text-center col-1">
                                      1)
                                    </td>
                                    {screenWidth > 991 && (
                                      <td className="col-2 text-center">
                                        <div className="card">
                                          <div className="button btn text">
                                            {data[0]
                                              ? DateFormat(data[0].rr_date)
                                              : null}
                                          </div>
                                        </div>
                                      </td>
                                    )}
                                    <td>
                                      <div className="card text-center d-flex">
                                        <div className="button btn text">
                                          {screenWidth <= 991 && (
                                            <>
                                              {data[0]
                                                ? DateFormat(data[0].rr_date)
                                                : null}
                                            </>
                                          )}
                                          <a
                                            href={
                                              data[0]
                                                ? `https://209.97.168.200/pacrawizpackv3/storage/app/${data[0].rr_file}`
                                                : null
                                            }
                                            style={{
                                              textDecoration: "none",
                                            }}
                                            target="_blank"
                                          >
                                            <AttachFileIcon />
                                          </a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              ) : null}
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    {comment == "empty" ? (
                      <Skeleton width={310} height={50} />
                    ) : (
                      "10- Risk Evaluation Documents (RED)"
                    )}
                  </th>
                  {screenWidth > 600 && (
                    <td colSpan={2} className="text-start">
                      {comment == "empty" ? (
                        <Skeleton width={50} height={50} />
                      ) : (
                        <button
                          type="button"
                          className={`hover_btn btn btn-primary btn-block d-print-none `}
                          id="btn9"
                          data-bs-toggle={"modal"}
                          data-bs-target={"#commentfield9"}
                          style={
                            taskdata.length > 0
                              ? taskdata[5].length == 0
                                ? { display: "unset" }
                                : { display: "none" }
                              : { display: "none" }
                          }
                        >
                          <CommentIcon />
                        </button>
                      )}
                    </td>
                  )}
                  <td scope="row" className="text-center col-3">
                    {screenWidth <= 600 && (
                      <>
                        <button
                          type="button"
                          className={`btn btn-primary btn-block d-print-none ${
                            screenWidth > 600 && red == false
                              ? "disabled"
                              : null
                          }`}
                          id="btn9"
                          data-bs-toggle={screenWidth < 600 && "modal"}
                          data-bs-target={screenWidth < 600 && "#commentfield9"}
                          style={
                            taskdata.length > 0
                              ? taskdata[5].length == 0
                                ? { display: "unset" }
                                : { display: "none" }
                              : { display: "none" }
                          }
                        >
                          <CommentIcon />
                        </button>
                      </>
                    )}
                    {comment == "empty" ? (
                      <Skeleton className="mx-auto" width={60} height={50} />
                    ) : (
                      <button
                        className="btn btn-secondary btn-block d-print-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseNine"
                        aria-expanded="true"
                        aria-controls="collapseNine"
                        controls="collapseNine"
                      >
                        <ExpandIcon />
                      </button>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="brdr_btm">
                    <div className="accordion" id="accordionExample10">
                      <div className=" ">
                        <div
                          id="collapseNine"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingNine"
                          data-bs-parent="#accordionExample10"
                        >
                          <div className=" " id="info">
                            <table className="table table-striped">
                              {taskdata.length > 0 ? (
                                taskdata[5].length > 0 ? (
                                  <thead>
                                    <tr>
                                      <th className="col-1 text-center">#</th>
                                      {screenWidth > 991 && (
                                        <th className="col-2 text-center">
                                          Date
                                        </th>
                                      )}
                                      <th className=" text-center">File</th>
                                    </tr>
                                  </thead>
                                ) : (
                                  <>
                                    <h6
                                      className={`text-center ms-auto ${
                                        comment.RED && "d-none"
                                      }`}
                                      id="nodata9"
                                    >
                                      No data Available
                                    </h6>
                                    <div
                                      className="d-flex"
                                      style={{ marginLeft: "20px" }}
                                    >
                                      <table
                                        className={`table table-bordered border-dark ${
                                          comment.RED == null ? "d-none" : null
                                        }`}
                                        id="table9"
                                      >
                                        <tbody>
                                          <tr>
                                            <th
                                              scope="row"
                                              className="col-2 table-active"
                                            >
                                              <h6> Comment:</h6>
                                            </th>
                                            <td
                                              className="col table-active"
                                              style={{ width: "100px" }}
                                            >
                                              <h6 id="comment9">
                                                {comment.RED}
                                              </h6>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </>
                                )
                              ) : null}
                              <tbody>
                                {taskdata.length > 0 ? (
                                  taskdata[5].map((value, index) => {
                                    return (
                                      <tr>
                                        <td className="fw-normal text-center col-1">
                                          {screenWidth < 992 && <br />}
                                          {index + 1 + ")"}
                                        </td>
                                        {screenWidth > 991 && (
                                          <td className="col text-center">
                                            <div className="card">
                                              <div className="button btn text">
                                                {DateFormat(value.date)}
                                              </div>
                                            </div>
                                          </td>
                                        )}
                                        <td>
                                          <div className="card text-center d-flex">
                                            <div className="button btn text">
                                              {screenWidth <= 991 && (
                                                <>
                                                  {DateFormat(value.date)}
                                                  <br />
                                                </>
                                              )}
                                              {value.title}
                                              <a
                                                href={`https://209.97.168.200/pacrawizpackv3/storage/app/storage/task_files/${value.task_file}`}
                                                style={{
                                                  textDecoration: "none",
                                                }}
                                                target="_blank"
                                              >
                                                <AttachFileIcon />
                                              </a>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })
                                ) : (
                                  <tr>
                                    <td className="fw-normal text-center col-1">
                                      No data Available
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </>
              {/* )} */}
            </tbody>
          </table>
        </div>

        {/* <div className="row mx-auto my-5 borderr p-3">

        <Box sx={{ width: '100%', top:"0" }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
      <Collapse in={opens}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpens(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
      </Box>
          <div className="row mx-auto">
            <div className="col-2 mb-1">
              <label>Prepared By:</label>
            </div>
            <div className="col-4 mb-1">
              <input
                className="form-control mb-2 forminput"
                type="text"
                value={data[0] ? data[0].username : null}
                placeholder="......"
                aria-label=".form-control-sm example"
                disabled
              />
            </div>
            <div className="col-2 mb-1">
              <label>Reviewed / Approved BY:</label>
            </div>
            <div className="col-4 mb-1">
              <input
                className="form-control mb-2 forminput"
                type="text"
                value={data[0] ? data[0].manager_name : null}
                placeholder="......"
                aria-label=".form-control-sm example"
                disabled
              />
            </div>
          </div>
          <div className="row mx-auto">
            <div className="col-2 mb-1">
              <label>Signature:</label>
            </div>
            <div className="col-4 mb-1" id="sign1">
              <input
                className="form-control mb-2 forminput"
                type="text"
                placeholder="......"
                aria-label=".form-control-sm example"
              />            
            </div>
            <div className="col-2 mb-1">
              <label>Signature:</label>
            </div>
            <div className="col-4 mb-1" id="sign2">
              <input
                className="form-control mb-2 forminput"
                type="text"
                placeholder="......"
                aria-label=".form-control-sm example"
              />
            </div>
          </div>
          <div className="row mx-auto">
            <div className="col-2 mb-1">
              <label>Date</label>
            </div>
            <div className="col-4 mb-1">
              <input
                className="form-control mb-2 forminput"
                type="text"
                id="submit"
                
                placeholder="......"
                aria-label=".form-control-sm example"
              />
            </div>
            <div className="col-2 mb-1">
              <label>Date:</label>
            </div>
            <div className="col-4 mb-1">
              <input
                className="form-control mb-2 forminput"
                type="text"
                id="approve"
                placeholder="......"
                aria-label=".form-control-sm example"
              />
            </div>
          </div>
        </div> */}
      </div>
      {/* <h5 className="mb-2 text-center">Notes for File Closure Form</h5> */}
      {/* <div className="borderr p-3">
        <b>N-1)</b> Mode of communication of information is other than email
        <b>i.e.;</b> via courier or hand delivered documents by client. <br />
        <b>N-2)</b> RC pack has to be exact replica of what has been shared with
        RC members before, during and after RC.
        <br />
        <b>N-3)</b> For <b>AMR</b>, Fund performance to be added in PACRA Excel
        format section.
        <br />
        <b>N-4)</b> Entity rating includes <b>AMR</b> |Asset Manager Rating,
        <b>BMR</b> |Broker Management Rating, <b>IFS</b> |Insurance Financial
        strength Rating. <br />
        <b>N-5) Other Information includes : (a)</b> Information received from
        client directly
        <b> (b)</b> Information received from other sources i.e.: PSX etc.
        <br />
        <b>N-6) Other Financial Information includes :</b> Projections,
        Management accounts, PPT etc.
        <br />
        <b>N-7) Site Visit:</b> Please mention last SV-date and also reason why
        not it has been done for two years.
        <br />
        <b>N-8)</b> In case of multiple information received input date of
        latest email received from client. <br />
        <b>N-9) For Funds |</b>File closure form is not applicable on Mutual
        Funds.
      </div> */}
      <br />
      <div>
        <Box sx={{ width: "100%", top: "0" }}>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {message}
            </Alert>
          </Collapse>
          <Collapse in={opens}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpens(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {message}
            </Alert>
          </Collapse>
        </Box>
        {comment == "empty" ? (
          <>
            <div className="text-center"> </div>
          </>
        ) : data[0] ? (
          data[0].notification_date !== null ? (
            rc_sign_data !== false ? (
              <div className="text-center w-100">
                {data[0] ? (
                  localStorage.getItem("id") == data[0].analyst_id &&
                  localStorage.getItem("id") !== data[0].manager_id ? (
                    <button
                      className="btn btn-primary d-print-none"
                      id="submitform"
                      onClick={submit}
                    >
                      {submitstatus == false ||
                      submitstatus == null ||
                      submitstatus == undefined
                        ? "Submit"
                        : "Resubmit"}
                    </button>
                  ) : null
                ) : null}
                {data[0] ? (
                  id == data[0].manager_id || id == data[0].unit_head_id ? (
                    <>
                      <button
                        className="btn btn-danger d-print-none me-3"
                        // onClick={decline}
                        style={{ display: "none" }}
                        data-bs-toggle="modal"
                        data-bs-target="#declinesubmit"
                        id="declineform"
                      >
                        Decline
                      </button>
                      <button
                        className="btn btn-primary d-print-none"
                        id="submitform"
                        onClick={submit}
                      >
                        Submit
                      </button>
                      <button
                        className="btn btn-success d-print-none ms-3"
                        id="approveform"
                        onClick={approve}
                      >
                        Approve
                      </button>
                    </>
                  ) : null
                ) : null}
              </div>
            ) : (
              <Alert severity="error">
                <AlertTitle>Restricted</AlertTitle>
                RC signatures missing — <strong>check it out!</strong>
              </Alert>
            )
          ) : (
            <Alert severity="error">
              <AlertTitle>Restricted</AlertTitle>
              NL Approval Missing — <strong>check it out!</strong>
            </Alert>
          )
        ) : null}
        <div
          className="modal fade"
          id="declinesubmit"
          tabIndex="-1"
          aria-labelledby="declinesubmit"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Comment
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div id="message"></div>
                <textarea
                  className="form-control"
                  maxLength="150"
                  minLength="10"
                  id="comment-box"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  id="btnbtn"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    if (
                      document.getElementById("comment-box").value.trim() == ""
                    ) {
                      document.getElementById(
                        "message"
                      ).innerHTML = `<div className="alert alert-dismissible alert-danger" role="alert">
              Can't send Empty Comment
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;
                    } else {
                      decline();
                    }
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <>
          <div
            className="modal fade"
            id="commentfield1"
            tabIndex="-1"
            aria-labelledby="commentfield1"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Comment
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div id="message"></div>
                  <textarea
                    className="form-control"
                    maxLength="150"
                    defaultValue={comment.Information}
                    minLength="10"
                    id="Information"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    id="btnclose1"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      click([
                        document.getElementById("Information"),
                        document.getElementById("btn1"),
                      ]);
                      clickupdate();
                      document.getElementById("btnclose1").click();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="commentfield2"
            tabIndex="-1"
            aria-labelledby="commentfield2"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Comment
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div id="message"></div>
                  <textarea
                    className="form-control"
                    defaultValue={comment.Assessment}
                    maxLength="150"
                    minLength="10"
                    id="Assessment"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    id="btnclose2"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      click([
                        document.getElementById("Assessment"),
                        document.getElementById("btn2"),
                      ]);
                      clickupdate();
                      document.getElementById("btnclose2").click();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="commentfield3"
            tabIndex="-1"
            aria-labelledby="commentfield3"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Comment
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div id="message"></div>
                  <textarea
                    className="form-control"
                    defaultValue={comment["Site Visit"]}
                    maxLength="150"
                    minLength="10"
                    id="Site Visit"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    id="btnclose3"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      click([
                        document.getElementById("Site Visit"),
                        document.getElementById("btn3"),
                      ]);
                      clickupdate();
                      document.getElementById("btnclose3").click();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="commentfield4"
            tabIndex="-1"
            aria-labelledby="commentfield4"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Comment
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div id="message"></div>
                  <textarea
                    className="form-control"
                    maxLength="150"
                    defaultValue={comment.MM}
                    minLength="10"
                    id="MM"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    id="btnclose4"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      click([
                        document.getElementById("MM"),
                        document.getElementById("btn4"),
                      ]);
                      clickupdate();
                      document.getElementById("btnclose4").click();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="commentfield5"
            tabIndex="-1"
            aria-labelledby="commentfield5"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Comment
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div id="message"></div>
                  <textarea
                    className="form-control"
                    defaultValue={comment.RC}
                    maxLength="150"
                    minLength="10"
                    id="RC"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    id="btnclose5"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      click([
                        document.getElementById("RC"),
                        document.getElementById("btn5"),
                      ]);
                      clickupdate();
                      document.getElementById("btnclose5").click();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="commentfield6"
            tabIndex="-1"
            aria-labelledby="commentfield6"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Comment
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div id="message"></div>
                  <textarea
                    className="form-control"
                    maxLength="150"
                    defaultValue={comment.PPL}
                    minLength="10"
                    id="PPL"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    id="btnclose6"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      click([
                        document.getElementById("PPL"),
                        document.getElementById("btn6"),
                      ]);
                      clickupdate();
                      document.getElementById("btnclose6").click();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="commentfield7"
            tabIndex="-1"
            aria-labelledby="commentfield7"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Comment
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div id="message"></div>
                  <textarea
                    className="form-control"
                    defaultValue={comment.NL}
                    maxLength="150"
                    minLength="10"
                    id="NL"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    id="btnclose7"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      click([
                        document.getElementById("NL"),
                        document.getElementById("btn7"),
                      ]);
                      clickupdate();
                      document.getElementById("btnclose7").click();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="commentfield8"
            tabIndex="-1"
            aria-labelledby="commentfield8"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Comment
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div id="message"></div>
                  <textarea
                    className="form-control"
                    defaultValue={comment.RR}
                    maxLength="150"
                    minLength="10"
                    id="RR"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    id="btnclose8"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      click([
                        document.getElementById("RR"),
                        document.getElementById("btn8"),
                      ]);
                      clickupdate();
                      document.getElementById("btnclose8").click();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="commentfield9"
            tabIndex="-1"
            aria-labelledby="commentfield9"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Comment
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div id="message"></div>
                  <textarea
                    className="form-control"
                    defaultValue={comment.RED}
                    maxLength="150"
                    minLength="10"
                    id="RED"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    id="btnclose9"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      click([
                        document.getElementById("RED"),
                        document.getElementById("btn9"),
                      ]);
                      clickupdate();
                      document.getElementById("btnclose9").click();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="commentfield10"
            tabIndex="-1"
            aria-labelledby="commentfield10"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Comment
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div id="message"></div>
                  <textarea
                    className="form-control"
                    defaultValue={comment["Press Release"]}
                    maxLength="150"
                    minLength="10"
                    id="Press Release"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    id="btnclose10"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      click([
                        document.getElementById("Press Release"),
                        document.getElementById("btn10"),
                      ]);
                      clickupdate();
                      document.getElementById("btnclose10").click();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
      </div> : data[0] !== undefined ? id == data[0].analyst_id ? `Login as ${data[0].username} to view Form` :
       id == data[0].manager_id ? `Login as ${data[0].manager_name} to view Form` : 
       id == data[0].unit_head_id ? `Login as ${data[0].lead_name} to view Form`: "Invalid User ID or File Closure is not Approved yet" : `Data not Loaded`: `Data not Loaded`}

    </div>
  );
}
