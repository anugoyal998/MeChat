import axios from 'axios'

class Cloudinary{
    async uploadImageToCloudinary(img){
        const url = `https://api.cloudinary.com/v1_1/dranjf1xs/image/upload`
        const {data} = await axios.post(url,img)
        return data?.secure_url
    }
}

export default new Cloudinary()