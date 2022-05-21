import React from 'react'
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from 'next/router';
import { Layout } from '../../components/Layout';
import { Heading, Flex, Box, Text, VStack, Image} from '@chakra-ui/react';

const Resume = ({}) => {
    const router = useRouter(); 


    // if(fetching) {
    //     return (
    //         <Layout>
    //             <div> Loading .........</div>
    //         </Layout>
    //     )
    // }

    // if(!data?.post) {
    //     return <Box> Could not find post </Box>
    // }
   
    return (
        <Layout background="linear-gradient(red, yellow)" title="Abaddon" navColor="red" buttonColors="orange" >
            <Flex flexDirection="column">
                
                    <Flex flexDir='column' align="center">
                        <Image 
                            src="https://firebasestorage.googleapis.com/v0/b/dota2-bab31.appspot.com/o/Abaddon_icon.png?alt=media&token=18adc081-96b5-4b96-a5ff-65151b00cca5"
                            loading='eager'
                            borderRadius='100%'
                            w={150}
                            h={150}
                        />
                        <Heading> Abbadon </Heading>
                    </Flex>

                    <Box w="100%" borderColor='black' paddingBottom={10} >
                        <VStack>
                            <VStack bg="rgb(255, 255, 255)" shadow='md' borderWidth='2px' borderColor="black" borderRadius='100' >
                                <Text fontSize={24} paddingLeft={20} alignSelf={"flex-start"}> NZQR </Text> 
                                <Text paddingLeft={20} alignSelf={"flex-start"}> Dates: 2020 May - 2022 May </Text>
                                <Text paddingLeft={20} alignSelf={"flex-start"} w="75%"> Description: This is a description for the job that I am making up right now, so it may not make much sense, since it does not need to make sense. </Text>                      
                            </VStack>
                            <VStack  bg="rgb(255, 255, 255)" shadow='md' borderWidth='2px' borderColor="black" borderRadius='100' >
                                <Text> NZQR </Text> 
                                <Text> Dates: 2020 May - 2022 May </Text>
                                <Text w="50%"> Description: This is a description for the job that I am making up right now, so it may not make much sense, since it does not need to make sense. </Text>
                            </VStack>
                            <VStack  bg="rgb(255, 255, 255)" shadow='md' borderWidth='2px' borderColor="black" borderRadius='100' >                            
                                <Text fontSize={24}> NZQR </Text> 
                                <Text> Dates: 2020 May - 2022 May </Text>
                                <Text w="50%"> Description: This is a description for the job that I am making up right now, so it may not make much sense, since it does not need to make sense. </Text>
                            </VStack>
                            <VStack  bg="rgb(255, 255, 255)" shadow='md' borderWidth='2px' borderColor="black" borderRadius='100' >                            
                                <Text> NZQR </Text> 
                                <Text> Dates: 2020 May - 2022 May </Text>
                                <Text w="50%"> Description: This is a description for the job that I am making up right now, so it may not make much sense, since it does not need to make sense. </Text>
                            </VStack>
                        </VStack>

                    </Box>

            </Flex>
        </Layout>
    );
}


export default withUrqlClient(createUrqlClient)(Resume); 