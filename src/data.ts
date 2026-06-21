import { TeamMember, ClubEvent, Partner, GalleryItem } from './types.ts';

export const STATS = [
  { value: "300+", label: "Members" },
  { value: "20+", label: "Events Hosted" },
  { value: "10+", label: "Industry Partners" }
];

export const WHAT_WE_DO = [
  {
    icon: "🎓",
    title: "Education & Training",
    description: "Workshops, bootcamps, and hands-on blockchain learning programs designed for all skill levels."
  },
  {
    icon: "🤝",
    title: "Networking",
    description: "Connect and collaborate with leading Web3 builders, innovators, and clubs across Nigeria and Africa."
  },
  {
    icon: "🛠",
    title: "Building",
    description: "Developing tangible, decentralized blockchain products and solutions targeting local African developmental problems."
  },
  {
    icon: "🌍",
    title: "Community",
    description: "An active, growing tribe of Web3-curious minds, researchers, and tech enthusiasts on Lagos State University campus."
  },
  {
    icon: "🏆",
    title: "Competitions",
    description: "Participate in local and international hackathons, pitch contests, chain challenges, and win bounties."
  },
  {
    icon: "📣",
    title: "Advocacy",
    description: "Driving massive blockchain awareness and sound regulatory/principles adoption among Nigerian university students."
  }
];

export const EVENTS: ClubEvent[] = [
  {
    id: "EVT-001",
    status: "PAST",
    category: "CONFERENCE",
    title: "Web3 Lagos Conference",
    hostOrVenue: "Web3bridge Africa",
    description: "Members attended and volunteered at the Web3bridge Africa annual conference — linking up with blockchain communities across Nigerian universities."
  },
  {
    id: "EVT-002",
    status: "PAST",
    category: "WORKSHOP · IRL",
    title: "Campus Blockchain Bootcamp",
    hostOrVenue: "LASU Main Campus",
    description: "Hands-on training session on blockchain fundamentals, Solidity basics, and Web3 career paths — open to all LASU students."
  },
  {
    id: "EVT-003",
    status: "PAST",
    category: "PANEL · IRL",
    title: "Inter-University Web3 Roundtable",
    hostOrVenue: "Multi-campus",
    description: "Joint event with Blockchain UNICAL, BlockchainUNN, and Blockchain Club Unilorin — exploring campus communities' role in Web3 adoption across Nigeria."
  },
  {
    id: "EVT-004",
    status: "UPCOMING",
    category: "HACKATHON",
    isFeatured: true,
    title: "LASU Web3 Hackathon 2025",
    hostOrVenue: "LASU Campus + Online",
    description: "Build decentralized solutions to real African problems. Open to all LASU students. Register now to secure your spot."
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    imageUrl: "https://picsum.photos/600/400?random=11",
    caption: "Web3 Lagos Conference"
  },
  {
    id: "gal-2",
    imageUrl: "https://picsum.photos/600/400?random=12",
    caption: "Campus Bootcamp"
  },
  {
    id: "gal-3",
    imageUrl: "https://picsum.photos/600/400?random=13",
    caption: "Inter-University Roundtable"
  },
  {
    id: "gal-4",
    imageUrl: "https://picsum.photos/600/400?random=14",
    caption: "Club Meetup"
  },
  {
    id: "gal-5",
    imageUrl: "https://picsum.photos/600/400?random=15",
    caption: "Merch Drop"
  },
  {
    id: "gal-6",
    imageUrl: "https://picsum.photos/600/400?random=16",
    caption: "Workshop Session"
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-1",
    name: "Tobi Adebayo",
    role: "Founder / Campus Lead",
    xHandle: "TobiBlockchain",
    seed: "Tobi"
  },
  {
    id: "team-2",
    name: "Chioma Nduka",
    role: "President",
    xHandle: "ChiomaWeb3",
    seed: "Chioma"
  },
  {
    id: "team-3",
    name: "Mustapha Yusuf",
    role: "VP — Education & Training",
    xHandle: "MustySolidity",
    seed: "Mustapha"
  },
  {
    id: "team-4",
    name: "Eseosa Igbinosa",
    role: "VP — Events & Programs",
    xHandle: "EseEvents",
    seed: "Eseosa"
  },
  {
    id: "team-5",
    name: "Aramide Alao",
    role: "Technical Lead",
    xHandle: "AramideDev",
    seed: "Aramide"
  },
  {
    id: "team-6",
    name: "Kelechi Okafor",
    role: "Marketing & Outreach Lead",
    xHandle: "KelechiX",
    seed: "Kelechi"
  },
  {
    id: "team-7",
    name: "Oluwaseun Balogun",
    role: "Partnership & Sponsorship Lead",
    xHandle: "SeunPartners",
    seed: "Oluwaseun"
  },
  {
    id: "team-8",
    name: "Aminat Sanni",
    role: "Secretary General",
    xHandle: "Aminat_S",
    seed: "Aminat"
  }
];

export const PARTNER_LOGOS = [
  { name: "Web3bridge Africa" },
  { name: "USM BNBChain" },
  { name: "RACA3" },
  { name: "ChainReaction Global" },
  { name: "Blockchain UNICAL" },
  { name: "BlockchainUNN" },
  { name: "Blockchain Club Unilorin" }
];

export const DETAILED_PARTNERS: Partner[] = [
  {
    id: "p1",
    name: "Web3bridge Africa",
    description: "Nigeria's leading Web3 training organization"
  },
  {
    id: "p2",
    name: "USM / RACA3",
    description: "BNBChain Metaverse partner"
  },
  {
    id: "p3",
    name: "ChainReaction Global",
    description: "International blockchain society network"
  },
  {
    id: "p4",
    name: "Blockchain UNICAL",
    description: "Sister campus blockchain club"
  },
  {
    id: "p5",
    name: "BlockchainUNN",
    description: "Sister campus blockchain club"
  },
  {
    id: "p6",
    name: "Blockchain Club Unilorin",
    description: "Sister campus blockchain club"
  }
];
