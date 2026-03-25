import {getCliClient} from 'sanity/cli'

type PortableTextBlock = {
  _type: 'block'
  _key: string
  style: string
  markDefs: any[]
  children: Array<{_type: 'span'; _key: string; text: string; marks: string[]}>
}

function toPortableText(text: string): PortableTextBlock[] {
  const safe = (text ?? '').trim()
  return [
    {
      _type: 'block',
      _key: `b-${Math.random().toString(36).slice(2)}`,
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: `s-${Math.random().toString(36).slice(2)}`,
          text: safe.length > 0 ? safe : ' ',
          marks: [],
        },
      ],
    },
  ]
}

async function ensurePost(client: ReturnType<typeof getCliClient>, input: {
  title: string
  slug: string
  publishedAt: string
  excerpt?: string
  content: string
  seo?: {metaTitle?: string; metaDescription?: string; keywords?: string[]}
}) {
  const exists = await client.fetch<number>(
    'count(*[_type=="post" && slug.current==$slug])',
    {slug: input.slug},
  )
  if (exists > 0) return {created: false, slug: input.slug}

  const doc = {
    _type: 'post',
    title: input.title,
    slug: { _type: 'slug', current: input.slug },
    publishedAt: input.publishedAt,
    body: toPortableText(input.content),
    seo: {
      metaTitle: input.seo?.metaTitle ?? input.title,
      metaDescription: input.seo?.metaDescription ?? input.excerpt ?? '',
      keywords: input.seo?.keywords ?? [],
    },
  }

  await client.create(doc as any)
  return {created: true, slug: input.slug}
}

async function ensureFaq(client: ReturnType<typeof getCliClient>, input: {
  question: string
  answer: string
  order: number
}) {
  const exists = await client.fetch<number>(
    'count(*[_type=="faq" && question==$q])',
    {q: input.question},
  )
  if (exists > 0) return {created: false, question: input.question}

  await client.create({
    _type: 'faq',
    question: input.question,
    answer: input.answer,
    order: input.order,
  } as any)
  return {created: true, question: input.question}
}

