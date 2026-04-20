import { Product, Review, UserProfile, Order } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "KINETIC VELOCITY X1",
    slug: "kinetic-velocity-x1",
    category: "Performance / Running",
    price: 160.0,
    rating: 4.8,
    reviewsCount: 124,
    description: "Lightweight, responsive cushioning for your fastest runs. Engineered with our signature Kinetic Energy Return foam and ultra-breathable AeroMesh.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALg9FWakTXhRbO5dM6Pmk_z4RisVI7aA-kpJrzwG2aBI0FLXLErWYny2WYhTmt32FRPNRHrjGLCTdD1Q84jjooVKRN4F80VAGSJHM9-6ecDFqFXys3d9mG_x_tGoGX_RjZyH8PwtAKpwQIMGASgLq6EWSNd9WQi5d_7J82WCweFhaeoiXXZc8tERAXo_7_ndh7m9x7iTkA_ZHi5LwDLrEZY2LGW7Izb8bL9S209rb9VZZM5jqh85xOUMi92KCw95ROJO0hBfRup-c",
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBktfWkyxtqoddKVxmeJTTu_rRNeNq_dJsjcRTsFyWwUnsqxwAxpHXuVbxylnTOcI2_WwW7HlFIR6TgJ1byttt5NgR74abyPuOrO0b5toRrInGDnFT72Bpe6Oq3wMHRKd7NtPTcfMLslU2yIwysCByGpnWw3PZoVxrI21HqidYwbaHJVeGFe2LrjyJ8S9Qqq1L7lyJmt2vdSNWSBwlEUZEtfS8W3RlGgziARyUNFzh0EwNl25QHO21N0QzzFCKnFtkjoKeF3txPI_U",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC3vXA9o-g63yGEaqEWfCd5LchEcn25T_6Wx4rHL_csn-sgOOR6oh-f38CgfgXtfxPITriKIi5h01A-oSS03m2dUwNLVChmcFj6RBPBEN02T31Fr-R8RuGDwoKqt64TfdcpivlYv553_8QeGy8Gqcsjzye_NT22G6DmM_Ka9jdre8YTyK7PESoX1sQZNtj4O4M7uj4RiSN2mYaiOzxydFAMBU-j0YoxceIh61k3n-LleFjX4hdOAo8rxfMFvulIi3hda9_HZC3TRhs",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJYQoPqVlN68R4Zc2XoLAahAmFRqsX-rHSq9zRqsL50_I4a1FT16SznzZhDUKtQxYALjrmGStAJqnvd4BuYxt1qiiv_iRmovUQxbqT5GhZG4srBwfovEK4XPcyuMOX6ogLyo8ncApMa7TkBBXnKynxyA9yrZ92jmvshMi7NtOGjieIpZlKzX7OpgV66QV512xzVPK2L7ehhUxmd7Fjr-Jenj_HE0jIcomMoJRa6FgkFyLll8qVAET9fZMMK8zcUZpfIMVIcHmnHjc"
    ],
    isNew: true,
    colors: ["#1c1b1b", "#ffffff", "#ff6b00", "#0062a1", "#8e7164"],
    sizes: ["7", "8", "9", "10", "11", "12", "13"]
  },
  {
    id: "2",
    name: "K-Series Alpha V1",
    slug: "k-series-alpha-v1",
    category: "Performance Running",
    price: 185.0,
    rating: 4.5,
    reviewsCount: 124,
    description: "Limited drop performance runner with high-energy return.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRq45rwtcRVXMbuGQ9j8ntdYXF8dfhCPGozuzweOv55yp379LqefHEru1HbLFlqdzb4eo6dNJJqqvr1KSzLoRVwJJdyIOfxcZ7lnWg4b24pilD5vD63ueSe0Z51g3Gank8MthUTpTiZlcZaWEQ-UM4fNWNwzzIXBMM26NPBLvvBJ9xOlwvJlAVZ2t0mgIUDUgiE2UzbTkVl8L0vd_O3DHmRHC2MHav-MLtQGnCbtB7zp15GAA1luX81j3Fw_53CKjZXD-kuSIqCL8",
    thumbnails: [],
    isLimited: true,
    colors: ["#1c1b1b"],
    sizes: ["7", "8", "9", "10"]
  },
  {
    id: "3",
    name: "AeroFlow Elite",
    slug: "aeroflow-elite",
    category: "Marathon Training",
    price: 210.0,
    rating: 4.0,
    reviewsCount: 86,
    description: "Engineered for long distance comfort and airflow.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAh46cSXGWjw3DXtX7k1K4vYoZA7fQllRkSibhzkDUESwnq4fmBn82B2_SLiT4SOj3HMld2PD6Zhh-BLrlEBtnGhaO774wbo8ny-_HZ3-SIl3XbpuYAQNTkpFn_A75tmPX-mZIvnIjdx5LXoalHtlucWVoP-LF21EaKSblibO5p-CgUr1HEJou0lLZEfK_paUTo6w8bzKxdIqIT75mJN_sUq40AJCwUWfehCCLZVv2GsOgzfQQjz5K5KrfBSTdEKqj_YHY-FoPv1YM",
    thumbnails: [],
    colors: ["#00ff00"],
    sizes: ["7", "8", "9", "10", "11"]
  },
  {
    id: "4",
    name: "Vortex Sky High",
    slug: "vortex-sky-high",
    category: "Street Culture",
    price: 245.0,
    rating: 5.0,
    reviewsCount: 215,
    description: "Artistic high-top sneaker for the urban explorer.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoMDjc59DDzG8xyGFTSH6p4U0C6tf_2ZbeDJpPR9aONd5Xi1BbdADShrXq57XGH9-oPfCVcfCPOMZWzF8F5smneIDu6zd-NX69apJJLHXnrQBKaCHBtMWTHxxp06_wZSLVprn90WMAa8TFFWFSNHB1Ge_u1gb8phKtOwVleAJ3znVin_xSw0RsIbCPMWmZIb3cz039O8WrlleK88vWCyls1xwefAkRfXQ3uzJvpUej0YYsPWKCA0oShkWQ6wOu2SkKRhR0d6Vv9bo",
    thumbnails: [],
    isNew: true,
    colors: ["#800080", "#ffff00"],
    sizes: ["8", "9", "10", "11", "12"]
  },
  {
    id: "5",
    name: "Zenith Minimalist",
    slug: "zenith-minimalist",
    category: "Lifestyle",
    price: 160.0,
    rating: 4.2,
    reviewsCount: 42,
    description: "Clean, minimalist design for everyday wear.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJmaBjNKu6_EcT3nADtqTbe-2p8Br8wY2PHnXn-qPBUf9aVYptlAHcO20qVcTphgXaTbxlZlxQ7-fkcmtispP4qQnR6MqqypeoVscAAzM8yJaaXENpcw3uc4Q1wdXGrSHwRiQHtJEdDhQa3E8wISC4I0RO-I2oJsr2YObsGDf01isRDEdXn8zkPCy9NxdR_r6zrckQc4xjWsuzt9A4g6tyJ6PrE6VsdYVRVSqogrnyFos0XwjPuiOTjYDrGnpzBVX2J0qYHpZ8M4M",
    thumbnails: [],
    colors: ["#ffffff"],
    sizes: ["7", "8", "9", "10"]
  },
  {
    id: "6",
    name: "Titan Core Pro",
    slug: "titan-core-pro",
    category: "Basketball",
    price: 195.0,
    rating: 5.0,
    reviewsCount: 310,
    description: "Sleek black and gold professional basketball shoe.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOCthXUgcy02MVF_Ojd4dKiPZMZCtWknT6kdd44Tc1UZQsK3QawL9qkzmRtXGy5P1B-F-A3jbx_iw_PJEJhh08b5FNw1xs4benHz9UjSqNwnQiR1LAioaiR1i04d_I6cvtG8DNpEHQY5_S4PhUdupbaqHn9MmQ1REvEwxGXuB6-l5AW1vHIOt_vTN34XBLOdiXKs360MZeeQewa575OBRa1nWDU68wU6DvvbQ4JjSMNVGXAuVLRS86p1PVkGH3vLRX7Q2SiELTiWI",
    thumbnails: [],
    colors: ["#000000", "#ffd700"],
    sizes: ["9", "10", "11", "12", "13"]
  },
  {
    id: "7",
    name: "Cloud Runner Pro",
    slug: "cloud-runner-pro",
    category: "Road Running",
    price: 225.0,
    rating: 4.0,
    reviewsCount: 56,
    description: "High-performance road running shoe with complex texture.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgS3HIQxJ3-vDpv7-BrA9lOmWYMzKfzwncWJ9XF1YfLpCjkFetD6qeyAIoWhfUpQ5W6bWKbGq7TcfxzubDRe1z5ERFhRyL9LCBfFYNO7uZ3BRvLFjp2hmQ8e8AgeEVrdMe_yBBMp6EIRyTtFbndz2neFQZSzJJbBODE3kXtiMp_beCQJ35WguCZBjipQIdNHRHeQF2LOC59IRr0oDvxFzO3-8bEdVSHMQgHvZytNrZLmB-7joxGb7F_nAOVyf_TapNn5IkLVaXF2w",
    thumbnails: [],
    colors: ["#ffffff"],
    sizes: ["7", "8", "9", "10", "11"]
  },
  {
    id: "8",
    name: "Classic Street Lo",
    slug: "classic-street-lo",
    category: "Artisan Series / Bone White",
    price: 120.0,
    rating: 4.5,
    reviewsCount: 88,
    description: "Fashion-forward white high-top sneaker with intricate leather panelling.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCs-3W81pv6civzg-aEramxMNDifcABUfTZW0xAx3mVcPbPSiK-g5xUw5vdvogcNEEhf88s4DkhtL8aDvKxN9GciaNPDMc2mc5dS4p-w3Y2oiCxx5wAT154nZCgVGllgFJLkqVXYWPmQ3nXdrm1M1WxrAhrBfT7T5G-4vb6f-sFdteT4Tmz-bv_EVqQcYeEclUNDu1lhW7-L-CICTCPlh0GSWHkOwGHxgHLx4ljAw1SVdmEZUplvF8C3jS1bqnKno_QdfqtqewBa_I",
    thumbnails: [],
    colors: ["#f5f5dc"],
    sizes: ["7", "8", "9", "10"]
  }
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Marcus L.",
    initials: "ML",
    rating: 5,
    date: "2 Days ago",
    title: "Best racing shoe yet",
    content: "The responsiveness is unparalleled. Shaved 2 minutes off my 10k PR on the first run. The lock-down feel is perfect."
  },
  {
    id: "r2",
    author: "Jenny S.",
    initials: "JS",
    rating: 5,
    date: "1 Week ago",
    title: "Insane breathability",
    content: "Ran in 90-degree humidity and my feet felt fresh the whole time. The AeroMesh is no joke. Plus the orange pops!"
  },
  {
    id: "r3",
    author: "Robert B.",
    initials: "RB",
    rating: 4,
    date: "2 Weeks ago",
    title: "Great daily trainer",
    content: "A bit firm for slow recovery runs, but once you pick up the pace, they really come alive. Very durable so far."
  }
];

export const MOCK_USER: UserProfile = {
  name: "Julian Sterling",
  email: "j.sterling@kinetic.gallery",
  phone: "+1 (555) 012-3456",
  location: "New York, NY",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Julian",
  status: "ELITE STATUS"
};

export const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-88219",
    date: "March 24, 2024",
    status: "Delivered",
    total: 345.00,
    items: [
      { ...PRODUCTS[0], quantity: 1, selectedSize: "10" },
      { ...PRODUCTS[1], quantity: 1, selectedSize: "10" }
    ]
  },
  {
    id: "ORD-77102",
    date: "February 12, 2024",
    status: "Delivered",
    total: 195.00,
    items: [
      { ...PRODUCTS[5], quantity: 1, selectedSize: "11" }
    ]
  }
];
