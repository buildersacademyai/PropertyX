import React from "react"

const sectionClass = "space-y-8"
const headingClass = "scroll-mt-24 font-semibold text-foreground"

const Terms = () => {
  return (
    <article
      className="prose prose-neutral dark:prose-invert mx-auto max-w-4xl px-4
        py-12 sm:px-6 lg:px-8"
    >
      <header className="mb-12 space-y-2 border-b pb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          PropertyX Terms and Conditions
        </h1>
        <p className="text-sm text-muted-foreground">Last Updated: 9/24/2025</p>
      </header>

      {/* 1. DEFINITIONS AND SCOPE */}
      <section id="definitions" className={sectionClass}>
        <h2 className={headingClass}>1. DEFINITIONS AND SCOPE</h2>
        <div className="space-y-3">
          <h3 className={headingClass}>1.1 Definitions</h3>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <p>
                &quot;Platform&quot; means the PropertyX tokenization platform
                accessible at pxrwa.xyz and related services.
              </p>
            </li>
            <li>
              <p>
                &quot;RWA&quot; means Real-World Assets eligible for
                tokenization through the Platform.
              </p>
            </li>
            <li>
              <p>
                &quot;Tokens&quot; means digital tokens representing fractional
                ownership or rights in RWAs.
              </p>
            </li>
            <li>
              <p>
                &quot;User&quot; means any individual or entity accessing or
                using the Platform.
              </p>
            </li>
            <li>
              <p>
                &quot;Services&quot; means all services provided by PropertyX
                through the Platform.
              </p>
            </li>
            <li>
              <p>
                &quot;We,&quot; &quot;Us,&quot; &quot;Our&quot; refers to
                PropertyX and its affiliates.
              </p>
            </li>
          </ul>
          <h3 className={headingClass}>1.2 Acceptance of Terms</h3>
          <p>
            By accessing or using the Platform, you acknowledge that you have
            read, understood, and agree to be bound by these Terms and
            Conditions.
          </p>
        </div>
      </section>

      {/* 2. USER ELIGIBILITY AND VERIFICATION */}
      <section id="eligibility" className={sectionClass}>
        <h2 className={headingClass}>2. USER ELIGIBILITY AND VERIFICATION</h2>
        <h3 className={headingClass}>2.1 Eligibility Requirements</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>
              Users must be at least 18 years old (or legal age in their
              jurisdiction).
            </p>
          </li>
          <li>
            <p>
              Users must have legal capacity to enter into binding agreements.
            </p>
          </li>
          <li>
            <p>Users must not be residents of restricted jurisdictions.</p>
          </li>
          <li>
            <p>
              Users must comply with all applicable local laws and regulations.
            </p>
          </li>
        </ul>
        <h3 className={headingClass}>
          2.2 Know Your Customer (KYC) and Anti-Money Laundering (AML)
        </h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>
              All Users must complete KYC verification before accessing certain
              Services.
            </p>
          </li>
          <li>
            <p>
              We reserve the right to request additional documentation at any
              time.
            </p>
          </li>
          <li>
            <p>
              Users must provide accurate, current, and complete information.
            </p>
          </li>
          <li>
            <p>
              We implement AML policies to prevent illicit activities and comply
              with applicable regulations.
            </p>
          </li>
        </ul>
        <h3 className={headingClass}>2.3 Restricted Persons</h3>
        <p>The Platform is not available to:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>Persons located in or residents of sanctioned jurisdictions.</p>
          </li>
          <li>
            <p>Persons on any sanctions or restricted persons lists.</p>
          </li>
          <li>
            <p>
              Persons involved in illegal activities or who have been convicted
              of financial crimes.
            </p>
          </li>
        </ul>
      </section>

      {/* 3. INVESTMENT AND RISK DISCLOSURES */}
      <section id="risk" className={sectionClass}>
        <h2 className={headingClass}>3. INVESTMENT AND RISK DISCLOSURES</h2>
        <h3 className={headingClass}>3.1 Not Investment Advice</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>
              The Platform does not provide investment, legal, tax, or financial
              advice.
            </p>
          </li>
          <li>
            <p>All information is for informational purposes only.</p>
          </li>
          <li>
            <p>
              Users should consult qualified professionals before making
              investment decisions.
            </p>
          </li>
        </ul>
        <h3 className={headingClass}>3.2 Risk Warnings</h3>
        <p>
          <strong>
            HIGH RISK WARNING: TOKENIZED REAL-WORLD ASSETS INVOLVE SIGNIFICANT
            RISKS
          </strong>
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>Total Loss Risk: You may lose your entire investment.</p>
          </li>
          <li>
            <p>
              Liquidity Risk: Tokens may be difficult or impossible to sell.
            </p>
          </li>
          <li>
            <p>
              Regulatory Risk: Changes in laws may affect token value or
              legality.
            </p>
          </li>
          <li>
            <p>
              Technology Risk: Blockchain technology involves technical risks.
            </p>
          </li>
          <li>
            <p>Market Risk: Asset values may fluctuate significantly.</p>
          </li>
          <li>
            <p>
              Custodial Risk: Underlying assets are held by third-party
              custodians.
            </p>
          </li>
        </ul>
        <h3 className={headingClass}>3.3 No Guarantees</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>Past performance does not indicate future results.</p>
          </li>
          <li>
            <p>No guarantee of returns, income, or capital preservation.</p>
          </li>
          <li>
            <p>Token values may decrease or become worthless.</p>
          </li>
        </ul>
      </section>

      {/* 4. PLATFORM SERVICES AND LIMITATIONS */}
      <section id="services" className={sectionClass}>
        <h2 className={headingClass}>4. PLATFORM SERVICES AND LIMITATIONS</h2>
        <h3 className={headingClass}>4.1 Services Provided</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>Tokenization of eligible real-world assets</p>
          </li>
          <li>
            <p>Token issuance and management</p>
          </li>
          <li>
            <p>Digital wallet integration</p>
          </li>
          <li>
            <p>Transaction facilitation</p>
          </li>
          <li>
            <p>Information and educational resources</p>
          </li>
        </ul>
        <h3 className={headingClass}>4.2 Service Limitations</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>We do not provide custody of underlying assets.</p>
          </li>
          <li>
            <p>We do not guarantee token liquidity or market availability.</p>
          </li>
          <li>
            <p>Services may be suspended or terminated without notice.</p>
          </li>
          <li>
            <p>Platform availability is not guaranteed 24/7.</p>
          </li>
        </ul>
        <h3 className={headingClass}>4.3 Third-Party Services</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>The Platform integrates with third-party service providers.</p>
          </li>
          <li>
            <p>We are not responsible for third-party service failures.</p>
          </li>
          <li>
            <p>Users must comply with third-party terms of service.</p>
          </li>
        </ul>
      </section>

      {/* 5. TOKEN STRUCTURE AND RIGHTS */}
      <section id="token-structure" className={sectionClass}>
        <h2 className={headingClass}>5. TOKEN STRUCTURE AND RIGHTS</h2>
        <h3 className={headingClass}>5.1 Token Characteristics</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>
              Tokens represent rights in underlying RWAs as specified in token
              documentation.
            </p>
          </li>
          <li>
            <p>
              Token rights may include income distribution, voting, or other
              specified benefits.
            </p>
          </li>
          <li>
            <p>Tokens are issued on Bitcoin/Stacks blockchain networks.</p>
          </li>
          <li>
            <p>Token transferability may be restricted.</p>
          </li>
        </ul>
        <h3 className={headingClass}>5.2 Token Standards and Compliance</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>Tokens comply with applicable blockchain standards.</p>
          </li>
          <li>
            <p>
              Tokens may be subject to transfer restrictions for regulatory
              compliance.
            </p>
          </li>
          <li>
            <p>Smart contracts govern token functionality and rights.</p>
          </li>
        </ul>
      </section>

      {/* 6. FEES AND PAYMENTS */}
      <section id="fees" className={sectionClass}>
        <h2 className={headingClass}>6. FEES AND PAYMENTS</h2>
        <h3 className={headingClass}>6.1 Platform Fees</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>Tokenization fees as disclosed during the process.</p>
          </li>
          <li>
            <p>Transaction fees for blockchain operations.</p>
          </li>
          <li>
            <p>Management fees as specified in token documentation.</p>
          </li>
          <li>
            <p>Payment processing fees.</p>
          </li>
        </ul>
        <h3 className={headingClass}>6.2 Payment Methods</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>Accepted cryptocurrencies as specified on the Platform.</p>
          </li>
          <li>
            <p>Payment methods subject to change without notice.</p>
          </li>
          <li>
            <p>All fees are non-refundable unless required by law.</p>
          </li>
        </ul>
      </section>

      {/* 7. REGULATORY COMPLIANCE */}
      <section id="regulatory" className={sectionClass}>
        <h2 className={headingClass}>7. REGULATORY COMPLIANCE</h2>
        <h3 className={headingClass}>7.1 Securities Law Compliance</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>Tokens may constitute securities under applicable laws.</p>
          </li>
          <li>
            <p>Offerings comply with applicable securities regulations.</p>
          </li>
          <li>
            <p>Investor accreditation requirements may apply.</p>
          </li>
          <li>
            <p>Transfer restrictions may apply for compliance purposes.</p>
          </li>
        </ul>
        <h3 className={headingClass}>7.2 Tax Obligations</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>Users are responsible for their own tax obligations.</p>
          </li>
          <li>
            <p>Token transactions may have tax implications.</p>
          </li>
          <li>
            <p>Users should consult tax professionals for guidance.</p>
          </li>
        </ul>
        <h3 className={headingClass}>7.3 Reporting Requirements</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>
              We may report transactions to regulatory authorities as required.
            </p>
          </li>
          <li>
            <p>Users must provide information necessary for compliance.</p>
          </li>
        </ul>
      </section>

      {/* 8. INTELLECTUAL PROPERTY */}
      <section id="intellectual-property" className={sectionClass}>
        <h2 className={headingClass}>8. INTELLECTUAL PROPERTY</h2>
        <h3 className={headingClass}>8.1 Platform Rights</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>
              PropertyX owns all intellectual property rights in the Platform.
            </p>
          </li>
          <li>
            <p>Users receive limited license to use the Platform.</p>
          </li>
          <li>
            <p>No rights are granted beyond those explicitly stated.</p>
          </li>
        </ul>
        <h3 className={headingClass}>8.2 User Content</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>Users retain rights in their submitted content.</p>
          </li>
          <li>
            <p>
              Users grant PropertyX license to use content for platform
              operations.
            </p>
          </li>
          <li>
            <p>Users represent they have rights to submit content.</p>
          </li>
        </ul>
      </section>

      {/* 9. DATA PROTECTION AND PRIVACY */}
      <section id="privacy" className={sectionClass}>
        <h2 className={headingClass}>9. DATA PROTECTION AND PRIVACY</h2>
        <h3 className={headingClass}>9.1 Data Collection and Use</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>
              We collect and process personal data as described in our Privacy
              Policy.
            </p>
          </li>
          <li>
            <p>
              Data is used for platform operations, compliance, and service
              provision.
            </p>
          </li>
          <li>
            <p>We implement security measures to protect user data.</p>
          </li>
        </ul>
        <h3 className={headingClass}>9.2 Data Sharing</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>
              Data may be shared with service providers and regulatory
              authorities.
            </p>
          </li>
          <li>
            <p>
              International data transfers may occur for platform operations.
            </p>
          </li>
        </ul>
      </section>

      {/* 10. LIMITATION OF LIABILITY AND DISCLAIMERS */}
      <section id="liability" className={sectionClass}>
        <h2 className={headingClass}>
          10. LIMITATION OF LIABILITY AND DISCLAIMERS
        </h2>
        <h3 className={headingClass}>10.1 Platform Disclaimers</h3>
        <p>
          THE PLATFORM IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY
          KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING
          MERCHANTABILITY, FITNESS FOR PURPOSE, AND NON-INFRINGEMENT.
        </p>
        <h3 className={headingClass}>10.2 Limitation of Liability</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
          </li>
          <li>
            <p>
              Our liability is limited to the amount of fees paid by the User.
            </p>
          </li>
          <li>
            <p>
              We are not liable for indirect, incidental, or consequential
              damages.
            </p>
          </li>
          <li>
            <p>
              We are not liable for investment losses or market fluctuations.
            </p>
          </li>
          <li>
            <p>Users assume all risks associated with platform use.</p>
          </li>
        </ul>
        <h3 className={headingClass}>10.3 Force Majeure</h3>
        <p>
          We are not liable for failures due to circumstances beyond our
          reasonable control, including but not limited to natural disasters,
          regulatory changes, or network failures.
        </p>
      </section>

      {/* 11. TERMINATION */}
      <section id="termination" className={sectionClass}>
        <h2 className={headingClass}>11. TERMINATION</h2>
        <h3 className={headingClass}>11.1 Termination Rights</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>
              We may terminate or suspend accounts at any time with or without
              cause.
            </p>
          </li>
          <li>
            <p>
              Users may terminate their accounts subject to existing
              obligations.
            </p>
          </li>
          <li>
            <p>Termination does not affect accrued rights or obligations.</p>
          </li>
        </ul>
        <h3 className={headingClass}>11.2 Effect of Termination</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>Access to the Platform will cease.</p>
          </li>
          <li>
            <p>Outstanding obligations remain in effect.</p>
          </li>
          <li>
            <p>
              Token ownership rights continue as specified in token
              documentation.
            </p>
          </li>
        </ul>
      </section>

      {/* 12. GOVERNING LAW AND DISPUTE RESOLUTION */}
      <section id="governing-law" className={sectionClass}>
        <h2 className={headingClass}>
          12. GOVERNING LAW AND DISPUTE RESOLUTION
        </h2>
        <h3 className={headingClass}>12.1 Governing Law</h3>
        <p>
          These Terms are governed by the laws of the United States and the
          State of Delaware, without regard to conflict of law principles.
        </p>
        <h3 className={headingClass}>12.2 Dispute Resolution</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>Disputes will be resolved through binding arbitration.</p>
          </li>
          <li>
            <p>Users waive rights to class action proceedings.</p>
          </li>
          <li>
            <p>
              Courts have exclusive jurisdiction for non-arbitrable matters.
            </p>
          </li>
        </ul>
      </section>

      {/* 13. GENERAL PROVISIONS */}
      <section id="general" className={sectionClass}>
        <h2 className={headingClass}>13. GENERAL PROVISIONS</h2>
        <h3 className={headingClass}>13.1 Amendments</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <p>We may update these Terms at any time.</p>
          </li>
          <li>
            <p>Material changes will be communicated to Users.</p>
          </li>
          <li>
            <p>Continued use constitutes acceptance of amended Terms.</p>
          </li>
        </ul>
        <h3 className={headingClass}>13.2 Severability</h3>
        <p>
          If any provision is found unenforceable, the remainder of these Terms
          remains in effect.
        </p>
        <h3 className={headingClass}>13.3 Entire Agreement</h3>
        <p>
          These Terms, together with our Privacy Policy and other referenced
          documents, constitute the entire agreement between the parties.
        </p>
        <h3 className={headingClass}>13.4 Assignment</h3>
        <p>
          Users may not assign their rights under these Terms. We may assign our
          rights without restriction.
        </p>
        <h3 className={headingClass}>13.5 Contact Information</h3>
        <p>
          For questions about these Terms, contact us at:
          <br />
          Email: hello@propertyx.xyz
        </p>
      </section>
    </article>
  )
}

export default Terms
