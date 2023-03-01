import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import SadFace from "../../Atoms/SadFace";

export default function SectorDataCard(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [subTabbar, setsubTabbar] = React.useState(false);

  const hideSubTabBar = () => {
    setsubTabbar(!subTabbar);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // setValue(event.target.newValue);
  };

  function dateFormat(params) {
    if (params == null) return "-";
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

  return (
    <div className={`${classes.root}`}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        className={`theme_text`}
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Sector Studies" {...a11yProps(0)} />
        <Tab label="Methodologies" {...a11yProps(1)} />
        <Tab label="Programs" {...a11yProps(2)} />
        <Tab label="Models" {...a11yProps(3)} />
        <Tab label={props.title} {...a11yProps(4)} />
        <Tab label="Sector" {...a11yProps(5)} />
        <Tab label="Announcements" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {props.sectorsData.length > 0 ? (
          props.sectorsData.map((sector) => {
            return (
              <li className="fs-15 p-2 text-start">
                <a
                  href={`https://209.97.168.200/wizpacv1/rm/${sector.file}`}
                  target="_blank"
                  className="theme_text text-start p-2"
                >
                  {sector.name} | {dateFormat(sector.date)}
                </a>
              </li>
            );
          })
        ) : (
          <SadFace />
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {props.methodologiesData.length > 0 ? (
          props.methodologiesData.map((methodology) => {
            return (
              <li className="fs-15 p-2 text-start">
                <a
                  href={`https://209.97.168.200/wizpacv1/rm/${methodology.doc_file}`}
                  target="_blank"
                  className="theme_text text-start p-2"
                >
                  {methodology.name} | {dateFormat(methodology.date)}
                </a>
              </li>
            );
          })
        ) : (
          <SadFace />
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SadFace />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SadFace />
      </TabPanel>
      <TabPanel value={value} index={4}>
        {props.pacraDailyNews.length > 0 ? (
          props.pacraDailyNews.map((news) => {
            return (
              <li className="fs-15 p-2 text-start">
                <a
                  href={`https://209.97.168.200/wizpacv1/rm/${news.Filepath}`}
                  target="_blank"
                  className="theme_text text-start p-2"
                >
                  {news.Recordtitle} | {dateFormat(news.Entrydate)}
                </a>
              </li>
            );
          })
        ) : (
          <SadFace />
        )}
      </TabPanel>
      <TabPanel value={value} index={5}>
        {props.sectorDailyNews.length > 0 ? (
          props.sectorDailyNews.map((sectorNews) => {
            return (
              <li className="fs-15 p-2 text-start">
                <a
                  href={`https://209.97.168.200/wizpacv1/rm/${sectorNews.Filepath}`}
                  target="_blank"
                  className="theme_text text-start p-2"
                >
                  {sectorNews.Recordtitle} | {dateFormat(sectorNews.Entrydate)}
                </a>
              </li>
            );
          })
        ) : (
          <SadFace />
        )}
      </TabPanel>
      <TabPanel value={value} index={6}>
        {props.pacraDailyNews.length > 0 ? (
          props.pacraDailyNews.map((news) => {
            return (
              <li className="fs-15 p-2 text-start">
                <a
                  href={`https://209.97.168.200/wizpacv1/rm/${news.Filepath}`}
                  target="_blank"
                  className="theme_text text-start p-2"
                >
                  {news.Recordtitle} | {dateFormat(news.Entrydate)}
                </a>
              </li>
            );
          })
        ) : (
          <SadFace />
        )}
      </TabPanel>
    </div>
  );
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
      className="bg-white"
    >
      {value === index && (
        <Box>
          <Typography
            className="p-3"
            style={{ height: "350px", overflow: "scroll" }}
          >
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  topMargin: {
    top: "50px",
  },
  leftMargin: {
    width: `calc(100% - ${240}px)`,
  },
  left: {
    width: `calc(100% - ${74}px)`,
  },
  responsiveLeft: {
    width: "100%",
  },
  topAbsolute: {
    top: "4px",
  },
}));
