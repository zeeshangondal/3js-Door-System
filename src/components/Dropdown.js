import React from 'react';
import Select, { components } from 'react-select';

const Dropdown = ({ setChosenColor }) => {
  const colorOptions = [
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
    { value: 'yellow', label: 'Yellow' },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '350px', // Adjust the width as needed
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.value,
    }),
  };

  const CustomOption = ({ innerProps, label, data }) => (
    <div {...innerProps} style={{ backgroundColor: data.value }}>
      {label}
    </div>
  );

  const handleChange = (selectedOption) => {
    setChosenColor(selectedOption.value);
  };

  return (
    <Select
      options={colorOptions}
      onChange={handleChange}
      isSearchable={false}
      placeholder="Select a color"
      styles={customStyles}
      components={{ Option: CustomOption }}
    />
  );
};

export default Dropdown;
