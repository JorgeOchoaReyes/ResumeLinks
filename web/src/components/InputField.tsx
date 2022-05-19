import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import {Textarea} from '@chakra-ui/textarea'; 
import React, { InputHTMLAttributes } from 'react'
import {useField} from 'formik';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string; 
    label: string;
    textarea?: boolean; 
}

const InputField: React.FC<InputFieldProps> = ({label, textarea, size: _, ...props}) => {

    const [field, {error}] = useField(props); 

    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}> {label} </FormLabel>
            {textarea ? 
                <Input 
                {...field} {...props}
                id={field.name}
                />
                :                 <Input 
                {...field} {...props}
                id={field.name}
                />
            }
            {error ? <FormErrorMessage> {error} </FormErrorMessage> : null}
        </FormControl>
    );
}

//!!error turn the error bool to string 

export default InputField;