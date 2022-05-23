import React from 'react'
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from 'next/router';
import { Layout } from '../../components/Layout';
import { Heading, Flex, Box, Text, VStack, Image, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel} from '@chakra-ui/react';

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
        <Layout background="linear-gradient(red, yellow)" title="Abaddon" navColor="red" buttonColors="orange">
            <Flex minH="100vh" h="100%" flexDirection="column">
                <Box >
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
                        <Accordion defaultIndex={[0]} allowMultiple>
                            <AccordionItem>
                              <h2>
                            <AccordionButton bg="white" _hover={{bg: "lightGrey"}} opacity=".95">
                              <Box flex='1'  textAlign='left'>
                                Experience
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                              </h2>
                              <AccordionPanel pb={4}>
                                <VStack>
                                      <VStack w={"auto"} h={"auto"} bg="rgb(255, 255, 255)" shadow='md' borderWidth='2px' borderColor="black" borderRadius={{base: "50", sm: "100"}} >
                                          <Text  fontSize={{base: 14, sm: 18, lg:24}} paddingLeft={20} alignSelf={"flex-start"}> NZQR </Text> 
                                          <Text  fontSize={{base: 10, sm: 12, lg:14}} paddingLeft={20} alignSelf={"flex-start"}> Dates: 2020 May - 2022 May </Text>
                                          <Text  fontSize={{base: 12, sm: 15, lg:18}} paddingLeft={20} alignSelf={"flex-start"} w="75%"> Description: This is a description for the job that I am making up right now, so it may not make much sense, since it does not need to make sense. </Text>                      
                                      </VStack>
                                      <VStack w={"auto"} h={"auto"} bg="rgb(255, 255, 255)" shadow='md' borderWidth='2px' borderColor="black" borderRadius={{base: "50", sm: "100"}} >
                                          <Text  fontSize={{base: 14, sm: 18, lg:24}} paddingLeft={20} alignSelf={"flex-start"}> NZQR </Text> 
                                          <Text  fontSize={{base: 10, sm: 12, lg:14}} paddingLeft={20} alignSelf={"flex-start"}> Dates: 2020 May - 2022 May </Text>
                                          <Text  fontSize={{base: 12, sm: 15, lg:18}} paddingLeft={20} alignSelf={"flex-start"} w="75%"> Description: This is a description for the job that I am making up right now, so it may not make much sense, since it does not need to make sense. </Text>                      
                                      </VStack>
                                      <VStack w={"auto"} h={"auto"} bg="rgb(255, 255, 255)" shadow='md' borderWidth='2px' borderColor="black" borderRadius={{base: "50", sm: "100"}} >
                                          <Text  fontSize={{base: 14, sm: 18, lg:24}} paddingLeft={20} alignSelf={"flex-start"}> NZQR </Text> 
                                          <Text  fontSize={{base: 10, sm: 12, lg:14}} paddingLeft={20} alignSelf={"flex-start"}> Dates: 2020 May - 2022 May </Text>
                                          <Text  fontSize={{base: 12, sm: 15, lg:18}} paddingLeft={20} alignSelf={"flex-start"} w="75%"> Description: This is a description for the job that I am making up right now, so it may not make much sense, since it does not need to make sense. </Text>                      
                                      </VStack>
                                      <VStack w={"auto"} h={"auto"} bg="rgb(255, 255, 255)" shadow='md' borderWidth='2px' borderColor="black" borderRadius={{base: "50", sm: "100"}} >
                                          <Text  fontSize={{base: 14, sm: 18, lg:24}} paddingLeft={20} alignSelf={"flex-start"}> NZQR </Text> 
                                          <Text  fontSize={{base: 10, sm: 12, lg:14}} paddingLeft={20} alignSelf={"flex-start"}> Dates: 2020 May - 2022 May </Text>
                                          <Text  fontSize={{base: 12, sm: 15, lg:18}} paddingLeft={20} alignSelf={"flex-start"} w="75%"> Description: This is a description for the job that I am making up right now, so it may not make much sense, since it does not need to make sense. </Text>                      
                                      </VStack>
                                </VStack>
                              </AccordionPanel>
                            </AccordionItem>
                        </Accordion>

                        <Accordion defaultIndex={[0]} allowMultiple>
                        <AccordionItem>
                          <h2>
                        <AccordionButton bg="white" _hover={{bg: "lightGrey"}} opacity=".95">
                          <Box flex='1' textAlign='left'>
                            Education
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <VStack>
                                  <VStack w={"auto"} h={"auto"} bg="rgb(255, 255, 255)" shadow='md' borderWidth='2px' borderColor="black" borderRadius={{base: "50", sm: "100"}} >
                                      <Text  fontSize={{base: 14, sm: 18, lg:24}} paddingLeft={20} alignSelf={"flex-start"}> NZQR </Text> 
                                      <Text  fontSize={{base: 10, sm: 12, lg:14}} paddingLeft={20} alignSelf={"flex-start"}> Dates: 2020 May - 2022 May </Text>
                                      <Text  fontSize={{base: 12, sm: 15, lg:18}} paddingLeft={20} alignSelf={"flex-start"} w="75"> Description: This is a description for the job that I am making up right now, so it may not make much sense, since it does not need to make sense. </Text>                      
                                  </VStack>
                                  <VStack w={"auto"} h={"auto"} bg="rgb(255, 255, 255)" shadow='md' borderWidth='2px' borderColor="black" borderRadius={{base: "50", sm: "100"}} >
                                      <Text  fontSize={{base: 14, sm: 18, lg:24}} paddingLeft={20} alignSelf={"flex-start"}> NZQR </Text> 
                                      <Text  fontSize={{base: 10, sm: 12, lg:14}} paddingLeft={20} alignSelf={"flex-start"}> Dates: 2020 May - 2022 May </Text>
                                      <Text  fontSize={{base: 12, sm: 15, lg:18}} paddingLeft={20} alignSelf={"flex-start"} w="75%"> Description: This is a description for the job that I am making up right now, so it may not make much sense, since it does not need to make sense. </Text>                      
                                  </VStack>
                                  <VStack w={"auto"} h={"auto"} bg="rgb(255, 255, 255)" shadow='md' borderWidth='2px' borderColor="black" borderRadius={{base: "50", sm: "100"}} >
                                      <Text  fontSize={{base: 14, sm: 18, lg:24}} paddingLeft={20} alignSelf={"flex-start"}> NZQR </Text> 
                                      <Text  fontSize={{base: 10, sm: 12, lg:14}} paddingLeft={20} alignSelf={"flex-start"}> Dates: 2020 May - 2022 May </Text>
                                      <Text  fontSize={{base: 12, sm: 15, lg:18}} paddingLeft={20} alignSelf={"flex-start"} w="75%"> Description: This is a description for the job that I am making up right now, so it may not make much sense, since it does not need to make sense. </Text>                      
                                  </VStack>
                                  <VStack w={"auto"} h={"auto"} bg="rgb(255, 255, 255)" shadow='md' borderWidth='2px' borderColor="black" borderRadius={{base: "50", sm: "100"}} >
                                      <Text  fontSize={{base: 14, sm: 18, lg:24}} paddingLeft={20} alignSelf={"flex-start"}> NZQR </Text> 
                                      <Text  fontSize={{base: 10, sm: 12, lg:14}} paddingLeft={20} alignSelf={"flex-start"}> Dates: 2020 May - 2022 May </Text>
                                      <Text  fontSize={{base: 12, sm: 15, lg:18}} paddingLeft={20} alignSelf={"flex-start"} w="75%"> Description: This is a description for the job that I am making up right now, so it may not make much sense, since it does not need to make sense. </Text>                      
                                  </VStack>
                            </VStack>
                          </AccordionPanel>
                        </AccordionItem>
                        </Accordion>
                    </Box>
                </Box>
            </Flex>
        </Layout>
    );
}


export default withUrqlClient(createUrqlClient)(Resume); 