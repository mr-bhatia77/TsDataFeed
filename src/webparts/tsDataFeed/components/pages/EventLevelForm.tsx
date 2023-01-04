import * as React from "react";
import { useState, useEffect, FunctionComponent } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import AxiosInstance from "../../services/AxiosInstance";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from 'react-bootstrap/Popover';
import {
  eventDetailsConstant,
  chapterList,
  eventList,
} from "../../services/constants";
import {
  chapterOptionsMaker,
  eventOptionsMaker,
} from "../../services/commonFunctions";
interface IEventLevelForm {
  userName: string;
  userEmail: string;
}

const EventLevelForm: FunctionComponent<IEventLevelForm> = (props) => {
  const [eventDetails, setEventDetails] = useState(null);
  const [eventOptions, setEventOptions] = useState([
    <option value="Select Event">Select Event</option>,
  ]);
  const [chapterOptions, setChapterOptions] = useState([
    <option value="Select Chapter">Select Chapter</option>,
  ]);

  useEffect(() => {
    // AxiosInstance.get("/meta/chaptersList/fetchData").then((res) => {
    //   console.log(res?.data);
    // });
    setChapterOptions(chapterOptionsMaker(chapterList));
  }, []);

  const submitHandler = (e: any) => {
    e.preventDefault();
    // console.log(e);
    const payload = JSON.stringify({
        individualOtherForecastYTD: e.target[2].value,
        individualOtherModifiedDate: new Date(),
        overallTeamForecastYTD: null,
        overallTeamModifiedDate:null,
        forecastInfo: "Updated again ", 
        campaignForecastYTD: e.target[4].value
    
    });
    console.log("payload = ", payload);
  };

  const chapterSelectHandler = (e: any) => {
    // console.log(e.target.value);
    // call event list API
    AxiosInstance.get(`/meta/eventsByChapter/${e.target.value}/fetchData`).then(
      (res) => {
        console.log(res);
      }
    );
    setEventOptions(eventOptionsMaker(eventList));
  };

  const eventSelectHandler = (e: any) => {
    //call event details API
    AxiosInstance.get(`/event/${e.target.value}/fetchData`).then((res) => {
      console.log(res);
    });

    setEventDetails(eventDetailsConstant);
  };

  const changeInputHandler = (e: any) => {
    console.log(e.target.id);
    setEventDetails({ ...eventDetails, [e.target.id]: e.target.value });
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Campaign YTD forecast</Popover.Header>
      <Popover.Body>
        Calculated as sum of (Overall IND/Other Rev YTD Forecast + Overall Team YTD Forecast + Sponsorship Forecast)
      </Popover.Body>
    </Popover>
  );

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
            <Col xs={9}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Overall IND/Other Rev YTD Forecast:
                  {eventDetails?.individualOtherForecastYTD && (
                    <h6 className="displayInline">
                      &nbsp;
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(eventDetails?.individualOtherForecastYTD)}
                    </h6>
                  )}
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    id="individualOtherForecastYTD"
                    type="number"
                    step={0.01}
                    value={eventDetails?.individualOtherForecastYTD}
                    onChange={changeInputHandler}
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  Last modified - 21-12-2022
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={9}>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>
                  Overall Team YTD Forecast:
                  {eventDetails?.overall_team_forecast && (
                    <h6 className="displayInline">
                      &nbsp;
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(eventDetails?.overall_team_forecast)}
                    </h6>
                  )}
                </Form.Label>
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
            </Col>
          </Row>
          <Row>
            <Col xs={9}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Campaign YTD forecast :&nbsp;&nbsp;
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={popover}
                  >
                    <span className="roundedBorder displayInline">i</span>
                  </OverlayTrigger>
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                  <Form.Control
                    type="text"
                    value={
                      eventDetails?.overall_team_forecast &&
                      eventDetails?.overall_team_forecast
                        ? new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(
                            Math.round(
                              (Number(
                                eventDetails?.individualOtherForecastYTD
                              ) +
                                Number(eventDetails?.overall_team_forecast) +
                                Number(eventDetails?.sponsorshipForecast)) *
                                100
                            ) / 100
                          )
                        : ""
                    }
                    disabled
                  />
                </InputGroup>
                {eventDetails?.sponsorshipForecast && (
                  <Form.Text className="text-muted">
                    Sponsorship Forecast -{" "}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(eventDetails?.sponsorshipForecast)}
                  </Form.Text>
                )}
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
