// AuthenticationApiPage.tsx
import Breadcrumb from "../../_components/Breadcrumb";
import PageHeader from "../../_components/PageHeader";
import SectionHeading from "../../_components/SectionHeading";
import Callout from "../../_components/Callout";
import CodeBlock from "../../_components/CodeBlock";
import Toc from "../../_components/Toc";
import DocsPagination from "../../_components/DocsPagination";

export default function AuthenticationApiPage() {
  return (
    <>
      <main className="flex-1 py-10 min-w-0">
        <Breadcrumb
          items={[
            { name: "Docs", href: "/docs/introduction" },
            {
              name: "API Reference",
              href: "/docs/api-reference/authentication",
            },
          ]}
          current="Authentication"
        />

        <PageHeader
          title="Authentication"
          description="Register, log in, and use the JWT you get back to authenticate every other request."
        />

        <div className="max-w-none">
          <SectionHeading id="register">POST /api/auth/register</SectionHeading>
          <p className="text-[#e5e5e5]/80 mb-4 text-sm leading-7">
            Creates a new user.
          </p>
          <CodeBlock
            label="request"
            code={`POST /api/auth/register
Content-Type: application/json

{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "password": "••••••••"
}`}
          />
          <CodeBlock
            label="response · 201"
            code={`{
  "user": {
    "id": "usr_01h...",
    "name": "Ada Lovelace",
    "email": "ada@example.com"
  },
  "token": "eyJhbGciOi..."
}`}
          />

          <SectionHeading id="login">POST /api/auth/login</SectionHeading>
          <p className="text-[#e5e5e5]/80 mb-4 text-sm leading-7">
            Exchanges credentials for a session token.
          </p>
          <CodeBlock
            label="request"
            code={`POST /api/auth/login
Content-Type: application/json

{
  "email": "ada@example.com",
  "password": "••••••••"
}`}
          />
          <CodeBlock
            label="response · 200"
            code={`{
  "token": "eyJhbGciOi...",
  "expiresAt": "2026-08-15T00:00:00Z"
}`}
          />

          <SectionHeading id="using-the-token">Using the token</SectionHeading>
          <p className="text-[#e5e5e5]/80 mb-4 text-sm leading-7">
            Send the token on every authenticated request as a bearer header:
          </p>
          <CodeBlock
            label="request header"
            code={`Authorization: Bearer eyJhbGciOi...`}
          />

          <Callout variant="warning" title="Tokens expire">
            A token is valid until the Session&apos;s{" "}
            <code className="bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-300 font-mono text-xs">
              expiresAt
            </code>
            . A 401 response means the client should send the user back through
            login.
          </Callout>
        </div>

        <DocsPagination current="/docs/api-reference/authentication" />
      </main>

      <Toc
        items={[
          { id: "register", label: "POST /api/auth/register" },
          { id: "login", label: "POST /api/auth/login" },
          { id: "using-the-token", label: "Using the token" },
        ]}
      />
    </>
  );
}
