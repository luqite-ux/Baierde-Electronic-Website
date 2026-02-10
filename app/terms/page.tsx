import { Breadcrumbs } from "@/components/breadcrumbs"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for using the website and services of Zhenjiang Baierde Electronic Co., Ltd. RF connector manufacturer.",
  alternates: {
    canonical: "https://brdelectronic.com/terms",
  },
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Terms of Service" }]} />

      <div className="mb-12 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
        <p className="text-muted-foreground">
          Last updated: February 2026. These Terms of Service (&quot;Terms&quot;) govern your use of the website and services of
          Zhenjiang Baierde Electronic Co., Ltd. (&quot;Baierde,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By
          accessing or using our website, you agree to these Terms.
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-3xl space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Use of the Website</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our website is provided for informational and business purposes. You may use it to learn about our products (RF
            coaxial connectors, adapters, cable assemblies), request quotes, and contact us. You agree not to use the site
            for any unlawful purpose, to attempt to gain unauthorized access to our systems or data, or to transmit any
            harmful or offensive content. We reserve the right to suspend or terminate access in case of breach of these
            Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Quotes and Orders</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Quote requests submitted through our website or by email are non-binding. Any quotation we provide is valid
            subject to the terms and validity period stated on the quotation. Orders are only binding when confirmed in
            writing by Baierde (e.g., order confirmation or contract). Prices, specifications, and delivery terms are as
            agreed in the applicable order or contract.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            All content on this website, including text, graphics, logos, images, and software, is the property of Baierde or
            its licensors and is protected by applicable intellectual property laws. You may not copy, modify, distribute, or
            use our content for commercial purposes without our prior written consent, except for limited personal or
            internal business use (e.g., viewing, sharing links).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Product Information</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We strive to ensure that product descriptions, specifications, and technical information on our website are
            accurate. Such information is for general reference only and does not constitute a guarantee unless expressly
            stated in a written agreement. For precise specifications and suitability for your application, please contact
            our sales or engineering team.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Disclaimer of Warranties</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The website and its content are provided &quot;as is&quot; without warranties of any kind, either express or implied, to the
            fullest extent permitted by law. We do not warrant that the site will be uninterrupted, error-free, or free of
            viruses or other harmful components. Any reliance on the information on this site is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            To the maximum extent permitted by applicable law, Baierde and its affiliates shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages arising from your use of the website or any
            content thereon, or from any business dealings with us, except where such liability cannot be excluded by law.
            Our total liability in connection with the use of the website shall not exceed the amount you paid to us in the
            twelve months preceding the claim, or one hundred US dollars, whichever is greater.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">7. Links to Third-Party Sites</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our website may contain links to third-party websites. We are not responsible for the content, privacy
            practices, or terms of those sites. Your use of third-party sites is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">8. Governing Law and Disputes</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            These Terms shall be governed by and construed in accordance with the laws of the People&apos;s Republic of China,
            without regard to its conflict of law provisions. Any dispute arising from or relating to these Terms or the
            use of our website shall be subject to the exclusive jurisdiction of the courts of the place where Baierde is
            registered (Zhenjiang, Jiangsu Province, China), unless otherwise required by mandatory law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">9. Changes to the Terms</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We may modify these Terms at any time. We will post the updated Terms on this page and update the &quot;Last
            updated&quot; date. Your continued use of the website after changes constitutes acceptance of the revised Terms. We
            encourage you to review this page periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For questions about these Terms of Service, please contact:
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
        <Link href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
      </div>
    </div>
  )
}
