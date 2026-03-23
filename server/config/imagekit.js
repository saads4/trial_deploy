import ImageKit, { toFile } from '@imagekit/nodejs';
import dotenv from 'dotenv';

dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

export const uploadToImageKit = async (file, folder = 'biosynvanta/products') => {
  try {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileName = `${file.fieldname}-${uniqueSuffix}`;
    
    const result = await imagekit.files.upload({
      file: await toFile(file.buffer, fileName),
      fileName: fileName,
      folder: folder,
      useUniqueFileName: false
    });
    
    return {
      url: result.url,
      fileId: result.fileId,
      name: result.name
    };
  } catch (error) {
    throw new Error(`ImageKit upload failed: ${error.message}`);
  }
};

export const deleteFromImageKit = async (fileId) => {
  try {
    await imagekit.files.delete(fileId);
    return true;
  } catch (error) {
    throw new Error(`ImageKit delete failed: ${error.message}`);
  }
};

export { imagekit };
