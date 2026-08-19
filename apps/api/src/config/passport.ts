import passport from "passport";
import { Strategy as GitHubStrategy, Profile } from "passport-github2";
import User from "../Models/User.js";
import { VerifyCallback } from "passport-oauth2";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string;
const GITHUB_CALLBACK_URL =
  process.env.GITHUB_CALLBACK_URL ||
  "https://api.devmatrix.mahdyardev.ir/api/auth/github/callback";

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  console.warn(
    "هشدار: GITHUB_CLIENT_ID یا GITHUB_CLIENT_SECRET تنظیم نشده — GitHub OAuth کار نمی‌کنه",
  );
}

if (
  GITHUB_CLIENT_ID &&
  GITHUB_CLIENT_SECRET &&
  GITHUB_CLIENT_ID !== "your_github_client_id"
) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
        scope: ["user:email", "repo"],
      },
      async (
        accessToken: string,
        _refreshToken: string,
        profile: Profile,
        done: VerifyCallback,
      ): Promise<void> => {
        try {
          let user = await User.findOne({ githubId: profile.id });

          if (user) {
            user.githubAccessToken = accessToken;
            await user.save();
            return done(null, user);
          }

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
} else {
  console.warn("⚠️ GitHub OAuth disabled");
}

export default passport;
