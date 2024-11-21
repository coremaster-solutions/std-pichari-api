import fs from "fs";
import fsExtra from "fs-extra";
import path from "path";

// process.cwd()
export const getRelativePath = (pathFile: string) => {
  return path.resolve(pathFile);
};

export const fileExists = async (pathFile: string) => {
  const file_path = getRelativePath(pathFile);
  return await fsExtra.pathExists(file_path).catch((error) => {
    console.error("ERROR:::", error);
    throw new Error("The path is not a file");
  });
};

export const deleteStorageFile = (path_delete: string) => {
  const file_path = getRelativePath(path_delete);

  fs.unlink(file_path, (error) => {
    if (error) {
      console.log(error);
      throw new Error("Could not delete file");
    }

    console.log(`Deleted ${file_path}`);
  });
};

export const moveFileToPath = (
  old_file_path: string,
  dir_destination: string
) => {
  const file_with_dest_path = getRelativePath(
    old_file_path.replace(old_file_path.split("/").at(0)!, dir_destination)
  );
  fsExtra.move(getRelativePath(old_file_path), file_with_dest_path, (error) => {
    if (error) throw Error("File not moved");
    console.log("File successfully moved!!");
  });
};

export const directoryExists = async (pathFile: string) => {
  const file_path = getRelativePath(pathFile);
  return await fsExtra.pathExists(file_path).catch((error) => {
    if (error) throw Error("Directory not exists");
    console.log("Directory exists");
  });
};

export const numberOfFiles = (dir: string) => {
  const noOfFiles = fsExtra.readdirSync(dir);
  return noOfFiles.length;
};

export const emptyDirectory = async (pathDir: string) => {
  console.log(getRelativePath(pathDir));
  let before = numberOfFiles(path.join(process.cwd(), pathDir));
  console.log(
    `Number of files in directory before calling the function: ${before}`
  );
  fsExtra.emptyDirSync(getRelativePath(pathDir));
  let after = numberOfFiles(path.join(process.cwd(), pathDir));
  console.log(
    `Number of files in directory after calling the function: ${after}`
  );
};

export const deleteFile = (pathFile: string) => {
  fsExtra.remove(getRelativePath(pathFile), (error) => {
    if (error) throw Error("File not remove");
    console.log("File had been removed");
  });
};

export const deleteDirectory = async (pathFile: string) => {
  try {
    await fsExtra.remove(getRelativePath(pathFile));
    console.log("Directory had been removed");
  } catch (error) {
    console.log("DeleteDirectory ERROR:", error);

    throw Error("Directory not remove");
  }
};

//   const directory = path.join(__dirname, '..', 'src', 'uploads', 'images');

// export const handleFileDeletion = (directory: string, file_to_delete: string) => {
//   fs.readdir(directory, (error, files) => {
//     if (error) {
//       console.log(error);
//       throw new Error('Could not read directory');
//     }

//     files.forEach((file) => {
//       const file_path = path.join(directory, file);

//       fs.stat(file_path, (error, stat) => {
//         if (error) {
//           console.log(error);
//           throw new Error('Could not stat file');
//         }

//         if (stat.isDirectory()) {
//           // Here instead of doing a consle.log(),
//           // we recursively search for the file in subdirectories
//           handleFileDeletion(file_path, file_to_delete);
//         } else if (file === file_to_delete) {
//           fs.unlink(file_path, (error) => {
//             if (error) {
//               console.log(error);
//               throw new Error('Could not delete file');
//             }

//             console.log(`Deleted ${file_path}`);
//           });
//         }
//       });
//     });
//   });
// };

// Calling the function
// handleFileDeletion(directory, '1676410030129-screen.webp')
