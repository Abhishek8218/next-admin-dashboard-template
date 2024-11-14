import { Api } from "../../config"
import { IGetObjectResponse, TGetFile } from "./type"


export const getfileObject = async (data:TGetFile): Promise<IGetObjectResponse> => {
    return (await Api.post("https://api.princefinserv.in" + "/file/s3/get-object", data)).data
 }