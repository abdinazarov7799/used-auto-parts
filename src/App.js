import classes from "./App.module.css";
import Registration from "./components/Registration/Registration";
import {Col, Container, Row} from "reactstrap";
import {Button} from "antd";
import EnterLoaction from "./components/EnterLocation/EnterLoaction";

function App() {
  return (
   <>
        <Registration />
       <Container>
           <Row>
               <Col xs={12} style={{position: "fixed", bottom: '15px'}}>
                   <Button className="w-100 ">
                       Login
                   </Button>
               </Col>
           </Row>
       </Container>
   </>
  );
}

export default App;
