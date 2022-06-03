import { Center, CircularProgress, Heading, useMergeRefs } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useDeleteResumeMutation, useMeQuery, useResumeQuery } from '../generated/graphql';
import { useisAuth } from '../utils/useisAuth';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface settingsProps {

}

const settings: React.FC<settingsProps> = ({}) => {
    const [id, setId] = React.useState(-1); 
    useisAuth(); 
    const [, deleteResume] = useDeleteResumeMutation(); 
    const [{data: me, fetching: fetchingMe}] = useMeQuery(); 
    const [{data: resume, fetching: fetchingResume}] = useResumeQuery({
        pause: id === -1,
        variables: {
          _id: id
        }
    }); 

    if(fetchingMe || fetchingResume) {
        return (
            <Layout>
                <Center h="100vh" textColor='black' fontSize='xl'> <CircularProgress m='auto' isIndeterminate color='green.300' />  </Center>
            </Layout>
        )
    }
    
    if(!me?.me || !resume?.findResume) {
          return (
              <Layout>
                  <Center h="100vh" textColor='black' fontSize='xl'> Error 404: No Data Was Not Found. :{'('} Try again. {id} </Center>
              </Layout>
          )
    }

    useEffect(() => {
        const num: number = me!.me!._id
        setId(num); 
    }, [fetchingMe])

    return (
        <Layout>
            <Heading>
                
            </Heading>
        </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(settings); 