export type TGetFile = {
    key: string;
    expiry: number;
    contentType: string;
  };



export interface IGetObjectResponse {
    meta: {
      success: boolean;
      message: string;
    };
    data: string;
  }