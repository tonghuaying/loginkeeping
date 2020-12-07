import { Router, Request, Response } from "express";

const router = Router();

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

router.get("/", (req: RequestWithBody, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.send(`
    <html>
        <body>
            <a href='/logout'>退出</a>
        </body>
    </html>
    `);
  } else {
    res.send(`
    <html>
        <body>
            <form method="post" action="/login">
                <input type="password" name="password"/>
                <button>登录</button>
            </form>
        </body>
    </html>
    `);
  }
});
router.post("/login", (req: RequestWithBody, res: Response) => {
  const { password } = req.body;
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.send(`已经登录过`);
  } else {
    if (password === "123" && req.session) {
      req.session.login = true;
      res.send(`登录成功`);
    } else {
      res.send("登录失败");
    }
  }
});
router.get("/logout", (req: RequestWithBody, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
  }
  res.redirect("/");
});

export default router;
