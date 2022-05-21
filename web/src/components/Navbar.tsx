import {Box, Link, Flex, Button, Heading, HStack} from '@chakra-ui/react';
import NextLink from 'next/link'; 
import { useLogoutMutation, useMeQuery} from '../generated/graphql'
import { isServer } from '../utils/isServer';

interface NavBarProps {
    title?: string, 
    navColor?: string, 
    buttonColors?: string
}

export const NavBar: React.FC<NavBarProps> = ({title, navColor, buttonColors}) => {
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
        <HStack>              
            <NextLink href="/login">
                <Button bg={buttonColors}> <Link color="white" > Login</Link></Button>
            </NextLink>
            <NextLink href="/register">
                <Button bg={buttonColors}><Link color="white" mr={2}> Register</Link></Button>
            </NextLink> 
        </HStack> )
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
        <Flex zIndex={1} position='sticky' top={0} bg={navColor} p={4} align='center'>
            <NextLink  href="/">
                <Link>
                    <Heading> {title} </Heading>
                </Link>
            </NextLink>
            <Box ml={'auto'}> 
                {body}
            </Box>
        </Flex>

    )
}