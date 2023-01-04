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
} from "../../services/commonFunctions";
import {
  eventList,
  teamList,
  teamDetailsConstant,
  teamAssociationCheckList,
} from "../../services/constants";
import AxiosInstance from "../../services/AxiosInstance";

interface IEventLevelForm {
  userName: string;
  userEmail: string;
}

const TeamLevelForm: FunctionComponent<IEventLevelForm> = (props) => {

  const {userEmail} = props;
  const [eventOptions, setEventOptions] = useState([
    <option value="Select Event">Select Event</option>,
  ]);
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const [teamOptions, setTeamOptions] = useState([
    <option value="Select Team">Select Team</option>,
  ]);
  const [teamDetails, setTeamDetails] = useState<any>(null);
  const [initialTeamDetails, setInitialTeamDetails] = useState<any>(null);

  useEffect(() => {
    AxiosInstance.get(`/tsdata/meta/allEvents/fetchData`).then((res)=>{
      setEventOptions(eventOptionsMaker(res.data))
    }).catch((error)=>{
      console.log(error)
      setEventOptions(eventOptionsMaker(eventList));
    })
    // console.log("team page rendered");
  }, []);

  useEffect(() => {
    setSubmitDisabled(isFormValuesSame());
  }, [teamDetails]);

  const isFormValuesSame = () => {
    // console.log(initialTeamDetails,'initialTeamDetails');
    // console.log(teamDetails,'currentTeamDetails')
    if (
      initialTeamDetails?.teamPriorityRating ===
        teamDetails?.teamPriorityRating &&
      initialTeamDetails?.teamAssociation === teamDetails?.teamAssociation &&
      initialTeamDetails?.teamForecastYTD == teamDetails?.teamForecastYTD &&
      initialTeamDetails?.interactionNote == teamDetails?.interactionNote
    ) {
      return true;
    } else return false;
  };
  const submitHandler = (e: any) => {
    e.preventDefault();

    const payload:{[key:string]:any} = {
      teamPriorityRating: null,
      teamAssociation: null,
      teamForecastYTD: null,
      interactionNote:null
  };
    for( let i in initialTeamDetails) {
      if(initialTeamDetails[i]!=teamDetails[i]){
        payload[i]=teamDetails[i];
      }
    }
    AxiosInstance.put(`/team/UpdateTeamDetails/${teamDetails?.teamId}?userName=${userEmail}`,payload).then((res)=>{
      console.log("submitted successfully");
    }).catch((error)=>{
      console.log(error);
    })
  };

  const changeInputHandler = (e: any) => {
    // console.log(e.target.id);
    setTeamDetails({ ...teamDetails, [e.target.id]: e.target.value });
  };

  const eventSelectHandler = (e: any) => {
    //call team list from event API
    AxiosInstance.get(`/meta/teamsListByEvent/${e.target.value}/fetchData`).then((res)=>{
      setTeamOptions(teamOptionsMaker(res.data));
    }).catch((error)=>{
      console.log(error);
      setTeamOptions(teamOptionsMaker(teamList));
    })

  };

  const teamSelectHandler = (e: any) => {
    //call team details API
    AxiosInstance.get(`/team/${e.target.value}/fetchData`).then((res)=>{
      setTeamDetails(res.data);
      setInitialTeamDetails(teamDetailsConstant);
    }).catch((error)=>{
      console.log(error)
      setTeamDetails(teamDetailsConstant);
      setInitialTeamDetails(teamDetailsConstant);
    })
  };

  const getAssociationCheckboxList = (checked: boolean, newValue: string) => {
    const teamAssociationArray: string[] =
      teamDetails?.teamAssociation?.split(";");
    let newTeamAssociationArray: string[] = [];
    if (checked) {
      teamAssociationArray.push(newValue);
      newTeamAssociationArray = teamAssociationArray;
    } else {
      teamAssociationArray.forEach((oneTeamAssociation: string) => {
        if (oneTeamAssociation !== newValue) {
          newTeamAssociationArray.push(oneTeamAssociation);
        }
      });
    }
    return newTeamAssociationArray.join(";");
  };

  const handleCheckBox = (e: any) => {
    // console.log(e.target.checked);
    setTeamDetails({
      ...teamDetails,
      teamAssociation: getAssociationCheckboxList(
        e.target.checked,
        e.target.value
      ),
    });
  };

  const getTeamAssociationCheckbox = (teamAssociation?: string) => {
    const teamAssociationArray: string[] = teamAssociation?.split(";");
    const teamAssociationHashMap: { [key: string]: number } = {};
    teamAssociationArray?.forEach((teamAssociation: string) => {
      teamAssociationHashMap[teamAssociation] = 1;
    });
    // console.log(teamAssociationHashMap);
    const teamAssociationCheckboxes: any[] = teamAssociationCheckList.map(
      (item: string) => {
        return (
          <Form.Check
            type="checkbox"
            label={item}
            value={item}
            checked={teamAssociationHashMap[item] == 1}
            onChange={handleCheckBox}
          />
        );
      }
    );

    return teamAssociationCheckboxes;
  };

  const selectPriorityHandler = (e:any)=> {
    setTeamDetails({...teamDetails,teamPriorityRating:e.target.value})
  }

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
                  {teamOptions}
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
              <Form.Label>Team Co-Captain Name:</Form.Label>
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
                  value={
                    teamDetails?.teamFundraisingGoal
                      ? new Intl.NumberFormat("en-US").format(
                          teamDetails?.teamFundraisingGoal
                        )
                      : ""
                  }
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
                  value={
                    teamDetails?.teamActualYTD
                      ? new Intl.NumberFormat("en-US").format(
                          teamDetails?.teamActualYTD
                        )
                      : ""
                  }
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3">
                <Form.Label>Team Priority</Form.Label>
                <Form.Select onChange={selectPriorityHandler}>
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
                  value={teamDetails?.teamForecastYTD}
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Interaction Note: </Form.Label>
            <Form.Control as="textarea" id="interactionNote" style={{ height: "100px" }} value={teamDetails?.interactionNote} onChange={changeInputHandler}/>
          </Form.Group>
          <Button
            className="mb-3"
            variant="primary"
            type="submit"
            disabled={submitDisabled}
          >
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TeamLevelForm;
