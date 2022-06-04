import { Button, Center, CircularProgress, Heading, HStack, useMergeRefs, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Layout } from '../components/Layout';
import {  useDeleteResumeMutation, useMeQuery, useResumeQuery } from '../generated/graphql';
import { useisAuth } from '../utils/useisAuth';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Text } from '@chakra-ui/react';
import { FaRegObjectUngroup } from 'react-icons/fa';
import Resume from '../components/Resume';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

interface settingsProps {

}

const settings: React.FC<settingsProps> = ({}) => {
    useisAuth(); 
    const router = useRouter(); 
    const [, deleteResume] = useDeleteResumeMutation(); 
    const [{data: me, fetching: fetchingMe}] = useMeQuery(); 
    const [resme, setResume] = React.useState({}); 


    if(fetchingMe) {
        return (
            <Layout>
                <Center h="100vh" textColor='black' fontSize='xl'> <CircularProgress m='auto' isIndeterminate color='green.300' />  </Center>
            </Layout>
        )
    }
    
    if(!me?.me) {
        return (
            <Layout>
                <Center h="100vh" textColor='black' fontSize='xl'> Error 404: No Data Was Not Found. :{'('} Try again. </Center>
            </Layout>
         )
    }

    return (
        <Layout background="#8EE4AF">
            <Heading paddingBottom="10px">
                <VStack> 
                    <Text> Your Resume: </Text> 
                    <HStack>
                        {me?.me?.resumeId == -1 ? 
                                <>
                                    <NextLink href="/create-resume">
                                        <Button colorScheme={"blackAlpha"} bg="green"> Create Resume </Button> 
                                    </NextLink>
                                </>
                            : 
                                <>
                                 <NextLink href="/edit-resume">
                                     <Button colorScheme={"blackAlpha"} bg="yellow"> Edit Resume </Button> 
                                 </NextLink>
                                 <Button onClick={() => {
                                    deleteResume();
                                    router.push('/')
                                     }} colorScheme={"blackAlpha"} bg="red"> Delete Resume </Button> 
                                </>
                        }
                    </HStack>
                </VStack>

            </Heading>
            {me?.me?.resumeId == -1 ? <Center h="100vh" fontSize={'xl'} fontWeight={"bolder"}> You dont have a resume yet. </Center> : <Resume intId={me.me.resumeId!} />}

        </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(settings); 