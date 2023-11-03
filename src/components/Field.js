import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { BsTrashFill, BsXLg } from 'react-icons/bs';
import { ConfirmModal } from './modal/ConfirmModal';
import SelectInput from './SelectInput';
import TextInput from './TextInput';
import { fieldValueSchema } from '../schemas';

export const Field = ({
  remove,
  updateField,
  update,
  index,
  fieldsWatch,
  id,
  deleteField,
  fieldClicked,
  setFieldClicked,
  setShowForm,
  append
}) => {
  const [disabled, setDisabled] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const deleteData = useRef(null);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(fieldValueSchema),
    defaultValues: {
      fieldName: '',
      isRequired: false,
      showModal: false,
      fieldType: undefined,
      modalContent: '',
      errandFieldId: undefined,
      parentField: null,
      elementArrayParent: null
    }
  });
  useEffect(() => {
    if (fieldClicked) {
      setValue('fieldName', fieldClicked?.fieldName ?? '');
      setValue('isRequired', fieldClicked?.isRequired ?? false);
      setValue('showModal', fieldClicked?.showModal ?? false);
      setDisabled(!fieldClicked?.showModal ?? true);
      setValue('fieldType', fieldClicked?.fieldType ?? undefined);
      setValue('modalContent', fieldClicked?.modalContent ?? '');
      setValue('errandFieldId', fieldClicked?.errandFieldId ?? undefined);
      setValue('parentField', fieldClicked?.parentField ?? null);
      setValue('elementArrayParent', fieldClicked?.elementArrayParent ?? null);
    } else {
      reset();
      setDisabled(true);
    }
  }, [fieldClicked]);
  const options = [
    {
      value: 'string',
      label: 'Text'
    },
    {
      value: 'image',
      label: 'Image'
    },
    {
      value: 'date',
      label: 'Date'
    }
  ];
  const onSubmit = (data) => {
    if (id) {
      updateField(data, data?.errandFieldId ? index : fieldsWatch.length).then(() => {
        setFieldClicked(null);
        setShowForm(false);
      });
    } else {
      if (fieldClicked) {
        update(index, data);
      } else {
        append(data);
      }
      setFieldClicked(null);
      setShowForm(false);
    }
    reset();
  };

  const disable = () => {
    if (fieldClicked) {
      if (fieldClicked?.showModal) {
        return false;
      } else {
        return fieldsWatch?.some((field) => field?.showModal);
      }
    } else {
      return fieldsWatch?.some((field) => field?.showModal);
    }
  };
  return (
    <div className="relative grid grid-cols-1 p-6 border-2 rounded-xl lg:grid-cols-2 lg:gap-x-20">
      <div
        className="absolute cursor-pointer right- top-4 right-4"
        onClick={() => {
          setShowForm(false);
          setFieldClicked(null);
        }}>
        <BsXLg className="w-5 h-5" />
      </div>
      <div className="col-span-1">
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              onTextChange={onChange}
              value={value}
              placeholder="Type the name of the field"
              label="Category field name"
              error={errors?.fieldName?.message}
              labelStyle={{
                color: '#696F79'
              }}
            />
          )}
          name="fieldName"
        />
      </div>
      <div className="flex items-center col-span-1 ">
        <div>
          <div className="flex items-center ml-4">
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, value } }) => (
                <>
                  <input
                    id="isRequired"
                    type="checkbox"
                    value={value}
                    checked={value}
                    onChange={onChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                  />
                  <label
                    htmlFor="isRequired"
                    className="ml-2  font-apercuRegular text-[#696F79] text-lg">
                    Required
                  </label>
                </>
              )}
              name="isRequired"
            />
          </div>
          <div className="flex items-center ml-4">
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, value } }) => (
                <>
                  <input
                    id="showModal"
                    type="checkbox"
                    value={value}
                    checked={value}
                    disabled={disable()}
                    onChange={(e) => {
                      onChange(e);
                      setDisabled(!e.target.checked);
                      if (!e.target.checked) {
                        setValue('modalContent', '');
                      }
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                  />
                  <label
                    htmlFor="showModal"
                    className="ml-2  font-apercuRegular text-[#696F79] text-lg">
                    Show modal
                  </label>
                </>
              )}
              name="showModal"
            />
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { value, onChange } }) => (
            <SelectInput
              options={options}
              label="Field type"
              error={errors?.fieldType?.value?.message}
              value={value}
              onChange={(value) => {
                onChange(value);
              }}
              placeholder="Select field type"
              labelStyle={{
                color: '#696F79'
              }}
            />
          )}
          name="fieldType"
        />
      </div>
      <div className="col-span-1">
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              onTextChange={onChange}
              value={value}
              placeholder="Type modal content"
              label="Modal content"
              error={errors?.modalContent?.message}
              disabled={disabled}
              labelStyle={{
                color: '#696F79'
              }}
            />
          )}
          name="modalContent"
        />
      </div>
      <div className="col-span-1">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="relative flex justify-center w-4/5 px-4 py-3 text-base text-black border border-transparent rounded-md font-apercuMedium group bg-errand-primary hover:bg-errand-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-errand-primary">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
          Save
        </button>
      </div>
      <div className="col-span-1">
        <div className="mb-5">
          <div className="flex items-center justify-start">
            {fieldClicked ? (
              <button
                type="button"
                onClick={() => {
                  if (id && fieldClicked?.errandFieldId) {
                    deleteData.current = {
                      id: fieldClicked?.errandFieldId
                    };
                    setModalIsOpen(true);
                  } else {
                    remove(index);
                    setFieldClicked(null);
                    setShowForm(false);
                  }
                }}>
                <BsTrashFill className="w-8 h-8 mt-2 text-red-500" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <ConfirmModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        type="this extra field"
        onAccept={() => {
          deleteField(deleteData.current?.id);
          setShowForm(false);
          setFieldClicked(null);
        }}
        category="delete"
      />
    </div>
  );
};
