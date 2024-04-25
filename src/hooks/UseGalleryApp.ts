import { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UserPhoto } from './usePhotoGallery';

export function usePhotoGallery() {
    const [photos, setPhotos] = useState<UserPhoto[]>([]);

    const takePhoto = async () => {
        try {
            const photo = await Camera.getPhoto({
                resultType: CameraResultType.Uri,
                source: CameraSource.Camera,
                quality: 100,
            });

            const fileName = Date.now() + '.jpeg';
            const newPhoto: UserPhoto = {
                filepath: fileName,
                webviewPath: photo.webPath,
            };
            setPhotos([newPhoto, ...photos]);
            // Update photo storage here if needed
            return newPhoto;
        } catch (error) {
            console.error('Error taking photo:', error);
        }
    };

    return {
        photos,
        takePhoto,
    };
}
