export const COMPANY = {
  name: 'Prestige Golf Access & Clubshares, Inc.',
  shortName: 'PGA Clubshares',
  mission: 'Our mission is to grow our company and stakeholder value through customer focus and valuable partnership.',
  vision: 'Be the best and quality provider of brokerage services to our clients.',
  positioning:
    'Prestige Golf Access & Clubshares, Inc. is a registered and licensed brokerage firm under the Securities and Exchange Commission, providing professional and personalized service for golf and country club share requirements.',
  organization:
    'The organization is composed of Japanese national and local counterparts, plus club shares associate directors and general management with more than twenty years of experience in the industry.',
  philosophy: [
    'We do not merely seek to expand business and volume. We are sincerely committed to intermediary service that can contribute to golf and club-share trading and to the welfare of our clients.',
    'It is the advocacy of the corporation to grow with the PGA family while inspiring and helping people achieve their goals.',
    'The company links success to serving client needs, the prosperity of their investment, rewards to employees, and steady company growth — a business cycle intended to be win-win for all.',
  ],
  address: [
    'Unit 10B Kingston Tower',
    'Blk 2 Lot 1 Acacia Ave.',
    'Madrigal Business Park',
    'Ayala Alabang',
    'Muntinlupa City, Philippines',
  ],
  phone: {
    landline: {label: '02 7354 8523', href: 'tel:+63273548523'},
    smart: {label: '+63 919 533 3728', href: 'tel:+639195333728'},
    globe: {label: '+63 967 234 2932', href: 'tel:+639672342932'},
  },
  emails: [
    'info@pgaclubshares.com',
    'pgaclubshares@gmail.com',
    'info@pgaclubshares.ph',
  ],
} as const;

export const SERVICES = [
  {
    index: '01',
    title: 'Buy & Sell Proprietary Shares',
    shortTitle: 'Buy & Sell',
    description: 'PGA assists buyers and sellers in finding suitable proprietary Club Share opportunities and coordinating the brokerage process.',
    details: ['Buyer and seller brokerage support', 'Club-share opportunity sourcing', 'Transaction coordination'],
  },
  {
    index: '02',
    title: 'Playing Rights',
    shortTitle: 'Playing Rights',
    description: 'PGA assists lessees and lessors with playing-right arrangements for participating golf and country clubs.',
    details: ['Lessee assistance', 'Lessor assistance', 'Playing-right coordination'],
  },
  {
    index: '03',
    title: 'Market Information & Advisory',
    shortTitle: 'Market Advisory',
    description: 'PGA provides information and prevailing market-price guidance for individual and corporate clients evaluating Club Shares.',
    details: ['Prevailing price references', 'Club-share market information', 'Individual and corporate guidance'],
  },
  {
    index: '04',
    title: 'Membership Processing',
    shortTitle: 'Membership Processing',
    description: 'PGA assists buyers and lessees with membership processing requirements after a suitable transaction is identified.',
    details: ['Interview coordination', 'Membership card processing', 'Stock certificate processing'],
  },
  {
    index: '05',
    title: 'Documentation Assistance',
    shortTitle: 'Documentation',
    description: 'PGA helps coordinate applicable documentation needed for Club Share transfers and related membership requirements.',
    details: ['Extra-judicial shares', 'Lost stock certificate', 'BIR tax clearance', 'Applicable Club Share documentation'],
  },
] as const;

export const PROCESS = [
  ['01', 'Tell us what you are looking for', 'Share the Club, share class, or market requirement you want to explore.'],
  ['02', 'Review available opportunities', 'PGA helps surface relevant Club Share opportunities and available published market references.'],
  ['03', 'Receive market guidance', 'Discuss prevailing information and practical considerations with the brokerage team.'],
  ['04', 'Coordinate documentation', 'Once terms are established, PGA assists with the applicable transaction and transfer documents.'],
  ['05', 'Complete membership processing', 'PGA supports the next membership-processing steps required by the relevant Club.'],
] as const;
