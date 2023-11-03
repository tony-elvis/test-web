import React from 'react';
import { useWatch } from 'react-hook-form';
import { BsPlus } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { Field } from './Field';

export const NewField = ({ control, errors, fields, append, remove, updateField, deleteField }) => {
  const fieldsWatch = useWatch({
    control,
    name: 'fields'
  });
  const { id } = useParams();
  return (
    <>
      {fields.map((item, index) => (
        <div key={item.id} className="grid w-full grid-cols-1 lg:grid-cols-2 gap-x-10">
          <Field
            control={control}
            errors={errors}
            index={index}
            remove={remove}
            updateField={updateField}
            fieldsWatch={fieldsWatch}
            id={id}
            deleteField={deleteField}
          />
        </div>
      ))}
      {fieldsWatch?.length <= 5 && (
        <button
          className="flex items-center"
          type="button"
          onClick={() =>
            append({
              fieldName: '',
              fieldType: '',
              isRequired: false,
              showModal: false,
              modalContent: ''
            })
          }>
          <BsPlus className="w-8 h-8 text-green-700" />
          <h2 className="text-xl">New field</h2>
        </button>
      )}
    </>
  );
};
