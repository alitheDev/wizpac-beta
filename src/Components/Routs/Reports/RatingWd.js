import React, { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import moment from "moment";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { NavLink } from "react-router-dom";
import { Check, Clear, Event } from "@material-ui/icons";
import { Table, TableCell, TableRow } from "@mui/material";
import GetGridsApi from "../../../API/GetGridsApi";
import TableComponent from "../../Atoms/TableComponent";

export default function RatingWd(props) {
    const [ratingWdApi, setRatingWdApi] = useState([]);
    const responsiveColumns = () => {
      if (props.screenWidth < 770) {
        return null;
      } else {
        return 120;
      }
    };
    const responsiveColumnPin = () => {
      if (props.screenWidth < 770) {
        return null;
      } else {
        return "left";
      }
    };
    const detailShow = () => {
      if (props.screenWidth < 770) {
        return false;
      } else {
        return true;
      }
    };
  
  
    const fromDate = localStorage.getItem("reportsfirstDate");
    const toDate = localStorage.getItem("reportslastDate");
    useEffect(() => {
      getTabsData(fromDate, toDate);
    }, []);
  
    const getTabsData = async (fromDate, toDate) => {
      const res = GetGridsApi.RatingWdApi(fromDate, toDate);
      const resp = await res;
      console.log(resp.data,'ressspppp');
      setRatingWdApi(resp.data);
    };
  
    const PvtRatingsdatefilters = (
      startDate,
      endDate,
      gridApi,
      getFilterType
    ) => {
      var dateFilterComponent =
        gridApi.api.getFilterInstance("notification_date");
      dateFilterComponent.setModel({
        type: getFilterType(),
        inRange: true,
        dateFrom: startDate,
        dateTo: endDate,
      });
    };
  
    function fullDate(params) {
      if (params.value === "nullData") return <Skeleton />;
      if (params.value == null) {
        return "-";
      } else if (params.value == "") {
        return "-";
      } else {
        const date = new Date(params.value);
        const yyyy = date.getFullYear();
        const yy = yyyy.toString();
        const y = yy.slice(2, 4);
        let mm = date.toLocaleString("default", { month: "short" });
        let dd = date.getDate();
        if (dd < 10) dd = "0" + dd;
        return dd + "-" + mm + "-" + y;
      }
    }
    const cellrander = (params) => {
      if (params.value === "nullData") return <Skeleton />;
      if (params.value === "" || params.value == null) {
        return "-";
      } else {
        return params.value;
      }
    };
    const cellrandered = (params) => {
      if (params.value === "nullData") {
        return <Skeleton />;
      } else {
        return params.value;
      }
    };
  
    const columnDefs = [
      {
        headerName: "",
        field: "sNo",
        maxWidth: 30,
        filter: true,
        menuTabs: false,
        pinned: responsiveColumnPin(),
        hide: detailShow(),
        cellRenderer: "agGroupCellRenderer",
        suppressColumnsToolPanel: true,
        suppressFiltersToolPanel: true,
      },
      {
        headerName: "#",
        maxWidth: 50,
        // minWidth: 66,
        field: "sNo",
        sortable: true,
        filter: true,
        // filter: "agSetColumnFilter",
        headerComponentParams: {
          template:
            '<div class="ag-cell-label-container" role="presentation">' +
            '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
            '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
            '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
            '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
            '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
            '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
            '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
            '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
            "  </div>" +
            "</div>",
        },
        suppressFiltersToolPanel: true,
        menuTabs: false,
        cellRenderer: cellrandered,
        pinned: responsiveColumnPin(),
      },
  
      {
        headerName: "Company / Issue Rated",
        minWidth: responsiveColumns(),
        field: "name",
        sortable: true,
        filter: "agSetColumnFilter",
        excelMode: "windows",
        cellRenderer: cellrander,
        tooltipField: "name",
        pinned: responsiveColumnPin(),
      },

      {
        headerName: "Last Rating Assigned",
        minWidth: responsiveColumns(),
        field: "prevratings",
        sortable: true,
        filter: "agSetColumnFilter",
        excelMode: "windows",
        cellRenderer: cellrander,
        tooltipField: "RatingScale",
      },

      {
        headerName: "Rating Date",
        field: "prevratingsdate",
        minWidth: 115,
        // hide: true,
        sortable: true,
        filter: "agDateColumnFilter",
        excelMode: "windows",
        cellRenderer: fullDate,
        debounceMs: "DateFilter",
        filterParams: {
          filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
          inRangeInclusive: true,
          comparator: function (filterLocalDateAtMidnight, cellValue) {
            var dateAsString = moment(cellValue).format("DD/MM/YYYY");
            var dateParts = dateAsString.split("/");
            var cellDate = new Date(
              Number(dateParts[2]),
              Number(dateParts[1]) - 1,
              Number(dateParts[0])
            );
  
            if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
              return 0;
            }
  
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            }
  
            if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            }
          },
          buttons: ["clear", "reset", "apply"],
          headerComponentParams: {
            template:
              '<div class="ag-cell-label-container" role="presentation">' +
              '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
              '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
              '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
              '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
              '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
              '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
              '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
              '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
              "  </div>" +
              "</div>",
          },
        },
      },

      {
        headerName: "Sector / Industry",
        field: "industry",
        minWidth: 130,
        minWidth: 130,
        sortable: true,
        filter: "agSetColumnFilter",
        excelMode: "windows",
        tooltipField: "pre_lterm",
        cellRenderer: cellrander,
        // pinned: responsiveColumnPin(),
      },
      {
        headerName: "Reason For Withdrawn",
        field: "",
        minWidth: 130,
        minWidth: 130,
        sortable: true,
        filter: "agSetColumnFilter",
        excelMode: "windows",
        cellRenderer: cellrander,
        // pinned: responsiveColumnPin(),
      },

    ];
    const MobViewRender = (params) => (
      <h1 style={{ padding: "10px 20px" }}>
        <Table className="overflow-scroll responsiveTableFonts">
          <TableRow>
            <TableCell
              variant="head"
              className="fw-bolder responsiveTableFonts py-1"
            >
              Analyst
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {params.data.display_name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              variant="head"
              className="fw-bolder responsiveTableFonts py-1"
            >
              Date
            </TableCell>
            <TableCell className="responsiveTableFonts py-1">
              {params.data.udate}
            </TableCell>
          </TableRow>
        </Table>
      </h1>
    );
  
    return (
      <>
        <TableComponent
          value={"ratingWdApi"}
          handleRfreshTab={props.handleRfreshTab}
          Data={ratingWdApi}
          screenWidth={props.screenWidth}
          MobViewRender={MobViewRender}
          columnDefs={columnDefs}
          datefilters={PvtRatingsdatefilters}
          datefilter={true}
          // FullPageTable={true}
        />
      </>
    );
}
