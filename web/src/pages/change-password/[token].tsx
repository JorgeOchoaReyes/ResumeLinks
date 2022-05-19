import { FormControl, Box, Button, Link } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import router from 'next/dist/client/router';
import InputField from '../../components/InputField';
import Wrapper from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import {useRouter} from "next/router"; 
import { useState } from 'react';
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import NextLink from 'next/link'; 


export const ChangePassword: NextPage<{token: string}> = () => {
    const router = useRouter(); 
    const [,changePassword] = useChangePasswordMutation();
    const [tokenError, setTokenError] = useState(''); 
    return (
        <Wrapper variant='small'> 
        <Formik initialValues={{password: ""}}
                onSubmit={async (values, {setErrors}) => {
                    const response = await changePassword(
                        {newPassword: values.password, 
                        token: typeof router.query.token === "string" ? router.query.token : ""
                    });
     
                    if(response.data?.changePassword.errors){

                        const errorMap = toErrorMap(response.data.changePassword.errors);

                        if('token' in errorMap) {
                            //passing token 
                            setTokenError(errorMap.token); 
                        }

                        setErrors(errorMap);

                    } else if (response.data?.changePassword.user) {
                        //success
                        
                        router.push('/'); 
                    }
        }}>

        {({isSubmitting}) => (
            <Form> 
                <FormControl>
                    <InputField 
                        name="password" //this name must match field 'field' in the errors array
                        placeholder="new password"
                        label="New Password" 
                        type="password"
                    /> 
                    {tokenError ? 
                        <Box>
                            <Box style={{color: 'red'}}> {tokenError} </Box> 
                            <NextLink href="/forgot-password" >
                                <Link> Go to forgot password again. </Link>
                            </NextLink>
                        </Box>: null}
                    <Button 
                        mt={4} 
                        isLoading={isSubmitting} 
                        type='submit' colorScheme="teal">

                        Change Password
                    </Button>

                </FormControl>
            </Form>
        )}

        </Formik>
    </Wrapper>
    );
}
 
//We have pulled out the token from the url link, 
// ChangePassword.getInitialProps = ({query}) => {
//     return {
//         token: query.token as string
//     }
// }
// ===> alternatively use router.query.token


export default withUrqlClient(createUrqlClient)(ChangePassword); 