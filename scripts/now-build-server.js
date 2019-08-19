const fs = require("fs");
const path = require("path");

(function buildServer() {
  const srcPath = path.resolve(__dirname, "../src/server");
  const distPath = path.resolve(__dirname, "../dist/");

  const copySrcFiles = (err, files) => {
    if (err) throw new Error(err);

    files
      .filter(file => !file.match(/^\.\w+/))
      .map(async fileName => {
        const fileData = fs.readFileSync(path.resolve(srcPath, fileName), {
          encoding: "utf-8"
        });

        const distFileName = path.resolve(distPath, fileName);

        await fs.writeFile(distFileName, fileData, err => {
          if (err) throw new Error(err);
          return;
        });
      });
  };

  fs.readdir(srcPath, copySrcFiles);
})();
