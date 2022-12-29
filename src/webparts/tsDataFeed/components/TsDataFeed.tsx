import * as React from "react";
// import styles from './TsDataFeed.module.scss';
import { ITsDataFeedProps } from "./ITsDataFeedProps";
import { escape } from "@microsoft/sp-lodash-subset";
import Container from "react-bootstrap/Container";
import EventLevelForm from "./pages/EventLevelForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TsDataFeed.css";
import TeamLevelForm from "./pages/TeamLevelForm";

export default class TsDataFeed extends React.Component<ITsDataFeedProps, {}> {
  public render(): React.ReactElement<ITsDataFeedProps> {
    const {
      // description,
      // isDarkTheme,
      // environmentMessage,
      // hasTeamsContext,
      userDisplayName,
      userEmail,
    } = this.props;

    return (
      <Container>
        <h5 style={{ display: "inline" }}>
          Welcome, {escape(userDisplayName)}!
        </h5>
        &nbsp;&nbsp;({escape(userEmail)})
          <div className="mt-3">
            <EventLevelForm />
          </div>
          <div className="mt-3">
            <TeamLevelForm />
          </div>
      </Container>
    );
  }
}
