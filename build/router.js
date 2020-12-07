"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get("/", function (req, res) {
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.send("\n    <html>\n        <body>\n            <a href='/logout'>\u9000\u51FA</a>\n        </body>\n    </html>\n    ");
    }
    else {
        res.send("\n    <html>\n        <body>\n            <form method=\"post\" action=\"/login\">\n                <input type=\"password\" name=\"password\"/>\n                <button>\u767B\u5F55</button>\n            </form>\n        </body>\n    </html>\n    ");
    }
});
router.post("/login", function (req, res) {
    var password = req.body.password;
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.send("\u5DF2\u7ECF\u767B\u5F55\u8FC7");
    }
    else {
        if (password === "123" && req.session) {
            req.session.login = true;
            res.send("\u767B\u5F55\u6210\u529F");
        }
        else {
            res.send("登录失败");
        }
    }
});
router.get("/logout", function (req, res) {
    if (req.session) {
        req.session.login = undefined;
    }
    res.redirect("/");
});
exports.default = router;
