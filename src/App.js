import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Modal,
  Image,
  Container,
  FormGroup,
  FormSelect,
} from "react-bootstrap";
import "./App.css";
import useLocalStorage from "./component/localStorage";

function App() {
  const [data, setData] = useState([]); //fetching API
  const [themeId, setThemeId] = useState([]); //select themes
  const [show, setShow] = useState(false); //pop up modal
  const [detail, setDetail] = useState([]); //go to lego detail view
  const [like, setLike] = useState(false); //like the lego set
  const [num, setNum] = useLocalStorage("", ""); //save the liked lego set to local storage

  useEffect(() => {
    const fetchAPI = async () => {
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
    fetchAPI();
  }, []);

  const handleOpen = (set) => {
    setShow(!show);
    setDetail(set);
  };
  const handleClose = () => {
    setShow(!show);
  };
  const likeSet = (set) => {
    setLike(!like);
    setNum({ set, like });
  };

  return (
    <Container fluid>
      <h1>Lego Theme - Brickable API</h1>
      <Row className="justify-content-md-center">
        {/* Select Lego theme */}
        <Col md={3}>
          <Form>
            <FormGroup>
              <p className="col-sm-6 col-md-6">Select Lego theme ID:</p>
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
          <p className="col-sm-12 ">Lego sets use this theme:</p>
          <div className="col-sm-12 ">
            {" "}
            {data
              .filter((data) => data.theme_id == themeId)
              .map((filtered) => (
                <div>
                  <li key={filtered.set_num}>
                    <a onClick={() => handleOpen(filtered.set_num)}>
                      <span> "{filtered.name}"</span>
                    </a>

                    <span style={{ color: "red" }}>
                      <i
                        className={
                          filtered.set_num == num.set && num.like
                            ? "fa fa-heart"
                            : ""
                        }
                      ></i>
                    </span>
                  </li>
                </div>
              ))}
          </div>
          {/* show the lego set detail when user click on it. */}

          {data
            .filter((data) => data.set_num == detail)
            .map((detail) => (
              <Modal show={show} onHide={(e) => setShow(e.target.show)}>
                <Modal.Header className="modal-title">
                  {" "}
                  Lego Set Detail
                </Modal.Header>
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
                    width={250}
                    height={250}
                    rounded
                  />
                </Modal.Body>
                <Modal.Footer>
                  <button
                    type="button"
                    class={
                      detail.set_num == num.set && num.like
                        ? "btn btn-danger"
                        : "btn btn-info"
                    }
                    onClick={() => likeSet(detail.set_num)}
                  >
                    {detail.set_num == num.set && num.like ? "Liked" : "Like"}
                  </button>
                  <button
                    type="button"
                    class="btn btn-info"
                    onClick={() => handleClose()}
                  >
                    Close
                  </button>
                </Modal.Footer>
              </Modal>
            ))}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
