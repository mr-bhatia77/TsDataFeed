import * as React from "react";
import { useState, FunctionComponent } from "react";
import { escape } from "@microsoft/sp-lodash-subset";
import Container from "react-bootstrap/Container";
import EventLevelForm from "./EventLevelForm";
import TeamLevelForm from "./TeamLevelForm";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AxiosInstance from "../../services/AxiosInstance";

interface IApp {
  userDisplayName: string;
  userEmail: string;
}

const App: FunctionComponent<IApp> = (props) => {
  const { userDisplayName, userEmail } = props;
  const [key, setKey] = useState("event");
  const [apiResState, setApiResState] = useState("");

  const apiHandler = () => {
    setApiResState("Loading");
    AxiosInstance.get("/event/544/fetchData")
      .then((res) => {
        console.log("response from api", res);
        setApiResState("Success! check console");
      })
      .catch((error) => {
        setApiResState("Failure! check console");
        console.log("error from API", error);
      });
  };

  return (
    <Container className="mt-3">
      <h5 style={{ display: "inline", textDecoration: "underline" }}>
        Welcome, {escape(userDisplayName)}!
      </h5>
      &nbsp;&nbsp;({escape(userEmail)})
      <br/>
      <div className="mt-3">
      <button onClick={apiHandler}>click here for api response</button>
      {apiResState}
      </div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 mt-3"
      >
        <Tab eventKey="event" title="Event">
          <div className="mt-3">
            <EventLevelForm userName={userDisplayName} userEmail={userEmail} />
          </div>
        </Tab>
        <Tab eventKey="team" title="Team">
          <div className="mt-3">
            <TeamLevelForm userName={userDisplayName} userEmail={userEmail} />
          </div>
        </Tab>
        <Tab eventKey="dataView" title="Data view">
          <h1>EXTRA TABLE PAGE</h1>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default App;
