import * as React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";

const EventLevelForm = () => {

  const submitHandler = (e: any) => {
    e.preventDefault();
    // console.log(e);
    const payload = {
      chapter: e.target[0].value,
      event: e.target[1].value,
      overall_ind_forecast: e.target[2].value,
      overall_team_forecast: e.target[3].value,
    };
    console.log("payload = ", payload);
  };

  return (
    <Card>
      <Card.Header>
        <h3>Event Level</h3>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={submitHandler}>
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
                <Form.Control type="number" />
              </InputGroup>
              <Form.Text className="text-muted">
                Last modified - 21-12-2022
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Overall Team YTD Forecast:</Form.Label>
              <InputGroup>
                <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                <Form.Control type="number" />
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
                  <Form.Control type="number" disabled />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={9}>
              <Form.Group className="mb-3">
                <Form.Label>Forecast Info:</Form.Label>
                <Form.Control type="textarea" style={{ height: "100px" }} />
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
