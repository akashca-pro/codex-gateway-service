import { Response } from "express";

export const setCookie = (
    res : Response,
    token_name : string,
    token : string, 
    max_age : number) : void => {

        res.cookie(token_name,token,{
            httpOnly : true,
            secure : true,
            sameSite : 'strict',
            maxAge : max_age
        })
}