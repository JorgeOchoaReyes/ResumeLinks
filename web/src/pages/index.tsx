import { Layout } from "../components/Layout";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery, useVoteMutation } from "../generated/graphql";
import { Link, Text, Stack, Box, Heading, Flex, Spacer, Button, CircularProgress, IconButton } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import NextLink from 'next/link';
import {useState} from 'react'; 

interface IndexProps {}
 
const Index: React.FC<IndexProps> = ({}) => {
    const [variables, setVariables] = useState({limit: 10, cursor: null as null | string});
    const [{data, fetching}] = usePostsQuery({
        variables
    });


    const [, vote] = useVoteMutation(); 

    if(!fetching && !data) {
        return <div> Query did not return anything adter loading </div>
    }

    return (
        <Layout>
            <Flex>
                <Spacer /> 
                <NextLink href="/create-post">
                    <Link ml='ml-auto'>
                        Create Post
                    </Link>
                </NextLink>
            </Flex> 

            <br />
            <Stack> 
                { !data && fetching ? <CircularProgress m='auto' isIndeterminate color='green.300' /> :
                    data!.posts.posts.map((p) => { 
                        return <Box key={p._id} p={5} shadow='md' borderWidth='1px'>
                            <Flex>
                                <Box>
                                    <IconButton onClick={() => {
                                                vote({
                                                    postId: p._id,
                                                    value: 1
                                                })
                                    }} aria-label='Upvote Post' icon={<ChevronUpIcon color="green" boxSize="30px" />} /> 
                                    <IconButton onClick={() => {
                                                vote({
                                                    postId: p._id,
                                                    value: -1
                                                })
                                    }} aria-label='Downvote Post' icon={<ChevronDownIcon color="red" boxSize="30px" />} /> 
                                </Box>
                                <Box>
                                    <NextLink href="/post/[id]" as={`/post/${p._id}`} >
                                        <Link  > {p._id}  </Link>
                                    </NextLink>
                                    <Heading fontSize='xl'> {p.title} </Heading>
                                    <Text textColor='orange' fontWeight="bold" mt={4}>Points: <Text textColor={p.points >= 0 ? 'green' : 'red'}> {p.points} </Text> </Text>                        
                                    
                                    <Text mt={4}>Posted by: {p.creator.username}</Text>
                                    <Text mt={4}>{p.textSnippet}......</Text>
                                </Box>
                            </Flex>
                        </Box>
                })}
            </Stack>

            {data && data.posts.hasMore ? <Flex>
                <Button onClick={() => {
                    setVariables({
                        limit: variables.limit, 
                        cursor: data.posts.posts[data.posts.posts.length -1].createdAt, 
                    })
                }} isLoading={fetching} colorScheme='teal' m="auto" my={4}> load more post </Button>
            </Flex> : null}

        </Layout>
    )
}
//only srr should be used when needed
export default withUrqlClient(createUrqlClient)(Index); 