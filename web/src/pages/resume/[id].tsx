import React from 'react'
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from 'next/router';
import { Layout } from '../../components/Layout';
import { Heading, Flex, Box, Text, VStack, Image, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Center, CircularProgress, HStack, Tag, TagCloseButton, TagLabel} from '@chakra-ui/react';
import { useResumeQuery } from '../../generated/graphql';

const Resume = ({}) => {
  const router = useRouter(); 
  const intId = typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;
  const [{data, fetching}] = useResumeQuery({
    pause: intId === -1,
    variables: {
      _id: intId
    }
  }); 


  if(fetching) {
    return (
        <Layout>
            <Center h="100vh" textColor='black' fontSize='xl'> <CircularProgress m='auto' isIndeterminate color='green.300' />  </Center>
        </Layout>
    )
  }

  if(!data?.findResume) {
      return (
          <Layout>
              <Center h="100vh" textColor='black' fontSize='xl'> Error 404: No Data Was Not Found. :{'('} Try again. </Center>
          </Layout>
      )
  }
  return (
      <Layout background="linear-gradient(red, yellow)" title={data.findResume.title} navColor="red" buttonColors="orange">
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
                      <Heading> {data?.findResume.title} </Heading>
                  </Flex>
                  <Box w="100%" borderColor='black' paddingBottom={10} >
                    <Accordion defaultIndex={[0]} allowMultiple>
                        <AccordionItem>
                          <h2>
                        <AccordionButton bg="white" _hover={{bg: "lightGrey"}} opacity=".95">
                        <Box flex='1' textAlign='left'>
                          Skills
                        </Box>
                        <AccordionIcon />
                        </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <VStack> 
                              <HStack flexWrap={'wrap'} spacing={4}>
                                {data.findResume.skills?.map((skill, i) => (
                                  <Tag
                                    size={'lg'}
                                    key={`tag#${i}`}
                                    borderRadius='full'
                                    variant='solid'
                                    bg={'white'}
                                    textColor="black"
                                  >
                                    <TagLabel> {skill} </TagLabel>
                                  </Tag>
                                ))}
                              </HStack>
                                        
                            </VStack>
                          </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
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
                                  {data.findResume.experience?.map((i) => {
                                    return (
                                      <VStack key={i.date}  minW={'100%'} w={"auto"} h={"auto"} bg="rgb(255, 255, 255)" shadow='md' borderWidth='2px' borderColor="black" borderRadius={{base: "50", sm: "100"}} >
                                          <Text  fontSize={{base: 14, sm: 18, lg:24}} paddingLeft={20} alignSelf={"flex-start"}> {i.company} </Text> 
                                          <Text  fontSize={{base: 10, sm: 12, lg:14}} paddingLeft={20} alignSelf={"flex-start"}> {i.date} </Text>
                                          <Text  fontSize={{base: 12, sm: 15, lg:18}} paddingLeft={20} alignSelf={"flex-start"} flexWrap='wrap' w ="auto"> {i.description} </Text>                      
                                      </VStack>
                                    )
                                  })}
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
                              {data.findResume.education?.map((i) => {
                                  return (
                                    <VStack key={i.date} minW={'100%'} w={"auto"} h={"auto"} bg="rgb(255, 255, 255)" shadow='md' borderWidth='2px' borderColor="black" borderRadius={{base: "50", sm: "100"}} >
                                      <Text  fontSize={{base: 14, sm: 18, lg:24}} paddingLeft={20} alignSelf={"flex-start"}> {i.school} </Text> 
                                      <Text  fontSize={{base: 10, sm: 12, lg:14}} paddingLeft={20} alignSelf={"flex-start"}> {i.date} </Text>
                                      <Text  fontSize={{base: 12, sm: 15, lg:18}} paddingLeft={20} alignSelf={"flex-start"} flexWrap='wrap' w ="auto">{i.description} </Text>                      
                                    </VStack>
                                  )
                              })}                           
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