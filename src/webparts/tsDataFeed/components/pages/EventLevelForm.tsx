import * as React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
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
          <Col xs={6}>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Chapter: </Form.Label>
              <Form.Select>
                <option value="Chapter 1">Chapter 1</option>
                <option value="Chapter 2">Chapter 2</option>
                <option value="Chapter 3">Chapter 3</option>
                <option value="Chapter 4">Chapter 4</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
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
          {/* <Form.Group as={Col} className="mb-3">
              <Form.Label>Event Id: </Form.Label>
              <Form.Select>
                <option value="Id:Event 1">Id:Event 1</option>
                <option value="Id:Event 2">Id:Event 2</option>
                <option value="Id:Event 3">Id:Event 3</option>
                <option value="Id:Event 4">Id:Event 4</option>
              </Form.Select>
            </Form.Group> */}
        </Row>
        {/* <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>National Manager</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" />
        </Form.Group> */}

        {/* <Row>
          <Form.Group as={Col} className="mb-3" controlId="formBasicPassword">
            <Form.Label>Season</Form.Label>
            <Form.Control type="text" placeholder="season" />
          </Form.Group>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Honored hero</Form.Label>
            <Form.Control type="text" placeholder="Honored hero" />
          </Form.Group>
        </Row> */}
        <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Overall IND/Other Rev YTD Forecast:</Form.Label>
            <InputGroup>
                <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                <Form.Control
                  type="number"
                />
              </InputGroup>
            <Form.Text className="text-muted">
              Last modified - 21-12-2022
            </Form.Text>
          </Form.Group>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Overall Team YTD Forecast:</Form.Label>
            <InputGroup >
                <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                <Form.Control
                  type="number"
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
              <Form.Control type="textarea" />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default EventLevelForm;
