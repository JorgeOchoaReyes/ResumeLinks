import { FormControl, Box, Button, Flex, VStack, Heading } from '@chakra-ui/react';
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Formik, Form, FieldArray, Field } from 'formik';
import React from 'react'
import InputField from '../components/InputField';
import { useCreatePostMutation, useMeQuery } from '../generated/graphql';
import { useRouter } from 'next/router';
import { Layout } from '../components/Layout';
import { useisAuth } from '../utils/useisAuth';

const createpost: React.FC<{}> = ({}) => {
    useisAuth(); 
    const router = useRouter(); 
    const initialValues = {
        title: '',
        experience: [{description: '', date: '', company: ''}],
        education: [],
        skills: [],
        expCount: '',
        edCount: '',
        skillsCount: ''
    };

    const [numExp, setnumExp] = React.useState(1); 
    const [numEd, setnumEd] = React.useState(1); 
    
    const handleExpCount = (e: any, field: any, values: any, setValues: any) => {    
        const exp = [...values.experience];
        const operation = e.target.id;
        if(operation == 'add') exp.push({description: '', date: '', company: ''});
        else exp.pop(); 
        setValues({...values, experience: exp});
        // call formik onChange method
        field.onChange(e);
    }

    const handleEdCount = (e: any, field: any, values: any, setValues: any) => {
        
    }

    return (
        <Layout variant='landing' background="#8EE4AF">
            <Flex h="100%" aflexDir={"column"} justifyContent="space-around" align={'center'} paddingBottom={10}>
                <VStack spacing={70} flexDir={"column"} w="100%" justifyContent="space-evenly" align={'center'}>
                    <Box textColor="#05386B">
                        <Heading> Create Resume </Heading>
                    </Box>

                    <Box  w='40%'>
                        <Formik initialValues={initialValues}
                                onSubmit={async (values, {setErrors}) => {
                                    alert(JSON.stringify(values))
                                
                        }}>
                        {({isSubmitting, values, errors, touched, setValues}) => (
                            <Form> 
                                <FormControl>
                                    <InputField 
                                        name="name"
                                        placeholder="Name...."
                                        label="Name" 
                                    /> 

                                    <FieldArray
                                    
                                        name="experience"
                                    >
                                        { () => {
                                            return (
                                                <Box>
                                                    {values.experience.map((experience, i) => {
                                                        return (
                                                            <Box key={i} mt={4}>
                                                                <InputField
                                                                    name={`experience.${i}.date`}
                                                                    placeholder="date"
                                                                    label="Dates"
                                                                />
                                                                <InputField
                                                                    name={`experience.${i}.company`}
                                                                    placeholder="Company/Project"
                                                                    label="Company/Project"
                                                                />
                                                                <InputField
                                                                    name={`experience.${i}.description`}
                                                                    placeholder="Description"
                                                                    label="Description"
                                                                />
                                                                
                                                            </Box>
                                                        )
                                                    })}
                                                </Box>
                                            )
                                        }}
                                    </FieldArray>
                                    
                                    <Field>
                                        {({field}: any) => {
                                            return <Box mt={4}>
                                                <Button
                                                    {...field}
                                                 colorScheme={'blackAlpha'} id="add" 
                                                 bg="#05386B" textColor="#EDF5E1" onClick={(e) => handleExpCount(e, field, values, setValues)}> Add Experiencce </Button>
                                            </Box>
                                        }}
                                    </Field>
                                    
                                    <Field>
                                        {({field}: any) => {
                                            return <Box mt={4}>
                                                <Button
                                                 {...field}
                                                 colorScheme={'blackAlpha'} id="remove" 
                                                 bg="#05386B" textColor="#EDF5E1" onClick={(e) => handleExpCount(e, field, values, setValues)}> Remove Experiencce </Button>
                                            </Box>
                                        }}
                                    </Field>

                                    <Button 
                                        mt={4} 
                                        isLoading={isSubmitting} 
                                        type='submit' 
                                        colorScheme={'blackAlpha'} 
                                        bg="#05386B" textColor="#EDF5E1">
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