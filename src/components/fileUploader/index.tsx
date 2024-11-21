'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle, Upload, File } from 'lucide-react'
import Image from 'next/image'


interface FileUploaderProps {
  disabled?: boolean
  acceptedFileTypes: string[]
  showPreview?: boolean
  onUploadSuccess: (key: string) => void
  maxSizeInBytes?: number
  id: string // Add an id prop to make each instance unique
}

export const FileUploader = ({
  disabled = false,
  acceptedFileTypes,
  showPreview = true,
  // onUploadSuccess,
  maxSizeInBytes = 5 * 1024 * 1024, // 5MB default
  id,
}: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isUploaded, setIsUploaded] = useState<boolean>(false)
  const [updatedFileName, setUpdatedFileName] = useState<string>("")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null
    if (selectedFile) {
      if (selectedFile.size > maxSizeInBytes) {
        setUploadError(`File size exceeds the limit of ${maxSizeInBytes / 1024 / 1024} MB`)
        return
      }

      setFile(selectedFile)

      const fileExtension = selectedFile.name.split('.').pop()
      const fileNameWithoutExtension = selectedFile.name.replace(/\s+/g, '-').split('.').slice(0, -1).join('.')
      const uniqueFileName = `${fileNameWithoutExtension}-${Date.now()}.${fileExtension}`
      setUpdatedFileName(uniqueFileName)

      setIsUploaded(false)
      setUploadError(null)

      if (showPreview) {
        const reader = new FileReader()
        reader.onload = (e) => setPreview(e.target?.result as string)
        reader.readAsDataURL(selectedFile)
      } else {
        setPreview(null)
      }
    }
  }

  console.log(updatedFileName)
  // const fileUploadMutation = useMutation({
  //   mutationFn: FileUpload,
  //   onSuccess: (data) => {
  //     removeFile()
  //     setIsUploading(false)
  //     if (data.data.url) {
  //       onUploadSuccess(data.data.url)
  //     } else {
  //       setUploadError('Failed to upload file. URL is undefined.')
  //     }
  //     setUploadProgress(100)
  //     setIsUploaded(true)
  //   },
  //   onError: (error) => {
  //     setUploadError('Failed to upload file. Please try again.')
  //     console.error("File Upload error", error)
  //     setUploadProgress(0)
  //     setIsUploaded(false)
  //   }
  // })

  const uploadFile = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)
    setUploadError(null)
    // fileUploadMutation.mutateAsync(file)
  }

  const removeFile = () => {
    setFile(null)
    setPreview(null)
    setUploadProgress(0)
    setUploadError(null)
    setIsUploaded(false)
  }

  return (
    <div className="w-full max-w-md">
      <div className="border-2 border-dashed rounded-lg p-4 text-center">
        <input
          type="file"
          disabled={isUploading || disabled}
          accept={acceptedFileTypes.join(',')}
          onChange={handleFileChange}
          className="hidden"
          id={`file-input-${id}`}
        />
        <label htmlFor={`file-input-${id}`} className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
          {file ? (
            <div className="flex flex-col items-center">
              {isUploaded ? (
                <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
              ) : (
                <File className="w-8 h-8 text-yellow-500 mb-2" />
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
              disabled={isUploading || isUploaded}
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