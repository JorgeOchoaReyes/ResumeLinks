import React from 'react'
import Wrapper, { WrapperVariant } from './Wrapper';
import {NavBar} from './Navbar'; 
import { Box } from '@chakra-ui/react';
import { Footer } from './Footer';

interface LayoutProps {
    variant?: string,
    background?: string,
    title?: string, 
    navColor?: string, 
    buttonColors?: string
}

export const Layout: React.FC<LayoutProps> = ({
    children, variant, background, title, navColor, buttonColors
    }) => {

    return (
        <Box h={ "100%"}
            w="100%"
            minH={"100vh"}
            align='center'
            bg={background}>
            <NavBar title={title} navColor={navColor} buttonColors={buttonColors} /> 
            <Wrapper variant={variant}>
                {children}
            </Wrapper>
            <Footer />
        </Box >

    );
}