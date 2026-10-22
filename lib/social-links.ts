export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61591334247866", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/baierdedianzi?igsh=azV5b2Fpb2J4dDZm&utm_source=qr", icon: "instagram" },
  { label: "YouTube", href: "https://youtube.com/@baierde-j6t?si=hlAmijzKjnBHuCG7", icon: "youtube" },
  { label: "TikTok", href: "https://www.tiktok.com/@baierde?_r=1&_t=ZS-93dNPyv4G0b", icon: "tiktok" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bai-erde-2895173b0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", icon: "linkedin" },
  { label: "X", href: "https://x.com/baierdeelennkd?s=21", icon: "x" },
] as const

export const SOCIAL_PROFILE_URLS = SOCIAL_LINKS.map(({ href }) => href)
