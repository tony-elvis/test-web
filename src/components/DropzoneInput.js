import React, { useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

const baseStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export const DropzoneInput = ({
  files,
  onDrop,
  disabled = false,
  clearImage,
  accept = {
    'image/*': []
  }
}) => {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept,
    onDrop: (acceptedFiles) => onDrop(acceptedFiles),
    disabled
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const thumbs = (file) => (
    <div
      className="box-border inline-flex p-1 mb-2 mr-2 border rounded-sm border-errand-primary "
      key={file.name}>
      <div className="flex min-w-0 overflow-hidden ">
        <img
          src={file.preview ?? file}
          className="block w-auto h-full"
          // Revoke data uri after image is loaded
          onLoad={({ target: img }) => {
            URL.revokeObjectURL(file.preview ?? file);
            if (img.offsetHeight === 0 || img.offsetWidth === 0) {
              toast('Invalid svg image', {
                type: 'error'
              });
              clearImage();
            }
          }}
        />
      </div>
    </div>
  );

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files && URL.revokeObjectURL(files.preview);
  }, []);

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {files ? (
          <div className="relative flex flex-row flex-wrap w-1/2">{thumbs(files)}</div>
        ) : (
          <p>Click or drop an image here</p>
        )}
        {files ? (
          <button
            className="absolute px-4 py-1 text-black rounded-md top-5 right-5"
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              clearImage();
            }}>
            ╳
          </button>
        ) : null}
      </div>
    </section>
  );
};
