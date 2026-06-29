import crypto from "crypto";
import User from "./models/users.model.js";
import Session from "./models/session.models.js";
export const googleCallbackController = async (req, res, next) => {
  try {
    const token = await exchangeGoogleCodeForToken(req.query.code);
    const userData = await getGoogleUserInfo(token.access_token);
    const {
      error,
      sub: id,
      name,
      picture: avatarUrl,
      email,
      email_verified: emailVerified,
    } = userData;
    if (error) {
      //Continue with google failed
    }
    const existingUser = await User.findOne({ id });
    if (!existingUser) {
      await User.create({ id, name, avatarUrl, email });
    }
    let session = await Session.findOne({ id: req.cookies.sid, userId: id });
    if (session) {
      session.expiresAt = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000);
      await session.save();
    } else {
      session = await Session.create({
        id: crypto.randomUUID(),
        userId: id,
        expiresAt: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
      });
    }

    res.cookie("sid", session.id, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30 * 1000,
    });
    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {}
};
