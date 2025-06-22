import { Container, TypographyStylesProvider } from '@mantine/core'

export default function RoutePrivacy() {
  return (
    <Container size="lg" py="xl">
      <TypographyStylesProvider>
        <h1>Privacy Policy</h1>
        <h2>Information Collection</h2>
        <p>
          PubKey Protocol collects user-provided data such as profile details, identities, and Solana addresses during
          account creation and verification processes.
        </p>
        <h2>Use of Data</h2>
        <p>
          Data is used to operate the service, verify identities, and enable community interactions. It may be shared
          with third-party registrars for domain management as required.
        </p>
        <h2>Data Storage</h2>
        <p>
          Information is stored on secure Solana network accounts. Retention lasts as long as necessary for service
          provision or legal obligations.
        </p>
        <h2>Data Sharing</h2>
        <p>
          Data is not sold to third parties. It may be disclosed to comply with legal requests or protect PubKey
          Protocol’s rights.
        </p>
        <h2>User Rights</h2>
        <p>
          Users can request access, correction, or deletion of their data. Requests must be submitted via designated
          channels with proof of identity.
        </p>
        <h2>Cookies and Tracking</h2>
        <p>
          The website may use cookies to enhance functionality. Users can disable cookies via browser settings, though
          this may limit service features.
        </p>
        <h2>Security Measures</h2>
        <p>
          Reasonable technical and organizational measures are implemented to protect data, though no system is entirely
          immune to breaches.
        </p>
        <h2>Policy Changes</h2>
        <p>This policy may be updated. Continued use after changes indicates acceptance of the new terms.</p>
        <h2>Contact</h2>
        <p>For privacy concerns, contact PubKey Protocol through official channels listed on the website.</p>
      </TypographyStylesProvider>
    </Container>
  )
}
