import { LoadMoreBtn } from './Button.styled';
import { PropTypes } from 'prop-types';

const Button = ({ onClick }) => (
  <>
    <LoadMoreBtn type="button" onClick={onClick}>
      Load more
    </LoadMoreBtn>
  </>
);

Button.defaultProps = {
  onClick: () => null,
  children: null,
};

Button.propType = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
