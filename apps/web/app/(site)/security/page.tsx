import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "../_components/LegalPage";

export const metadata: Metadata = {
  title: "Security — DevMatrix",
  description:
    "How to report a vulnerability in DevMatrix, what is in scope, and the practices we use to protect accounts and project data.",
};

const sections: LegalSection[] = [
  {
    id: "reporting",
    heading: "1. Reporting a vulnerability",
    body: (
      <>
        <p>
          If you think you have found a security issue in DevMatrix, please tell us
          privately at{" "}
          <a href="mailto:security@devmatrix.dev">security@devmatrix.dev</a> before
          disclosing it anywhere else. We would much rather hear from you than read
          about it later.
        </p>
        <p>
          Please do not open a public GitHub issue, post proof-of-concept details
          publicly, or access data that is not yours while investigating.
        </p>
      </>
    ),
  },
  {
    id: "what-to-include",
    heading: "2. What to include",
    body: (
      <>
        <ul>
          <li>A short description of the issue and where it lives.</li>
          <li>Steps to reproduce, with the smallest example you can manage.</li>
          <li>
            The impact you believe it has — for example, whether it exposes another
            user’s projects or bypasses authentication.
          </li>
          <li>
            Any screenshots or request/response pairs, with secrets and personal
            data removed.
          </li>
          <li>How you would like to be credited, or a request to stay anonymous.</li>
        </ul>
      </>
    ),
  },
  {
    id: "scope",
    heading: "3. Scope",
    body: (
      <>
        <p>In scope:</p>
        <ul>
          <li>The DevMatrix web application and its API.</li>
          <li>Authentication, session handling, and access control between users.</li>
          <li>Storage of project content, including uploads and generated reports.</li>
        </ul>
        <p>Out of scope:</p>
        <ul>
          <li>Third-party services we integrate with, such as GitHub or AI providers.</li>
          <li>Denial-of-service testing, load testing, or automated scanning.</li>
          <li>Social engineering, phishing, or physical attacks.</li>
          <li>
            Reports that only show missing headers or best-practice advice with no
            demonstrated impact.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-respond",
    heading: "4. How we respond",
    body: (
      <>
        <p>
          We aim to acknowledge every report within three business days and to give
          you an initial assessment within ten. If the issue is confirmed, we will
          keep you updated while we fix it and will credit you once the fix has
          shipped, unless you prefer otherwise.
        </p>
        <p>
          This is a small project without a paid bounty program, so we cannot
          promise a reward. We can promise to take the report seriously and to
          treat good-faith research fairly.
        </p>
      </>
    ),
  },
  {
    id: "practices",
    heading: "5. Security practices",
    body: (
      <>
        <ul>
          <li>
            Session tokens live in httpOnly, SameSite cookies, with short-lived
            access tokens and a separately scoped refresh endpoint.
          </li>
          <li>Passwords are stored as cryptographic hashes, never in plain text.</li>
          <li>
            Requests from other origins are rejected unless they appear on an
            explicit allow-list; there is no wildcard CORS.
          </li>
          <li>
            Logs redact passwords, tokens, cookies, authorization headers, and API
            keys before they are written.
          </li>
          <li>
            Access to production systems is limited to the maintainers and reviewed
            as the project grows.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "safe-harbor",
    heading: "6. Safe harbor",
    body: (
      <p>
        If you make a good-faith effort to follow this policy, we will not pursue
        legal action against you for the research itself. That assurance does not
        cover actions that harm other users, disrupt the Service, or extract data
        beyond what is needed to demonstrate the issue. If in doubt, ask us first
        at <a href="mailto:security@devmatrix.dev">security@devmatrix.dev</a>.
      </p>
    ),
  },
];

export default function SecurityPage() {
  return (
    <LegalPage
      eyebrow="trust / security"
      title="Security"
      description="How to report a vulnerability, the protections already in place for accounts and project data, and the ground rules for responsible disclosure."
      updated="November 9, 2026"
      sections={sections}
    />
  );
}
