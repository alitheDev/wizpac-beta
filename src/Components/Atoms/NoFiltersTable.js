import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import "ag-grid-enterprise";
import { useLocation } from "react-router-dom";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SetFilterModule,
  MenuModule,
  FiltersToolPanelModule,
]);

export default function NoFiltersTable(props) {
  const gridRef = useRef(null);
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
    //   if (props.Data !== null) {
    //   if (props.Data.length == 0) {
    //     // if (props.Data.includes('harry')) {
    //     // params.api.showLoadingOverlay();
    //     // }
    //   }
    // }
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

  const detailCellRenderer = useMemo(() => {
    return props.MobViewRender;
  }, []);

  const [search, setSearch] = useState(false);
  const [date, setDate] = useState(false);

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

  // const getValues = useCallback((type) => {
  //   const instance = gridRef.current.api.getFilterInstance(FILTER_TYPES[type]);
  //   alert(JSON.stringify(instance.getValues(), null, 2));
  // }, [alert])

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

  return (
    <>
      <div
        className={`ag-theme-alpine ${
          props.FullPageTable
            ? "fullheight-table"
            : props.HistoryTable
            ? "historyTableheight-100"
            : props.GroupTable
            ? "groupTableheight-100"
            : props.screenWidth > 770
            ? "height-100"
            : "heightresponsive-100"
        }`}
        style={{ width: "100%", gridStyle }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={props.Data}
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
      </div>
    </>
  );
}
