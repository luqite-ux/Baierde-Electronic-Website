// Mock data structure - ready to be replaced with Sanity CMS

/** 产品视频（与 Sanity productVideo 一致，用于详情页展示） */
export interface ProductVideo {
  videoType?: 'upload' | 'youtube' | 'vimeo' | null
  videoFileUrl?: string | null
  videoUrl?: string | null
  posterUrl?: string | null
  title?: string | null
  description?: string | null
}

export interface Product {
  _id: string
  title: string
  slug: string
  category: "connectors" | "adapters" | "cable-assemblies"
  series?: string
  shortDescription: string
  description: string
  specs: { label: string; value: string }[]
  images: string[]
  overview?: string
  applications?: string[]
  packagingInfo?: string
  datasheetUrl?: string
  /** 来自 Sanity 的产品视频（本地上传 / YouTube / Vimeo） */
  productVideo?: ProductVideo | null
  seo: {
    title: string
    description: string
  }
}

export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string
  seo: {
    title: string
    description: string
  }
}

export const mockProducts: Product[] = [
  {
    _id: "1",
    title: "SMA Straight Connector",
    slug: "sma-straight-connector",
    category: "connectors",
    series: "SMA",
    shortDescription: "High-frequency SMA connector with excellent performance up to 18GHz",
    description:
      "Our SMA straight connectors provide reliable RF signal transmission for telecom, aerospace, and test equipment applications. Manufactured to IEC standards with precision machining.",
    specs: [
      { label: "Frequency Range", value: "DC-18GHz" },
      { label: "Impedance", value: "50Ω" },
      { label: "Connector Type", value: "SMA Male/Female" },
      { label: "Material", value: "Brass with Gold Plating" },
    ],
    images: ["/sma-rf-connector-closeup.jpg"],
    overview: "Detailed overview of SMA straight connectors here...",
    applications: ["Telecom", "Aerospace", "Test Equipment"],
    packagingInfo: "Available in various lengths and gender configurations.",
    seo: {
      title: "SMA Straight Connector | High-Frequency RF Connector | Baierde",
      description: "Premium SMA straight connectors for telecom and aerospace. DC-18GHz, 50Ω impedance, IEC certified.",
    },
  },
  {
    _id: "2",
    title: "MMCX Right Angle Connector",
    slug: "mmcx-right-angle-connector",
    category: "connectors",
    series: "MMCX",
    shortDescription: "Compact MMCX connector ideal for automotive and mobile applications",
    description:
      "Space-saving MMCX right angle connector designed for high-density PCB applications. Perfect for automotive electronics, GPS systems, and mobile devices.",
    specs: [
      { label: "Frequency Range", value: "DC-6GHz" },
      { label: "Impedance", value: "50Ω" },
      { label: "Connector Type", value: "MMCX Male/Female" },
      { label: "Durability", value: "500 mating cycles" },
    ],
    images: ["/mmcx-rf-connector-right-angle.jpg"],
    overview: "Detailed overview of MMCX right angle connectors here...",
    applications: ["Automotive", "Mobile"],
    packagingInfo: "Compact design suitable for high-density PCBs.",
    seo: {
      title: "MMCX Right Angle Connector | Compact RF Connector | Baierde",
      description: "Space-saving MMCX connectors for automotive and mobile devices. DC-6GHz, 500 mating cycles.",
    },
  },
  {
    _id: "3",
    title: "MCX Straight Connector",
    slug: "mcx-straight-connector",
    category: "connectors",
    series: "MCX",
    shortDescription: "Snap-on MCX connector for quick RF connections",
    description:
      "MCX connectors feature a unique snap-on coupling mechanism for quick, tool-free connections. Ideal for applications requiring frequent mating and unmating.",
    specs: [
      { label: "Frequency Range", value: "DC-6GHz" },
      { label: "Impedance", value: "50Ω/75Ω" },
      { label: "Connector Type", value: "MCX Male/Female" },
      { label: "Mating Cycles", value: "500+" },
    ],
    images: ["/mcx-rf-connector.jpg"],
    overview: "Detailed overview of MCX straight connectors here...",
    applications: ["High-Density PCB"],
    packagingInfo: "Snap-on design for quick connections.",
    seo: {
      title: "MCX Straight Connector | Snap-On RF Connector | Baierde",
      description: "Quick snap-on MCX connectors for frequent mating. DC-6GHz, 50/75Ω.",
    },
  },
  {
    _id: "4",
    title: "BNC Straight Connector",
    slug: "bnc-straight-connector",
    category: "connectors",
    series: "BNC",
    shortDescription: "Bayonet coupling BNC connector for test equipment",
    description:
      "Industry-standard BNC connectors with bayonet coupling mechanism. Widely used in video, test equipment, and RF applications up to 4GHz.",
    specs: [
      { label: "Frequency Range", value: "DC-4GHz" },
      { label: "Impedance", value: "50Ω/75Ω" },
      { label: "Connector Type", value: "BNC Male/Female" },
      { label: "Coupling", value: "Bayonet" },
    ],
    images: ["/bnc-rf-connector.jpg"],
    overview: "Detailed overview of BNC straight connectors here...",
    applications: ["Video", "Test Equipment"],
    packagingInfo: "Bayonet coupling for secure connections.",
    seo: {
      title: "BNC Straight Connector | Test Equipment RF Connector | Baierde",
      description: "Bayonet BNC connectors for test and instrumentation. DC-4GHz, 50/75Ω.",
    },
  },
  {
    _id: "5",
    title: "SMP Push-On Connector",
    slug: "smp-push-on-connector",
    category: "connectors",
    series: "SMP",
    shortDescription: "High-frequency SMP connector for dense PCB layouts",
    description:
      "SMP push-on connectors deliver exceptional performance up to 40GHz in a compact form factor. Perfect for high-density board-to-board connections.",
    specs: [
      { label: "Frequency Range", value: "DC-40GHz" },
      { label: "Impedance", value: "50Ω" },
      { label: "Connector Type", value: "SMP Male/Female" },
      { label: "Coupling", value: "Push-On" },
    ],
    images: ["/smp-rf-connector-high-frequency.jpg"],
    overview: "Detailed overview of SMP push-on connectors here...",
    applications: ["High-Density PCB"],
    packagingInfo: "Compact push-on design for easy installation.",
    seo: {
      title: "SMP Push-On Connector | High-Frequency RF Connector | Baierde",
      description: "High-density SMP connectors for up to 40GHz applications. Compact push-on design.",
    },
  },
  {
    _id: "6",
    title: "SSMA Right Angle Connector",
    slug: "ssma-right-angle-connector",
    category: "connectors",
    series: "SSMA",
    shortDescription: "Super-miniature SSMA connector for space-constrained applications",
    description:
      "SSMA (Super SMA) connectors offer even smaller size than standard SMA while maintaining excellent performance. Ideal for compact designs.",
    specs: [
      { label: "Frequency Range", value: "DC-12.4GHz" },
      { label: "Impedance", value: "50Ω" },
      { label: "Connector Type", value: "SSMA Male/Female" },
      { label: "Size", value: "Super-miniature" },
    ],
    images: ["/ssma-miniature-rf-connector.jpg"],
    overview: "Detailed overview of SSMA right angle connectors here...",
    applications: ["Space-Constrained Designs"],
    packagingInfo: "Ultra-miniature size for compact applications.",
    seo: {
      title: "SSMA Right Angle Connector | Super-Miniature RF Connector | Baierde",
      description: "Ultra-compact SSMA connectors for space-constrained designs. DC-12.4GHz.",
    },
  },
  {
    _id: "7",
    title: "SMB Straight Connector",
    slug: "smb-straight-connector",
    category: "connectors",
    series: "SMB",
    shortDescription: "Snap-on SMB connector for telecommunications",
    description:
      "SMB connectors feature snap-on coupling and are commonly used in telecommunications and RF test equipment for quick connections.",
    specs: [
      { label: "Frequency Range", value: "DC-4GHz" },
      { label: "Impedance", value: "50Ω/75Ω" },
      { label: "Connector Type", value: "SMB Male/Female" },
      { label: "Coupling", value: "Snap-On" },
    ],
    images: ["/smb-rf-connector-telecommunications.jpg"],
    overview: "Detailed overview of SMB straight connectors here...",
    applications: ["Telecommunications"],
    packagingInfo: "Snap-on design for quick connections.",
    seo: {
      title: "SMB Straight Connector | Telecom RF Connector | Baierde",
      description: "Quick-connect SMB connectors for telecom applications. DC-4GHz, snap-on coupling.",
    },
  },
  {
    _id: "8",
    title: "SMC Right Angle Connector",
    slug: "smc-right-angle-connector",
    category: "connectors",
    series: "SMC",
    shortDescription: "Threaded SMC connector for secure RF connections",
    description:
      "SMC connectors offer threaded coupling in a smaller package than SMA. Ideal for applications requiring secure connections in limited space.",
    specs: [
      { label: "Frequency Range", value: "DC-10GHz" },
      { label: "Impedance", value: "50Ω" },
      { label: "Connector Type", value: "SMC Male/Female" },
      { label: "Coupling", value: "Threaded" },
    ],
    images: ["/smc-rf-connector-threaded.jpg"],
    overview: "Detailed overview of SMC right angle connectors here...",
    applications: ["Secure Connections"],
    packagingInfo: "Threaded coupling for secure connections in limited space.",
    seo: {
      title: "SMC Right Angle Connector | Compact Threaded RF Connector | Baierde",
      description: "Secure SMC connectors with threaded coupling. DC-10GHz, compact design.",
    },
  },
  {
    _id: "9",
    title: "SSMC Straight Connector",
    slug: "ssmc-straight-connector",
    category: "connectors",
    series: "SSMC",
    shortDescription: "Ultra-compact SSMC connector for high-density boards",
    description:
      "SSMC (Super SMC) connectors provide maximum miniaturization for high-density PCB applications while maintaining reliable performance.",
    specs: [
      { label: "Frequency Range", value: "DC-12GHz" },
      { label: "Impedance", value: "50Ω" },
      { label: "Connector Type", value: "SSMC Male/Female" },
      { label: "Size", value: "Ultra-compact" },
    ],
    images: ["/ssmc-ultra-compact-rf-connector.jpg"],
    overview: "Detailed overview of SSMC straight connectors here...",
    applications: ["High-Density Boards"],
    packagingInfo: "Ultra-compact design for high-density PCBs.",
    seo: {
      title: "SSMC Straight Connector | Ultra-Compact RF Connector | Baierde",
      description: "Maximum miniaturization with SSMC connectors. DC-12GHz, high-density boards.",
    },
  },
  {
    _id: "10",
    title: "D4 High-Density Connector",
    slug: "d4-high-density-connector",
    category: "connectors",
    series: "D4",
    shortDescription: "D4 connector for extreme high-density applications",
    description:
      "D4 connectors are designed for the most demanding high-density applications, offering exceptional performance in minimal space.",
    specs: [
      { label: "Frequency Range", value: "DC-8GHz" },
      { label: "Impedance", value: "50Ω" },
      { label: "Connector Type", value: "D4 Male/Female" },
      { label: "Density", value: "Ultra-high" },
    ],
    images: ["/d4-high-density-rf-connector.jpg"],
    overview: "Detailed overview of D4 high-density connectors here...",
    applications: ["Extreme High-Density Applications"],
    packagingInfo: "Minimal footprint for ultra-high-density applications.",
    seo: {
      title: "D4 High-Density Connector | Extreme Miniature RF Connector | Baierde",
      description: "D4 connectors for ultra-high-density applications. DC-8GHz, minimal footprint.",
    },
  },
  {
    _id: "11",
    title: "BNC Male to SMA Female Adapter",
    slug: "bnc-to-sma-adapter",
    category: "adapters",
    shortDescription: "Precision adapter for connecting BNC and SMA interfaces",
    description:
      "High-quality BNC to SMA adapter for test equipment and instrumentation. Low insertion loss and excellent return loss characteristics.",
    specs: [
      { label: "Frequency Range", value: "DC-4GHz" },
      { label: "Impedance", value: "50Ω" },
      { label: "Insertion Loss", value: "<0.2dB" },
      { label: "VSWR", value: "1.25:1 max" },
    ],
    images: ["/bnc-to-sma-rf-adapter.jpg"],
    overview: "Detailed overview of BNC to SMA adapters here...",
    applications: ["Test Equipment"],
    packagingInfo: "Low insertion loss and excellent return loss characteristics.",
    seo: {
      title: "BNC to SMA Adapter | RF Adapter | Baierde Electronic",
      description: "Precision BNC male to SMA female adapter. Low insertion loss, DC-4GHz, 50Ω.",
    },
  },
  {
    _id: "12",
    title: "N-Type to SMA Adapter",
    slug: "n-type-to-sma-adapter",
    category: "adapters",
    shortDescription: "N-Type to SMA inter-series adapter",
    description:
      "Professional N-Type to SMA adapter for connecting larger N-Type connectors to SMA interfaces. Ideal for antenna and base station applications.",
    specs: [
      { label: "Frequency Range", value: "DC-6GHz" },
      { label: "Impedance", value: "50Ω" },
      { label: "Insertion Loss", value: "<0.15dB" },
      { label: "VSWR", value: "1.2:1 max" },
    ],
    images: ["/n-type-to-sma-rf-adapter.jpg"],
    overview: "Detailed overview of N-Type to SMA adapters here...",
    applications: ["Antenna Applications"],
    packagingInfo: "Ideal for connecting larger N-Type connectors to SMA interfaces.",
    seo: {
      title: "N-Type to SMA Adapter | Inter-Series RF Adapter | Baierde",
      description: "N-Type to SMA adapter for antenna applications. Low loss, DC-6GHz.",
    },
  },
  {
    _id: "13",
    title: "SMA Male to Male Adapter",
    slug: "sma-male-to-male-adapter",
    category: "adapters",
    shortDescription: "SMA gender changer adapter",
    description:
      "SMA male to male barrel adapter for extending connections or changing gender configuration. Precision machined for minimal signal loss.",
    specs: [
      { label: "Frequency Range", value: "DC-18GHz" },
      { label: "Impedance", value: "50Ω" },
      { label: "Insertion Loss", value: "<0.1dB" },
      { label: "Body Material", value: "Stainless Steel" },
    ],
    images: ["/sma-male-to-male-barrel-adapter.jpg"],
    overview: "Detailed overview of SMA male to male adapters here...",
    applications: ["Gender Changes"],
    packagingInfo: "Precision machined for minimal signal loss.",
    seo: {
      title: "SMA Male to Male Adapter | Gender Changer | Baierde",
      description: "SMA barrel adapter for gender changes. Precision machined, DC-18GHz.",
    },
  },
  {
    _id: "14",
    title: "SMA Cable Assembly - 50cm",
    slug: "sma-cable-assembly-50cm",
    category: "cable-assemblies",
    series: "SMA",
    shortDescription: "Custom-length SMA cable assembly with low-loss coaxial cable",
    description:
      "Pre-tested SMA cable assemblies using high-quality low-loss cable. Available in custom lengths and configurations for your specific application.",
    specs: [
      { label: "Cable Type", value: "RG316 / RG174" },
      { label: "Length", value: "50cm (custom available)" },
      { label: "Connector A", value: "SMA Male" },
      { label: "Connector B", value: "SMA Male" },
    ],
    images: ["/sma-rf-cable-assembly.jpg"],
    overview: "Detailed overview of SMA cable assemblies here...",
    applications: ["Custom Lengths"],
    packagingInfo: "Pre-tested cable assemblies with low-loss coaxial cable.",
    seo: {
      title: "SMA Cable Assembly 50cm | Custom RF Cable | Baierde",
      description: "Pre-tested SMA cable assemblies with low-loss coaxial cable. Custom lengths available.",
    },
  },
  {
    _id: "15",
    title: "MMCX Cable Assembly - 30cm",
    slug: "mmcx-cable-assembly-30cm",
    category: "cable-assemblies",
    series: "MMCX",
    shortDescription: "Flexible MMCX cable assembly for automotive applications",
    description:
      "Compact MMCX cable assemblies designed for automotive and mobile applications. Flexible cable for easy routing in tight spaces.",
    specs: [
      { label: "Cable Type", value: "RG178" },
      { label: "Length", value: "30cm (custom available)" },
      { label: "Connector A", value: "MMCX Male" },
      { label: "Connector B", value: "MMCX Female" },
    ],
    images: ["/mmcx-flexible-cable-assembly.jpg"],
    overview: "Detailed overview of MMCX cable assemblies here...",
    applications: ["Automotive"],
    packagingInfo: "Flexible cable for easy routing in tight spaces.",
    seo: {
      title: "MMCX Cable Assembly 30cm | Automotive RF Cable | Baierde",
      description: "Flexible MMCX cable assemblies for automotive. RG178, custom lengths.",
    },
  },
  {
    _id: "16",
    title: "BNC Cable Assembly - 1m",
    slug: "bnc-cable-assembly-1m",
    category: "cable-assemblies",
    series: "BNC",
    shortDescription: "BNC test cable assembly for laboratory use",
    description:
      "Professional-grade BNC cable assemblies for test and measurement applications. Low loss and excellent shielding for accurate measurements.",
    specs: [
      { label: "Cable Type", value: "RG58 / RG59" },
      { label: "Length", value: "1m (custom available)" },
      { label: "Connector A", value: "BNC Male" },
      { label: "Connector B", value: "BNC Male" },
    ],
    images: ["/bnc-test-cable-assembly.jpg"],
    overview: "Detailed overview of BNC cable assemblies here...",
    applications: ["Laboratory Use"],
    packagingInfo: "Low loss and excellent shielding for accurate measurements.",
    seo: {
      title: "BNC Cable Assembly 1m | Test Cable | Baierde",
      description: "Professional BNC test cables for accurate measurements. Low loss, RG58/RG59.",
    },
  },
]

export const mockBlogPosts: BlogPost[] = [
  {
    _id: "blog-1",
    title: "5G Network Deployment: Choosing the Right RF Connectors",
    slug: "5g-rf-connectors-guide",
    excerpt:
      "Learn how to select optimal RF connectors for 5G infrastructure projects, including frequency considerations and environmental factors.",
    content: "Full article content here...",
    publishedAt: "2024-01-15",
    seo: {
      title: "5G RF Connectors Guide | Baierde Electronic Blog",
      description:
        "Expert guide on selecting RF connectors for 5G networks. Learn about frequency ranges, durability, and performance.",
    },
  },
  {
    _id: "blog-2",
    title: "Understanding IEC Standards for RF Connectors",
    slug: "iec-standards-rf-connectors",
    excerpt:
      "A comprehensive overview of international standards that ensure quality and compatibility in RF connector manufacturing.",
    content: "Full article content here...",
    publishedAt: "2024-01-10",
    seo: {
      title: "IEC Standards for RF Connectors Explained | Baierde Blog",
      description: "Learn about IEC and GB standards for RF connectors and why they matter for quality assurance.",
    },
  },
]
