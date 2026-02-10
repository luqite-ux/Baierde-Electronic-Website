import { Breadcrumbs } from "@/components/breadcrumbs"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy of Zhenjiang Baierde Electronic Co., Ltd. How we collect, use, and protect your information when you use our website and services.",
  alternates: {
    canonical: "https://brdelectronic.com/privacy",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <div className="mb-12 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground">
          Last updated: February 2026. Zhenjiang Baierde Electronic Co., Ltd. (&quot;Baierde,&quot; &quot;we,&quot; &quot;us,&quot; or
          &quot;our&quot;) respects your privacy. This policy describes how we collect, use, and protect your information when you
          use our website and related services.
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-3xl space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We may collect information you provide directly (e.g., when requesting a quote, contacting us, or subscribing to
            updates), including name, company name, email address, phone number, and any message or inquiry content. We may
            also automatically collect certain technical data when you visit our site, such as IP address, browser type, device
            information, and pages visited, including through cookies and similar technologies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We use the information we collect to respond to your inquiries and quote requests, to provide and improve our
            website and services, to send relevant product or company updates (where you have agreed), to comply with legal
            obligations, and to protect our rights and the security of our systems. We do not sell your personal information
            to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Cookies and Similar Technologies</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our website may use cookies and similar technologies to improve user experience, analyze site traffic, and
            remember preferences. You can control cookie settings through your browser. Disabling certain cookies may affect
            some site functionality.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Data Sharing and Disclosure</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We may share your information with service providers who assist us in operating our website and business (e.g.,
            hosting, analytics), subject to confidentiality and data protection commitments. We may also disclose information
            where required by law or to protect our rights, safety, or property.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Data Retention and Security</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We retain your information only as long as necessary for the purposes described in this policy or as required by
            law. We implement appropriate technical and organizational measures to protect your personal data against
            unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Depending on applicable law, you may have the right to access, correct, or delete your personal information, or to
            object to or restrict certain processing. To exercise these rights or ask questions about our data practices,
            please contact us at{" "}
            <a href="mailto:info@brdelectronic.com" className="text-primary hover:underline">
              info@brdelectronic.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">7. International Transfers</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our operations are based in China. If you are accessing our website from outside China, please be aware that your
            information may be transferred to, stored, and processed in China, where data protection laws may differ from
            those in your jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">8. Changes to This Policy</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We may update this Privacy Policy from time to time. We will post the revised policy on this page and update the
            &quot;Last updated&quot; date. Continued use of our website after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For any questions about this Privacy Policy or our data practices, please contact:
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Zhenjiang Baierde Electronic Co., Ltd.</strong>
            <br />
            Email:{" "}
            <a href="mailto:info@brdelectronic.com" className="text-primary hover:underline">
              info@brdelectronic.com
            </a>
            <br />
            Address: Zhongtian North Road, Xinfeng Town, Dantu District, Zhenjiang City, Jiangsu Province, China
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-border text-sm text-muted-foreground">
        <Link href="/" className="text-primary hover:underline">
          ← Back to Home
        </Link>
        {" · "}
        <Link href="/terms" className="text-primary hover:underline">
          Terms of Service
        </Link>
      </div>
    </div>
  )
}
