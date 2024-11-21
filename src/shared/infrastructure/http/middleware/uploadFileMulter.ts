import {
  directoryExists,
  randomPrefixGenerator,
  replaceTextToExtension,
  slugify,
} from "@/shared/utils";
import fs from "fs";
import multer from "multer";

const storageUpload = (subfolder?: string) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      fs.mkdir("./uploads/", async (err) => {
        const pathUpload = `./uploads/${subfolder ? subfolder + "/" : ""}`;
        try {
          await directoryExists(pathUpload);
        } catch (error) {
          fs.mkdir(pathUpload, (err) => {
            if (err) throw new Error("Error::" + err);
            cb(null, pathUpload);
          });
        }
        cb(null, pathUpload);
      });
    },
    filename: function (req, file, cb) {
      const filename = replaceTextToExtension(slugify(file.originalname));
      cb(null, randomPrefixGenerator() + "-" + filename);
    },
  });

const storageUploadTemp = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir("./tmp/", (err) => {
      cb(null, "./tmp/");
    });
  },
  filename: function (req, file, cb) {
    const filename = replaceTextToExtension(slugify(file.originalname));
    cb(null, randomPrefixGenerator() + "-" + filename);
  },
});

export const uploadFileMulter = (customFolder?: string) =>
  multer({
    storage: storageUpload(customFolder),
    limits: {
      fileSize: 1000000 * 80,
    },
  });
export const uploadFileMulterTemp = multer({
  storage: storageUploadTemp,
  limits: {
    fieldSize: 1000000 * 80,
  },
});
