import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Modal,
  Button,
  Image,
  Container,
  FormGroup,
  FormSelect,
} from "react-bootstrap";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [themeId, setThemeId] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          "https://rebrickable.com/api/v3/lego/sets/?key=cef91563c41612c871ed256c1a22e628"
        );
        const json = await response.json();
        setData(json.results);
        console.log(json.results);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchLocation();
  }, []);

  const handleModal = (e) => {
    setShow(!show);
  };

  return (
    <Container fluid>
      <h1>Lego Theme - Brickable API</h1>
      <Row className="justify-content-md-center">
        {/* Select Lego theme */}
        <Col md={3}>
          <Form>
            <FormGroup formcontrol>
              <p className="col-sm-6 col-md-6">Select Lego theme ID :</p>
              <FormSelect
                className="col-sm-6 col-md-2"
                value={themeId}
                onChange={(e) => setThemeId(e.target.value)}
              >
                <option>Default</option>
                {data.map((item) => (
                  <option key={item.set_num} value={item.theme_id}>
                    {item.theme_id}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>
          </Form>
        </Col>
        {/* Show theme & be able to click on the theme and go to the details. */}
        <Col md={4}>
          <p className="col-sm-12 ">LEGO sets use this theme:</p>
          <div className="col-sm-12 ">
            {" "}
            {data
              .filter((data) => data.theme_id == themeId)
              .map((filtered) => (
                <div>
                  <li key={filtered.set_num}>
                    <a onClick={() => handleModal()}>Name: "{filtered.name}"</a>
                  </li>
                  <Modal show={show} onHide={(e) => setShow(e.target.show)}>
                    <Modal.Header className="modal-title">
                      {" "}
                      LEGO Set Detail
                    </Modal.Header>
                    <Modal.Body>
                      <p>
                        Set number: {filtered.set_num}
                        <br />
                        num_parts: {filtered.num_parts}
                        <br />
                        year: {filtered.year}
                      </p>
                      <Image
                        src={filtered.set_img_url}
                        alt={filtered.name}
                        width={400}
                        height={400}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={() => handleModal()}>Close</Button>
                      <Button>Like</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
