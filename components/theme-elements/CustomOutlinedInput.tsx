import React from 'react';
import { styled } from '@mui/material/styles';
import { OutlinedInput, OutlinedInputProps } from '@mui/material';

const CustomOutlinedInput = (props:OutlinedInputProps) => <OutlinedInput {...props} sx={{color:'white', borderRadius:8,paddingX:2,fontSize:13}} />

export default CustomOutlinedInput;
