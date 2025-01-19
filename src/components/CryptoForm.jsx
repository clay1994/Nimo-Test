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
  Typography,
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

  // errors
  const [errors, setErrors] = useState({})

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

  // Validate form data
  const validate = () => {
    const newErrors = {};

    // Validate Crypto Name
    if (!formData.cryptoName.trim()) {
      newErrors.cryptoName = 'Crypto name is required.';
    }

    // Validate Crypto Type
    if (!formData.cryptoType) {
      newErrors.cryptoType = 'Please select a crypto type.';
    }

    // Validate Terms Accepted
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions.';
    }

    // Validate Additional Features (at least one must be checked)
    const { staking, trading, analytics } = formData.additionalFeatures;
    if (!staking && !trading && !analytics) {
      newErrors.additionalFeatures = 'Select at least one additional feature.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 ? true : false;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      console.log('Form Data:', formData);
    }
  };

  return (
    <Box sx={{ margin: 'auto', mt: 5 }}>
      <form onSubmit={handleSubmit}>
        {/* Crypto Name Field */}
        <TextField
          label="Crypto Name"
          name="cryptoName"
          value={formData.cryptoName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.cryptoName}
          helperText={errors.cryptoName}
        />

        {/* Crypto Type Dropdown */}
        <FormControl fullWidth margin="normal" error={!!errors.cryptoType}>
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
          {errors.cryptoType && (
            <Typography color="error" variant="caption">
              {errors.cryptoType}
            </Typography>
          )}
        </FormControl>

        {/* Terms Accepted Checkbox */}
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
          {errors.termsAccepted && (
            <Typography color="error" variant="caption">
              {errors.termsAccepted}
            </Typography>
          )}
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
          {errors.additionalFeatures && (
            <Typography color="error" variant="caption">
              {errors.additionalFeatures}
            </Typography>
          )}
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
      </form>
      <pre style={{ marginTop: 20 }}>{JSON.stringify(formData, null, 2) }</pre>
    </Box>
  );
};

export default CryptoForm;
