import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import TextInput from '../TextInput';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  errandDetails: yup.string().required('Errand details is required')
});

export const EditModal = ({ modalIsOpen, setModalIsOpen, onAccept, modalInfo }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    setValue('errandDetails', modalInfo?.errandDetails);
  }, [modalInfo]);

  return (
    <ReactModal
      isOpen={modalIsOpen}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        },
        content: {
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 'auto',
          marginBottom: 'auto',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          width: 500,
          borderRadius: 18,
          height: 400
        }
      }}>
      <button
        className="absolute px-4 py-1 text-black rounded-md top-5 right-5"
        onClick={() => {
          setModalIsOpen(false);
        }}>
        ╳
      </button>
      <div className="w-full mt-10">
        <p className="my-5 text-3xl text-center font-apercuBold">{`${modalInfo?.errandId} - ${modalInfo?.errandCategory?.name}`}</p>
        <div className="mt-2">
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                onTextChange={onChange}
                placeholder="Errand details"
                label="Errand details"
                value={value}
                error={errors.errandDetails?.message}
              />
            )}
            name="errandDetails"
          />
        </div>
        <div className="flex justify-around mt-10 gap-x-5">
          <button
            className="w-full py-5 text-xl text-white bg-red-600 rounded-3xl font-apercuBold"
            onClick={() => {
              setModalIsOpen(false);
            }}>
            Cancel
          </button>
          <button
            className="w-full py-5 text-xl text-black bg-errand-primary rounded-3xl font-apercuBold"
            onClick={handleSubmit(onAccept)}>
            Confirm
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
