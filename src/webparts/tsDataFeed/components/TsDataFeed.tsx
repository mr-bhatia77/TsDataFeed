import * as React from "react";
// import styles from './TsDataFeed.module.scss';
import { ITsDataFeedProps } from "./ITsDataFeedProps";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TsDataFeed.css";
import App from "./pages/App";
import { Provider } from "react-redux";
import store from "../redux/store";

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
      <Provider store={store}>
        <App userDisplayName={userDisplayName} userEmail={userEmail} />
      </Provider>
    );
  }
}
