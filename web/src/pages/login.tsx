import React from 'react';
import {Formik, Form} from 'formik';
import { FormControl } from '@chakra-ui/form-control';
import Wrapper from '../components/Wrapper'; 
import InputField from '../components/InputField';
import { Box, Flex } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { useLoginMutation } from '../generated/graphql';
import {toErrorMap} from '../utils/toErrorMap';
import { useRouter } from 'next/dist/client/router';
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';

interface loginProps {}


const Login: React.FC<loginProps> = ({}) => {
    const [, login] = useLoginMutation(); 
    const router = useRouter(); 
    return (
        <Wrapper> 
            <Formik initialValues={{usernameOrEmail: "", password: ""}}
                    onSubmit={async (values, {setErrors}) => {
                        const response = await login(values); // make sure data values matches the mutation call
                        console.log(response); 

                        if(response.data?.login.errors){
                            setErrors(toErrorMap(response.data.login.errors));
                        } else if (response.data?.login.user) {
                            if(typeof router.query.next === "string") {
                                //User registered without error 
                                router.push(router.query.next); 
                            }
                            router.push('/'); 

                        }
            }}>

            {({isSubmitting}) => (
                <Form> 
                    <FormControl>
                        <InputField 
                            name="usernameOrEmail"
                            placeholder="username or email"
                            label="Username or email" 
                        /> 
                        <Box mt={4}>
                            <InputField 
                                name="password"
                                placeholder="password"
                                label="Password" 
                                type="password"
                            /> 
                        </Box>
                        <Flex mt={2}>
                            <NextLink href="/forgot-password" >
                                <Link ml='auto'> Forgot password? </Link>
                            </NextLink>
                        </Flex>

                        <Button 
                            mt={4} 
                            isLoading={isSubmitting} 
                            type='submit' colorScheme="teal">

                            Login
                        </Button>

                    </FormControl>
                </Form>
            )}

            </Formik>
        </Wrapper>
    )
}

export default withUrqlClient(createUrqlClient)(Login); 

