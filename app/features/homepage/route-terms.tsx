import { Container, TypographyStylesProvider } from '@mantine/core'

export default function RouteTerms() {
  return (
    <Container size="lg" py="xl">
      <TypographyStylesProvider>
        <h1>Terms of Service</h1>
        <h2>Acceptance of Terms</h2>
        <p>
          Registering or using the PubKey Protocol website and services constitutes acceptance of these Terms of
          Service. Failure to comply results in termination of access.
        </p>

        <h2>Eligibility</h2>
        <p>
          Users must have legal authority to enter this agreement. Minors or entities without authorization are
          prohibited from use.
        </p>

        <h2>Account Responsibility</h2>
        <p>
          Users are accountable for all actions under their account. Secure passwords and regular updates are mandatory.
          Administrators may impose additional rules and access accounts as needed.
        </p>

        <h2>Service Usage</h2>
        <p>
          Services are provided for creating and managing profiles on the Solana network. Misuse, including illegal
          activities or content violations, leads to suspension or termination.
        </p>
        <h2>Domain Authorization</h2>
        <p>
          By using this service, you authorize PubKey Protocol to interact with third-party domain registrars for domain
          management. You agree to comply with ICANN policies and registrar terms. PubKey Protocol may change registrars
          at its discretion, acting as your agent for necessary transfers.
        </p>

        <h2>Payment and Fees</h2>
        <p>
          All fees are non-refundable unless specified. Users must provide valid payment methods. PubKey Protocol
          reserves the right to modify fees with notice.
        </p>

        <h2>Content and Intellectual Property</h2>
        <p>
          Users retain ownership of their content but grant PubKey Protocol a license to use it for service operation.
          Infringing content will be removed.
        </p>

        <h2>Termination</h2>
        <p>
          PubKey Protocol may terminate access for breaches, legal requirements, or at its discretion with notice where
          feasible.
        </p>

        <h2>Liability</h2>
        <p>
          PubKey Protocol’s liability is limited to fees paid in the last 12 months, excluding indirect damages. Users
          indemnify PubKey Protocol against third-party claims.
        </p>

        <h2>Modifications</h2>
        <p>Terms may be updated. Continued use after changes signifies acceptance.</p>

        <h2>Governing Law</h2>
        <p>These terms are governed by the laws of the State of California, USA.</p>
      </TypographyStylesProvider>
    </Container>
  )
}
