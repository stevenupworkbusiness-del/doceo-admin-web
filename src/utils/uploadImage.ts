import { Storage } from 'aws-amplify';

export async function uploadImage(file: File, doctorId: string): Promise<string | null> {
    if (!file || !doctorId) {
        console.error('File and doctorId are required');
        return null;
    }

    try {
        const res = await Storage.put(`${doctorId}/${file.name}`, file, { 
            level: 'public',
            contentType: file.type 
        });

        if (!res.key) {
            throw new Error('Failed to upload file: No key returned');
        }
        
        const url = await Storage.get(res.key);
        return url.split('?')[0];
        
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
} 