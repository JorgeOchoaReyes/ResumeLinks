import {Box, Link, Flex, Button, Heading} from '@chakra-ui/react';
import NextLink from 'next/link'; 
import { useLogoutMutation, useMeQuery} from '../generated/graphql'
import { isServer } from '../utils/isServer';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{data, fetching}] = useMeQuery({
        pause: isServer()
    });    
    const [{fetching: logoutFetching}, logout] = useLogoutMutation(); 
    let body = null; 

    if(fetching) {
        //User is loading
    } else if (!data?.me) {
        //User is not logged in
        body = ( 
        <>              
            <NextLink href="/login">
                <Link color="white" > Login </Link>
            </NextLink>
            <NextLink href="/register">
                <Link color="white" mr={2}> Register </Link>
            </NextLink> 
        </> )
    } else {
        //User is logged in 
        body = (
        <>
            <Flex>
                <Box mr={2}> {data.me.username} </Box>
                <Button onClick={() => {
                    logout();
                }} isLoading={logoutFetching} variant="link"> logout </Button>
            </Flex>  
        </> )
    }
    return (
        <Flex zIndex={1} position='sticky' top={0} bg='tomato' p={4} align='center'>
            <NextLink href="/">
                <Link>
                    <Heading> 3 Sides </Heading>
                </Link>
            </NextLink>
            <Box ml={'auto'}> 
                {body}
            </Box>
        </Flex>

    )
}