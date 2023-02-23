import * as React from "react";
import { FunctionComponent, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { teamAssociationCheckList,
  // fakeTeamResponse
 } from "../../services/constants";
import {
  eventOptionsMaker,
  teamOptionsMaker,
  priorityOptionsMaker,
  campNameOptionsMaker,
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
  const [campNameOptions, setCampNameOptions] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const [teamOptions, setTeamOptions] = useState([
    <option value="Select Team" className="textItalic">
      Select Team
    </option>,
  ]);
  const [teamDetails, setTeamDetails] = useState<any>({});
  const [isCampError,setIsCampError] = useState<boolean>(false)
  const [initialTeamDetails, setInitialTeamDetails] = useState<any>({});
  const [updatedSuccessfully, setUpdatedSuccessfully] = useState<string>("");
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

    setCampNameOptions(campNameOptionsMaker());
    // console.log("team page rendered");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setUpdatedSuccessfully("");
    }, 5000);
  }, [updatedSuccessfully]);

  useEffect(() => {
    setSubmitDisabled(isFormValuesSame());
    // console.log(teamDetails)
  }, [teamDetails, initialTeamDetails]);

  const isFormValuesSame = () => { // this function returns true if we want to disable submit button 

    // console.log(initialTeamDetails,'initialTeamDetails');
    // console.log(teamDetails,'currentTeamDetails')

    const matchTheseFields = [
      "teamPriorityRating",
      "teamAssociation",
      "teamForecastYTD",
      "interactionNote",
      "leadStaffName",
      "campName"
    ];
    let count = 0;
    matchTheseFields.forEach((field: string) => {
      if (initialTeamDetails[field] === teamDetails[field]) count++;
    });

    //check if camp is selected and campName is NOT chosen - disable submit button
    if (teamDetails?.teamAssociation?.split(';')?.includes('Camp') && !teamDetails.campName) {
      setIsCampError(true);
      return true
    }
    //check if camp is NOT selected and campName IS chosen - disable submit button
    // else if (!teamDetails?.teamAssociation?.split(';')?.includes('Camp') && teamDetails.campName) {
    //   return true
    // }
    else
      return count === matchTheseFields.length ? true : false;
  };

  const submitHandler = (e: any) => {
    e.preventDefault();

    const payload: { [key: string]: any } = {
      teamPriorityRating: null,
      teamAssociation: null,
      teamForecastYTD: null,
      interactionNote: null,
      leadStaffName: null,
      campName: null
    };

    for (let i in initialTeamDetails) {
      if (i === 'teamAssociation' || i === 'campName') {
        initialTeamDetails[i] === teamDetails[i] ? payload[i] = initialTeamDetails[i] : payload[i] = teamDetails[i];
        payload[i] = teamDetails[i] === "" ? null : teamDetails[i];
      }
      else if (initialTeamDetails[i] != teamDetails[i]) {
        payload[i] = teamDetails[i] === "" ? null : teamDetails[i];
      }
    }

    if (initialTeamDetails?.teamAssociation?.split(';')?.includes('Camp') && !teamDetails?.teamAssociation?.split(';')?.includes('Camp'))
      payload.campName = null;
    // else
    //   payload.campName = teamDetails.campName;

    AxiosInstance.put(
      `/team/UpdateTeamDetails/${teamDetails?.teamId}?userName=${userEmail}`,
      payload
    )
      .then((res) => {
        console.log("submitted successfully");
        setUpdatedSuccessfully("success");
        AxiosInstance.get(`/team/${teamDetails?.teamId}/fetchData`)
          .then((res) => {
            setTeamDetails(res.data);
            setInitialTeamDetails(res.data);
            setCampNameOptions(campNameOptionsMaker(res?.data?.campName));
          })
          .catch((error) => {
            console.log(error);
            setErrorState(true);
          });
      })
      .catch((error) => {
        console.log(error);
        setUpdatedSuccessfully("error");
      });
    console.log(userEmail, payload)
    // , teamDetails, initialTeamDetails);
  };
  function validateAlpha(input: string) {
    if (input === "") {
      return true;
    }
    const alphaExp = /^[a-zA-Z\s]+$/;
    return alphaExp.test(input);
  }

  const changeInputHandler = (e: any) => {
    // console.log(e.target.id);
    if (e.target.id === "leadStaffName") {
      if (validateAlpha(e.target.value))
        setTeamDetails({ ...teamDetails, [e.target.id]: e.target.value });
    } else setTeamDetails({ ...teamDetails, [e.target.id]: e.target.value });
  };

  const eventSelectHandler = (e: any) => {
    //call team list from event API
    setTeamOptions([<option value="Select Team">Select Team</option>]);
    setTeamDetails({});
    setInitialTeamDetails({});
    if (e.target.value !== "Select Event") {
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

  const campNameSelectHandler = (e: any) => {
    //call team list from event API
    setTeamDetails({
      ...teamDetails,
      campName:
        e.target.value === "Select Camp" ? null : e.target.value,
    });
    setIsCampError(e.target.value === "Select Camp" ?true:false)
  };

  const teamSelectHandler = (e: any) => {
    //call team details API

    if (e.target.value !== "Select Team") {
      AxiosInstance.get(`/team/${e.target.value}/fetchData`)
        .then((res) => {
          setTeamDetails(res.data);
          setInitialTeamDetails(res.data);
          setCampNameOptions(campNameOptionsMaker(res?.data?.campName));
          // setTeamDetails(fakeTeamResponse);
          // setInitialTeamDetails(fakeTeamResponse);
          // setCampNameOptions(campNameOptionsMaker(fakeTeamResponse?.campName));
        })
        .catch((error) => {
          console.log(error);
          setErrorState(true);
        });
    } else {
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
    if(e.target.value === 'Camp' && !e.target.checked) {
      setIsCampError(false)
    }
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
    const teamAssociationCheckboxes: any[] = teamAssociationCheckList?.map(
      (item: string) => {
        return (
          <Row>
            <Col xs={2}>
              <Form.Check
                type="checkbox"
                label={item}
                value={item}
                checked={teamAssociationHashMap[item] == 1}
                onChange={handleCheckBox}
                disabled={!teamDetails?.teamId}
              />
            </Col>
            {item === "Camp" && teamDetails?.teamId && teamAssociationHashMap['Camp'] == 1 && (<Col xs={6}>
              <Row>
                <Col xs={10} style={{paddingRight:'0px'}}><Form.Group>
                <Form.Select className='campSelect' onChange={campNameSelectHandler}>
                  {campNameOptions}
                </Form.Select>
              </Form.Group>
              </Col>
              <Col xs={2} style={{paddingLeft:'5px',fontSize:'14px'}}><span className="textRed">*</span></Col>
              </Row>
            </Col>
            
            )}

          </Row>
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
                as="textarea"
                style={{ resize: "none", height: "38px" }}
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
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Staff Lead:</Form.Label>
                <Form.Control
                  id="leadStaffName"
                  type="text"
                  placeholder="Enter Staff Lead"
                  value={
                    !teamDetails?.leadStaffName
                      ? ""
                      : teamDetails?.leadStaffName
                  }
                  disabled={!teamDetails?.teamId}
                  onChange={changeInputHandler}
                />
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
          <Row style={{height: '40px'}}>
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
              {updatedSuccessfully === "success" && (
                <Alert key={"success"} variant={"success"} className="banner">
                  Updated Successfully!
                </Alert>
              )}
              {updatedSuccessfully === "error" && (
                <Alert key={"danger"} variant={"danger"} className="banner">
                  Something Went Wrong!
                </Alert>
              )}
            </Col>
          </Row>
          {isCampError && <Row>
            <p className="textRed">* Please select camp name!</p></Row>}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TeamLevelForm;
