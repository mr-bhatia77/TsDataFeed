import * as React from "react";
import { FunctionComponent, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import {
  eventOptionsMaker,
  teamOptionsMaker,
  priorityOptionsMaker,
  getTeamAssociationCheckbox,
} from "../../services/commonFunctions";
import {
  eventList,
  eventDetailsConstant,
  teamDetailsConstant,
} from "../../services/constants";

interface IEventLevelForm {
  userName: string;
  userEmail: string;
}

const TeamLevelForm: FunctionComponent<IEventLevelForm> = (props) => {
  const [eventDetails, setEventDetails] = useState(null);
  const [eventOptions, setEventOptions] = useState([
    <option value="Select Event">Select Event</option>,
  ]);
  const [teamDetails, setTeamDetails] = useState<any>(null);

  // console.log(eventDetails);

  useEffect(() => {
    setEventOptions(eventOptionsMaker(eventList));
  }, []);

  const submitHandler = (e: any) => {
    e.preventDefault();

    const getAssociationList = () => {
      const checkBoxList = [...e.target].slice(8, 17);

      const markedCheckBoxList: string[] = [];
      checkBoxList.forEach((checkBox) => {
        console.log(checkBox);
        if (checkBox.checked) markedCheckBoxList.push(checkBox.value);
      });
      return markedCheckBoxList;
    };
    const payload = {
      event: e.target[0].value,
      team: e.target[1].value,
      team_priority: e.target[7].value,
      team_association: getAssociationList().join(";"),
    };
    console.log("payload = ", payload);
  };

  const changeInputHandler = (e: any) => {
    console.log(e.target.id);
    setTeamDetails({ ...teamDetails, [e.target.id]: e.target.value });
  };

  const eventSelectHandler = (e: any) => {
    //call team list from event API
    // AxiosInstance.get(`/event/${e.target.value}/fetchData`).then((res)=>{
    //   console.log(res);
    // })
    setEventDetails(eventDetailsConstant);
  };

  const teamSelectHandler = (e: any) => {
    //call team details API
    // AxiosInstance.get(`/team/${e.target.value}/fetchData`).then((res)=>{
    //   console.log(res);
    // })
    setTeamDetails(teamDetailsConstant);
  };

  return (
    <Card>
      <Card.Header>
        <h3>Team Details</h3>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={submitHandler}>
          <Row>
            <Col xs={7}>
              <Form.Group className="mb-3">
                <Form.Label>Event Name: </Form.Label>
                <Form.Select onChange={eventSelectHandler}>
                  {eventOptions}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={7}>
              <Form.Group className="mb-3">
                <Form.Label>Team Name: </Form.Label>
                <Form.Select onChange={teamSelectHandler}>
                  {teamOptionsMaker(eventDetails?.teamEntityList)}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Team Captain Name:</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={teamDetails?.teamCaptainName}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Team Co-Captian Name:</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={teamDetails?.teamCoCaptain}
              />
            </Form.Group>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  No of Team Members Including team Captain
                </Form.Label>
                <Form.Control
                  type="number"
                  disabled
                  value={teamDetails?.numberTeamMemberIncludingCaptain}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Team Fundraising Goal:</Form.Label>
              <InputGroup>
                <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                <Form.Control
                  type="text"
                  disabled
                  value={teamDetails?.teamFundraisingGoal? new Intl.NumberFormat("en-US").format(teamDetails?.teamFundraisingGoal):''}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Team Actual YTD</Form.Label>
              <InputGroup>
                <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                <Form.Control
                  type="text"
                  disabled
                  value={teamDetails?.teamFundraisingGoal? new Intl.NumberFormat("en-US").format(teamDetails?.teamFundraisingGoal):''}
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3">
                <Form.Label>Team Priority</Form.Label>
                <Form.Select>
                  {priorityOptionsMaker(teamDetails?.teamPriorityRating)}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Team Association(select all applicable)</Form.Label>
            {getTeamAssociationCheckbox(teamDetails?.teamAssociation)}
          </Form.Group>
          <Row>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>
                Forecast YTD:{" "}
                {teamDetails?.teamForecastYTD && (
                  <h6 className="displayInline">
                    &nbsp;
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(teamDetails?.teamForecastYTD)}
                  </h6>
                )}
              </Form.Label>
              <InputGroup>
                <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                <Form.Control
                  id="teamForecastYTD"
                  type="number"
                  step={0.01}
                  onChange={changeInputHandler}
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Interaction Note: </Form.Label>
            <Form.Control as="textarea" style={{ height: "100px" }} />
          </Form.Group>
          <Button className="mb-3" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TeamLevelForm;
