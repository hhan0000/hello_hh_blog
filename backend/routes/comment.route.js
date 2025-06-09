import express from "express";

const router = express.Router();

router.get("/anothertest", (req, res) => {
  res.status(200).json({
    message: "This is another test route",
  });
});
export default router;
