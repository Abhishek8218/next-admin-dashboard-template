export type TFileType = {
    key: string;
    contentType: string;
  };


  export interface IPostObjectResponse {
    meta: {
      success: boolean;
      message: string;
    };
    data: {
      url: string;
      fields: {
        Key: string;
        bucket: string;
        "X-Amz-Algorithm": string;
        "X-Amz-Credential": string;
        "X-Amz-Date": string;
        Policy: string;
        "X-Amz-Signature": string;
      };
    };
  }
  