import React from 'react'
import { FooterContainer, FooterLinksContainer, FooterLinksWrapper, FooterLinksItem, FooterLinksDesc, FooterLink, FooterLogo, FooterImg  } from './footer';


export default function Footer() {
    return (
        <FooterContainer>
            <FooterLogo to='/lift'>
                <FooterImg>
                
            </FooterImg>
            </FooterLogo>
            <FooterLinksContainer>
                <FooterLinksWrapper>
                    <FooterLinksItem border='none'>
                        <FooterLink to='/terms-and-conditions'>Terms & conditions</FooterLink>
                    </FooterLinksItem>
                    <FooterLinksItem>
                        <FooterLink to='/terms-and-conditions'>Privacy policy</FooterLink>
                    </FooterLinksItem>
                    <FooterLinksItem>
                        <FooterLink to='/contact-us'>contact us</FooterLink>
                    </FooterLinksItem>
                </FooterLinksWrapper>
                
            </FooterLinksContainer>
            <FooterLinksDesc>
                    All rights reserved 2021 @ copyright iiamantoni 2021
                </FooterLinksDesc>
        </FooterContainer>
    )
}
