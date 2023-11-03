import axios from 'axios';
import { debounce } from 'lodash';
import React, { useCallback } from 'react';
import AsyncSelect from 'react-select/async';
import capitalizeFirstLetter from '../utils/capitalizeFL';

export const MapboxSelect = ({ label, onChange, error, placeholder, containerStyles, value }) => {
  const validateInfo = (data) => {
    const postal_code = data?.context?.find((item) => item?.id?.includes('postcode'))?.text;
    const city = data?.context?.find((item) => item?.id?.includes('place'))?.text;
    const country = data?.context
      ?.find((item) => item?.id?.includes('country'))
      ?.short_code?.toUpperCase();
    const state = data?.context
      ?.find((item) => item?.id?.includes('region'))
      ?.short_code?.split('-')[1];
    const address = data?.address;
    const line1 = `${address} ${data.text}`;
    const longitude = data.geometry.coordinates[0];
    const latitude = data.geometry.coordinates[1];
    const fullAddress = data.place_name;

    if (
      postal_code &&
      city &&
      address &&
      country &&
      state &&
      line1 &&
      longitude &&
      latitude &&
      fullAddress
    ) {
      return {
        postal_code,
        city,
        country,
        state,
        line1,
        longitude,
        latitude,
        fullAddress
      };
    }
  };

  const loadOptions = useCallback(
    debounce((inputValue, callback) => {
      getDirections(inputValue).then((results) => {
        callback(results);
      });
    }, 800),
    []
  );

  const getDirections = (inputValue) =>
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json?types=place,address,poi,district,region,locality&access_token=${process.env.REACT_APP_MAPBOX_PUBLIC_KEY}`
      )
      .then((response) => {
        let suggestions = response.data.features.reduce((acc, data) => {
          const info = validateInfo(data);
          if (info) {
            acc.push(info);
          }
          return acc;
        }, []);
        return suggestions;
      })
      .catch(function (error) {
        console.log(error);
      });

  return (
    <div className={`mb-5 ${containerStyles}`}>
      {label && <label className="font-apercuBold text-label-secondary">{label}</label>}
      <AsyncSelect
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        cacheOptions
        loadOptions={loadOptions}
        getOptionLabel={(option) => option.fullAddress}
        getOptionValue={(option) => `${option.longitude}${option.latitude}`}
        noOptionsMessage={() => 'Type an address to search'}
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
        isClearable
        closeMenuOnSelect
        className="mt-2 placeholder-gray-500 border border-gray-300 rounded-md text-label-secondary font-apercuRegular focus:outline-none focus:border-errand-primary focus:z-10 sm:text-sm"
      />
      {error && <p className="normal-case text-text-red ">{capitalizeFirstLetter(error)}</p>}
    </div>
  );
};
