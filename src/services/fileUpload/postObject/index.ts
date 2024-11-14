
import { IPostObjectResponse, TFileType } from "./type";
import axios from "axios";



export const postfileObject = async (data:TFileType): Promise<IPostObjectResponse> => {
    return (await axios.post( "https://api.princefinserv.in" + "/file/s3/post-object",data)).data
}