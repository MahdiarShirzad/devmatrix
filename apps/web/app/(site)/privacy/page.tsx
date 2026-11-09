import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "../_components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — DevMatrix",
  description:
    "What DevMatrix collects, how it is used, which processors are involved, and the choices you have over your data.",
};

const sections: LegalSection[] = [
  {
    id: "overview",
    heading: "1. Overview",
    body: (
      <>
        <p>
          This Privacy Policy explains how DevMatrix collects, uses, stores, and
          shares information when you use the Service. It applies to the web
          application, the API, and the documentation site.
        </p>
        <p>
          DevMatrix is built around projects. Most of the data we hold is the
          content you deliberately put into a project — requests, debug sessions,
          analytics connections, and idea reports — plus the account details
          needed to sign you in.
        </p>
      </>
    ),
  },
  {
    id: "information-you-provide",
    heading: "2. Information you provide",
    body: (
      <>
        <ul>
          <li>
            <strong>Account details:</strong> name, email address, password (stored
            as a hash, never in plain text), and — if you sign in with GitHub —
            your GitHub username and avatar URL.
          </li>
          <li>
            <strong>Profile information:</strong> optional fields such as a
            display name, bio, or location that you add in settings.
          </li>
          <li>
            <strong>Project content:</strong> project names and descriptions, API
            requests and collections, debug sessions and stack traces, code
            snippets you submit, idea descriptions, and generated analyses.
          </li>
          <li>
            <strong>Communications:</strong> messages you send to support,
            security, or legal contacts, and any feedback you submit.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "collected-automatically",
    heading: "3. Information collected automatically",
    body: (
      <>
        <p>
          When you use DevMatrix, our servers record standard technical
          information needed to run and secure the Service:
        </p>
        <ul>
          <li>
            IP address, browser and device type, operating system, and timestamps
            associated with requests;
          </li>
          <li>
            authentication events, such as sign-in, token refresh, and sign-out;
          </li>
          <li>
            product usage events, such as which module you opened and which
            actions succeeded or failed.
          </li>
        </ul>
        <p>
          We do not use advertising trackers or sell personal information. Logs
          are configured to redact secrets such as passwords, tokens, and
          authorization headers.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    heading: "4. How we use information",
    body: (
      <>
        <ul>
          <li>Provide the features you request and keep your projects available.</li>
          <li>Authenticate you and maintain your session securely.</li>
          <li>
            Sync repository data you connect through GitHub so analytics can be
            calculated.
          </li>
          <li>
            Send prompts and context to an AI model provider when you run a debug
            session or idea analysis.
          </li>
          <li>Protect the Service against abuse, fraud, and security incidents.</li>
          <li>Respond to support requests and communicate service changes.</li>
          <li>
            Understand which features are used so we can improve them, using
            aggregated or de-identified information wherever possible.
          </li>
        </ul>
        <p>
          We rely on performance of our contract with you for most processing, on
          legitimate interests for security and improvement, and on consent where
          the law requires it.
        </p>
      </>
    ),
  },
  {
    id: "ai-processing",
    heading: "5. AI processing",
    body: (
      <>
        <p>
          When you use the AI Debugging Assistant or the SaaS Idea Validator, the
          text you submit — for example a stack trace, a code snippet, or an idea
          description — is sent to a third-party model provider so it can return
          an analysis. The response is stored with your session so you can revisit
          it.
        </p>
        <p>
          We do not use your project content to train our own models, and we
          configure providers so that your content is not used to train theirs
          where that option is available. Do not submit credentials, personal
          data about other people, or other secrets you are not permitted to
          share.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    heading: "6. Cookies and local storage",
    body: (
      <p>
        We use a small number of strictly necessary cookies to keep you signed in,
        and browser local storage to remember display preferences such as your
        theme and font. We do not use advertising or cross-site tracking cookies.
        The full list, with purposes and lifetimes, is in our{" "}
        <Link href="/cookies">Cookie Policy</Link>.
      </p>
    ),
  },
  {
    id: "sharing",
    heading: "7. When we share information",
    body: (
      <>
        <p>
          We share information only with service providers that help us run
          DevMatrix, and only as needed for the purpose described:
        </p>
        <ul>
          <li>
            <strong>GitHub</strong> — authentication and repository data, when you
            connect your account.
          </li>
          <li>
            <strong>AI model providers</strong> — the content of a request you
            explicitly run through an AI feature.
          </li>
          <li>
            <strong>Hosting and infrastructure providers</strong> — data stored and
            processed on our behalf under contractual confidentiality obligations.
          </li>
          <li>
            <strong>Email delivery</strong> — your address, to send transactional
            messages such as password resets.
          </li>
        </ul>
        <p>
          We may also disclose information if required by law, to protect the
          rights and safety of users or the public, or as part of a merger or
          acquisition where the successor is bound by this policy. We never sell
          personal information.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    heading: "8. Data retention",
    body: (
      <>
        <ul>
          <li>
            Account and project data is kept while your account is active, so your
            work is available when you return.
          </li>
          <li>
            When you delete a project or your account, the associated content is
            removed from active systems promptly and from backups within 90 days.
          </li>
          <li>
            Security and access logs are kept for up to 30 days, and longer only
            where needed to investigate an incident.
          </li>
          <li>
            Billing and legal records, if any, are kept for the period required by
            law.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "rights",
    heading: "9. Your rights and choices",
    body: (
      <>
        <p>
          Depending on where you live, you may have the right to access, correct,
          export, or delete your personal information, to object to or restrict
          certain processing, and to withdraw consent you previously gave.
        </p>
        <p>
          You can update most profile information and delete projects directly in
          the app. For anything else, email{" "}
          <a href="mailto:privacy@devmatrix.dev">privacy@devmatrix.dev</a> and we
          will respond within the timeframe required by applicable law. We may
          need to verify your identity before acting on a request.
        </p>
        <p>
          If you believe we have handled your data unlawfully, you can complain to
          your local data-protection authority.
        </p>
      </>
    ),
  },
  {
    id: "security",
    heading: "10. Security",
    body: (
      <p>
        We protect data in transit with HTTPS, hash passwords, store session tokens
        in httpOnly cookies, redact secrets from logs, and limit access to
        production systems. No system is perfectly secure, so we cannot guarantee
        absolute security. Our{" "}
        <Link href="/security">security page</Link> explains how to report a
        vulnerability.
      </p>
    ),
  },
  {
    id: "transfers",
    heading: "11. International transfers",
    body: (
      <p>
        DevMatrix and its providers may process information in countries other than
        yours. Where data leaves your region, we rely on appropriate safeguards
        such as standard contractual clauses, and we require providers to protect
        it to a comparable standard.
      </p>
    ),
  },
  {
    id: "children",
    heading: "12. Children",
    body: (
      <p>
        DevMatrix is not directed at children under 16, and we do not knowingly
        collect their personal information. If you believe a child has created an
        account, contact us and we will delete it.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "13. Changes to this policy",
    body: (
      <p>
        We will update this policy as the Service changes. The “last updated” date
        above always reflects the current version, and we will notify you by email
        or in the app before material changes take effect. Questions can go to{" "}
        <a href="mailto:privacy@devmatrix.dev">privacy@devmatrix.dev</a>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="legal / privacy"
      title="Privacy Policy"
      description="A plain-language account of what DevMatrix collects, why, how long it is kept, and the control you have over it — including what happens when a request goes to an AI model."
      updated="November 9, 2026"
      sections={sections}
    />
  );
}
