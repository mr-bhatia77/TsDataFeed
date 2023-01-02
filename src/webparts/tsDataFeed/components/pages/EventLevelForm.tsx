import * as React from "react";
import { useState, useEffect, FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
// import AxiosInstance from "../../services/AxiosInstance";
import { eventDetailsConstant,chapterList,eventList } from "../../services/constants";
import { updateSelectedEvent,updateEventList } from "../../redux/application/applicationActions";
import {chapterOptionsMaker,eventOptionsMaker} from '../../services/commonFunctions';
interface IEventLevelForm {
  userName: string;
  userEmail: string;
}

const EventLevelForm: FunctionComponent<IEventLevelForm> = (props) => {
  const dispatch = useDispatch();

  const [eventDetails, setEventDetails] = useState(null);
  const [eventOptions, setEventOptions] = useState([
    <option value="Select Event">Select Event</option>,
  ]);
  const [chapterOptions, setChapterOptions] = useState([
    <option value="Select Chapter">Select Chapter</option>,
  ]);
  // const [campaignYtdForecast, campaignYtdForecast] = useState(null);

  useEffect(() => {
    // AxiosInstance.get("/posts").then((res) => {
    //   console.log(res);
    //   // call Chapter List API
    // });
    setChapterOptions(chapterOptionsMaker(chapterList));
  }, []);

  const submitHandler = (e: any) => {
    e.preventDefault();
    // console.log(e);
    const payload = JSON.stringify({
      chapter: e.target[0].value,
      event: e.target[1].value,
      overall_ind_forecast: e.target[2].value,
      overall_team_forecast: e.target[3].value,
      forecast_info: e.target[5].value,
    });
    console.log("payload = ", payload);
  };

  const chapterSelectHandler = (e: any) => {
    // console.log(e.target.value);
    // call event list API
    setEventOptions(eventOptionsMaker(eventList));
    dispatch(updateEventList(eventList));
  };

  const eventSelectHandler = (e: any) => {

    //call event details API
    // AxiosInstance.get(`/team/${e.target.value}/fetchData`).then((res)=>{
    //   console.log(res);
    // })

    setEventDetails(eventDetailsConstant);
    dispatch(updateSelectedEvent(eventDetailsConstant));
  };

  const changeInputHandler = (e: any) => {
    console.log(e.target.id);
    setEventDetails({ ...eventDetails, [e.target.id]: e.target.value });
  };

  return (
    <Card>
      <Card.Header>
        <h3>Event Details</h3>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={submitHandler}>
          <Row>
            <Col xs={6}>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Chapter: </Form.Label>
                <Form.Select onChange={chapterSelectHandler}>
                  {chapterOptions}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Event Name: </Form.Label>
              <Form.Select onChange={eventSelectHandler}>
                {eventOptions}
              </Form.Select>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Overall IND/Other Rev YTD Forecast:</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  id="overall_ind_forecast"
                  type="number"
                  step={0.01}
                  value={eventDetails?.overall_ind_forecast}
                  onChange={changeInputHandler}
                />
              </InputGroup>
              <Form.Text className="text-muted">
                Last modified - 21-12-2022
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Overall Team YTD Forecast:</Form.Label>
              <InputGroup>
                <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                <Form.Control
                  id="overall_team_forecast"
                  type="number"
                  step={0.01}
                  value={eventDetails?.overall_team_forecast}
                  onChange={changeInputHandler}
                />
              </InputGroup>
              <Form.Text className="text-muted">
                Last modified - 21-12-2022
              </Form.Text>
            </Form.Group>
          </Row>
          <Row>
            <Col xs={9}>
              <Form.Group className="mb-3">
                <Form.Label>Campaign YTD forecast:</Form.Label>
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    value={
                      Math.round(
                        (Number(eventDetails?.overall_ind_forecast) +
                          Number(eventDetails?.overall_team_forecast) +
                          Number(eventDetails?.sponsorshipForecast)) *
                          100
                      ) / 100
                    }
                    disabled
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={9}>
              <Form.Group className="mb-3">
                <Form.Label>Forecast Info:</Form.Label>
                <Form.Control
                  as="textarea"
                  id="forecast_info"
                  style={{ height: "100px" }}
                  value={eventDetails?.forecast_info}
                  onChange={changeInputHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button className="mb-3" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EventLevelForm;
