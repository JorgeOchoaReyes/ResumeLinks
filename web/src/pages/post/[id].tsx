import React from 'react'
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from 'next/router';
import { usePostQuery } from '../../generated/graphql';
import { Layout } from '../../components/Layout';
import { Heading, Box } from '@chakra-ui/react';

const Post = ({}) => {
    const router = useRouter(); 
    const intId = typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;
    const [{data, fetching}] = usePostQuery({
        pause: intId === -1,
        variables: {
            _id: intId
        }
    })



    if(fetching) {
        return (
            <Layout>
                <div> Loading .........</div>
            </Layout>
        )
    }

    if(!data?.post) {
        return <Box> Could not find post </Box>
    }
   
    return (
        <Layout>
            <Heading> {data?.post?.title} </Heading>
            {data?.post?.text}
        </Layout>
    );
}


export default withUrqlClient(createUrqlClient)(Post); 