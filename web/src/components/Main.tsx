import React from 'react';
import { Box, Text, Flex, Heading, VStack, Image, Button, SlideFade, Tooltip } from '@chakra-ui/react';
import Product from '../utils/growthbook.png';
import {CheckIcon} from '@chakra-ui/icons'; 

interface HeaderProps {

}

//To do: 
//Slow down slide fade animation 


const LeftContent = () => {
    return (
            <Flex 
                w="full" 
                h="full" 
                p="10"  
                textColor={'black'}
                justifyContent='space-around'
                alignItems='center'
                >
                <SlideFade delay={.1} in={true} offsetY='100px'>
                    <Box>
                            <VStack spacing={8} >
                                <VStack spacing={2} alignContent='flex-start'>
                                    <Heading fontSize={{ base: '25px', md: '50px', lg: '50px'}} fontWeight='bolder' size='2xl'> Quickly send your resume to anyone! </Heading>
                                    <Text fontSize={{ base: 'auto', md: '20px'}} > With ResumeLinks you can always have your resume updated and ready to be viewed by recruiters. </Text>
                                    <Box>
                                        <Button textColor="#EDF5E1" colorScheme={'blackAlpha'} zIndex={0} isFullWidth={true} size="lg" bg='#05386B' > Get Started for free! </Button>
                                    </Box>
                                </VStack>
                                <Text> <CheckIcon /> Easily Send <CheckIcon /> Customize <CheckIcon /> Update whenever </Text>
                            </VStack>
                    </Box>
                </SlideFade>
            </Flex>

    )
}

const RightContent = () => {
    return (
        <VStack 
            w="full" 
            h="full" 
            p="10"  
            justifyContent='space-around'
            alignItems='center'>
            <SlideFade delay={.1} in={true} offsetX='100px'>
                <Box>
                    <Image   
                    useMap='#workmap'
                            src={Product.src} 
                            alt='Company Logo'/>
                </Box>
            </SlideFade>
                           
        </VStack>
    )
}

export const Main: React.FC<HeaderProps> = ({}) => {
    return (
        <Flex h="100%" w="100%" textColor='white' bg="#5CDB95"  direction={{base: "column", md: "row"}}>
            <Flex>
                <LeftContent /> 
            </Flex>
            <Flex>
                <RightContent />     
            </Flex>
        </Flex> 
);
    }