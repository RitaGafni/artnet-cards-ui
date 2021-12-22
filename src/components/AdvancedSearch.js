import { Col, Container, Row } from 'react-bootstrap';
import AdvSearchInput from './AdvSearchInput';
export default function AdvancedSearch(props) {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <AdvSearchInput advNum={0} />
          </Col>
          <Col>
            <AdvSearchInput advNum={1} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
