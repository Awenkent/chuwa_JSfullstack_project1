import { IconButton } from "@material-ui/core";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 40px;
`;

const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 20px;
  top: 100px;
`;

export { Wrapper, StyledButton };
