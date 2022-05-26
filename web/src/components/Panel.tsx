import { Box, Heading, Image, VStack, Flex, Button} from '@chakra-ui/react';
import React from 'react';  
import NextLink from 'next/link'; 

interface PanelsProps {

}


export const Panels: React.FC<PanelsProps> = ({}) => {
    return (
        <Flex h={{base: "auto"}} py={20} bg={"#8EE4AF"} w="full" justifyContent='space-evenly' textColor="white" direction={{base: "column"}} >
 
 
            <VStack >
                <Flex  align="center">
                  <Heading textColor={"#05386B"} fontSize={{base: "15", md: 40}} paddingBottom={10}> Create your own resumelink in a few minutes! </Heading>
                </Flex>
                <Flex align="center">
                    <NextLink href="/">
                        <Button colorScheme={"blackAlpha"} bg="#EDF5E1" textColor={"#05386B"}> Get Started </Button>
                    </NextLink>
                </Flex>
            </VStack>
                           
         
        </Flex> 
    );
}