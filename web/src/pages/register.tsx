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
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface registerProps {}


const Register: React.FC<registerProps> = ({}) => {
    const [, register] = useRegisterMutation(); 
    const router = useRouter(); 
    return (
        <Wrapper> 
            <Formik initialValues={{email: "", username: "", password: ""}}
                    onSubmit={async (values, {setErrors}) => {
                        //this issue is caused beacuse of our login/register query/mutation has changed
                        const response = await register({options: values}); // make sure data values matches the mutation call
                        console.log(response); 
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
                            placeholder="username"
                            label="username" 
                        /> 
                        <Box mt={4}>
                            <InputField 
                                name="email"
                                placeholder="email"
                                label="email" 
                            /> 
                        </Box>
                        <Box mt={4}>
                            <InputField 
                                name="password"
                                placeholder="password"
                                label="password" 
                                type="password"
                            /> 
                        </Box>
                        <Button 
                            mt={4} 
                            isLoading={isSubmitting} 
                            type='submit' colorScheme="teal">

                            Register
                        </Button>

                    </FormControl>
                </Form>
            )}

            </Formik>
        </Wrapper>
    )
}

export default withUrqlClient(createUrqlClient)(Register); 

