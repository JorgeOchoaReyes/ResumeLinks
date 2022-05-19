import { FormControl, Box, Button } from '@chakra-ui/react';
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Formik, Form } from 'formik';
import React from 'react'
import InputField from '../components/InputField';
import { useCreatePostMutation, useMeQuery } from '../generated/graphql';
import { useRouter } from 'next/router';
import { Layout } from '../components/Layout';
import { useisAuth } from '../utils/useisAuth';



const createpost: React.FC<{}> = ({}) => {
    useisAuth(); 
    const [, createPost] = useCreatePostMutation();
    const router = useRouter(); 

    return (
        <Layout variant='small'>
            <Formik initialValues={{title: "", text: ""}}
                    onSubmit={async (values, {setErrors}) => {
                        const {error} = await createPost({input: values});
                        if(!error) {
                            router.push('/');
                        }
       
            }}>
            {({isSubmitting}) => (
                <Form> 
                    <FormControl>
                        <InputField 
                            name="title"
                            placeholder="Title"
                            label="title" 
                        /> 
                        <Box mt={4}>
                            <InputField 
                                textarea={true}
                                name="text"
                                placeholder="text..."
                                label="text" 
                            /> 
                        </Box>
                        <Button 
                            mt={4} 
                            isLoading={isSubmitting} 
                            type='submit' colorScheme="teal">
                            Create Post
                        </Button>
                    </FormControl>
                </Form>
            )}
            </Formik>
        </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(createpost); 