import { Box, Heading, Image, SlideFade, Text, VStack, Stack, Flex} from '@chakra-ui/react';
import React from 'react';

interface MainProps {

}

interface CardProps {
    title: string, 
    placements: string, 
    img: any
}

interface CardContentProps {
    data: any
}

const Card: React.FC<CardProps> = ({title, placements, img}) => {
    return (
        <Box bg="" as='article'  h={{base:'sm', sm: 'sm', md: 'auto'}} maxW='sm' p='5'  borderColor="#D3D3D3"  rounded='md'>
            <Box>
                <Image   
                    src={img} 
                    w='auto'
                    h={{base: 'auto', md: '48'}}
                    alt='Valorant Logo'/>
            </Box>
          <Heading size='md' my='2'>
              {title}
          </Heading>
          <Box textColor="#6b6b6b" fontFamily="'Gothic A1', sans-serif">
            <Text textColor="#EDF5E1" fontSize={{base: 'auto'}} flexWrap='wrap'>
              {placements}
            </Text>
          </Box>


        </Box>
    )
}

const CardContent: React.FC<CardContentProps> = (data) => {

    return (
    <Stack 
        w="full" 
        h="full" 
        direction={{base: "column", md: "row"}}
        spacing={10}
        justifyContent='center'
        alignItems='center'>

        <SlideFade delay={.1} in={true} offsetX='100px'>
            <Box>
                <Card title="Customizable"
                 img={"https://firebasestorage.googleapis.com/v0/b/resume-b9fc8.appspot.com/o/VALORANT.png?alt=media&token=fa266c0f-cff2-4b51-a7e2-2b95669304ec"}
                  placements="Custom background, custome colors, and custom fonts! You can add as many fields of experience, or education, along with providign contact info."/>
            </Box>
        </SlideFade>
        <SlideFade delay={.1} in={true} offsetY='100px'>
            <Box>
                <Card title="Quickly Send"
                 img={"https://firebasestorage.googleapis.com/v0/b/resume-b9fc8.appspot.com/o/VALORANT.png?alt=media&token=fa266c0f-cff2-4b51-a7e2-2b95669304ec"}
                  placements="At any time you can send your link to employeers with a full resume ready to be reviewed. Employeers can view it at anytime and never lose track of it."/>
            </Box>
        </SlideFade>
        <SlideFade delay={.1} in={true} offsetY='100px'>
            <Box>
                <Card title="Download as a PDF"
                 img={"https://firebasestorage.googleapis.com/v0/b/resume-b9fc8.appspot.com/o/VALORANT.png?alt=media&token=fa266c0f-cff2-4b51-a7e2-2b95669304ec"}
                  placements="Turn your resumelink into a pdf for your personal records, for employers to download and review, or in case you need to print it out for in-person interviews."/>
            </Box>
        </SlideFade>
                   
    </Stack>)
}


export const Cards: React.FC<MainProps> = ({}) => {
    return (
        <Flex h={{base: "auto",  sm: "90vh", xl: '80vh'}} bg={"#379683"} w="full"  justifyContent='center' textColor="white" direction={{base: "column", md: "row"}} >
            <Flex justifyContent='space-evenly' direction={{base: "column"}}>
                <Box fontSize={{ base: '24px', lg: '30px',  xl: '45px'}} fontWeight='bolder'>
                    <Text textColor="#EDF5E1" align="center" > Share your resume with others instantly! </Text>
                </Box>
                <Box>   
                    <CardContent  data="" />
                </Box>
            </Flex>
        </Flex> 
    );
}