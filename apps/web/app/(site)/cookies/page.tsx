import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "../_components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy — DevMatrix",
  description:
    "The cookies and browser storage DevMatrix uses, what each one is for, and how to manage them.",
};

const cookieRows = [
  {
    name: "accessToken",
    purpose: "Keeps you signed in and authenticates API requests.",
    lifetime: "15 minutes",
    type: "Strictly necessary",
  },
  {
    name: "refreshToken",
    purpose:
      "Issues a new access token when the short-lived one expires. Sent only to the refresh endpoint.",
    lifetime: "30 days",
    type: "Strictly necessary",
  },
];

const sections: LegalSection[] = [
  {
    id: "what-they-are",
    heading: "1. What cookies and local storage are",
    body: (
      <>
        <p>
          Cookies are small pieces of data a site stores in your browser. They are
          sent back to the server with requests, which is how a service can
          recognize a signed-in session. Local storage is a similar browser store,
          but it stays in the browser and is never transmitted automatically.
        </p>
        <p>
          DevMatrix uses both, but only for the purposes below. We do not use
          advertising cookies or cross-site tracking pixels.
        </p>
      </>
    ),
  },
  {
    id: "necessary",
    heading: "2. Strictly necessary cookies",
    body: (
      <>
        <p>
          These cookies are required for authentication and security. They are set
          by the DevMatrix API, are httpOnly (so page scripts cannot read them),
          and cannot be switched off without breaking sign-in.
        </p>

        <div className="not-prose overflow-x-auto rounded-xl border border-neutral-border">
          <table className="w-full min-w-[36rem] border-collapse text-left text-[12.5px]">
            <thead className="bg-neutral-surface-1">
              <tr className="text-neutral-text-primary">
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Purpose</th>
                <th className="px-4 py-3 font-semibold">Lifetime</th>
                <th className="px-4 py-3 font-semibold">Type</th>
              </tr>
            </thead>
            <tbody>
              {cookieRows.map((row) => (
                <tr
                  key={row.name}
                  className="border-t border-neutral-border align-top"
                >
                  <td className="px-4 py-3 font-mono text-[11.5px] text-neutral-text-primary">
                    {row.name}
                  </td>
                  <td className="px-4 py-3 leading-6 text-neutral-text-secondary">
                    {row.purpose}
                  </td>
                  <td className="px-4 py-3 leading-6 text-neutral-text-secondary">
                    {row.lifetime}
                  </td>
                  <td className="px-4 py-3 leading-6 text-neutral-text-secondary">
                    {row.type}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          Depending on the deployment, cookies may be scoped to a custom domain and
          marked <code>Secure</code> and <code>SameSite</code> to limit cross-site
          use.
        </p>
      </>
    ),
  },
  {
    id: "preferences",
    heading: "3. Preference storage",
    body: (
      <>
        <p>
          DevMatrix stores a few display preferences in your browser’s local
          storage. These are not cookies, are not sent to our servers, and exist
          only to stop the interface from resetting on every visit:
        </p>
        <ul>
          <li>
            <strong>devmatrix-theme</strong> — the color theme you selected.
          </li>
          <li>
            <strong>devmatrix-font</strong> — the typeface you selected.
          </li>
        </ul>
        <p>
          Clearing site data removes them, and the app falls back to its defaults.
        </p>
      </>
    ),
  },
  {
    id: "analytics",
    heading: "4. Analytics and marketing cookies",
    body: (
      <p>
        We do not currently set analytics, advertising, or marketing cookies. If we
        add product analytics in the future, we will update this page and, where
        required, ask for your consent before setting anything non-essential.
      </p>
    ),
  },
  {
    id: "managing",
    heading: "5. Managing cookies",
    body: (
      <>
        <p>
          You can delete or block cookies in your browser settings. Blocking the
          authentication cookies will sign you out and prevent you from using the
          dashboard, but the public pages — landing, docs, and these policies —
          will keep working.
        </p>
        <p>
          Browser documentation explains the exact steps:{" "}
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chrome
          </a>
          ,{" "}
          <a
            href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
            target="_blank"
            rel="noopener noreferrer"
          >
            Firefox
          </a>
          ,{" "}
          <a
            href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
          >
            Safari
          </a>
          , and{" "}
          <a
            href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
            target="_blank"
            rel="noopener noreferrer"
          >
            Edge
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "more",
    heading: "6. More information",
    body: (
      <p>
        For the wider picture of what we collect and why, see the{" "}
        <Link href="/privacy">Privacy Policy</Link>. Questions about cookies can go
        to <a href="mailto:privacy@devmatrix.dev">privacy@devmatrix.dev</a>.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="legal / cookies"
      title="Cookie Policy"
      description="DevMatrix keeps browser storage to a minimum: two httpOnly cookies for authentication, and local preferences for theme and typeface. Nothing here tracks you across other sites."
      updated="November 9, 2026"
      sections={sections}
    />
  );
}
