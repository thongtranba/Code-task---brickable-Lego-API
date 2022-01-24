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
import LegoSet from "../class/LegoSet";

function OverviewPage() {
  const [legoSetList, setLegoSetList] = useState([]); //create class for fetching data
  const [themeId, setThemeId] = useState([]); //select themes
  const [show, setShow] = useState(false); //pop up modal
  const [detail, setDetail] = useState([]); //go to lego detail view

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch(
          "https://rebrickable.com/api/v3/lego/sets/?key=cef91563c41612c871ed256c1a22e628"
        );
        const json = await response.json();
        setLegoSetList(
          json.results.map(
            (result) =>
              new LegoSet(
                result.theme_id,
                result.name,
                result.set_num,
                result.num_parts,
                result.year,
                result.set_img_url,
                false
              )
          )
        );
      } catch (err) {
        console.log("err", err);
      }
      loadLegoSetList();
    };

    fetchAPI();
  }, []);

  //Modal: open-close
  const modalOpen = (set) => {
    setShow(!show);
    setDetail(set);
  };
  const modalClose = () => {
    setShow(!show);
  };

  //localstorage
  const saveLegoSetList = () => {
    localStorage.setItem("legoSetList", JSON.stringify(legoSetList));
    console.log("Your list has been saved");
  };
  const loadLegoSetList = () => {
    const temp = localStorage.getItem("legoSetList");
    if (temp !== null) {
      const json = JSON.parse(temp);
      setLegoSetList(json);
    }
  };
  const clearCache = () => {
    localStorage.clear();
    window.location.reload();
    console.log("Your list has been cleared");
  };

  return (
    <Container fluid>
      <h1>Lego Theme - Brickable API</h1>
      <Row className="justify-content-md-center">
        {/* Select Lego theme */}
        <Col style={{ textAlign: "center" }} md={3}>
          <Form>
            <FormGroup>
              <p>Select Lego theme ID:</p>
              <FormSelect
                style={{ textAlign: "center" }}
                multiple={false}
                className="col-sm-6 col-md-2"
                value={themeId}
                onChange={(e) => setThemeId(e.target.value)}
              >
                <option>Default</option>
                {Array.from(
                  new Set(legoSetList.map((legoSet) => legoSet.themeId))
                ) //removes duplicates
                  .sort((a, b) => a - b) // sorts low to high
                  .map((themeId) => (
                    <option key={themeId.setNumber} value={themeId}>
                      {themeId}
                    </option>
                  ))}
              </FormSelect>
            </FormGroup>
          </Form>
        </Col>
        {/* Show all lego sets using this theme. */}
        <Col style={{ textAlign: "center" }} md={5}>
          <p>Lego sets use this theme:</p>

          <div className="col-sm-12 ">
            {" "}
            {legoSetList
              .filter((legoSet) => legoSet.themeId == themeId)
              .map((legoSet) => (
                <div style={{ flexDirection: "row" }}>
                  <button
                    class="button-legoset"
                    role="button"
                    onClick={() => modalOpen(legoSet)}
                    key={legoSet.setNumber}
                  >
                    {legoSet.setNumber}: {legoSet.name}
                  </button>

                  <span style={{ color: "red" }}>
                    <i
                      className={legoSet.liked == true ? "fa fa-heart" : ""}
                    ></i>
                  </span>
                </div>
              ))}
          </div>
          {/* show the lego set detail when user click on it. */}
          <Modal show={show} onHide={(e) => setShow(e.target.show)}>
            <Modal.Header className="modal-title">
              {" "}
              Lego Set Detail
            </Modal.Header>
            <Modal.Body className="modal-body">
              <p>
                Name: {detail.name}
                <br />
                Set number: {detail.setNumber}
                <br />
                Number parts: {detail.numberParts}
                <br />
                Year: {detail.year}
              </p>
              <Image src={detail.imgUrl} width={250} height={250} rounded />
            </Modal.Body>
            {/* 'LIke a set' function */}
            <Modal.Footer>
              <button
                type="button"
                className={
                  detail.liked == false ? "btn btn-info" : "btn btn-danger"
                }
                onClick={() => {
                  detail.liked = !detail.liked;
                  setShow(!show);
                }}
              >
                {detail.liked == false ? "Like" : "Liked"}
              </button>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => modalClose()}
              >
                Close
              </button>
            </Modal.Footer>
          </Modal>
        </Col>
        <Col style={{ padding: "40px" }} md={2}>
          <button
            style={{ marginBottom: "20px" }}
            className="btn btn-warning"
            onClick={() => saveLegoSetList()}
          >
            Save your list
          </button>
          <button class="btn btn-danger" onClick={() => clearCache()}>
            Clear your list
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default OverviewPage;
