import { ServiceItem } from '../types';

export const COMPANY_INFO = {
  name: 'Bitsnail Technologies Pvt Ltd',
  shortName: 'Bitsnail',
  tagline: 'Precision Telecom Engineering & Next-Gen Wireless Solutions',
  established: 'March 2023',
  contactPerson: 'Suresh',
  phone: '9841600155',
  phoneDisplay: '+91 98416 00155',
  email: 'bitsnailtech@gmail.com',
  // Active test recipient specified by user for testing notification delivery:
  testNotificationEmail: 'pravinau26@gmail.com',
  corporateAddress: 'Bitsnail Technologies Pvt Ltd, Telecom Network Operations, India',
  hours: 'Monday – Saturday: 08:30 AM – 07:30 PM IST (24/7 Field NOC Support)',
};

export const COMPANY_VISION =
  'To provide innovative, efficient and cost effective solutions and services in the area of telecommunications with the help of best practices and contribute in the growth of the industry.';

export const COMPANY_MISSION =
  'To become the most respectful and preferred Company in telecom consultancy services and contribute in the most effective way in the growth of our customers.';

export const COMPANY_VALUES = [
  {
    title: 'Commitment',
    description: 'Steadfast dedication to project timelines, client targets, and flawless telecom site turnouts.',
  },
  {
    title: 'Flexibility',
    description: 'Rapid adaptation to dynamic telecom circle requirements, site challenges, and evolving OEM specs.',
  },
  {
    title: 'Customer Satisfaction',
    description: 'Prioritizing operator SLAs, seamless communication, and high-quality field deliverables.',
  },
  {
    title: 'Reliability',
    description: 'Dependable field engineers executing high-precision antenna alignments, commissioning, and audits.',
  },
  {
    title: 'Integrity',
    description: 'Absolute transparency in RF data reporting, site surveys, safety compliance, and documentation.',
  },
  {
    title: 'Perfection',
    description: 'Uncompromising engineering standards from baseband unit configurations to zero-incident safety execution.',
  },
];

