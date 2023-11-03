import moment from 'moment';
import React from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';

export const ModalIfo = ({ modalIsOpen, setIsOpen, modalInfo }) => {
  return (
    <ReactModal
      isOpen={modalIsOpen}
      preventScroll
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
          height: 700
        }
      }}>
      <button
        className="absolute px-4 py-1 text-black rounded-md top-5 right-5"
        onClick={() => {
          setIsOpen(false);
        }}>
        ╳
      </button>
      <div className="absolute pb-10 overflow-scroll scroll-modal">
        <div className="w-full mt-10 ">
          <p className="text-3xl font-bold text-center">Errand details</p>
          <p className="mt-3 text-xl font-bold text-label-primary">Pick up and drop off</p>
          <div className="flex justify-between my-1">
            <p className="text-label-secondary">Order number:</p>
            <div className="flex justify-end w-64">
              <p className="text-label-secondary">{modalInfo?.errandId} </p>
            </div>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-label-secondary">Pick up address:</p>
            <div className="flex justify-end w-64">
              <p className="text-right text-label-secondary">{modalInfo?.pickupAddress}</p>
            </div>
          </div>
          {modalInfo?.pickupDetail ? (
            <div className="flex justify-between my-1">
              <p className="text-label-secondary">Pick up details:</p>
              <div className="flex justify-end w-64">
                <p className="text-right text-label-secondary">{modalInfo?.pickupDetail}</p>
              </div>
            </div>
          ) : null}
          {modalInfo?.stopAddress ? (
            <div className="flex justify-between my-1">
              <p className="text-label-secondary">Additional address:</p>
              <div className="flex justify-end w-64">
                <p className="text-right text-label-secondary">{modalInfo?.stopAddress}</p>
              </div>
            </div>
          ) : null}
          {modalInfo?.stopDetail ? (
            <div className="flex justify-between my-1">
              <p className="text-label-secondary">Additional details:</p>
              <div className="flex justify-end w-64">
                <p className="text-right text-label-secondary">{modalInfo?.stopDetail}</p>
              </div>
            </div>
          ) : null}

          <div className="flex justify-between my-1">
            <p className="text-label-secondary">Drop off address:</p>
            <div className="flex justify-end w-64">
              <p className="text-right text-label-secondary">{modalInfo?.dropOffAddress}</p>
            </div>
          </div>
          {modalInfo?.dropOffDetail ? (
            <div className="flex justify-between my-1">
              <p className="text-label-secondary">Drop off details:</p>
              <div className="flex justify-end w-64">
                <p className="text-right text-label-secondary">{modalInfo?.dropOffDetail}</p>
              </div>
            </div>
          ) : null}
          <div className="flex justify-between my-1">
            <p className="text-label-secondary">Date and time:</p>
            <div className="flex justify-end w-64">
              <p className="text-label-secondary">
                {moment(modalInfo?.createdAt).format('MM/DD/YYYY h:mm:ss A')}
              </p>
            </div>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-label-secondary">Errand cost:</p>
            <div className="flex justify-end w-64">
              <p className="text-label-secondary">${modalInfo?.total}</p>
            </div>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-label-secondary">Errand details:</p>
            <div className="flex justify-end w-64">
              <p className="text-label-secondary">{modalInfo?.errandDetails}</p>
            </div>
          </div>
          {modalInfo?.errandFieldValue.length > 0 ? (
            <p className="mt-3 text-xl font-bold text-label-primary">Additional information</p>
          ) : null}
          {modalInfo?.errandFieldValue.map((field) => (
            <>
              <div key={field?.errandFieldValueId} className="flex justify-between my-1">
                {(field?.errandField?.fieldType === 'string' ||
                  field?.errandField?.fieldType === 'radiobutton') && (
                  <>
                    <p className="text-label-secondary">{`${field?.errandField?.fieldName}:`}</p>
                    <div className="flex justify-end w-64">
                      <p className="text-label-secondary">{field?.value}</p>
                    </div>
                  </>
                )}
                {field?.errandField?.fieldType === 'date' && (
                  <>
                    <p className="text-label-secondary">{`${field?.errandField?.fieldName}:`}</p>
                    <div className="flex justify-end w-64">
                      <p className="text-label-secondary">
                        {moment(field?.value).format('MM/DD/YYYY h:mm:ss A')}
                      </p>
                    </div>
                  </>
                )}
              </div>
              {field?.errandField?.fieldType === 'image' && (
                <div key={field?.errandFieldValueId} className="my-1 ">
                  <p className="block mb-2 text-label-secondary">{`${field?.errandField?.fieldName}:`}</p>
                  <img src={field?.value} alt="errand" className="w-1/2" />
                </div>
              )}
            </>
          ))}
          <p className="mt-3 text-xl font-bold text-label-primary">Customer details</p>
          <div className="flex justify-between my-1">
            <p className="text-label-secondary">Customer name:</p>
            <div className="flex justify-end w-64">
              <p className="text-label-secondary">
                {modalInfo?.user?.name} {modalInfo?.user?.lastName}
              </p>
            </div>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-label-secondary">Phone number:</p>
            <div className="flex justify-end w-64">
              <p className="text-label-secondary">{modalInfo?.user?.phoneNumber}</p>
            </div>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-label-secondary">Email:</p>
            <div className="flex justify-end w-64">
              <p className="text-label-secondary">{modalInfo?.user?.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="text-xl font-bold text-label-primary">Runner information</p>
            {modalInfo?.errandRunner && (
              <Link
                to={`/runners/details/${modalInfo?.errandRunner?.userRunnerId}`}
                className="text-sky-500">
                See runner information
              </Link>
            )}
          </div>
          <div className="flex justify-between my-1">
            <p className="text-label-secondary">Runner name:</p>
            <div className="flex justify-end w-64">
              <p className="text-label-secondary">
                {modalInfo?.errandRunner?.userRunner?.name}{' '}
                {modalInfo?.errandRunner?.userRunner?.lastName}
              </p>
            </div>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-label-secondary">Phone number:</p>
            <div className="flex justify-end w-64">
              <p className="text-label-secondary">
                {modalInfo?.errandRunner?.userRunner?.phoneNumber}
              </p>
            </div>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-label-secondary">Email:</p>
            <div className="flex justify-end w-64">
              <p className="text-label-secondary">{modalInfo?.errandRunner?.userRunner?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};
