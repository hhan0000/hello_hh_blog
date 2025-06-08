import epxpress from "express";
import userRouter from "./routes/user.route.js";
const app = epxpress();

app.use("/users", userRouter);
app.listen(3000, () => {
  console.log("服务运行在 3000端口");
});