async function main() {
  const client = getCliClient({apiVersion: '2026-03-25'})

  const posts = [
    {
      title: '5G Network Deployment: Choosing the Right RF Connectors',
      slug: '5g-rf-connectors-guide',
      excerpt:
        'Learn how to select optimal RF connectors for 5G infrastructure projects, including frequency considerations and environmental factors.',
      content: 'Full article content here...',
      publishedAt: '2024-01-15T00:00:00.000Z',
      seo: {
        metaTitle: '5G RF Connectors Guide | Baierde Electronic Blog',
        metaDescription:
          'Expert guide on selecting RF connectors for 5G networks. Learn about frequency ranges, durability, and performance.',
        keywords: ['5G', 'RF connectors', 'SMA', 'SMP', 'telecom'],
      },
    },
    {
      title: 'Understanding IEC Standards for RF Connectors',
      slug: 'iec-standards-rf-connectors',
      excerpt:
        'A comprehensive overview of international standards that ensure quality and compatibility in RF connector manufacturing.',
      content: 'Full article content here...',
      publishedAt: '2024-01-10T00:00:00.000Z',
      seo: {
        metaTitle: 'IEC Standards for RF Connectors Explained | Baierde Blog',
        metaDescription: 'Learn about IEC and GB standards for RF connectors and why they matter for quality assurance.',
        keywords: ['IEC 61169', 'GB', 'quality', 'standards', 'RF connectors'],
      },
    },
  ]

  const faqs: Array<{question: string; answer: string; order: number}> = []

  // Homepage FAQs
  const homeFaqs = [
    {
      question: 'What types of RF connectors do you manufacture?',
      answer:
        'We manufacture a comprehensive range of RF coaxial connectors including SMA, MMCX, MCX, BNC, TNC, SMP, N-Type, and custom OEM/ODM designs. Our connectors support frequencies from DC to 40GHz for telecom, automotive, medical, and industrial applications.',
    },
    {
      question: 'What is your minimum order quantity (MOQ)?',
      answer:
        'Our MOQ varies by product type and customization level. For standard connectors, we can accommodate orders from 100 pieces. For custom OEM/ODM projects, MOQ depends on tooling requirements. Contact us to discuss your specific needs.',
    },
    {
      question: 'What is your typical lead time for orders?',
      answer:
        'Standard catalog products ship within 2-3 weeks from order confirmation. Custom cable assemblies typically require 3-4 weeks. OEM/ODM projects range from 4-6 weeks depending on complexity. We offer expedited service for urgent requirements.',
    },
    {
      question: 'Do you provide free samples?',
      answer:
        'Yes, we provide free samples for evaluation purposes. Customers only need to cover shipping costs. Sample requests are typically processed within 3-5 business days. Contact us with your specific connector requirements.',
    },
    {
      question: 'What quality certifications do your products have?',
      answer:
        'All products are manufactured to IEC 61169 and GB standards. We maintain a comprehensive QC laboratory with network analyzers, salt spray chambers, and durability testers. Every connector undergoes 100% electrical and mechanical testing before shipment.',
    },
    {
      question: 'Do you offer customization and OEM/ODM services?',
      answer:
        'Yes, we specialize in custom RF solutions. Our engineering team can develop connectors to your exact specifications including custom dimensions, plating options, impedance values, and packaging. We have extensive OEM/ODM experience with international clients.',
    },
    {
      question: 'What shipping methods do you use for international orders?',
      answer:
        'We ship worldwide via DHL, FedEx, UPS, and TNT for express delivery (5-7 days). Sea freight is available for large orders. All products are carefully packaged to ensure safe arrival. We handle export documentation and customs clearance.',
    },
  ]

  // Products page FAQs
  const productFaqs = [
    {
      question: 'How do I choose the right RF connector for my application?',
      answer:
        "Consider your frequency range, impedance requirements (50Ω or 75Ω), space constraints, and environmental conditions. Our technical team can provide consultation to help you select the optimal connector series. Contact us with your specifications.",
    },
    {
      question: 'What is the difference between SMA and MMCX connectors?',
      answer:
        'SMA connectors are larger with threaded coupling and support frequencies up to 18GHz, making them ideal for telecom and test equipment. MMCX connectors are much more compact with snap-on coupling and support up to 6GHz, perfect for automotive and mobile applications where space is limited.',
    },
    {
      question: 'Are datasheets available for all products?',
      answer:
        'Yes, detailed datasheets with specifications, dimensions, performance characteristics, and materials are available for all products. Download them from individual product pages or request them via our contact form.',
    },
    {
      question: 'Can I request custom connector configurations?',
      answer:
        'Absolutely. We offer comprehensive OEM/ODM services for custom connector designs, special cable lengths, unique plating options, and application-specific modifications. Our engineering team will work with you from design to production.',
    },
    {
      question: 'What quality standards do your products meet?',
      answer:
        'All our RF connectors and cable assemblies are manufactured according to IEC and GB international standards. We maintain ISO 9001 certification and perform 100% inspection with our in-house QC laboratory using network analyzers and other precision test equipment.',
    },
    {
      question: 'What is the typical lead time for orders?',
      answer:
        'Standard products typically ship within 7-15 days. Custom cable assemblies require 15-30 days depending on complexity. Large volume orders and custom OEM projects are quoted individually. We also offer expedited production for urgent requirements.',
    },
    {
      question: 'Do you provide samples for testing?',
      answer:
        'Yes, we can provide samples for evaluation and testing purposes. Contact our sales team with your specific requirements and application details. Sample lead time is typically 3-7 days.',
    },
  ]

  // Quality page FAQs
  const qualityFaqs = [
    {
      question: 'What quality standards do your RF connectors meet?',
      answer:
        'All Baierde RF connectors meet IEC 61169 series standards for dimensional and electrical specifications. We also comply with GB/T national standards and RoHS environmental requirements. Products are 100% electrically tested before shipment.',
    },
    {
      question: 'Do you provide test reports or certificates?',
      answer:
        'Yes, we provide comprehensive test reports including RF performance data (VSWR, insertion loss, return loss), dimensional inspection reports, and material certificates upon request. Certificates of conformity are included with all shipments.',
    },
    {
      question: 'What is your quality control process?',
      answer:
        'Our quality control follows a four-stage process: Incoming Material Inspection (IQC), In-Process Quality Control (IPQC), Final Quality Control (FQC) with 100% electrical testing, and Outgoing Quality Assurance (OQA).',
    },
    {
      question: 'Can you provide custom testing or special inspection?',
      answer:
        'Yes, we can accommodate special testing requirements including extended temperature range testing, vibration testing, custom electrical parameters, or customer-specific inspection criteria. Contact us to discuss your requirements.',
    },
    {
      question: 'What environmental tests do you perform?',
      answer:
        'We perform salt spray corrosion testing, temperature cycling (-55°C to +125°C), humidity exposure, vibration testing, and aging tests on sample batches to verify long-term reliability and environmental durability of our products.',
    },
    {
      question: 'How do you ensure consistent plating quality?',
      answer:
        'Our in-house plating facilities use controlled electroplating processes with regular solution analysis and parameter monitoring. Coating thickness is measured non-destructively with thickness gauges, and salt spray testing validates corrosion resistance.',
    },
  ]

  let order = 1
  for (const f of [...homeFaqs, ...productFaqs, ...qualityFaqs]) {
    faqs.push({ ...f, order })
    order += 1
  }

  const results = {
    posts: [] as any[],
    faqs: [] as any[],
  }

  for (const p of posts) results.posts.push(await ensurePost(client, p))
  for (const f of faqs) results.faqs.push(await ensureFaq(client, f))

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(results, null, 2))
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exitCode = 1
})

