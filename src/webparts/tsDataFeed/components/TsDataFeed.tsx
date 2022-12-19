import * as React from "react";
// import styles from './TsDataFeed.module.scss';
import { ITsDataFeedProps } from "./ITsDataFeedProps";
import { escape } from "@microsoft/sp-lodash-subset";
import EventLevelForm from "./pages/EventLevelForm";
import "bootstrap/dist/css/bootstrap.min.css";
import TeamLevelForm from "./pages/TeamLevelForm";

export default class TsDataFeed extends React.Component<ITsDataFeedProps, {}> {
  public render(): React.ReactElement<ITsDataFeedProps> {
    const {
      // description,
      // isDarkTheme,
      // environmentMessage,
      // hasTeamsContext,
      userDisplayName,
    } = this.props;

    return (
      <div className="appBackground">
        <h2>Welcome, {escape(userDisplayName)}!</h2>
        <EventLevelForm />
        <div className="mt-3">
          <TeamLevelForm />
        </div>
      </div>
    );
  }
}
