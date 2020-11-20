import { Container, Card, CardDeck, Row, Col } from "react-bootstrap";
const { useState, useEffect } = require("react");

const Heroe = () => {
  const [heroe, setHeroe] = useState([]);
  const [message, setMessage] = useState("PWA de heroes de marvel :D");
  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("heroe") === null) {
        setMessage("Loading...");
      } else {
        setHeroe(localStorage.getItem("heroe"));
      }
    } else {
      const URL =
        "https://gateway.marvel.com:443/v1/public/characters?apikey=6d1c0f44ebd73ae4edf4c5610cfc58dd&hash=d6587d5eedb7348cd0c21872429366ad&ts=hola";

      fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem("heroe", res.data.results);
          setHeroe(res.data.results);
        });
    }
  }, []);

  return (
    <div>
      <h1>Marvel Heroes</h1>
      <h2>{message}</h2>
      <Container>
        {heroe.map((he) => (
          <Row>
            <Col sm={3}>
              <Card>
                <Card.Img
                  variant="top"
                  src={"" + he.thumbnail.path + "." + he.thumbnail.extension}
                />
                <Card.Body>
                  <Card.Title>{he.name}</Card.Title>
                  <Card.Text>{he.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default Heroe;
