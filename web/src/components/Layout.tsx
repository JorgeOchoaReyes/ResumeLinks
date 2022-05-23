import React from 'react'
import Wrapper, { WrapperVariant } from './Wrapper';
import {NavBar} from './Navbar'; 
import { Box } from '@chakra-ui/react';

interface LayoutProps {
    variant?: WrapperVariant,
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
            minH={"100vh"}
            bg={background}>
            <NavBar title={title} navColor={navColor} buttonColors={buttonColors} /> 
            <Wrapper  variant={variant}>
                {children}
            </Wrapper>
        </Box >

    );
}