'use strict'
const User = use('App/Models/User');
const Helpers = use('Helpers');


class ImageController {
    async store ({ params, request }){
        const profilePic = request.file('image')
        
        const nameImage = new Date().getTime()+'.'+profilePic.subtype;
        await profilePic.move(Helpers.tmpPath('uploads'),{ 
            name: nameImage
        })
        
        if (!profilePic.moved()) {
            return profilePic.error()
        }
        
        return 'File moved'
    }
}

module.exports = ImageController
