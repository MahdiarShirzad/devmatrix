// UsersAuthPage.tsx
import Breadcrumb from "../../_components/Breadcrumb";
import PageHeader from "../../_components/PageHeader";
import SectionHeading from "../../_components/SectionHeading";
import Callout from "../../_components/Callout";
import CodeBlock from "../../_components/CodeBlock";
import Toc from "../../_components/Toc";
import DocsPagination from "../../_components/DocsPagination";

export default function UsersAuthPage() {
  return (
    <>
      <main className="flex-1 py-10 min-w-0">
        <Breadcrumb
          items={[
            { name: "Docs", href: "/docs/introduction" },
            {
              name: "Core Concepts",
              href: "/docs/concepts/projects-workspaces",
            },
          ]}
          current="Users & Auth"
        />

        <PageHeader
          title="Users & Auth"
          description="DevMatrix uses a JWT-based session model shared by the web app and the API. This page covers the User and Session entities and the auth flow."
        />

        <div className="max-w-none">
          <SectionHeading id="user-and-session">User & Session</SectionHeading>
          <p className="text-neutral-text-secondary mb-4 text-sm leading-7">
            Every account is a{" "}
            <code className="bg-neutral-surface-2 px-1.5 py-0.5 rounded text-sm text-neutral-text-primary">
              User
            </code>
            . Signing in issues a{" "}
            <code className="bg-neutral-surface-2 px-1.5 py-0.5 rounded text-sm text-neutral-text-primary">
              Session
            </code>{" "}
            backed by a JWT token.
          </p>
          <CodeBlock
            label="user-and-session.schema.ts"
            code={`interface User {
  id: string;
  name: string;
  email: string;
  password: string; // hashed, never returned by the API
  avatar?: string;
  createdAt: Date;
}

interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
}`}
          />

          <SectionHeading id="auth-flow">How the flow works</SectionHeading>
          <ol className="space-y-3 mb-6 not-prose list-none">
            {[
              "The client calls /api/auth/register or /api/auth/login.",
              "The API verifies credentials and creates a Session, returning a signed JWT.",
              "The client stores the token and sends it as an Authorization: Bearer <token> header on every request.",
              "Every module — Playground, Debugging, Analytics, Idea Validator — trusts this same token.",
            ].map((line, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm text-neutral-text-secondary"
              >
                <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary/10 border border-brand-primary/30 text-xs font-semibold text-brand-primary">
                  {idx + 1}
                </span>
                <span className="pt-0.5">{line}</span>
              </li>
            ))}
          </ol>

          <Callout variant="warning" title="Tokens are bearer credentials">
            Anyone holding a valid token can act as that user. Keep{" "}
            <code className="bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-300 font-mono text-xs">
              DEVMATRIX_API_KEY
            </code>{" "}
            and session tokens server-side or in secure storage — never in
            client-exposed code.
          </Callout>

          <p className="text-neutral-text-secondary mb-4 text-sm leading-7">
            For the exact request and response shapes, see{" "}
            <code className="bg-neutral-surface-2 px-1.5 py-0.5 rounded text-sm text-neutral-text-primary">
              API Reference → Authentication
            </code>
            .
          </p>
        </div>

        <DocsPagination current="/docs/concepts/users-auth" />
      </main>

      <Toc
        items={[
          { id: "user-and-session", label: "User & Session" },
          { id: "auth-flow", label: "How the flow works" },
        ]}
      />
    </>
  );
}
