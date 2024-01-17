import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ContactInfo from "./ContactInfo";
import JobDescription from "./JobDescription";
import EducationForm from "./EducationForm";
import WorkExperience from "./WorkExperience";
import Skills from "./Skiils";
import PortfolioLinks from "./PortfolioLinks";
import Languages from "./Languages";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function UserInfoTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 600,
        width: "100%",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 5, borderColor: "divider" }}
      >
        <Tab label="Contact Details" {...a11yProps(0)} />
        <Tab label="Description" {...a11yProps(1)} />
        <Tab label="Education" {...a11yProps(2)} />
        <Tab label="Professional Experience" {...a11yProps(3)} />
        <Tab label="Skills" {...a11yProps(4)} />
        <Tab label="Portfolio" {...a11yProps(5)} />
        <Tab label="Languages" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ContactInfo />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <JobDescription />

      </TabPanel>
      <TabPanel value={value} index={2}>
      <EducationForm />
      </TabPanel>
      <TabPanel value={value} index={3}>
      <WorkExperience />

      </TabPanel>
      <TabPanel value={value} index={4}>
      <Skills />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <PortfolioLinks />
      </TabPanel>
      <TabPanel value={value} index={6}>
      <Languages />
      </TabPanel>
    </Box>
  );
}