export const TELECOM_SERVICES: ServiceItem[] = [
  {
    id: 'network-field-survey',
    title: 'Network Field Survey & Data Collection',
    shortDesc: 'Comprehensive RF field surveys, Line of Sight (LOS) audits, clutter profiling, and high-accuracy telecom data collection.',
    fullDesc:
      'Rigorous physical and radio frequency surveys designed to provide telecom operators and infrastructure companies with accurate ground realities. We conduct RF drive tests, LOS transmission checks, tower structural space verification, azimuth mapping, and ambient interference scans using industry-standard tools.',
    iconName: 'Radio',
    category: 'survey',
    deliverables: [
      'RF Walk & Drive Test Reports (RSRP, RSRQ, SINR)',
      'Line of Sight (LOS) Clearance & Microwave Path Profiling',
      'Tower Space, Antenna Orientation & Tilt Validation',
      'Clutter Data Digitization & Geographic Coordinate Tagging',
      'Pre-installation Feasibility & Power Source Assessment',
    ],
    keyTools: ['Nemo Handy / TEMS Pocket', 'GPS Precision Trackers', 'Spectrum Analyzers', 'Laser Range Finders'],
  },
  {
    id: 'system-parameter-configuration',
    title: 'Network System Parameter & Configuration',
    shortDesc: 'End-to-end BTS/eNodeB/gNodeB parameter scripting, cell parameter integration, and multi-band radio tuning.',
    fullDesc:
      'Expert radio network controller and baseband parameter engineering. Our specialized configuration engineers formulate, audit, and push golden parameter scripts for 4G LTE and 5G New Radio (NR) nodes, ensuring seamless handover parameters, neighbor list optimization, and carrier aggregation configurations.',
    iconName: 'Sliders',
    category: 'config',
    deliverables: [
      'Cellular Parameter Scripting (4G LTE FDD/TDD & 5G NR)',
      'eNodeB & gNodeB Software Commissioning',
      'Neighbor Cell Definitions & Automatic Neighbor Relation (ANR)',
      'MIMO & Beamforming Vector Provisioning',
      'Baseband Unit (BBU) and Remote Radio Unit (RRU) Interfacing',
    ],
    keyTools: ['OEM OMCR/EMS Platforms', 'MML Scripting Engines', 'Configuration Auditing Suites'],
  },
  {
    id: 'network-implementation',
    title: 'Network Implementation',
    shortDesc: 'Turnkey cellular site installation, antenna mounting, optical fiber cabling, and multi-vendor hardware deployment.',
    fullDesc:
      'Complete field rollout and integration services executed with highest safety compliance. Bitsnail handles physical tower rigging, antenna azimuth and electrical downtilt installations, hybrid/optical CPRI cabling, baseband rack installation, power backup wiring, and live on-air site turn-up.',
    iconName: 'Cpu',
    category: 'implementation',
    deliverables: [
      'Turnkey Base Transceiver Station (BTS) Installation',
      'Sector Antenna, Microwave Dish & Massive MIMO Rigging',
      'Optical Fiber CPRI/eCPRI & RF Jumper Cable Routing',
      'Grounding, Surge Protection & Lightning Arrestor Setup',
      'Site Acceptance Testing (ATP 11A / 11B) Sign-offs',
    ],
    keyTools: ['Anritsu Site Master', 'Optical Power Meters', 'Fiber Splicing Units', 'Torque Wrenches & Rigging Kits'],
  },
  {
    id: 'performance-monitoring-optimization',
    title: 'Network Performance Monitoring & Optimization',
    shortDesc: 'Proactive radio network tuning, KPI benchmarking, call drop reduction, and data throughput acceleration.',
    fullDesc:
      'Continuous analytical optimization of mobile networks to meet and exceed Quality of Service (QoS) benchmarks. We analyze OSS counter statistics, conduct post-launch drive tests, eliminate pilot pollution, tune handover margins, and resolve congestion hotspots across dense urban and rural geographies.',
    iconName: 'TrendingUp',
    category: 'optimization',
    deliverables: [
      'Daily/Weekly KPI Trend Analysis (CSSR, CDR, HOSR, Throughput)',
      'Interference Hunting & External PIM Mitigation',
      'Drive Test Post-Processing & Coverage Hole Elimination',
      'Capacity Balancing & Layer Management for 4G/5G Aggregation',
      'VIP Cluster & High-Density Event Optimization',
    ],
    keyTools: ['Actix Analyzer', 'WindCatcher', 'OSS KPI Dashboards', 'Probe Analytics'],
  },
  {
    id: 'fault-monitoring-troubleshooting',
    title: 'Fault Monitoring & Troubleshooting',
    shortDesc: 'Rapid response field alarm clearance, fiber cut restorations, VSWR troubleshooting, and MTTR reduction.',
    fullDesc:
      'Round-the-clock technical troubleshooting to maintain network uptime and SLA commitments. Our certified field engineers respond swiftly to transmission link failures, high VSWR alarms, optical fiber cuts, BBU card faults, and power synchronization issues with minimal Mean Time To Repair (MTTR).',
    iconName: 'ShieldAlert',
    category: 'maintenance',
    deliverables: [
      '24/7 Rapid Emergency Field Dispatches',
      'RF Feeder & Antenna VSWR / Return Loss Fault Resolution',
      'Fiber Break Pinpointing using OTDR & Fast Splicing',
      'Active Hardware Diagnostics & Module Replacement',
      'Root Cause Analysis (RCA) Reports for Telecom Circles',
    ],
    keyTools: ['OTDR Testers', 'VSWR / Return Loss Testers', 'Multimeters', 'Fiber Cleavers'],
  },
  {
    id: 'documentation-asset-tracking',
    title: 'Network Documentation & Asset Tracking',
    shortDesc: 'As-built site documentation, tower structural records, barcode/RFID telecom inventory auditing, and GIS mapping.',
    fullDesc:
      'Accurate, digitized telecom asset management. We document every physical and logical component on the cell site, compiling comprehensive As-Built Drawings (ABD), photographic evidence, serial number inventories, and GIS coordinates to ensure total asset visibility for telecom operators.',
    iconName: 'FileCheck',
    category: 'audit',
    deliverables: [
      'Standardized As-Built Documentation (ABD) & CAD Layouts',
      'Physical Asset Barcoding & Serialized Verification',
      'Tower Space Loading & Structural Loading Audits',
      'Telecom Inventory Reconciliation with Operator ERPs',
      'Digital Photographic Site Dossiers with Geotagging',
    ],
    keyTools: ['GIS Geotagging Apps', 'AutoCAD Civil / Telecom', 'Barcode Scanners', 'Cloud Audit Portals'],
  },
];

