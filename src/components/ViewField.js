import React from 'react';
import { BsCheck2Square, BsSquare } from 'react-icons/bs';
import capitalizeFirstLetter from '../utils/capitalizeFL';

export const ViewField = ({ field, setFieldClicked, onClick, details = false }) => {
  return (
    <div
      className={`w-1/2 p-4 mt-5 border-2 rounded-xl ${
        !details ? 'cursor-pointer hover:bg-[#F5F5F5] ease-in-out duration-200' : ''
      }`}
      onClick={() => {
        if (!details) {
          onClick();
          setFieldClicked(field);
        }
      }}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-apercuBold text-[#696F79]">{field?.fieldName}</h2>
        {field?.isActive !== undefined && (
          <p className={` text-lg ${field?.isActive ? 'text-[#7CB741]' : 'text-red-500'}`}>
            {field?.isActive ? 'Active' : 'Inactive'}
          </p>
        )}
      </div>
      <p className="font-apercuRegular text-[#8692A6] text-lg">
        {field?.fieldType === 'string'
          ? 'Text'
          : capitalizeFirstLetter(
              typeof field?.fieldType === 'string' ? field?.fieldType : field?.fieldType?.label
            )}{' '}
        type
      </p>
      <div className="flex items-center">
        {field?.showModal ? (
          <BsCheck2Square className="w-6 h-6 text-[#12E200]" />
        ) : (
          <BsSquare className="w-5 h-5 ml-1" />
        )}
        <p className="ml-2 font-apercuRegular text-[#696F79] text-lg">Show modal</p>
      </div>
      {field?.showModal && (
        <p className="ml-2 text-lg text-black font-apercuRegular">{field?.modalContent}</p>
      )}
      <div className="flex items-center">
        {field?.isRequired ? (
          <BsCheck2Square className="w-6 h-6 text-green-500" />
        ) : (
          <BsSquare className="w-5 h-5 ml-1" />
        )}
        <p className="ml-2 font-apercuRegular text-[#696F79] text-lg">Required</p>
      </div>
    </div>
  );
};
