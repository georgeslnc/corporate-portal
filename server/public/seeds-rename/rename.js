const fs = require('fs');
const path = require('path');

// Путь к директории с файлами
const directoryPath = './';

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('An error occurred:', err);
    return;
  }

  files.forEach((file) => {
    const extension = path.extname(file);
    const baseName = path.basename(file, extension);

    // Проверяем, является ли файл .jpeg
    if (extension === '.jpeg') {
      const oldPath = path.join(directoryPath, file);
      const newPath = path.join(directoryPath, `photo-user-${baseName}${extension}`);

      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error('An error occurred during renaming:', err);
        } else {
          console.log(`Renamed file ${oldPath} to ${newPath}`);
        }
      });
    }
  });
});
