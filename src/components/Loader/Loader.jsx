import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Bars } from 'react-loader-spinner';
import { LoaderStyled } from './Loader.styled';

export default function Loader() {
  return (
    <LoaderStyled role="alert">
      <Bars
        heigth="100"
        width="100"
        color="grey"
        ariaLabel="loading-indicator"
      />
      Loading...
    </LoaderStyled>
  );
}
