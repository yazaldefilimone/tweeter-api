import multer from 'multer';
import { randomUUID } from 'crypto';
import { env } from '@/shared/env';
console.log(env.uploads);

export const multerImageUploadConfig = {
  storage: multer.diskStorage({
    destination: env.uploads.path,
    filename: (req, file, callback) => {
      const fileHash = randomUUID();
      const fileName = `${fileHash}-${file.originalname.split(' ').join('')}`;
      return callback(null, fileName);
    },
  }),
  fileFilter: (req, file, callback) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      return callback(null, true);
    }
    return callback(new Error('Invalid image file type.'));
  },
  limits: {
    fileSize: 10 * 1024 * 1024, //10MB
  },
} as multer.Options;
