import * as React from "react";
import { useState, FunctionComponent} from "react";
import { escape } from "@microsoft/sp-lodash-subset";
import Container from "react-bootstrap/Container";
import EventLevelForm from "./EventLevelForm";
import TeamLevelForm from "./TeamLevelForm";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

interface IApp {
  userDisplayName: string;
  userEmail: string;
}

const App: FunctionComponent<IApp> = (props) => {

  const { userDisplayName, userEmail } = props;
  const [key, setKey] = useState("event");  

  return (
    <Container className="mt-3">
      <h5 style={{ display: "inline", textDecoration: "underline" }}>
        Welcome, {escape(userDisplayName)}!
      </h5>
      &nbsp;&nbsp;({escape(userEmail)})
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
            <TeamLevelForm userName={userDisplayName} userEmail={userEmail}/>
          </div>
        </Tab>
        <Tab eventKey="dataView" title="Data view" disabled>
          <h1>EXTRA TABLE PAGE</h1>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default App;
