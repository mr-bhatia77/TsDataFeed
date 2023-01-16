import * as React from "react";
import { FunctionComponent, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { teamAssociationCheckList,staffLead } from "../../services/constants";
import {
  eventOptionsMaker,
  teamOptionsMaker,
  priorityOptionsMaker,
  staffLeadOptionsMaker,
} from "../../services/commonFunctions";
import AxiosInstance from "../../services/AxiosInstance";

interface IEventLevelForm {
  userName: string;
  userEmail: string;
}

const TeamLevelForm: FunctionComponent<IEventLevelForm> = (props) => {
  const { userEmail } = props;
  const [eventOptions, setEventOptions] = useState([
    <option value="Select Event" className="textItalic">
      Select Event
    </option>,
  ]);
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const [teamOptions, setTeamOptions] = useState([
    <option value="Select Team" className="textItalic">
      Select Team
    </option>,
  ]);
  const [teamDetails, setTeamDetails] = useState<any>({});
  const [initialTeamDetails, setInitialTeamDetails] = useState<any>({});
  const [updatedSuccessfully, setUpdatedSuccessfully] =
    useState<string>('');
  const [errorState, setErrorState] = useState<boolean>(false);

  const compare = (a: any, b: any) => {
    if (a.eventName < b.eventName) {
      return -1;
    }
    if (a.eventName > b.eventName) {
      return 1;
    }
    return 0;
  };
  useEffect(() => {
    AxiosInstance.get(`/meta/allEvents/fetchData`)
      .then((res) => {
        setEventOptions(eventOptionsMaker(res?.data.sort(compare)));
      })
      .catch((error) => {
        console.log(error);
        setErrorState(true);
      });
    // console.log("team page rendered");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setUpdatedSuccessfully('');
    }, 5000);
  }, [updatedSuccessfully]);

  useEffect(() => {
    setSubmitDisabled(isFormValuesSame());
  }, [teamDetails, initialTeamDetails]);

  const isFormValuesSame = () => {
    // console.log(initialTeamDetails,'initialTeamDetails');
    // console.log(teamDetails,'currentTeamDetails')
    const matchTheseFields = [
      "teamPriorityRating",
      "teamAssociation",
      "teamForecastYTD",
      "interactionNote",
      "leadStaffName",
    ];
    let count = 0;
    matchTheseFields.forEach((field: string) => {
      if (initialTeamDetails[field] === teamDetails[field]) count++;
    });
    // console.log(count)
    return count === matchTheseFields.length ? true : false;
  };

  const submitHandler = (e: any) => {
    e.preventDefault();

    const payload: { [key: string]: any } = {
      teamPriorityRating: null,
      teamAssociation: null,
      teamForecastYTD: null,
      interactionNote: null,
      leadStaffName:null
    };
    for (let i in initialTeamDetails) {
      if (initialTeamDetails[i] != teamDetails[i]) {
        payload[i] = teamDetails[i];
      }
    }
    AxiosInstance.put(
      `/team/UpdateTeamDetails/${teamDetails?.teamId}?userName=${userEmail}`,
      payload
    )
      .then((res) => {
        console.log("submitted successfully");
        setUpdatedSuccessfully('success');
        AxiosInstance.get(`/team/${teamDetails?.teamId}/fetchData`)
          .then((res) => {
            setTeamDetails(res.data);
            setInitialTeamDetails(res.data);
          })
          .catch((error) => {
            console.log(error);
            setErrorState(true);
          });
      })
      .catch((error) => {
        console.log(error);
        setUpdatedSuccessfully('error');
      });
    // console.log(userEmail,payload,teamDetails,initialTeamDetails);
  };

  const changeInputHandler = (e: any) => {
    // console.log(e.target.id);
    setTeamDetails({ ...teamDetails, [e.target.id]: e.target.value });
  };

  const eventSelectHandler = (e: any) => {
    //call team list from event API
    setTeamOptions([<option value="Select Team">Select Team</option>]);
    setTeamDetails({});
    setInitialTeamDetails({});
    if(e.target.value !== 'Select Event'){
    AxiosInstance.get(`/meta/teamsListByEvent/${e.target.value}/fetchData`)
      .then((res) => {
        setTeamOptions(teamOptionsMaker(res.data));
      })
      .catch((error) => {
        console.log(error);
        setErrorState(true);
      });
    }
  };

  const teamSelectHandler = (e: any) => {
    //call team details API
    if(e.target.value !== 'Select Team'){
    AxiosInstance.get(`/team/${e.target.value}/fetchData`)
      .then((res) => {
        setTeamDetails(res.data);
        setInitialTeamDetails(res.data);
      })
      .catch((error) => {
        console.log(error);
        setErrorState(true);
      });
    }
    else {
      setTeamDetails({});
      setInitialTeamDetails({});
    }
  };

  const getAssociationCheckboxList = (checked: boolean, newValue: string) => {
    const teamAssociationArray: string[] = teamDetails?.teamAssociation
      ? teamDetails?.teamAssociation?.split(";")
      : [];
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
    // console.log(newTeamAssociationArray)
    // console.log(newTeamAssociationArray.join(";"));
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
            disabled={!teamDetails?.teamId}
          />
        );
      }
    );

    return teamAssociationCheckboxes;
  };

  const selectPriorityHandler = (e: any) => {
    setTeamDetails({
      ...teamDetails,
      teamPriorityRating:
        e.target.value === "Select Team Priority" ? null : e.target.value,
    });
  };

  const selectLeadStaffHandler = (e: any) => {
    setTeamDetails({
      ...teamDetails,
      leadStaffName:
        e.target.value === "Select Team Priority" ? null : e.target.value,
    });
  };

  

  return (
    <Card>
      <Card.Header>
        <h3>Team Details</h3>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={submitHandler}>
          <Row>
            <Col xs={12}>
              {errorState && (
                <Alert
                  variant="danger"
                  onClose={() => setErrorState(false)}
                  dismissible
                >
                  <Alert.Heading>Something went Wrong!</Alert.Heading>
                  <p>
                    Looks like something went wrong! Try reloading the page or
                    contact admin.
                  </p>
                </Alert>
              )}
            </Col>
          </Row>
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
                value={
                  teamDetails?.teamCaptainName
                    ? teamDetails?.teamCaptainName
                    : ""
                }
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Team Co-Captain Name:</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={
                  teamDetails?.teamCoCaptain ? teamDetails?.teamCoCaptain : ""
                }
              />
            </Form.Group>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                Number of Team Members (including Team Captain):
                </Form.Label>
                <Form.Control
                  type="number"
                  disabled
                  value={
                    teamDetails?.numberTeamMemberIncludingCaptain
                      ? teamDetails?.numberTeamMemberIncludingCaptain
                      : ""
                  }
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
              <Form.Label>Team Fundraising Actual YTD:</Form.Label>
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
                <Form.Label>Staff Lead:</Form.Label>
                <Form.Select
                  onChange={selectLeadStaffHandler}
                  disabled={!teamDetails?.teamId}
                >
                  {staffLeadOptionsMaker(staffLead)}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3">
                <Form.Label>Team Priority:</Form.Label>
                <Form.Select
                  onChange={selectPriorityHandler}
                  disabled={!teamDetails?.teamId}
                >
                  {priorityOptionsMaker(teamDetails?.teamPriorityRating)}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Team Association (select all applicable): </Form.Label>
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
                  min={0}
                  onChange={changeInputHandler}
                  value={
                    teamDetails?.teamForecastYTD
                      ? teamDetails?.teamForecastYTD
                      : ""
                  }
                  disabled={!teamDetails?.teamId}
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Interaction Note: </Form.Label>
            <Form.Control
              as="textarea"
              id="interactionNote"
              maxLength={4000}
              style={{ height: "100px" }}
              value={
                teamDetails?.interactionNote ? teamDetails?.interactionNote : ""
              }
              onChange={changeInputHandler}
              disabled={!teamDetails?.teamId}
            />
             <Form.Text className="text-muted">(max 4000 characters)</Form.Text>
          </Form.Group>
          <Row>
            <Col xs={2}>
              <Button
                className="mb-3"
                variant="primary"
                type="submit"
                disabled={submitDisabled}
              >
                Submit
              </Button>
            </Col>
            <Col xs={6}>
            {updatedSuccessfully==='success' && (
                <Alert key={"success"} variant={"success"} className="banner">
                  Updated Successfully!
                </Alert>
              )}
              {updatedSuccessfully==='error' && (
                <Alert key={"danger"} variant={"danger"} className="banner">
                  Something Went Wrong!
                </Alert>
              )}
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TeamLevelForm;
