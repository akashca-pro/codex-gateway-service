import { config } from '@/config'
import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (idToken : string) => {

    const ticket = await client.verifyIdToken({
        idToken,
        audience : config.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload();

    if(!payload) throw new Error('Invalid Google token');

    return {
        email : payload.email,
        name : payload.name,
        imageUrl : payload.picture,
        sub : payload.sub 
    }

}