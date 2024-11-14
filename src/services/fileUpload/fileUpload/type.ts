// Type for file upload fields
export interface IFileUploadFields {
    Key: string;
    bucket: string;
    "X-Amz-Algorithm": string;
    "X-Amz-Credential": string;
    "X-Amz-Date": string;
    Policy: string;
    "X-Amz-Signature": string;
    file: File;
  }
  
 