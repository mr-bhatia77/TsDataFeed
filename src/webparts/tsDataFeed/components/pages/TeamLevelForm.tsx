import * as React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const TeamLevelForm = () => {
  return (
    <>
      <h3>Team Level</h3>
      <Form>
      <Row>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Team Name: </Form.Label>
              <Form.Select>
                <option value="Team 1">Team 1</option>
                <option value="Team 2">Team 2</option>
                <option value="Team 3">Team 3</option>
                <option value="Team 4">Team 4</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Team Id: </Form.Label>
              <Form.Select>
                <option value="Id:Team 1">Id:Team 1</option>
                <option value="Id:Team 2">Id:Team 2</option>
                <option value="Id:Team 3">Id:Team 3</option>
                <option value="Id:Team 4">Id:Team 4</option>
              </Form.Select>
            </Form.Group>
        </Row>
        <Row>
          <Col xs={6}>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Veteran/new:</Form.Label>
              <Form.Select aria-label="Default select example">
                <option value="Veteran">Veteran</option>
                <option value="New">New</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        
        <Form.Group className="mb-3">
          <Form.Label>Team Priority</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Select Team Priority</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="Mega">Mega</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Team Association(select all applicable)</Form.Label>
          <Form.Check type="checkbox" label="Board" />
          <Form.Check type="checkbox" label="Camp" />
          <Form.Check type="checkbox" label="Chair" />
          <Form.Check type="checkbox" label="HH" />
          <Form.Check type="checkbox" label="Lapsed Team" />
          <Form.Check type="checkbox" label="Planning Comm" />
          <Form.Check type="checkbox" label="RC Member/Team" />
          <Form.Check type="checkbox" label="RC Secured" />
          <Form.Check type="checkbox" label="Sponsor" />
          {/* <Form.Control type="text" placeholder="select all applicable" /> */}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Staff fiscal year forecast </Form.Label>
          <Form.Control type="number" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Team lead staff </Form.Label>
          <Form.Control type="number" />
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default TeamLevelForm;
