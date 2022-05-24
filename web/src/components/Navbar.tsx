import {Box, Link, Flex, Button, Heading, HStack, Image} from '@chakra-ui/react';
import NextLink from 'next/link'; 
import { useLogoutMutation, useMeQuery} from '../generated/graphql'
import { isServer } from '../utils/isServer';

interface NavBarProps {
    title?: string, 
    navColor?: string, 
    buttonColors?: string
}

export const NavBar: React.FC<NavBarProps> = ({title, navColor="#e6f5e5ff", buttonColors = "#379683"}) => {
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
                <Button colorScheme={"blackAlpha"} bg={buttonColors}> <Link color="white" > Login</Link></Button>
            </NextLink>
            <NextLink href="/register">
                <Button colorScheme={"blackAlpha"} bg={buttonColors}><Link color="white" mr={2}> Register</Link></Button>
            </NextLink>
        </HStack> )
    } else {
        //User is logged in 
        body = (
        <>
            <Flex>
                <Flex align={'center '}>
                    <Box mr={2}> {data.me.username} </Box>
                </Flex>
                <Flex>
                <Button bg="#379683" onClick={() => {
                    logout();
                }} isLoading={logoutFetching}  textColor={'black'}> logout </Button>
                </Flex>
            </Flex>  
        </> )
    }
    return (
        <Flex zIndex={1} position='sticky' flexDirection={"row"} justifyContent="space-around" top={0} bg={navColor} opacity=".95" p={2} align='center'>
            <Flex >
                <NextLink href="/">
                    <Link>
                        <Heading> {title ? title :  <Image 
                            src="https://firebasestorage.googleapis.com/v0/b/resume-b9fc8.appspot.com/o/logotree.png?alt=media&token=e385afe7-686f-4903-b061-053d08324097"
                            loading='eager'
                            h="50"
                            w="auto"
                          /> } </Heading>
                    </Link>
                </NextLink>
            </Flex>           
            <Flex> 
                {body}
            </Flex>
        </Flex>

    )
}