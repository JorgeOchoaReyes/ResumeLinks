import { Layout } from "../components/Layout";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery, useVoteMutation } from "../generated/graphql";
import { Link, Text, Stack, Box, Heading, Flex, Spacer, Button, CircularProgress, IconButton } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import NextLink from 'next/link';
import {useState} from 'react'; 
import { Main } from "../components/Main";

interface IndexProps {}
 
const Index: React.FC<IndexProps> = ({}) => {
    const [variables, setVariables] = useState({limit: 10, cursor: null as null | string});

    return (
        <Layout variant="small">
                <Main />
        </Layout>
    )
}
//only srr should be used when needed
export default withUrqlClient(createUrqlClient)(Index); 