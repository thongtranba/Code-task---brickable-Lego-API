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
  const [detail, setDetail] = useState([]);

  console.log(detail);

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

  const handleModal = (detail) => {
    setShow(!show);
    setDetail(detail);
  };

  return (
    <Container fluid>
      <h1>Lego Theme - Brickable API</h1>
      <Row className="justify-content-md-center">
        {/* Select Lego theme */}
        <Col md={3}>
          <Form>
            <FormGroup>
              <p className="col-sm-6 col-md-6">Select Lego theme ID :</p>
              <FormSelect
                className="col-sm-6 col-md-2"
                value={themeId}
                onChange={(e) => setThemeId(e.target.value)}
              >
                <option>Default</option>
                {data.map((item) => (
                  <option key={item.index} value={item.theme_id}>
                    {item.theme_id}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>
          </Form>
        </Col>
        {/* Show all lego sets using this theme. */}
        <Col md={4}>
          <p className="col-sm-12 ">LEGO sets use this theme:</p>
          <div className="col-sm-12 ">
            {" "}
            {data
              .filter((data) => data.theme_id == themeId)
              .map((filtered) => (
                <div>
                  <li key={filtered.set_num}>
                    <a onClick={() => handleModal(filtered.set_num)}>
                      <span> "{filtered.name}"</span>
                    </a>
                  </li>
                </div>
              ))}
          </div>
          {/* show the lego set detail when user click on it. */}
          <Modal show={show} onHide={(e) => setShow(e.target.show)}>
            <Modal.Header className="modal-title">
              {" "}
              LEGO Set Detail
            </Modal.Header>
            {data
              .filter((data) => data.set_num == detail)
              .map((detail) => (
                <Modal.Body className="modal-body">
                  <p>
                    Name: {detail.name}
                    <br />
                    Set number: {detail.set_num}
                    <br />
                    Number parts: {detail.num_parts}
                    <br />
                    Year: {detail.year}
                  </p>
                  <Image
                    src={detail.set_img_url}
                    width={400}
                    height={400}
                    rounded
                  />
                </Modal.Body>
              ))}
            <Modal.Footer>
              <Button onClick={() => handleModal()}>Close</Button>
              <Button>Like</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
