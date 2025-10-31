import { Response } from "express";
import ms from "ms";
import dotenv from 'dotenv'
dotenv.config();

export const setCookie = (
    res : Response,
    key : string,
    value : string, 
    maxAge : ms.StringValue
    ) : void => {
    res.cookie(key,value,{
        httpOnly : true,
        secure : true,
        sameSite : "none",
        domain: process.env.domain ?? undefined,
        path: "/",
        maxAge: ms(maxAge), 
    })
}