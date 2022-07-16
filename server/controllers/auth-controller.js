const userService = require("../services/user-service");
const tokenService = require("../services/token-service");

class AuthController {
  async saveUser(req, res) {
    const { name, email, avatar } = req.body;
    let user;
    user = await userService.findUser({ email: email });
    if (!user) {
      user = await userService.createUser({ email: email, name });
    }
    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      name,
      email,
      avatar,
    });
    await tokenService.storeRefreshToken(refreshToken, user?._id);
    res
      .status(200)
      .json({
        user,
        auth: true,
        tokens: { at: accessToken, rt: refreshToken },
      });
  }
  async saveUserEmailAndPassword(req, res) {
    const { name, email, password, avatar } = req.body;
    let user;
    user = await userService.findUser({ email: email});
    if(user && user.password !== password) {
      return res.status(400).json({ msg: "error" });
    } 
    if (!user) {
      user = await userService.createUser({
        email: email,
        name,
        password,
        avatar,
      });
    }
    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      name,
      email,
      avatar,
    });
    await tokenService.storeRefreshToken(refreshToken, user?._id);
    res
      .status(200)
      .json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
        auth: true,
        tokens: { at: accessToken, rt: refreshToken },
      });
  }
  async refresh(req, res) {
    if (!req.body.rt) {
      return res.status(400).json({ msg: "error" });
    }
    const { rt: refreshTokenFromCookie } = req.body;
    const userData = await tokenService.verifyRefreshToken(
      refreshTokenFromCookie
    );
    if (!userData) {
      return res.status(400).json({ msg: "error" });
    }
    const token = await tokenService.findRefreshToken(userData._id);
    if (!token) {
      return res.status(400).json({ msg: "error" });
    }
    const user = await userService.findUser({ _id: userData._id });
    if (!user) {
      return res.status(400).json({ msg: "error" });
    }
    const { refreshToken, accessToken } = tokenService.generateTokens({
      _id: userData._id,
      name: user.name,
      email: user.email,
      avatar: user?.avatar,
    });
    await tokenService.updateRefreshToken(userData._id, refreshToken);
    // res.cookie('refreshToken',refreshToken,{maxAge: 1000*60*60*24*7, httpOnly: true})
    // res.cookie('accessToken',accessToken,{maxAge: 1000*60*60, httpOnly: true})
    res
      .status(200)
      .json({
        user,
        auth: true,
        tokens: { at: accessToken, rt: refreshToken },
      });
  }
  async updateAvatar(req, res) {
    const user = req.user;
    const { avatar } = req.body;
    if (!user || !avatar) {
      return res.status(400).json({ msg: "error" });
    }
    await userService.updateUser(user?._id, { avatar });
    res.status(200).json({ auth: true });
  }
  async updateName(req, res) {
    const user = req.user;
    const { name } = req.body;
    if (!user || !name) {
      return res.status(400).json({ msg: "error" });
    }
    await userService.updateUser(user?._id, { name });
    res.status(200).json({ auth: true });
  }
  async logout(req, res) {
    const { rt: refreshToken } = req.body;
    // delte refresh token from db
    await tokenService.removeToken(refreshToken);
    res.status(200).json({ auth: true });
  }
}

module.exports = new AuthController();
