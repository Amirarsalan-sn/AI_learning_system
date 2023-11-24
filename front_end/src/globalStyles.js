import styled, { createGlobalStyle } from 'styled-components';


const GlobalStyles = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'vazir', sans-serif;
}
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
}
*::-webkit-scrollbar {
  width: 0.5px;
}
*::-webkit-scrollbar-track {
  background: transparent;
}
*::-webkit-scrollbar-thumb {
  background: rgba(155, 155, 155, 0.5);
  border-radius: 20px;
  border: transparent;
}

`;


export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 50px;
  padding-left: 50px;
  @media screen and (max-width: 991px) {
    padding-right: 30px;
    padding-left: 30px;
  }
`;


export const Button = styled.button`
  border-radius: 999px; /* Set border-radius to create completely round edges */
  background: ${({ primary }) => (primary ? '#F9AA33' : '#F9AA33')};
  white-space: nowrap;
  padding: ${({ big }) => (big ? '12px 64px' : '10px 20px')};
  color: #fff;
  font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-out; /* Apply transition to all properties for smooth hover effect */

  &:hover {
    background: ${({ primary }) => (primary ? '#FFC966' : '#FFC966')}; /* Use a lighter shade on hover */
  }

  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;


export default  GlobalStyles;