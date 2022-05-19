import { FormControl, Box, Flex, Link, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import router from 'next/router';
import React, { useState } from 'react'
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useForgotPasswordMutation } from '../generated/graphql';


const ForgotPassword: React.FC<{}> = ({}) => {
    const [complete, setComplete] = useState(false);
    const [, forgotPassword] = useForgotPasswordMutation();
    return (    
        <Wrapper> 
        <Formik initialValues={{email: ""}}
                onSubmit={async (values, {setErrors}) => {
                    await forgotPassword(values); // make sure data values matches the mutation call
                    setComplete(true); 
                }}>
        {({isSubmitting}) => complete ? <Box> If an account with that email exist, we sent you an email. </Box> : (
            <Form> 
                <FormControl>
                    <InputField 
                        name="email"
                        placeholder="Email"
                        label="Email" 
                    /> 
                    <Button 
                        mt={4} 
                        isLoading={isSubmitting} 
                        type='submit' colorScheme="teal">
                        Send forgot password email
                    </Button>
                </FormControl>
            </Form>
        )}
        </Formik>
    </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient, {ssr: true})(ForgotPassword); 