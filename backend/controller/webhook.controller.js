import User from "../models/user.model.js";
export const clerkWebHook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  const PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY; // 新增

  if (!WEBHOOK_SECRET) {
    throw new Error("请在 .env 文件中设置 CLERK_WEBHOOK_SECRET");
  }
  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET, {
    publishableKey: PUBLISHABLE_KEY, // 注入publishable key
  });
  let evt;
  try {
    evt = wh.verify(payload, headers, {
      // 启用全验证模式
      checkPublishableKey: true,
      checkSecret: true,
    });
  } catch (err) {
    res.status(400).json({
      message: "webhook 验证失败",
    });
  }

  console.log(evt.data);
  if (cvt.type === "user.created") {
    const newUser = new User({
      clerkUserId: evt.data.id,
      username: evt.data.username || evt.data.email_addresses[0].email_address,
      email: evt.data.email_addresses[0].email_address,
      img: evt.data.profile_image_url,
    });
    await newUser.save();
  }
  return res.status(200).json({ message: "webhook 验证成功" });
};
