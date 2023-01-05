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
import Popover from "react-bootstrap/Popover";
import Alert from "react-bootstrap/Alert";
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
  const { userEmail } = props;
  const [eventDetails, setEventDetails] = useState<any>({});
  const [eventOptions, setEventOptions] = useState([
    <option value="Select Event">Select Event</option>,
  ]);
  const [chapterOptions, setChapterOptions] = useState([
    <option value="Select Chapter">Select Chapter</option>,
  ]);
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const [initialEventDetails, setInitialEventDetails] = useState<any>({});
  const [updatedSuccessfully, setUpdatedSuccessfully] =
    useState<boolean>(false);

  const submitHandler = (e: any) => {
    e.preventDefault();
    // console.log(e);
    const payload: { [key: string]: any } = {
      individualOtherForecastYTD: null,
      individualOtherModifiedDate: null,
      overallTeamForecastYTD: null,
      overallTeamModifiedDate: null,
      forecastInfo: null,
      campaignForecastYTD: null,
    };
    const finalCampaignForecastYTD = (
      Number(eventDetails?.individualOtherForecastYTD) +
      Number(eventDetails?.overallTeamForecastYTD) +
      Number(eventDetails?.sponsorshipForecast)
    ).toFixed(2);
    // console.log(finalCampaignForecastYTD);

    for (let i in initialEventDetails) {
      if (initialEventDetails[i] != eventDetails[i]) {
        if (i === "individualOtherForecastYTD") {
          payload.individualOtherModifiedDate = new Date();
        }
        if (i === "overallTeamForecastYTD") {
          payload.overallTeamModifiedDate = new Date();
        }
        payload[i] = eventDetails[i];
      }
    }
    if (initialEventDetails?.campaignForecastYTD !== finalCampaignForecastYTD) {
      payload.campaignForecastYTD = finalCampaignForecastYTD;
    }
    AxiosInstance.put(
      `/event/UpdateEventDetails/${eventDetails?.eventId}?userName=${userEmail}`,
      payload
    )
      .then((res) => {
        // console.log("submitted successfully");
        setUpdatedSuccessfully(true);
        AxiosInstance.get(`/event/${eventDetails?.eventId}/fetchData`)
          .then((res) => {
            setEventDetails(res?.data);
            setInitialEventDetails(res?.data);
          })
          .catch((error) => {
            setEventDetails(eventDetailsConstant);
            setInitialEventDetails(eventDetailsConstant);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(userEmail, payload);
  };

  const chapterSelectHandler = (e: any) => {
    // call event list API
    AxiosInstance.get(`/meta/eventsByChapter/${e.target.value}/fetchData`)
      .then((res) => {
        setEventOptions(eventOptionsMaker(res?.data));
      })
      .catch((error) => {
        console.log(error);
        setEventOptions(eventOptionsMaker(eventList));
      });
  };

  const eventSelectHandler = (e: any) => {
    //call event details API
    AxiosInstance.get(`/event/${e.target.value}/fetchData`)
      .then((res) => {
        setEventDetails(res?.data);
        setInitialEventDetails(res?.data);
      })
      .catch((error) => {
        setEventDetails(eventDetailsConstant);
        setInitialEventDetails(eventDetailsConstant);
      });
  };

  const changeInputHandler = (e: any) => {
    // console.log(e.target.id);
    setEventDetails({ ...eventDetails, [e.target.id]: e.target.value });
  };

  const isFormValuesSame = () => {
    // console.log(initialEventDetails, "initialTeamDetails");
    // console.log(eventDetails, "currentTeamDetails");

    const matchTheseFields = [
      "individualOtherForecastYTD",
      "overallTeamForecastYTD",
      "forecastInfo",
      "campaignForecastYTD",
    ];
    let count = 0;
    matchTheseFields.forEach((field: string) => {
      if (initialEventDetails[field] == eventDetails[field]) count++;
    });
    // console.log(count);
    return count === matchTheseFields.length ? true : false;
  };

  useEffect(() => {
    AxiosInstance.get("/meta/chaptersList/fetchData")
      .then((res) => {
        setChapterOptions(chapterOptionsMaker(res?.data));
      })
      .catch((error) => {
        console.log(error);
        setChapterOptions(chapterOptionsMaker(chapterList));
      });
  }, []);

  useEffect(() => {
    setSubmitDisabled(isFormValuesSame());
  }, [eventDetails, initialEventDetails]);

  useEffect(()=>{
    setTimeout(()=>{
      setUpdatedSuccessfully(false);
    },5000)
  },[updatedSuccessfully])

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Campaign YTD forecast</Popover.Header>
      <Popover.Body>
        Calculated as sum of (Overall IND/Other Rev YTD Forecast + Overall Team
        YTD Forecast + Sponsorship Forecast)
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
                {eventDetails?.individualOtherModifiedDate && (
                  <Form.Text className="text-muted">
                    Last modified -{" "}
                    {new Date(
                      eventDetails?.individualOtherModifiedDate
                    ).toLocaleString("en-IN")}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={9}>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>
                  Overall Team YTD Forecast:
                  {eventDetails?.overallTeamForecastYTD && (
                    <h6 className="displayInline">
                      &nbsp;
                      {new Intl.NumberFormat("en-US").format(
                        eventDetails?.overallTeamForecastYTD
                      )}
                    </h6>
                  )}
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                  <Form.Control
                    id="overallTeamForecastYTD"
                    type="number"
                    step={0.01}
                    value={eventDetails?.overallTeamForecastYTD}
                    onChange={changeInputHandler}
                  />
                </InputGroup>
                {eventDetails?.overallTeamModifiedDate && (
                  <Form.Text className="text-muted">
                    Last modified -{" "}
                    {new Date(
                      eventDetails?.overallTeamModifiedDate
                    ).toLocaleString("en-IN")}
                  </Form.Text>
                )}
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
                      eventDetails?.individualOtherForecastYTD ||
                      eventDetails?.overallTeamForecastYTD ||
                      eventDetails?.sponsorshipForecast
                        ? new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(
                            Math.round(
                              (Number(
                                eventDetails?.individualOtherForecastYTD
                              ) +
                                Number(eventDetails?.overallTeamForecastYTD) +
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
          <Button
            className="mb-3"
            variant="primary"
            type="submit"
            disabled={submitDisabled}
          >
            Submit
          </Button>
        </Form>
        {updatedSuccessfully && (
          <Alert key={"success"} variant={"success"}>
            Updated Successfully!
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default EventLevelForm;
