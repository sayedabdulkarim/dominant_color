import asyncHandler from "express-async-handler";
import axios from "axios";
import Vibrant from "node-vibrant";

import { createWriteStream } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";

const streamPipeline = promisify(pipeline);

// @desc Extract dominant color from an image
// @route POST /api/getExtractColor
// @access PUBLIC
const extractColor = asyncHandler(async (req, res) => {
  const { imageUrl } = req.body;
  console.log({ imageUrl });
  try {
    const response = await axios.get(imageUrl, { responseType: "stream" });
    const tempImagePath = "temp-image.jpg";
    await streamPipeline(response.data, createWriteStream(tempImagePath));

    Vibrant.from(tempImagePath).getPalette((err, palette) => {
      if (err) {
        console.error("Error extracting color:", err);
        return res.status(500).send("Error extracting color");
      }

      // Extracting the most dominant color
      const dominantColor = palette.Vibrant.getHex();
      res.json({ color: dominantColor });
    });
  } catch (error) {
    console.error("Error downloading image:", error);
    res.status(500).send("Error downloading image");
  }
});

export { extractColor };
