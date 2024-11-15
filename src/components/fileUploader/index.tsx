'use client'

import {  useState } from 'react'
import { AlertCircle, CheckCircle, Upload, File } from 'lucide-react'
import Image from 'next/image'
// import { useRecoilState, useSetRecoilState } from 'recoil'



// import { useMutation } from '@tanstack/react-query'

// import { fileContentType, fileKey } from '@/src/recoil/atoms/fileAtom'


interface FileUploaderProps {
  disabled?: boolean
  acceptedFileTypes: string[]
  showPreview?: boolean
  onUploadSuccess: (key: string) => void
  maxSizeInBytes?: number
}

export const FileUploader = ({
  disabled = false,
  acceptedFileTypes,
  showPreview = true,
  // onUploadSuccess,
  maxSizeInBytes = 5 * 1024 * 1024, // 5MB default
}: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isUploaded, setIsUploaded] = useState<boolean>(false) // New state
  const [updatedFileName, setUpdatedFileName] = useState<string>("")
  // const [fileNameKey, setFileNameKey] = useRecoilState(fileKey)
  // const setContentType = useSetRecoilState(fileContentType)
// const [FileuploadURL,setFileUploadURL] = useState<string>("")
//   const [fileData, setFileData] = useState<IFileUploadFields | null>(null)


// use this function to post file object to the server

//   const  postFileObjectMutation = useMutation({
//     mutationFn: postfileObject,
//     onSuccess: (data:IPostObjectResponse) => {
//       console.log("postObject Response Data ",data)


      
//       setFileNameKey(data.data.fields.Key) // Set file key to be used in file upload mutation
// // Set file upload URL to be used in file upload mutation

//       setFileUploadURL(data.data.url)
//       // Set file data to be used in file upload mutation
//       setFileData({ 
//         Key: data.data.fields.Key,
//         bucket: data.data.fields.bucket,
//         "X-Amz-Algorithm": data.data.fields["X-Amz-Algorithm"],
//         "X-Amz-Credential": data.data.fields["X-Amz-Credential"],
//         "X-Amz-Date": data.data.fields["X-Amz-Date"],
//         Policy: data.data.fields.Policy,
//         "X-Amz-Signature": data.data.fields["X-Amz-Signature"],
//         file: file as File // The actual file selected by the user
//       })


//     },
//   })


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null
    if (selectedFile) {
      if (selectedFile.size > maxSizeInBytes) {
        setUploadError(`File size exceeds the limit of ${maxSizeInBytes / 1024 / 1024} MB`)
        return
      }
      console.log("selected file ",selectedFile)

      setFile(selectedFile)

  //  setContentType(selectedFile.type) // Set content type to be used in file upload mutation
console.log("selected file type ",selectedFile.type)
console.log("selected file name ",selectedFile.name)

// Remove spaces from file name and create a unique name using a timestamp
const fileExtension = selectedFile.name.split('.').pop(); // Get the file extension
const fileNameWithoutExtension = selectedFile.name.replace(/\s+/g, '-').split('.').slice(0, -1).join('.'); // Replace spaces with dashes
const uniqueFileName = `${fileNameWithoutExtension}-${Date.now()}.${fileExtension}`;  // Append timestamp to avoid duplicates
setUpdatedFileName(uniqueFileName)
console.log("unique file name ",uniqueFileName)
console.log("updated file name ",updatedFileName)

      // postFileObjectMutation.mutate({key:`test/images/${uniqueFileName}`,contentType:selectedFile.type}) // Call the post file object mutation with the file key and content type
      setIsUploaded(false) // Reset upload status when a new file is selected
      setUploadError(null)

      if (showPreview ) {
        const reader = new FileReader()
        console.log(reader)
        reader.onload = (e) => setPreview(e.target?.result as string)
        reader.readAsDataURL(selectedFile)
      } else {
        setPreview(null)
      }
    }
  }

  // File upload mutation
  // const fileUploadMutation = useMutation({
  //   // mutationFn: (data: IFileUploadFields) => fileUpload(data, FileuploadURL),
  //   onSuccess: () => {
  //     removeFile()
  //     // Call the onUploadSuccess callback with the file key
  //     setIsUploading(false)
  //     // onUploadSuccess(fileNameKey)
  //     setUploadProgress(100)
  //     setIsUploaded(true)
  //     console.log("File uploaded successfully")
  //   },
  //   onError: (error) => { 
  //     setUploadError('Failed to upload file. Please try again.')
  //     console.error("File Upload error",error)
  //     setUploadProgress(0)
  //     setIsUploaded(false)
  // }})


  const uploadFile = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)
    setUploadError(null)
    // const formData = new FormData()
    // formData.append('file', file)

      // fileUploadMutation.mutateAsync(fileData as IFileUploadFields)  // Call the file upload mutation with the file data
 
  }

  const removeFile = () => {
    setFile(null)
    setPreview(null)
    console.log("file removed")
    setUploadProgress(0)
    setUploadError(null)
    setIsUploaded(false) // Reset upload status on file removal
  }

  console.log("isuploading",isUploading)
  return (
    <div className="w-full max-w-md ">
      <div className="border-2 border-dashed rounded-lg p-4 text-center">
        <input
          type="file"
          disabled={isUploading || disabled}
          accept={acceptedFileTypes.join(',')}
          onChange={handleFileChange}
          className="hidden"
          id="file-input"
        />
        <label htmlFor="file-input" className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
          {file ? (
            <div className="flex flex-col items-center">
              {/* Show different icon based on upload status */}
              {isUploaded ? (
                <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
              ) : (
                <File className="w-8 h-8 text-yellow-500 mb-2" /> // Show file icon before upload
              )}
              <p className="text-sm font-medium line-clamp-1">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm font-medium">Click to select a file</p>
              <p className="text-xs text-gray-500">
                Accepted types: {acceptedFileTypes.join(', ')}
              </p>
              <p className="text-xs text-gray-500">
                Max size: {(maxSizeInBytes / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}
        </label>
        {showPreview && preview && (
        <div className="mt-4">
          <Image
            src={preview}
            alt="File preview"
            width={200}
            height={200}
            className="mx-auto max-h-24 max-w-24 rounded-lg object-cover"
          />
        </div>
      )}

{file && (
        <div className="mt-4 flex justify-center space-x-2">
          <button
            onClick={uploadFile}
            disabled={isUploading || isUploaded} // Disable button if uploading or uploaded
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? 'Uploading...' : isUploaded ? 'Uploaded' : 'Upload'}
          </button>
          <button
            onClick={removeFile}
            disabled={isUploading}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Remove
          </button>
        </div>
      )}
      </div>

    

  
      {isUploading && (
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      {uploadError && (
        <div className="mt-4 flex items-center text-red-500">
          <AlertCircle className="w-4 h-4 mr-2" />
          <p className="text-sm">{uploadError}</p>
        </div>
      )}
    </div>
  )
}
