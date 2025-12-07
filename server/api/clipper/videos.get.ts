import { promises as fs } from "fs";
import { join } from "path";

type Directory = "uk" | "fr";

const toDirectory = (directory: string): Directory => {
  if (directory === "uk") return "uk";
  if (directory === "fr") return "fr";
  return "uk";
};

export default defineEventHandler(async () => {
  const videosDir = join(process.cwd(), "public", "videos");

  try {
    const directories = await fs.readdir(videosDir);

    const res = [];
    const videoExtensions = [".mp4", ".webm", ".mov", ".avi", ".mkv"];

    for (const directory of directories) {
      const stats = await fs.stat(join(videosDir, directory));
      if (!stats.isDirectory()) continue;
      const files = await fs.readdir(join(videosDir, directory));
      const videoFiles = files.filter((file) =>
        videoExtensions.some((ext) => file.toLowerCase().endsWith(ext))
      );

      res.push(
        videoFiles.map((file) => ({
          name: file,
          directory: toDirectory(directory),
          url: `/videos/${directory}/${file}`,
          type: "video",
        }))
      );
    }

    return res.flat();
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Failed to list videos: ${error}`,
    });
  }
});