export const SAFETY_STANDARDS = {
  title: 'Operational Health and Safety (OHS)',
  subtitle: 'Uncompromising safety protocols ensuring zero-incident field execution across India and overseas.',
  certifications: [
    {
      name: 'FARM Certification',
      fullName: 'Safety Training on Height & Rescue',
      scope: 'Industry Accepted WAH (Work At Height) – 100% of all Project Field Teams are certified.',
      validity: 'Valid across India and overseas – Compulsory mandate for telecom tower operations.',
    },
    {
      name: 'EN Standard PPE Kits',
      fullName: 'Full Body Harness & Fall Arresters',
      scope: 'All project engineers and riggers are equipped with European Standard (EN) personal protective equipment.',
      validity: 'Mandatory on-site daily compliance check before climbing any telecom structure.',
    },
    {
      name: 'EHS & OHS Drive',
      fullName: 'Proactive Environment, Health & Safety Governance',
      scope: 'Continuous safety refresher drills, emergency descent rescue simulations, and zero-compromise site checks.',
      validity: 'Zero-tolerance policy on safety violations across all operational circles.',
    },
  ],
  commitments: [
    '100% Certified Field Crews before deployment on any telecommunication tower',
    'Comprehensive safety gear check: Dual lanyards, energy absorbers, safety helmets, and grip gloves',
    'Regular medical fitness examinations ensuring heights suitability for all riggers',
    'Active emergency rescue protocols with trained on-site rescue supervisors',
  ],
};

export const HIRING_TERMS = {
  title: 'Hiring Terms & Career Pathways',
  subtitle: 'Join Bitsnail Technologies – Building the next generation of telecom engineering leaders.',
  criteria: [
    {
      heading: 'Qualification & Eligibility',
      detail: 'Selecting only Pass-out candidates in Telecom, Electronics, Electrical, or IT disciplines. Candidates with backlogs or incomplete credentials are not eligible.',
    },
    {
      heading: 'Specialized Field Training',
      detail: '15 to 25 days intensive hands-on field training on live towers, RF gear, and drive testing tools under senior telecom mentors.',
    },
    {
      heading: 'Mandatory FARM Certification',
      detail: 'Safety Training on Height & Rescue (FARM / WAH) must be successfully conducted and cleared before formal project joining.',
    },
    {
      heading: 'Rapid Reporting Timeline',
      detail: 'Selected candidates are required to report for comprehensive training within 5 to 7 days after selection and confirmation from the Company.',
    },
    {
      heading: 'Compensation & Benefits',
      detail: 'Competitive salary and project allowances commence immediately after formal joining following successful training completion.',
    },
    {
      heading: 'Gender Policy Note',
      detail: 'Due to severe field tower climbing & remote high-altitude microwave rigging conditions, selection of male candidates is currently applicable for active field tower rigging roles.',
    },
  ],
};

export const INDUSTRY_PLAY_ROLES = [
  {
    name: 'Vedang Cellular Services',
    role: 'Telecom Network Rollout & Quality Partner',
    desc: 'Collaborative delivery of wireless field surveys, site audits, and multi-technology telecom circle execution.',
  },
  {
    name: 'Wireless Teleinfra Pvt Ltd',
    role: 'Quality Services, Our Goal',
    desc: 'Joint infrastructure optimization, optical fiber connectivity, and high-performance telecom deployment.',
  },
  {
    name: 'National Telecom Circle Operators',
    role: '4G LTE & 5G Rollout Services',
    desc: 'Delivering next-generation wireless coverage expansion, small-cell densification, and QoS enhancement.',
  },
];
