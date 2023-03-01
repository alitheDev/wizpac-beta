import axios from "axios";

class GetData {
  GetOpinion = () => {
    // ,alert('1')
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/getOpinionsList")
        .catch(function (error) {
          console.log(error);
        });

      return resp;
    };
    return res();
  };
  BusinessGridData = () => {
    // ,alert('1')
    const res = async () => {
      const resp = await axios
        .get("http://127.0.0.1:8000/api/businessmainGrid")
        .catch(function (error) {
          console.log(error);
        });

      return resp;
    };
    return res();
  };
  PacVisIndexData = () => {
    // ,alert('1')
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/pac-vis-index")
        .catch(function (error) {
          console.log(error);
        });

      return resp;
    };
    return res();
  };
  OutstandingData = () => {
    // ,alert('1')
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/outstanding")
        .catch(function (error) {
          console.log(error);
        });

      return resp;
    };
    return res();
  };
  InProcess = () => {
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/in-process")
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  UnFinished = () => {
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/un-finished")
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    // console.log(res(), "this is my unfinished");
    return res();
  };
  InHandBook = () => {
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/in-hand-book")
        .catch(function (error) {
          console.log(error);
        });
      // console.log(resp, 'inhandBook')
      return resp;
    };
    return res();
  };
  GoneBook = () => {
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/gone-book")
        .catch(function (error) {
          console.log(error);
        });
      // console.log(resp, 'GoneBook')
      return resp;
    };
    return res();
  };
  Initial = () => {
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/initial")
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };

  InMNA = () => {
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/mna")
        .catch(function (error) {
          console.log(error);
        });
      // console.log(resp, 'mnaarray')
      return resp;
    };
    return res();
  };

  InCob = () => {
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/cob")
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };

  InICU = () => {
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/icu")
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };

  InRIP = () => {
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/rip")
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };

  Withdraw = () => {
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/withdraw")
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };

  Sector = () => {
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/sector")
        .catch(function (error) {
          console.log(error);
        });

      // console.log(resp,'sector')
      return resp;
    };
    return res();
  };

  Inst = () => {
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/inst")
        .catch(function (error) {
          console.log(error);
        });
      // console.log(resp,"instantt")
      return resp;
    };
    return res();
  };

  InstP = () => {
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/instp")
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  AddressBook = () => {
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/address-book")
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  PvtRatings = () => {
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/pvt-ratings")
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  Policy = () => {
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/policy")
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  OtherCRA = () => {
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/otherCRA")
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  DeadlineRc = () => {
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/deadline-rc")
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  DeadlineDissemination = () => {
    const res = async () => {
      const resp = await axios
        .get(
          "https://209.97.168.200/pacrawizpackv3/public/api/deadline-dissemination"
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  DeadlineIc = () => {
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/deadline-ic")
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  DeadlineFc = () => {
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/deadline-fc")
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  DoneRc = () => {
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/done-rc")
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  DoneDissemination = () => {
    const res = async () => {
      const resp = await axios
        .get(
          "https://209.97.168.200/pacrawizpackv3/public/api/done-dissemination"
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  DoneIc = () => {
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/done-ic")
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  DoneFc = () => {
    const res = async () => {
      const resp = await axios
        .get("https://209.97.168.200/pacrawizpackv3/public/api/done-fc")
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  OpinionDetailsApi = (OpinionId) => {
    const res = async () => {
      const resp = await axios
        .get(`https://209.97.168.200/pacrawizpackv3/public/api/opinion/${OpinionId}`)
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  OpinionDetailsTblOneApi = (OpinionId) => {
    const res = async () => {
      const resp = await axios
        .get(`https://209.97.168.200/pacrawizpackv3/public/api/opinion/details/${OpinionId}`)
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  GroupDetailsTable = (OpinionId) => {
    const res = async () => {
      const resp = await axios
        .get(`https://209.97.168.200/pacrawizpackv3/public/api/opinion/GroupRelatedDetails/${OpinionId}`)
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  OpinionTitle = (client_id) => {
    const res = async () => {
      const resp = await axios
        .get(`https://209.97.168.200/pacrawizpackv3/public/api/getTitle/${client_id}`)
        .catch(function (error) {
          console.log(error);
        });
        // console.log(resp,'respoinse')
      return resp;
    };
    return res();
  };
  TabsDetailsApi = (client_id) => {
    const res = async () => {
      const resp = await axios
      .get(`https://209.97.168.200/pacrawizpackv3/public/api/opinion/SectorStudy/${client_id}`)
      .catch(function (error) {
        console.log(error);
      });
      // console.log(resp,'respoinse')
      return resp;
    };
    return res();
  };
  getHistory = (client_id) => {
    const res = async () => {
      const resp = await axios
        .get(`https://209.97.168.200/pacrawizpackv3/public/api/getOpinionHistory/${client_id}`)
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
}
export default new GetData();
