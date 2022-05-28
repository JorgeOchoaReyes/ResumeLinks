import { FormControl, Box, Button, Flex, VStack, Heading } from '@chakra-ui/react';
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
    const router = useRouter(); 
    let display; 

    return (
        <Layout variant='forms' background="#8EE4AF">
            <Flex h="100%" aflexDir={"column"} justifyContent="space-around" align={'center'}>
                <VStack spacing={70} flexDir={"column"} w="100%" justifyContent="space-evenly" align={'center'}>
                    <Box textColor="#05386B">
                        <Heading> Create Resume </Heading>
                    </Box>
                    <Box  w='40%'>
                        <Formik initialValues={{title: "", text: "", experience: []}}
                                onSubmit={async (values, {setErrors}) => {
                                    alert(values.title)
                                
                        }}>
                        {({isSubmitting}) => (
                            <Form> 
                                <FormControl>
                                    <InputField 
                                        name="title"
                                        placeholder="Title"
                                        label="Title" 
                                    /> 
                                    <Box mt={4}>
                                        <InputField 
                                            textarea={true}
                                            name="text"
                                            placeholder="text..."
                                            label="Text" 
                                        /> 
                                    </Box>
                                    <Button 
                                        mt={4} 
                                        isLoading={isSubmitting} 
                                        type='submit' colorScheme="teal">
                                        Create Resume
                                    </Button>
                                </FormControl>
                            </Form>
                        )}
                        </Formik>
                    </Box>
                </VStack>
            </Flex>
        </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(createpost); 