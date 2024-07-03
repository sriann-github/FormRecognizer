import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px auto;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const FileInput = styled.input`
  margin-bottom: 20px;
  width: 100%;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const FormRecognizerComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    console.log('Input value changed:', e.target.value);
    setInputValue(e.target.value);
  };

  const handleFileChange = (e) => {
    console.log('File selected:', e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log('Input value:', inputValue);
    console.log('Selected file:', file);

    if (!file) {
      console.error('No file selected');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result;
      console.log('File read as array buffer:', arrayBuffer);

      axios.post('https://abc-formrecogsvc.cognitiveservices.azure.com/abc-FormRecogSvc/v2.1/layout/analyze', arrayBuffer, {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Ocp-Apim-Subscription-Key': '28d7a5e69c2e4f51bf6f58d28b92804d'
        }
      })
      .then(response => {
        console.log('Response data:', response.data);
      })
      .catch(error => {
        console.error('Error during fetch:', error);
      });
    };

    reader.onerror = () => {
      console.error('Error reading file:', reader.error);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <FormContainer>
      <Heading>Form Recognizer</Heading>
      <form onSubmit={handleSubmit}>
        <label>
          Input:
          <input type="text" value={inputValue} onChange={handleChange} />
        </label>
        <label>
          File:
          <FileInput type="file" onChange={handleFileChange} />
        </label>
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default FormRecognizerComponent;
