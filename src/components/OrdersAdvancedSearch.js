import { Container, Stack } from '@mui/material';
import AdvSearchInput from './OrdersAdvSearchInput';

export default function OrdersAdvancedSearch() {
  return (
    <div>
      <Container>
            <AdvSearchInput advNum={0} />
         
            <AdvSearchInput advNum={1} />
      </Container>

    </div>
  );
}
