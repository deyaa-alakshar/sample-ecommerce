import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileDropzoneProps {
  onFilesSelected: (path: string) => void;
  src?: string;
}

export interface FilePreview {
  file: File;
  preview?: string;
}

const MyDropzone: React.FC<FileDropzoneProps> = ({ onFilesSelected, src }) => {
  const [previews, setPreviews] = useState<FilePreview[]>([]);
  // Handle file drop
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const filePreviews = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        
      }));
      setPreviews(filePreviews); // Update local previews state
      
      onFilesSelected(previews[0].preview!); // Call the parent handler
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
    },
  });

  useEffect(() => {
    if (src) {
      setPreviews((prev) => [
        ...prev,
        {
          file: { name: "Existing Image", type: "image" } as File,
          preview: src,
        },
      ]);
    }
  }, [src]);

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-6 rounded-lg ${
        isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the images here...</p>
      ) : (
        <p>Drag 'n' drop some images here, or click to select images</p>
      )}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {previews.map((preview, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={preview.preview}
              width={"50"}
              height={"50"}
              alt="Preview"
              className="w-32 h-32 object-cover rounded"
            />
            <p className="text-sm mt-2">{preview.file.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDropzone;
