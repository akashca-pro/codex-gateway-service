import cloudinary from ".";
import { UploadApiResponse } from 'cloudinary';

export const uploadImageFileToCloudinary = async (
    buffer : Buffer,
    filename : string,
    folder : string = 'profile_pictures'
) : Promise<UploadApiResponse> => {

    return new Promise((resolve,reject)=>{
        const stream = cloudinary.uploader.upload_stream(
            {
                folder : `${folder}/${filename}`,
                public_id : 'avatar',
                resource_type : 'image',
                overwrite : true
            },
            (error,result) => {
                if(error) return reject(error);
                resolve(result!);
            }
        )
        stream.end(buffer);
    })
}

export const uploadImageUrlToCloudinary = async (
    imageUrl : string,
    filename : string,
    folder : string = 'profile_pictures',
) : Promise<UploadApiResponse> => {

    return new Promise((resolve,reject)=>{
        cloudinary.uploader.upload(imageUrl,{
            folder : `${folder}/${filename}`,
            public_id : 'avatar',
            resource_type : 'image',
            overwrite : true
        },(error, result)=>{
            if(error) return reject(error);
            resolve(result!);
        })
    })    

}