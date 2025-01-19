import React, { useState } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  Box,
} from '@mui/material';

const CryptoForm = () => {
  // State for form values
  const [formData, setFormData] = useState({
    cryptoName: '',
    cryptoType: '',
    termsAccepted: false,
    investmentType: 'short-term',
    additionalFeatures: {
      staking: false,
      trading: false,
      analytics: false,
    },
  });

  // Handle input change
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox' && name.startsWith('additionalFeatures')) {
      setFormData((prevState) => ({
        ...prevState,
        additionalFeatures: {
          ...prevState.additionalFeatures,
          [name.split('.')[1]]: checked,
        },
      }));
    } else if (type === 'checkbox') {
      setFormData((prevState) => ({ ...prevState, [name]: checked }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data: ");
    console.log(formData);
  };

  return (
    <Box sx={{ margin: 'auto', mt: 5 }}>
      <form onSubmit={handleSubmit}>
        {/* Text Field */}
        <TextField
          label="Crypto Name"
          name="cryptoName"
          value={formData.cryptoName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        {/* Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="crypto-type-label">Crypto Type</InputLabel>
          <Select
            labelId="crypto-type-label"
            name="cryptoType"
            value={formData.cryptoType}
            onChange={handleChange}
          >
            <MenuItem value="Bitcoin">Bitcoin</MenuItem>
            <MenuItem value="Ethereum">Ethereum</MenuItem>
            <MenuItem value="Altcoin">Altcoin</MenuItem>
          </Select>
        </FormControl>

        {/* Checkbox Group */}
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
            }
            label="I accept the terms and conditions"
          />
        </FormGroup>

        {/* Additional Features Checkboxes */}
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                name="additionalFeatures.staking"
                checked={formData.additionalFeatures.staking}
                onChange={handleChange}
              />
            }
            label="Enable Staking"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="additionalFeatures.trading"
                checked={formData.additionalFeatures.trading}
                onChange={handleChange}
              />
            }
            label="Enable Trading"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="additionalFeatures.analytics"
                checked={formData.additionalFeatures.analytics}
                onChange={handleChange}
              />
            }
            label="Enable Analytics"
          />
        </FormGroup>

        {/* Radio Buttons */}
        <FormControl margin="normal">
          <RadioGroup
            name="investmentType"
            value={formData.investmentType}
            onChange={handleChange}
          >
            <FormControlLabel
              value="short-term"
              control={<Radio />}
              label="Short-Term Investment"
            />
            <FormControlLabel
              value="long-term"
              control={<Radio />}
              label="Long-Term Investment"
            />
          </RadioGroup>
        </FormControl>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit
        </Button>

        <br/><br/><br/> <pre>{JSON.stringify(formData, null, 2) }</pre>
      </form>
    </Box>
  );
};

export default CryptoForm;
