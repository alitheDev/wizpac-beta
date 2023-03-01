import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import "ag-grid-enterprise";
import { Clear, Search } from "@material-ui/icons";
import { Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import { CalendarMonth, FilterAlt, FilterAltOff } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useLocation } from "react-router-dom";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SetFilterModule,
  MenuModule,
  FiltersToolPanelModule,
]);

export default function TableComponent(props) {
  const navigate = useNavigate();
  const gridRef = useRef();
  const [gridApi, setGridApi] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [open, setOpen] = useState(false);
  const [Groupcount, setGroupcount] = useState(null);
  const [Clientcount, setClientcount] = useState(0);
  const [Opinioncount, setOpinioncount] = useState(0);
  const [filtercount, setfiltercount] = useState(0);
  const [state, setstate] = useState(true);
  const [states, setstates] = useState(true);
  const [filteredArray, setfilteredArray] = useState([]);
  const location = useLocation();

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (gridApi) {
      props.datefilters(startDate, endDate, gridApi, getFilterType);
      gridApi.api.onFilterChanged();
      setstate(!state);
    }
  }, [startDate, endDate]);

  const onGridReady = useCallback((params) => {
    if (props.Data.length == 0) {
      // if (props.Data.includes('harry')) {
      // params.api.showLoadingOverlay();
      // }
    }
    setGridApi(params);
  }, []);

  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 70,
      resizable: true,
      menuTabs: ["filterMenuTab", "generalMenuTab"],
    };
  }, []);

  const getFilterType = () => {
    if (startDate !== "" && endDate !== "") {
      return "inRange";
    }
  };

  const onFilterTextBoxChanged = useCallback(() => {
    localStorage.setItem(
      `quick_${props.value}`,
      document.getElementById("filter-text-box").value
    );
    gridRef.current.api.setQuickFilter(
      localStorage.getItem(`quick_${props.value}`)
    );
  }, []);

  useEffect(() => {
    if (gridApi) {
      document.getElementById("filter-text-box").value = localStorage.getItem(
        `quick_${props.value}`
      );
      gridApi.api.setQuickFilter(" ");
      gridApi.api.setQuickFilter(localStorage.getItem(`quick_${props.value}`));
    }
  }, [gridApi, props.Data]);

  const detailCellRenderer = useMemo(() => {
    return props.MobViewRender;
  }, []);

  const [search, setSearch] = useState(false);
  const [date, setDate] = useState(false);

  const onChangeDate = () => {
    setDate(!date);
    setSearch(false);
  };
  const onChangeSearch = () => {
    setSearch(!search);
    setDate(false);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (search) {
      inputRef.current.focus();
    }
  }, [search]);

  const statusBar = useMemo(() => {
    if (!props.count) {
      return {
        statusPanels: [
          {
            statusPanel: "agTotalAndFilteredRowCountComponent",
            align: "left",
          },
          { statusPanel: "agTotalRowCountComponent", align: "left" },
          { statusPanel: "agFilteredRowCountComponent", align: "center" },
          { statusPanel: "agSelectedRowCountComponent", align: "center" },
          { statusPanel: "agAggregationComponent", align: "center" },
        ],
      };
    }
  }, []);

  const sidebar = () => {
    if (filterstate == true) {
      return {
        toolPanels: [
          {
            id: "filters",
            labelDefault: "Filters",
            labelKey: "filters",
            iconKey: "filter",
            toolPanel: "agFiltersToolPanel",
          },
          {
            id: "columns",
            labelDefault: "Columns",
            labelKey: "columns",
            iconKey: "columns",
            toolPanel: "agColumnsToolPanel",
            toolPanelParams: {
              suppressRowGroups: true,
              suppressValues: true,
            },
          },
        ],
        defaultToolPanel: "filters",
      };
    } else {
      return "hide";
    }
  };
  const [filterstate, setfilterState] = useState(false);
  const filterview = () => {
    setfilterState(!filterstate);
  };
  const mobileSidebar = () => {
    if (filterstate == true) {
      return {
        toolPanels: [
          {
            id: "filters",
            labelDefault: "Filters",
            labelKey: "filters",
            iconKey: "filter",
            toolPanel: "agFiltersToolPanel",
          },
        ],
        defaultToolPanel: "filters",
      };
    } else {
      return "hide";
    }
  };

  useEffect(() => {
    if (gridApi) {
      let opinionName = [];
      let opinioncount = 0;
      let clientName = [];
      let clientarray = [];
      let clientcount = 0;
      let groupname = [];
      let grouparray = [];
      let groupcount = 0;
      let groupNameunique = [];
      let clientNameunique = [];
      let opinionNameunique = [];
      let sNo_Array = [];
      let sNo_count = 0;

      gridApi.api.forEachNodeAfterFilter((node) => {
        opinionName.push(node.data.OpinionName);
        clientName.push(node.data.ClientName);
        groupname.push(node.data.GroupName);
        sNo_Array.push(node.data.sNo);
      });
      for (let i in groupname) {
        if (groupname[i] !== "0" && groupname[i] !== null) {
          groupNameunique.push(groupname[i]);
        }
        if (clientName[i] !== "0" && clientName[i] !== null) {
          clientNameunique.push(clientName[i]);
        }
        if (opinionName[i] !== "0" && opinionName[i] !== null) {
          opinionNameunique.push(opinionName[i]);
        }
      }
      groupNameunique.forEach(function (i) {
        grouparray[i] = (grouparray[i] || 0) + 1;
      });
      clientNameunique.forEach(function (i) {
        clientarray[i] = (clientarray[i] || 0) + 1;
      });

      for (let i in grouparray) {
        groupcount++;
      }
      for (let i in clientarray) {
        clientcount++;
      }
      for (let i in opinionNameunique) {
        opinioncount++;
      }
      for (let i in sNo_Array) {
        sNo_count++;
      }
      localStorage.setItem("groupcount", groupcount);
      localStorage.setItem("clientcount", clientcount);
      localStorage.setItem("opinioncount", opinioncount);
      localStorage.setItem("sNo", sNo_count);
      setfiltercount(sNo_count);
      setGroupcount(groupcount);
      setClientcount(clientcount);
      setOpinioncount(opinioncount);
    }
  }, [
    state,
    gridApi,
    props.state,
    props.Data,
    localStorage.getItem("groupcount"),
  ]);

  // const getValues = useCallback((type) => {
  //   const instance = gridRef.current.api.getFilterInstance(FILTER_TYPES[type]);
  //   alert(JSON.stringify(instance.getValues(), null, 2));
  // }, [alert])

  useEffect(() => {
    setstates(!states);
  }, [props.counts]);

  const func = () => {
    setstate(!state);
  };

  var savedFilterModel = null;
  useEffect(() => {
    if (gridApi) {
      savedFilterModel = gridApi.api.getFilterModel();
      localStorage.setItem(props.value, JSON.stringify(savedFilterModel));
    }
  }, [state]);

  useEffect(() => {
    if (gridApi) {
      const savedfiltermodel = localStorage.getItem(props.value);
      gridApi.api.setFilterModel(JSON.parse(savedfiltermodel));
      gridApi.api.setQuickFilter("gtrrgrgrg");
      gridApi.api.setQuickFilter(localStorage.getItem(`quick_${props.value}`));
    }
  }, [gridApi, props.Data]);
  const loggedin_userId = localStorage.getItem("userID");

  useEffect(() => {
    let arr = [];
    let count = 0;

    for (let i in props.Data) {
      if (location.pathname == "/Ratings") {
        if (
          props.Data[i].user_id1 == loggedin_userId ||
          props.Data[i].user_id2 == loggedin_userId ||
          props.Data[i].user_id3 == loggedin_userId ||
          props.Data[i].lead_rc_id == loggedin_userId
        ) {
          arr.push(props.Data[i]);
        }
      } else arr.push(props.Data[i]);
    }
    if (arr !== null && !arr.includes("harry")) {
      for (let i in arr) {
        arr[i].sNo = Number(i) + 1;
      }
    }
    if (arr.includes("harry")) {
      arr = [];
    }
    setfilteredArray(arr);
  }, [props.Data]);

  const exportToPdf = () => {
    const gridApi = gridRef.current.api;
    if (!gridApi) {
      return;
    }
    if(gridApi){
      const doc = new jsPDF();
      const allColumns = gridApi.getColumnDefs();
      const columns = allColumns.filter((column) => column.field !== "sNo")
      .map((column) => {
        return { header: column.headerName, dataKey: column.field, width: column.width };
      });
      let rowData = [];
      if (typeof gridApi.getRowData === "function") {
        rowData = gridApi.getRowData();
      } else {
        gridApi.forEachNode((node) => {
          rowData.push(node.data);
        });
      }
      
      doc.autoTable(columns, rowData);
      window.open(doc.output("bloburl"), "_blank");
    }
  };

  return (
    <>
      {/* {props.stating == 1 ? (localStorage.getItem(props.value) == "{}" || localStorage.getItem(props.value) == null ? null :
        <Snackbar open={opens} sx={{ height: "100%" }} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={2000} onClose={() => (setOpens(false))}>
          <Alert onClose={() => (setOpens(false))} severity="info" sx={{ width: '100%' }}>
            Filter is applied on this Grid
          </Alert>
        </Snackbar>
      ) : null} */}
      <div style={{ containerStyle }} className="themeContainer">
        <Box
          className={`p-1 mt-1 my-md-0 filterTabs text-end text-md-center rounded_Button ${
            props.simpleGrid ? props.screenWidth < 770 && "d-inline-flex" : null
          }`}
        >
        <h2 className="theme_text px-2 mb-0 me-auto fw-bold w-100">
          {props.simpleGrid && props.screenWidth < 770 && props.headingText}
        </h2>
          {props.datefilter ? (
            <>
              {/* <button onClick={saveState}>Save State</button>
            <button onClick={restoreState}>Restore State</button>
          <button onClick={resetState}>Reset State</button> */}
              {/* <button onClick={saveFilterModel}>Save Filter Model</button>
            <button onClick={restoreFilterModel}>
            Restore Saved Filter Model
            </button>
          <span id="savedFilters">(none)</span> */}
              <Fab
                color="transparent"
                aria-label="Date"
                variant="extended"
                className="fabCustom mb-1"
              >
                {date ? (
                  <Clear onClick={onChangeDate} className="theme_text" />
                ) : (
                  <CalendarMonth
                    onClick={onChangeDate}
                    className="theme_text"
                  />
                )}
                <div className={`p-1 ${date ? "d-inline-flex" : "d-none"}`}>
                  <div className="m-1">
                    {/* <p className="theme_text me-1 my-auto"> From </p> */}
                    <input
                      type="date"
                      id="startDate"
                      onChange={(e) => setStartDate(e.target.value)}
                      className="px-1 btn_theme"
                      style={props.screenWidth < 400 ? { width: 125 } : null}
                    />
                  </div>
                  <div className="m-1">
                    {/* <p className="theme_text me-1 my-auto"> To </p> */}
                    <input
                      type="date"
                      id="endDate"
                      onChange={(e) => setEndDate(e.target.value)}
                      className="px-1 btn_theme"
                      style={props.screenWidth < 400 ? { width: 125 } : null}
                    />
                  </div>
                </div>
              </Fab>
            </>
          ) : null}
          <Fab
            color="neutral"
            aria-label="edit"
            variant="extended"
            className="ms-2 fabCustom mb-1"
          >
            {search ? (
              <Clear onClick={onChangeSearch} className="theme_text" />
            ) : (
              <Search onClick={onChangeSearch} className="theme_text" />
            )}
            <div className={`px-2 ${search ? "d-block" : "d-none"}`}>
              <input
                autoFocus={search && "true"}
                ref={inputRef}
                className="form-control"
                type="search"
                placeholder="Search..."
                aria-label="Search"
                onInput={onFilterTextBoxChanged}
                id="filter-text-box"
              />
            </div>
          </Fab>
          <Fab
            color="neutral"
            variant="extended"
            className="ms-2 fabCustom"
            // hover
            onClick={filterview}
          >
            <FilterAlt sx={{ mr: 1 }} className="theme_text" />
            <div className="onHover"> More Filters</div>
          </Fab>
          <Fab
            color="neutral"
            variant="extended"
            className="ms-2 fabCustom"
            // hover
            onClick={() => {
              if (gridApi) {
                gridApi.api.setFilterModel(null);
                gridApi.api.setQuickFilter("");
                document.getElementById("filter-text-box").value = "";
                localStorage.removeItem(`quick_${props.value}`);
                if (props.datefilter) {
                  document.getElementById("startDate").value = null;
                  document.getElementById("endDate").value = null;
                }
                setstate(!state);
              }
            }}
          >
            <FilterAltOff sx={{ mr: 1 }} className="theme_text" />
            <div className="onHover">Reset</div>
          </Fab>
          <Fab
            color="neutral"
            variant="extended"
            className="ms-2 fabCustom"
            // hover
            onClick={exportToPdf}
          >
            <PictureAsPdfIcon sx={{ mr: 1 }} className="theme_text" />
            <div className="onHover">PDF</div>
          </Fab>
        </Box>
        <div
          className={`ag-theme-alpine ${
            props.mainTabValue == 10
              ? props.screenWidth > 770
                ? "height_15"
                : "heightresponsive_15" //classes for subTabs css
              : props.subTabValue == 2
              ? props.screenWidth > 770
                ? "height_14"
                : "heightresponsive_14"
              : props.mainTabValue == 2
              ? props.screenWidth > 770
                ? "height_14"
                : "heightresponsive_14"
              : props.mainTabValue == 3
              ? props.screenWidth > 770
                ? "height_14"
                : "heightresponsive_14"
              : props.mainTabValue == 4
              ? props.screenWidth > 770
                ? "height_14"
                : "heightresponsive_14"
              : props.mainTabValue == 5
              ? props.screenWidth > 770
                ? "height_14"
                : "heightresponsive_14"
              : props.mainTabValue == 7
              ? props.screenWidth > 770
                ? "height_14"
                : "heightresponsive_14"
              : props.mainTabValue == 9
              ? props.screenWidth > 770
                ? "height_14"
                : "heightresponsive_14"
              : location.pathname == "/Ratings" && props.mainTabValue == 5
              ? props.screenWidth > 770
                ? "height_14"
                : "heightresponsive_14"
              : location.pathname == "/Ratings" && props.mainTabValue == 6
              ? props.screenWidth > 770
                ? "height_14"
                : "heightresponsive_14"
              : props.screenWidth > 770
              ? "height_"
              : "heightresponsive"
          }`}
          style={{ width: "100%", gridStyle }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={filteredArray}
            columnDefs={props.columnDefs}
            animateRows={true}
            suppressColumnMoveAnimation={true}
            suppressAggFuncInHeader={true}
            defaultColDef={defaultColDef}
            rowSelection={"multiple"}
            overlayLoadingTemplate={'<span class="loader_"></span>'}
            sideBar={props.screenWidth < 770 ? mobileSidebar() : sidebar()}
            masterDetail={true}
            detailCellRenderer={detailCellRenderer}
            statusBar={statusBar}
            onFilterModified={func}
            onGridReady={onGridReady}
          />
          {props.count ? (
            <div class="ag-status-bar statusBarCustom px-1">
              <div className="col-2 ag-status-name-value">
                {props.screenWidth < 500 ? (
                  <>Group N:</>
                ) : props.screenWidth < 300 ? (
                  <>G.N:</>
                ) : (
                  <>Group Name:</>
                )}
                <span className="ag-status-name-value-value marginRight">
                  {!state || !states
                    ? Groupcount
                    : localStorage.getItem("groupcount")}
                </span>
              </div>
              <div className="col-2 ag-status-name-value">
                {props.screenWidth < 500 ? (
                  <>Client N:</>
                ) : props.screenWidth < 300 ? (
                  <>C.N:</>
                ) : (
                  <>Client Name:</>
                )}
                <span className="ag-status-name-value-value marginRight">
                  {!state || !states
                    ? Clientcount
                    : localStorage.getItem("clientcount")}
                </span>
              </div>
              <div className="col-2 ag-status-name-value">
                {props.screenWidth < 500 ? (
                  <>Opinion N:</>
                ) : props.screenWidth < 300 ? (
                  <>O.N:</>
                ) : (
                  <>Opinion Name:</>
                )}
                <span className="ag-status-name-value-value marginRight">
                  {!state || !states
                    ? Opinioncount
                    : localStorage.getItem("opinioncount")}
                </span>
              </div>
              <div className="col-2 ag-status-name-value">
                Rows:
                <span className="ag-status-name-value-value marginRight">
                  {!state ? filtercount : localStorage.getItem("sNo")}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
