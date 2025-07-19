import { Response } from "express";

export const setCookie = (
    res : Response,
    key : string,
    value : string, 
    max_age : number) : void => {

        res.cookie(key,value,{
            httpOnly : true,
            secure : true,
            sameSite : 'strict',
            maxAge : max_age
        })
}