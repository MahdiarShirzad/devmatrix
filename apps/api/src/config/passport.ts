import passport from "passport";
import { Strategy as GitHubStrategy, Profile } from "passport-github2";
import User from "../models/User.js";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string;
const GITHUB_CALLBACK_URL =
  process.env.GITHUB_CALLBACK_URL ||
  "http://localhost:3001/api/auth/github/callback";

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  console.warn(
    "هشدار: GITHUB_CLIENT_ID یا GITHUB_CLIENT_SECRET تنظیم نشده — GitHub OAuth کار نمی‌کنه",
  );
}

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK_URL,
      scope: ["user:email", "repo"], // repo برای Developer Analytics تو مرحله 6 لازم می‌شه
    },
    async (
      accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any) => void,
    ) => {
      try {
        // اول چک کن آیا کاربری با این githubId از قبل هست
        let user = await User.findOne({ githubId: profile.id });

        if (user) {
          // آپدیت access token برای استفاده بعدی توی Developer Analytics
          user.githubAccessToken = accessToken;
          await user.save();
          return done(null, user);
        }

        // اگه کاربری با همین ایمیل (از طریق local signup) از قبل هست، بهش وصل کن
        const email = profile.emails?.[0]?.value;
        if (email) {
          user = await User.findOne({ email });
          if (user) {
            user.githubId = profile.id;
            user.githubAccessToken = accessToken;
            await user.save();
            return done(null, user);
          }
        }

        // کاربر جدید بساز
        const newUser = await User.create({
          name: profile.displayName || profile.username || "GitHub User",
          email: email || `${profile.id}@github.placeholder`,
          avatar: profile.photos?.[0]?.value,
          authProvider: "github",
          githubId: profile.id,
          githubAccessToken: accessToken,
        });

        return done(null, newUser);
      } catch (error) {
        return done(error as Error);
      }
    },
  ),
);

export default passport;
