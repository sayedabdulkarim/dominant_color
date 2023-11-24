import asyncHandler from "express-async-handler";
import axios from "axios";
import Vibrant from "node-vibrant";
import { createWriteStream, unlink } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import { v4 as uuidv4 } from "uuid";

const streamPipeline = promisify(pipeline);

// @desc Extract dominant color from an image
// @route POST /api/getExtractColor
// @access PUBLIC
const extractColor = asyncHandler(async (req, res) => {
  const { imageUrl } = req.body;
  console.log({ imageUrl });

  // Generate a unique filename for each image
  const tempImagePath = `temp-image-${uuidv4()}.jpg`;

  try {
    const response = await axios.get(imageUrl, { responseType: "stream" });
    await streamPipeline(response.data, createWriteStream(tempImagePath));

    Vibrant.from(tempImagePath).getPalette((err, palette) => {
      if (err) {
        console.error("Error extracting color:", err);
        unlink(tempImagePath, (unlinkErr) => {
          if (unlinkErr) console.error("Error deleting temp file:", unlinkErr);
        });
        return res.status(500).send("Error extracting color");
      }

      const dominantColor = palette.Vibrant.getHex();
      res.json({ color: dominantColor });

      // Delete the temporary file after processing
      unlink(tempImagePath, (unlinkErr) => {
        if (unlinkErr) console.error("Error deleting temp file:", unlinkErr);
      });
    });
  } catch (error) {
    console.error("Error downloading image:", error);
    res.status(500).send("Error downloading image");
  }
});

export { extractColor };
