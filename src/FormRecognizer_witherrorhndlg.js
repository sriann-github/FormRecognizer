import React,  {useState}  from 'react';
import axios from 'axios';

const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '20px auto',
  },
  heading: {
    marginBottom: '20px',
    color: '#333',
  },
  fileInput: {
    marginBottom: '20px',
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  submitButtonHover: {
    backgroundColor: '#0056b3',
  },
  responseContainer: {
    marginTop: '20px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    overflowX: 'auto',
  },
  pre: {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
};
const FormRecognizerComponent = () => {
  const [inputValue] = useState('');
  const [file, setFile] = useState(null);


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
    <div style={styles.formContainer}>
      <h2 style={styles.heading}>Upload Receipt</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          style={styles.fileInput}
          onChange={handleFileChange}
        />
        <button
          type="submit"
          style={{
            ...styles.submitButton,
            ...(isHovered ? styles.submitButtonHover : {})
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Submit
        </button>
      </form>
      {response && (
        <div style={styles.responseContainer}>
          <pre style={styles.pre}>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
  
};

export default FormRecognizerComponent;
