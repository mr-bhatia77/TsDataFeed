import * as React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
// import Dropdown from 'react-bootstrap/Dropdown';

// const data = [
//   { name: "one", value: "One", selected: true },
//   { name: "Two", value: "Two" },
//   { name: "Three", value: "Three" },
// ];

const EventLevelForm = () => {
  return (
    <>
      <h3>Event Level</h3>
      <Form>
        <Row>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Event Name: </Form.Label>
              <Form.Select>
                <option value="Event 1">Event 1</option>
                <option value="Event 2">Event 2</option>
                <option value="Event 3">Event 3</option>
                <option value="Event 4">Event 4</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Event Id: </Form.Label>
              <Form.Select>
                <option value="Id:Event 1">Id:Event 1</option>
                <option value="Id:Event 2">Id:Event 2</option>
                <option value="Id:Event 3">Id:Event 3</option>
                <option value="Id:Event 4">Id:Event 4</option>
              </Form.Select>
            </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>National Manager</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" />
          {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
        </Form.Group>

        <Row>
          <Form.Group as={Col} className="mb-3" controlId="formBasicPassword">
            <Form.Label>Season</Form.Label>
            <Form.Control type="text" placeholder="season" />
          </Form.Group>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Honored hero</Form.Label>
            <Form.Control type="text" placeholder="Honored hero" />
          </Form.Group>
        </Row>
        <Row>
        <Form.Group as={Col} className="mb-3">
          <Form.Label>Overall IND/Other Rev YTD Forecast:</Form.Label>
          <Form.Control type="number" />
        </Form.Group>
        <Form.Group as={Col} className="mb-3">
          <Form.Label>Overall Team YTD Forecast:</Form.Label>
          <Form.Control type="number" />
        </Form.Group>
        </Row>
        <Form>
        </Form>

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

export default EventLevelForm;
