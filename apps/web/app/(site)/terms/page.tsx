import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "../_components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — DevMatrix",
  description:
    "The terms that govern your access to and use of DevMatrix, including accounts, acceptable use, project content, and AI-generated output.",
};

const sections: LegalSection[] = [
  {
    id: "agreement",
    heading: "1. Agreement to these terms",
    body: (
      <>
        <p>
          These Terms of Service (“Terms”) govern your access to and use of
          DevMatrix, including the web application, the API, and any
          documentation or content we publish (together, the “Service”). By
          creating an account or using the Service, you agree to these Terms.
        </p>
        <p>
          If you use DevMatrix on behalf of an organization, you represent that
          you have authority to bind that organization to these Terms, and “you”
          refers to both you and that organization.
        </p>
        <p>
          Our <Link href="/privacy">Privacy Policy</Link> and{" "}
          <Link href="/cookies">Cookie Policy</Link> are part of these Terms.
        </p>
      </>
    ),
  },
  {
    id: "accounts",
    heading: "2. Accounts and eligibility",
    body: (
      <>
        <p>
          You must be at least 16 years old to use DevMatrix. You are responsible
          for the information you provide when registering and for keeping your
          sign-in credentials confidential.
        </p>
        <ul>
          <li>Provide accurate account details and keep them current.</li>
          <li>
            Do not share your account or let anyone else use it to access your
            projects.
          </li>
          <li>
            Tell us promptly at{" "}
            <a href="mailto:security@devmatrix.dev">security@devmatrix.dev</a> if
            you suspect unauthorized access.
          </li>
        </ul>
        <p>
          You are responsible for all activity that happens under your account,
          except where it results from our own failure to protect it.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    heading: "3. Acceptable use",
    body: (
      <>
        <p>You agree not to misuse the Service. In particular, you will not:</p>
        <ul>
          <li>
            use DevMatrix for unlawful purposes or to infringe anyone’s
            intellectual property, privacy, or other rights;
          </li>
          <li>
            attempt to access another user’s projects, accounts, or data, or
            probe, scan, or test the Service for vulnerabilities without written
            permission;
          </li>
          <li>
            interfere with the Service’s operation, including by circumventing
            rate limits, overloading infrastructure, or introducing malware;
          </li>
          <li>
            scrape, resell, or provide the Service to third parties as your own
            product without our prior written consent; or
          </li>
          <li>
            use the AI features to generate content that is illegal, harassing,
            or designed to cause harm.
          </li>
        </ul>
        <p>
          We may suspend accounts that violate these rules, and we may report
          serious abuse to the relevant authorities.
        </p>
      </>
    ),
  },
  {
    id: "your-content",
    heading: "4. Your projects and content",
    body: (
      <>
        <p>
          You keep all rights to the code, API requests, debug sessions, idea
          descriptions, notes, and other material you submit to DevMatrix (“Your
          Content”). We do not claim ownership of it.
        </p>
        <p>
          To operate the Service, you grant us a limited, worldwide,
          non-exclusive licence to host, store, copy, transmit, and display Your
          Content solely to provide the features you use — for example, sending a
          debug session to an AI model provider so it can return an analysis.
          This licence ends when you delete the content or your account, apart
          from backups that expire on their normal schedule.
        </p>
        <p>
          You are responsible for having the right to upload Your Content and for
          keeping your own backups of anything you cannot afford to lose.
        </p>
      </>
    ),
  },
  {
    id: "ai-output",
    heading: "5. AI-generated output",
    body: (
      <>
        <p>
          The AI Debugging Assistant and the SaaS Idea Validator produce output
          using machine-learning models. Output may be incomplete, outdated, or
          simply wrong, and it does not constitute professional, legal, financial,
          or security advice.
        </p>
        <p>
          Review generated code and recommendations before acting on them, and
          never submit credentials, personal data, or other secrets you are not
          permitted to share. Subject to the model provider’s terms, you may use
          the output you receive; we make no separate claim to it.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    heading: "6. Third-party services",
    body: (
      <>
        <p>
          DevMatrix integrates with third-party services, such as GitHub for
          authentication and repository analytics, and model providers for AI
          features. Those services are governed by their own terms and privacy
          policies.
        </p>
        <p>
          We are not responsible for third-party services, including outages,
          changes to their APIs, or how they handle data you choose to send them.
        </p>
      </>
    ),
  },
  {
    id: "availability",
    heading: "7. Availability and changes to the Service",
    body: (
      <>
        <p>
          DevMatrix is under active development. We may add, change, or remove
          features, and we may occasionally take the Service offline for
          maintenance. Unless we sign a separate written agreement with you, we do
          not promise any specific uptime or service level.
        </p>
        <p>
          We may set reasonable usage limits to keep the Service available for
          everyone, and we will try to announce material changes in advance.
        </p>
      </>
    ),
  },
  {
    id: "fees",
    heading: "8. Fees",
    body: (
      <p>
        DevMatrix is currently free to use while it is in beta. If we introduce
        paid plans, we will show the price and billing terms before you are
        charged, and you will be able to cancel before any charge takes effect.
        You are responsible for any taxes that apply to your use of the Service.
      </p>
    ),
  },
  {
    id: "ip",
    heading: "9. Our intellectual property",
    body: (
      <p>
        The Service — including the DevMatrix name and logo, the interface, the
        documentation, and the underlying software — is owned by us or our
        licensors and is protected by intellectual-property laws. These Terms
        grant you a limited, revocable right to use the Service; they do not
        transfer any ownership. You may not copy, modify, distribute, or create
        derivative works from the Service except as permitted by its open-source
        licence, if one applies.
      </p>
    ),
  },
  {
    id: "termination",
    heading: "10. Suspension and termination",
    body: (
      <>
        <p>
          You may stop using DevMatrix at any time and delete your account from
          the settings page.
        </p>
        <p>
          We may suspend or terminate your access if you materially breach these
          Terms, if required by law, or if your use creates a security or legal
          risk for us or other users. Where practical, we will give notice and a
          chance to remedy the issue.
        </p>
        <p>
          After termination, your right to use the Service ends. Sections that by
          their nature should survive — including content ownership, disclaimers,
          and liability limits — continue to apply.
        </p>
      </>
    ),
  },
  {
    id: "disclaimers",
    heading: "11. Disclaimers and limitation of liability",
    body: (
      <>
        <p>
          The Service is provided “as is” and “as available”. To the fullest extent
          permitted by law, we disclaim all warranties, express or implied,
          including merchantability, fitness for a particular purpose, and
          non-infringement. We do not warrant that the Service will be
          uninterrupted, error-free, or that any output will be accurate.
        </p>
        <p>
          To the fullest extent permitted by law, we will not be liable for
          indirect, incidental, special, consequential, or punitive damages, or
          for lost profits, revenue, data, or goodwill. Our total liability for
          any claim relating to the Service will not exceed the greater of the
          amount you paid us in the twelve months before the claim or USD 100.
        </p>
        <p>
          Some jurisdictions do not allow certain exclusions, so parts of this
          section may not apply to you.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    heading: "12. Changes to these Terms",
    body: (
      <p>
        We may update these Terms as the Service evolves. When we do, we will
        change the “last updated” date above, and for material changes we will
        notify you by email or in the app before they take effect. If you keep
        using DevMatrix after the new Terms take effect, you accept them.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "13. Contact",
    body: (
      <p>
        Questions about these Terms can go to{" "}
        <a href="mailto:legal@devmatrix.dev">legal@devmatrix.dev</a>. For product
        help, see the <Link href="/contact">contact page</Link> or open an issue
        on the{" "}
        <a
          href="https://github.com/MahdiarShirzad/devmatrix"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub repository
        </a>
        .
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="legal / terms"
      title="Terms of Service"
      description="The agreement between you and DevMatrix: what you can expect from the Service, what we expect from you, and how the two of us handle projects, content, and AI-generated output."
      updated="November 9, 2026"
      sections={sections}
    />
  );
}
