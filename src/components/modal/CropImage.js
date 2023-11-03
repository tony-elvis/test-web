import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../utils/cropImage';
import { Slider } from '@mui/material';

export const CropImage = ({ modalIsOpen, setModalIsOpen, onAccept, img, profile }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const croppedImageRef = useRef(null);
  const croppedAreaPixelsRef = useRef(null);
  const [error, setError] = useState(null);
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    croppedAreaPixelsRef.current = croppedAreaPixels;
  }, []);

  const cropImage = async () => {
    try {
      const { url, file } = await getCroppedImg(
        img?.preview,
        croppedAreaPixelsRef.current,
        img?.name,
        img?.type
      );
      return { url, file };
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!modalIsOpen) {
      setCrop({ x: 0, y: 0, width: 800, height: 500 });
      croppedImageRef.current = null;
      setZoom(1);
    }
  }, [modalIsOpen]);

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
          width: '60%',
          borderRadius: 18,
          height: '60%'
        }
      }}>
      <button
        className="absolute px-4 py-1 text-black rounded-md top-5 right-5"
        onClick={() => {
          setModalIsOpen(false);
        }}>
        ╳
      </button>
      <div className="flex flex-col w-10/12">
        <h1 className="my-5 text-3xl text-center ">Cropping image</h1>
        <div style={{ position: 'relative', height: 400, width: 'auto' }}>
          {!!img && (
            <Cropper
              image={img.preview}
              crop={crop}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              zoom={zoom}
              objectFit="contain"
              aspect={profile ? 1 : 16 / 9}
            />
          )}
        </div>
        {!!error && <p className="mt-2 text-lg text-red-600">{error}</p>}
        <div className="mx-10">
          <p className="mt-5 text-lg">Zoom</p>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(e, zoom) => setZoom(zoom)}
            size="medium"
          />
        </div>
        <div className="flex justify-around mt-10 gap-x-5">
          <button
            className="w-full py-5 text-xl text-white bg-red-600 rounded-3xl font-apercuBold"
            onClick={() => {
              setError(null);
              setModalIsOpen(false);
            }}>
            Cancel
          </button>
          <button
            className="w-full py-5 text-xl text-black bg-errand-primary rounded-3xl font-apercuBold"
            onClick={async () => {
              const cropInfo = await cropImage();
              if (cropInfo?.file?.size > 2000000) {
                setError('Maximum file size is 2MB');
                return;
              }
              onAccept(cropInfo);
              setError(null);
              setModalIsOpen(false);
            }}>
            Confirm
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
