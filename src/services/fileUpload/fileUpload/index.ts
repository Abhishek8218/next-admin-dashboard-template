import axios from "axios";
import { IFileUploadFields } from "./type";

export const fileUpload = async (data: IFileUploadFields, uploadURL: string): Promise<Record<string, unknown>> => {
  const formData = new FormData();

  // Append all the fields to formData
  formData.append("Key", data?.Key);
  formData.append("bucket", data?.bucket);
  formData.append("X-Amz-Algorithm", data["X-Amz-Algorithm"]);
  formData.append("X-Amz-Credential", data["X-Amz-Credential"]);
  formData.append("X-Amz-Date", data["X-Amz-Date"]);
  formData.append("Policy", data?.Policy);
  formData.append("X-Amz-Signature", data["X-Amz-Signature"]);
  formData.append("file", data?.file); // Append the actual file

  // Make the POST request to upload the file
  const response = await axios.post(uploadURL, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  // Return the data from the response
  return response.data;
};
