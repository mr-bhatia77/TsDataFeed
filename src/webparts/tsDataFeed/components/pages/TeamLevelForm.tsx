import * as React from "react";
import {FunctionComponent} from 'react';
import {useSelector} from 'react-redux';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import {eventOptionsMaker,teamOptionsMaker} from '../../services/commonFunctions';


interface IEventLevelForm {
  userName:string,
  userEmail:string,
}

const TeamLevelForm:FunctionComponent<IEventLevelForm> = (props) => {

  const eventList = useSelector((state:any)=>state?.application?.eventList);
  const eventDetails = useSelector((state:any)=>state?.application?.event);
  console.log(eventDetails);

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
      team_association: getAssociationList(),
    };
    console.log("payload = ", payload);
  };

  return (
    <Card>
      <Card.Header><h3>Team Details</h3></Card.Header>
      <Card.Body>
      <Form onSubmit={submitHandler}>
        <Row>
          <Col xs={7}>
            <Form.Group className="mb-3">
              <Form.Label>Event Name: </Form.Label>
              <Form.Select>
                {eventOptionsMaker(eventList,eventDetails?.eventId)}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={7}>
            <Form.Group className="mb-3">
              <Form.Label>Team Name: </Form.Label>
              <Form.Select>
                {teamOptionsMaker(eventDetails?.teamEntityList)}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        {/* <Form.Group  className="mb-3">
            <Form.Label>Team Id: </Form.Label>
            <Form.Select>
              <option value="Id:Team 1">Id:Team 1</option>
              <option value="Id:Team 2">Id:Team 2</option>
              <option value="Id:Team 3">Id:Team 3</option>
              <option value="Id:Team 4">Id:Team 4</option>
            </Form.Select>
          </Form.Group> */}

        {/* <Row>
          <Col xs={6}>
            <Form.Group className="mb-3">
              <Form.Label>Veteran/new:</Form.Label>
              <Form.Select>
                <option value="Veteran">Veteran</option>
                <option value="New">New</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Form.Group className="mb-3">
              <Form.Label>Type:</Form.Label>
              <Form.Select>
                <option value="Corporate">Corporate</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row> */}
        <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Team Captain Name:</Form.Label>
            <Form.Control type="text" disabled/>
          </Form.Group>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Team Co-Captian Name:</Form.Label>
            <Form.Control type="text" disabled />
          </Form.Group>
        </Row>
        <Row>
          <Col xs={6}>
            <Form.Group className="mb-3">
              <Form.Label>No of Team Members Including team Captain</Form.Label>
              <Form.Control type="number" disabled/>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Team Fundraising Goal:</Form.Label>
            <InputGroup>
              <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
              <Form.Control type="number" step={0.01} disabled />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Team Actual YTD</Form.Label>
            <InputGroup>
              <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
              <Form.Control type="number" step={0.01} disabled />
            </InputGroup>
          </Form.Group>
        </Row>
        <Row>
          <Col xs={6}>
            <Form.Group className="mb-3">
              <Form.Label>Team Priority</Form.Label>
              <Form.Select>
                <option>Select Team Priority</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="Mega">Mega</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Team Association(select all applicable)</Form.Label>
          <Form.Check type="checkbox" label="Board" value="Board" />
          <Form.Check type="checkbox" label="Camp" value="Camp" />
          <Form.Check type="checkbox" label="Chair" value="Chair" />
          <Form.Check type="checkbox" label="HH" value="HH" />
          <Form.Check type="checkbox" label="Lapsed Team" value="Lapsed Team" />
          <Form.Check
            type="checkbox"
            label="Planning Comm"
            value="Planning Comm"
          />
          <Form.Check
            type="checkbox"
            label="RC Member/Team"
            value="RC Member/Team"
          />
          <Form.Check type="checkbox" label="RC Secured" value="RC Secured" />
          <Form.Check type="checkbox" label="Sponsor" value="Sponsor" />
        </Form.Group>
        <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Forecast YTD</Form.Label>
            <InputGroup>
              <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
              <Form.Control type="number" step={0.01}/>
            </InputGroup>
          </Form.Group>
        </Row>
        {/* <Form.Group className="mb-3">
          <Form.Label>
            Staff fiscal year forecast (aka TS Team Forecast attribute today){" "}
          </Form.Label>
          <Form.Control type="number" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Team lead staff </Form.Label>
          <Form.Control type="number" />
        </Form.Group> */}
        <Form.Group className="mb-3">
          <Form.Label>Interaction Note: </Form.Label>
          <Form.Control type="textarea" style={{ height: '100px' }}/>
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
