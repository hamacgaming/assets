const fs = require("fs");
const path = require("path");

async function removeTags() {
  try {
    const currentDir = "./";
    const files = fs.readdirSync(currentDir);

    // Filter for images that specifically contain '_144px'
    const taggedFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      const isImage = [".jpg", ".jpeg", ".webp"].includes(ext);
      const hasTag = file.includes("_144px");
      return isImage && hasTag;
    });

    if (taggedFiles.length === 0) {
      console.log('No images with the "_144px" tag were found.');
      return;
    }

    console.log(`Found ${taggedFiles.length} tagged images. Renaming...`);

    for (const file of taggedFiles) {
      const oldPath = path.join(currentDir, file);

      // Remove '_144px' from the filename
      const newFileName = file.replace("_144px", "");
      const newPath = path.join(currentDir, newFileName);

      // If a clean version already exists, delete it first so rename doesn't crash
      if (fs.existsSync(newPath) && oldPath !== newPath) {
        fs.unlinkSync(newPath);
      }

      // Rename the file
      fs.renameSync(oldPath, newPath);
      console.log(` 🏷️  Renamed: ${file} -> ${newFileName}`);
    }

    console.log('\n🎉 Cleanup complete! All "_144px" tags have been stripped.');
  } catch (error) {
    console.error("An error occurred during renaming:", error.message);
  }
}

removeTags();
