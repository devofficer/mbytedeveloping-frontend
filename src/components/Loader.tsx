import { Html } from '@react-three/drei';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  return (
    <Html>
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    </Html>
  );
};

export default Loader;
