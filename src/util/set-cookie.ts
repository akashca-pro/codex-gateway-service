import { Response } from "express";
import ms from "ms";

export const setCookie = (
    res : Response,
    key : string,
    value : string, 
    maxAge : ms.StringValue
    ) : void => {

        res.cookie(key,value,{
            httpOnly : true,
            secure : true,
            sameSite : 'strict',
            maxAge : ms(maxAge)
        })
}