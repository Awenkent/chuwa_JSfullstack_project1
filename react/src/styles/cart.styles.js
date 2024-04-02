import styled from "styled-components";

const Wrapper = styled.aside`
  font-family: Arial, Helvetica, sans-serif;
  width: 500px;
  padding: 20px;
  @media only screen and (max-width: 600px) {
    width: 90%; /* Change width to 100% for screens smaller than 600px */
  }
`;



export { Wrapper };
