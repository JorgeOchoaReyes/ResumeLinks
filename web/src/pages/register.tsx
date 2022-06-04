import React from 'react';
import {Formik, Form} from 'formik';
import { FormControl } from '@chakra-ui/form-control';
import Wrapper from '../components/Wrapper'; 
import InputField from '../components/InputField';
import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { useRegisterMutation } from '../generated/graphql';
import {toErrorMap} from '../utils/toErrorMap';
import { useRouter } from 'next/dist/client/router';
import { Flex, Heading, VStack} from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Layout } from '../components/Layout';

interface registerProps {}


const Register: React.FC<registerProps> = ({}) => {
    const [, register] = useRegisterMutation(); 
    const router = useRouter(); 
    return (
        <Layout variant='forms' background='#8EE4AF'> 
            <Flex h="100%" aflexDir={"column"} justifyContent="space-around" align={'center'}>

                <VStack spacing={70} flexDir={"column"} w="100%" justifyContent="space-evenly" align={'center'}>
                    <Box textColor="#05386B">
                        <Heading> Register An Account</Heading>
                    </Box>
                    <Box w='40%'>
                        <Formik initialValues={{email: "", username: "", password: ""}}
                                onSubmit={async (values, {setErrors}) => {
                                    //this issue is caused beacuse of our login/register query/mutation has changed
                                    const response = await register({options: values}); // make sure data values matches the mutation call
                                    console.log(values); 
                                    if(response.data?.register.errors){
                                        setErrors(toErrorMap(response.data.register.errors));
                                    } else if (response.data?.register.user) {
                                        //User registered without error 

                                        router.push('/'); 
                                    }
                        }}>
                        
                        {({isSubmitting}) => (
                            <Form> 
                                <FormControl>
                                    <InputField 
                                        name="username"
                                        placeholder="Username"
                                        label="Username" 
                                    /> 
                                    <Box mt={4}>
                                        <InputField 
                                            name="email"
                                            placeholder="Email"
                                            label="Email" 
                                        /> 
                                    </Box>
                                    <Box mt={4}>
                                        <InputField 
                                            name="password"
                                            placeholder="Password"
                                            label="Password" 
                                            type="password"
                                        /> 
                                    </Box>
                                    <Button 
                                        mt={4} 
                                        isLoading={isSubmitting} 
                                        type='submit' 
                                        colorScheme={'blackAlpha'} 
                                        textColor="#EDF5E1" bg="#05386B">
                                        
                                        Register
                                    </Button>
                        
                                </FormControl>
                            </Form>
                        )}

                        </Formik>
                    </Box>
                </VStack>
            </Flex>
        </Layout>
    )
}

export default withUrqlClient(createUrqlClient)(Register); 

