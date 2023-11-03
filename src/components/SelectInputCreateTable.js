import React, { useEffect, useState } from 'react';
import Select from 'react-select/creatable';
import capitalizeFirstLetter from '../utils/capitalizeFL';

const SelectInputCreateTable = ({
  label,
  options,
  onChange,
  error,
  placeholder,
  value,
  disable,
  containerStyles
}) => {
  const components = {
    DropdownIndicator: null
  };

  const [inputValue, setInputValue] = useState('');
  const [valueOption, setValueOption] = useState([]);

  const createOption = (label) => ({
    label,
    value: label
  });
  const avoidDuplicate = (value) => {
    const isDuplicate = valueOption.find((item) => item.value === value.value);
    return isDuplicate;
  };
  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        if (avoidDuplicate(createOption(inputValue))) return;
        setValueOption((prev) => [...prev, createOption(inputValue)]);
        setInputValue('');
        event.preventDefault();
    }
  };
  useEffect(() => {
    onChange(valueOption);
  }, [valueOption]);

  return (
    <div className={`mb-5 ${containerStyles}`}>
      {label && <label className="font-apercuBold text-label-secondary">{label}</label>}
      <Select
        options={options}
        inputValue={inputValue}
        onChange={(newValue) => {
          if (avoidDuplicate(createOption(inputValue))) return;
          onChange(newValue);
          setValueOption(newValue);
        }}
        placeholder={placeholder}
        value={value}
        isDisabled={disable}
        onInputChange={(newValue) => setInputValue(newValue)}
        onKeyDown={handleKeyDown}
        menuIsOpen={false}
        isClearable
        components={components}
        isMulti
        styles={{
          option: (styles, { data }) => {
            return {
              ...styles,
              backgroundColor: data.color ? `rgb(${data.color})` : 'white',
              color: data.color ? 'black' : '',
              fontWeight: data.color ? 'bold' : 'normal',
              fontSize: data.color ? '1.2rem' : '',
              textShadow: data.color
                ? `
              1px  1px     #fff, 
              -1px  1px     #fff, 
               1px -1px     #fff, 
              -1px -1px     #fff,
               1px  1px 5px #555`
                : ''
            };
          }
        }}
        closeMenuOnSelect
        className="mt-2 placeholder-gray-500 border border-gray-300 rounded-md text-label-secondary font-apercuRegular focus:outline-none focus:border-errand-primary focus:z-10 sm:text-sm"
      />
      {error && <p className="normal-case text-text-red ">{capitalizeFirstLetter(error)}</p>}
    </div>
  );
};

export default SelectInputCreateTable;
