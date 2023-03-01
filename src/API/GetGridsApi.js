import axios from "axios";

class GetGridsApi {
  undertakingApi = () => {
    const res = async () => {
      const resp = await axios
        .get(`https://209.97.168.200/pacrawizpackv3/public/api/undertakingApi`)
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  DetailofRatingCommiteApi = () => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/viewRatingCommitteeGridApi`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  RatingMovementApi = (startDate, EndDate) => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/ratingMovementApi/${startDate}/${EndDate}`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  ratingmoventIGFApi = (startDate, EndDate) => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/getRatingMovementInvestmentGradeApi/${startDate}/${EndDate}`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  newRatingsApi = (startDate, EndDate) => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/getNewRatingsApi/${startDate}/${EndDate}`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };

  directorsDetails = () => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/viewDirectorsGridApi`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  
  sponsorshipDetail = () => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/viewSponsorsGridApi`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  criteriaGroupDetails = () => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/viewCriteriaGridApi`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };

  AnalystRotation = () => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/analystRotationApi`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };

  TeamRotation = () => {
    const res = async () => {
      const resp = await axios
        .get(`https://209.97.168.200/pacrawizpackv3/public/api/teamRotationApi`)
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };

  LeadRcRotation = () => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/leadrcRotationApi`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };

  Movementmorethanoneform = (startDate, EndDate) => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/getMovementMoreThanOneNotchApi/${startDate}/${EndDate}`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  RatingUpgradeDowngradeApi = (startDate, EndDate) => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/getRatingUpgradeDowngradeApi/${startDate}/${EndDate}`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
  MonitoringSurveillanceApi = (startDate, EndDate) => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/getMonitoringApi/${startDate}/${EndDate}`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  }
  UpdatingofmethodologiesApi = (startDate, EndDate) => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/getMethodologiesApi/${startDate}/${EndDate}`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  }
  UnsolicitedRatingsApi = (startDate, EndDate) => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/getUnsolicitedRatingsApi/${startDate}/${EndDate}`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  }
  RatingsBetweenTwoDatesApi = (startDate, EndDate) => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/ratingsBetweenTwoDatesApi/${startDate}/${EndDate}`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  }

  OutstandingOnSpecificDate = (startDate) => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/getOutstandingOnSpecificDateApi/${startDate}`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  }

  Tobereviewedratings = (startDate, EndDate) => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/indexApi/${startDate}/${EndDate}`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  }

  RatingSwitchApi = (startDate, EndDate) => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/getRatingSwitchApi/${startDate}/${EndDate}`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  }
  PvtRatingsApi = (startDate, EndDate) => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/getPvtRatingsApi/${startDate}/${EndDate}`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  }
  NewRatingAgreementsApi = (startDate, EndDate) => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/getNewRatingAgreementsApi/${startDate}/${EndDate}`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  }
  RatingWdApi = (startDate, EndDate) => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/getRatingWdApi/${startDate}/${EndDate}`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  }
 IndicativeRatingApi = (startDate, EndDate) => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/getIndicativeRatingApi/${startDate}/${EndDate}`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  }

 HrHiringsApi = (startDate, EndDate) => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/getHrHiringsApi/${startDate}/${EndDate}`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  }
  OperationalDetails = (startDate, EndDate) => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/getOperationalDetailsApi/${startDate}/${EndDate}`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  }
  RcHeldApi = (startDate, EndDate) => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/getRcHeldApi/${startDate}/${EndDate}`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  }
  RcOverdueApi = (startDate, EndDate) => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/rcfilterApi/${startDate}/${EndDate}`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  }
  RcOverdueApi = (startDate, EndDate) => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/rcfilterApi/${startDate}/${EndDate}`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  }
  SectorStudiesApi = (startDate, EndDate) => {
    const res = async () => {
      const resp = await axios
        .get(
          `https://209.97.168.200/pacrawizpackv3/public/api/getSectorStudiesApi/${startDate}/${EndDate}`
        )
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  }
}

export default new GetGridsApi();
