import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.div`
  background-color: #fff;
  padding: 0.2rem 0 0.2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
  /* margin-bottom: -10; */

    @media screen and (max-width: 768px){
      margin-top: 0;
    }
`;

export const FooterLinksContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 820px) {
    padding-top: 12px;
  }
`;

export const FooterLinksWrapper = styled.div`
  display: flex;

  @media screen and (max-width: 820px) {
    /* flex-direction: column; */
  }
`;

export const FooterLinksItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: auto;
  margin-top: 5%;
  text-align: left;
  /* width: ; */
  box-sizing: border-box;
  /* color: #d43a3a; */
  border-left: ${({border})=>border?border: '1px solid black'};  
  padding: 5px 10px 3px 13px;
  height: 0px;
  line-height: 0px;

  @media screen and (max-width: 768px) {
    margin-top: 0px;
    padding: ${({padding})=>padding?padding: '5px 10px 3px 11px'};  
    /* padding: 5px 1px 3px 11px; */
    /* width: 10%; */
    /* border: none; */
  }
`;

export const FooterLinksDesc = styled.h2`
  margin-top: 0px;
  font-size: 9px;
  text-transform: uppercase;
  margin: 5px;


  @media screen and (max-width: 768px) {
    margin: 5px;
  }
`;


export const FooterLink = styled(Link)`
  color: black;
  text-decoration: none;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  font-size: 8px;
  font-weight: bold;

  &:hover {
    color: #0F52BA;
    transition: 0.3s ease-out;
    text-decoration: none;
    /* margin-top: -6%; */

  }
`;

export const FooterLogo = styled(Link)`
  color: #fff;
  /* background-color: #5577d4; */
  /* justify-content: space-between; */
  cursor: pointer;
  text-decoration: none;
  /* font-size: 1rem; */
  display: flex;
  align-items: center;
  /* margin-bottom: 1px; */
  width: 50%;
  text-align: center;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const FooterImg = styled.div`
  /* width: 100%; */
  /* margin-left: 20%; */

    @media screen and (max-width: 768px){
      /* width: 100%; */
      margin: 0;
    }
`


