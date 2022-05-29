import { FormControl, Box, Button, Flex, VStack, Heading, HStack, Tag, TagCloseButton, TagLabel, Divider, Text } from '@chakra-ui/react';
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Formik, Form, FieldArray, Field } from 'formik';
import React from 'react'
import InputField from '../components/InputField';
import { useRouter } from 'next/router';
import { Layout } from '../components/Layout';
import { useisAuth } from '../utils/useisAuth';

//Create split panel where the left takes care of editing/adding and the right is the generate 
//resume, upon generating call a handleupdate whcih will update state of parent coponent and send it to sibling 
//component 

//  P => L( handleParentStateUpdate() ) && R(paremt.state)

const createpost: React.FC<{}> = ({}) => {
    useisAuth(); 
    const router = useRouter(); 
    const initialValues = {
        name: '',
        experience: [{description: '', date: '', company: ''}],
        education: [{description: '', date: '', school: ''}],
        skills: [],
        expCount: '',
        edCount: '',
        skillsCount: ''
    };

    const [skill, setSkills] = React.useState(''); 
    
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
        const ed = [...values.education];
        const operation = e.target.id;
        if(operation == 'add') ed.push({description: '', date: '', school: ''});
        else ed.pop(); 
        setValues({...values, education: ed});
        // call formik onChange method
        field.onChange(e);
    }

    const handleSkillsChange = (e: any) => {
        setSkills(e.target.value); 
    }

    const handleSkills = (e: any, field: any, values: any, setValues: any) => {
        const skills = [...values.skills];
        const operation = e.target.id;
        if(operation == 'add') skills.push(skill);
        else skills.pop(); 
        setSkills(''); 
        setValues({...values, skills: skills});

        // call formik onChange method
        field.onChange(e);
    }

    return (
        <Layout variant='landing' background="#8EE4AF">
            <Flex h="100%" aflexDir={"column"} justifyContent="space-around" align={'center'} paddingBottom={10}>
                <VStack spacing={10} flexDir={"column"} w="100%" justifyContent="space-evenly" align={'center'}>
                    <Box textColor="#05386B">
                        <Text fontWeight={'bolder'} fontSize={{base: '15', md: '34'}}> Create Resume </Text>
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
                                    <Box paddingTop={10} textColor="#05386B">
                                        <Text fontWeight={'bolder'} fontSize={{base: '15', md: '24'}}> Experience</Text >
                                    </Box>
                                    <FieldArray
                                    
                                        name="experience"
                                    >
                                        { () => {
                                            return (
                                                <Box>
                                                    {values.experience.map((experience, i) => {
                                                        return (
                                                            <Box key={i} mt={4}>
                                                                <Text> Experience #{i+1} </Text>
                                                                <InputField
                                                                    name={`experience.${i}.date`}
                                                                    placeholder="Date"
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
                                                                    textarea={true}
                                                                />
                                                                 
                                                            </Box>
                                                        )
                                                    })}
                                                </Box>
                                            )
                                        }}
                                    </FieldArray>
                                    
                                    <HStack paddingTop="8" justifyContent="space-evenly">
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
                                    </HStack>

                                    <Box paddingTop={10} textColor="#05386B">
                                        <Text fontWeight={'bolder'} fontSize={{base: '15', md: '24'}}> Education </Text >
                                    </Box>

                                    <FieldArray
                                    
                                        name="education"
                                    >
                                        { () => {
                                            return (
                                                <Box>
                                                    {values.education.map((education, i) => {
                                                        return (
                                                            <Box key={i} mt={4}>
                                                                <Text> Education #{i+1} </Text>
                                                                <InputField
                                                                    name={`education.${i}.date`}
                                                                    placeholder="Date"
                                                                    label="Dates"
                                                                />
                                                                <InputField
                                                                    name={`education.${i}.school`}
                                                                    placeholder="School/Degree"
                                                                    label="School/Degree"
                                                                />
                                                                <InputField
                                                                    name={`education.${i}.description`}
                                                                    placeholder="Description"
                                                                    label="Description"
                                                                    textarea={true}
                                                                />
                                                                
                                                            </Box>
                                                        )
                                                    })}
                                                </Box>
                                            )
                                        }}
                                    </FieldArray>

                                    <HStack paddingTop="8" justifyContent="space-evenly">
                                        <Field>
                                            {({field}: any) => {
                                                return <Box >
                                                    <Button
                                                        {...field}
                                                     colorScheme={'blackAlpha'} id="add" 
                                                     bg="#05386B" textColor="#EDF5E1" onClick={(e) => handleEdCount(e, field, values, setValues)}> Add School </Button>
                                                </Box>
                                            }}
                                        </Field>
                                        
                                        <Field>
                                            {({field}: any) => {
                                                return <Box>
                                                    <Button
                                                     {...field}
                                                     colorScheme={'blackAlpha'} id="remove" 
                                                     bg="#05386B" textColor="#EDF5E1" onClick={(e) => handleEdCount(e, field, values, setValues)}> Remove School </Button>
                                                </Box>
                                            }}
                                        </Field>
                                    </HStack>

                                    <Box paddingTop={10} textColor="#05386B">
                                        <Text fontWeight={'bolder'} fontSize={{base: '15', md: '24'}} > Skills </Text>
                                    </Box>

                                    <HStack flexWrap={'wrap'} spacing={4}>
                                      {values.skills.map((skill, i) => (
                                        <Tag
                                          size={'md'}
                                          key={`tag#${i}`}
                                          borderRadius='full'
                                          variant='solid'
                                          colorScheme='green'
                                        >
                                          <TagLabel> {skill} </TagLabel>
                                          <TagCloseButton />
                                        </Tag>
                                      ))}
                                    </HStack>

                                    <InputField
                                        name={`skills`}
                                        placeholder="Type Skills...."
                                        label="Skills"
                                        value={skill}
                                        onChange={(e) => handleSkillsChange(e)}
                                    />
                                    <HStack paddingTop="8" justifyContent="space-evenly">
                                        <Field>
                                            {({field}: any) => {
                                                return <Box >
                                                    <Button
                                                        {...field}
                                                     colorScheme={'blackAlpha'} id="add" 
                                                     bg="#05386B" textColor="#EDF5E1" onClick={(e) => handleSkills(e, field, values, setValues)}> Add skill </Button>
                                                </Box>
                                            }}
                                        </Field>
                                        
                                        <Field>
                                            {({field}: any) => {
                                                return <Box>
                                                    <Button
                                                     {...field}
                                                     colorScheme={'blackAlpha'} id="remove" 
                                                     bg="#05386B" textColor="#EDF5E1" onClick={(e) => handleSkills(e, field, values, setValues)}> Remove skill </Button>
                                                </Box>
                                            }}
                                        </Field>
                                    </HStack>

                                    <Button 
                                        mt={4} 
                                        isLoading={isSubmitting} 
                                        type='submit' 
                                        colorScheme={'blackAlpha'} 
                                        bg="#05386B" textColor="#EDF5E1">
                                        Generate Resume
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