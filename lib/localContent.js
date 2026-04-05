import {
  getLocalPostById as getLocalGalleryPostById,
  getLocalPosts as getLocalGalleryPosts
} from "@/lib/localCollection";

const fallbackAuthor = {
  id: "local-author",
  name: "Dr. Amrendra Suman",
  bio: "Since the 1990s, Dr. Amrendra Suman has remained deeply engaged in mainstream media journalism on public issues and social problems while writing across multiple genres of Hindi literature and working as an independent journalist.",
  profile_image: "/images/author/amrendra-suman-formal.jpeg",
  cover_image: "/images/author/amrendra-suman-about.jpeg",
  email: "amrendrasuman.dumka@gmail.com",
  about: {
    eyebrow: "About the author",
    title: "Journalism, Hindi literature, and a long public archive of writing.",
    details: [
      {
        label: "Birthplace",
        value: "Chakai (Jamui), Bihar, India"
      },
      {
        label: "Education",
        value: "M.A. (Economics), M.A. in Journalism and Mass Communications, LL.B."
      },
      {
        label: "Doctorate",
        value:
          "Awarded the degree of Doctorate of Philosophy (Ph.D.) in the specialized area of Social Work in Law Services from Social Awareness and Peace University, Florida (USA) on August 13, 2023."
      },
      {
        label: "Address",
        value: '"Mani Villa", Kevat Pada (Mortanga Road), Old Dumka, District - Dumka, Jharkhand, India'
      },
      {
        label: "Mobile",
        value: "9431779546 / 8409718050"
      },
      {
        label: "Email",
        value: "amrendrasuman.dumka@gmail.com"
      }
    ],
    sections: [
      {
        title: "Profile",
        paragraphs: [
          "Since the 1990s, he has been continuously involved in mainstream media journalism on public issues and social problems, along with writing in various genres of Hindi literature and working as an independent journalist."
        ]
      },
      {
        title: "Education",
        paragraphs: [
          "M.A. (Economics), M.A. in Journalism and Mass Communications, LL.B.",
          "Awarded the degree of Doctorate of Philosophy (Ph.D.) in the specialized area of Social Work in Law Services from Social Awareness and Peace University, Florida (USA) on August 13, 2023."
        ]
      },
      {
        title: "Publications",
        fullWidth: true,
        paragraphs: [
          "His works have been published in many prestigious literary magazines across the country such as Sakshya, Samajh, Mukti Parv, Janpath, Parikatha, Parinde, Adhunik Sahitya, Laghu Katha Kalash, Shodh Srijan, Sahityanama, Baroh, Samhut, Swadhinata, Palash, Aviram, Susambhavya, Haiku, and Diwan Mera.",
          "His writing has also appeared in internet magazines including Setu (Pittsburgh, USA), Singapore Sangam (Singapore), Anhad Kriti (Ambala, Haryana), Amstel Ganga (Netherlands), Anubhuti-Abhivyakti, Swargvibha, Sujangatha, Rachnakar, Parivartan, Anugoonj, as well as the Government of India's monthly magazine Yojana, Grassroot, and the globally recognized magazine The Fame of Asia, which focuses on women empowerment.",
          "His poems, stories, short stories, memoirs, reportages, features, and research articles have also been regularly published in national and regional newspapers and magazines such as Dainik Hindustan, Dainik Bhaskar, Prabhat Khabar, Sanmarg, 7 Days, Ranchi Express, The Nation Agenda, Jharkhand Darshan, Bekhauf Kiran, and Shramvindu.",
          "His work has further appeared through feature agencies including Charkha (Delhi), Manthan (Ranchi), and Janmat Research Institute (Dumka, Jharkhand). Hundreds of his literary and journalistic works have been published over time."
        ]
      },
      {
        title: "Awards and Honors",
        fullWidth: true,
        paragraphs: [
          "Honored with the Comrade Mahendra Prasad Singh Memorial Award 2023 for outstanding literary journalism. The award was presented by Sahitya Akademi Award-winning poet Arun Kamal at a ceremony organized by the Jharkhand Sahitya Akademi Sangharsh Samiti at Press Club, Ranchi on April 30, 2023.",
          "Honored by the Akhil Bharatiya Kayastha Mahasabha, Jharkhand on April 16, 2023 in Dumka for outstanding contribution to mainstream journalism over the past three decades.",
          "Honored with the Anhad Kriti Annual Hindi Literary Energy Festival Special Recognition Award (2014-15) by the online literary magazine Anhad Kriti published from Haryana.",
          "Honored for significant participation in the International Seminar on the Importance of Translation in the International Perspective, held in Kathmandu, Nepal on December 19-20, 2012 by Nepal Sahitya Parishad, and awarded the Life of Goddess Memorial Memento.",
          "Honored on November 30, 2011 by the Akhil Bharatiya Pahadia Primitive Tribal Upliftment Committee (Maharashtra State Unit) for long-term contribution to mainstream and alternative journalism.",
          'Honored with the Late Nitish Kumar Das ("Danu Da") Memorial Award on International Press Day, November 16, 2009, for remarkable contribution in investigative journalism by Janmat Research Institute, Dumka (Jharkhand).',
          "Honored for poetry recitation at the Regional Poets Conference organized by the National Book Trust of India (New Delhi) in Pakur, Jharkhand.",
          "Delivered lectures as a Resource Person at the national-level media workshop organized by Sido Kanhu Murmu University, Dumka.",
          "Received several fellowships from Manthan Youth Institute, Ranchi and other institutions for contributions to literary, cultural, social activities, and media advocacy."
        ]
      },
      {
        title: "Contact",
        paragraphs: [
          'Address: "Mani Villa", Kevat Pada (Mortanga Road), Old Dumka, District - Dumka, Jharkhand, India.',
          "Mobile: 9431779546 / 8409718050",
          "Email: amrendrasuman.dumka@gmail.com"
        ]
      }
    ]
  },
  social_links: {
    instagram: "",
    x: "",
    website: ""
  }
};

const fallbackPoems = [
  {
    id: "poem-quiet-archive",
    title: "Quiet Archive",
    content:
      "I keep my smallest storms in paper folds,\nnot to hide them,\nbut to let them soften.\n\nSome evenings return as handwriting.\nSome names return as light on a table.\nAnd some poems remain unfinished\nbecause silence completed them first.",
    image_url: "/images/collection/image%202.jpeg",
    category: "Poem",
    type: "poem",
    created_at: "2026-03-24T08:20:00.000Z",
    published: true
  },
  {
    id: "poem-letter-at-dusk",
    title: "Letter at Dusk",
    content:
      "I wrote to evening\nwith the care of someone\naddressing an old wound.\n\nThe sky did not answer,\nbut the window changed color,\nand for a while\nthat felt like enough.",
    image_url: "/images/collection/WhatsApp%20Image%202026-03-20%20at%2014.16.09.jpeg",
    category: "Poem",
    type: "poem",
    created_at: "2026-03-23T19:10:00.000Z",
    published: true
  },
  {
    id: "poem-small-flame",
    title: "Small Flame",
    content:
      "Hope does not always arrive as thunder.\nSometimes it enters a room\nlike a match struck gently,\nbrief,\nsteady,\nrefusing extinction.",
    image_url: "/images/collection/WhatsApp%20Image%202026-03-20%20at%2014.16.10.jpeg",
    category: "Poem",
    type: "poem",
    created_at: "2026-03-22T07:40:00.000Z",
    published: true
  },
  {
    id: "poem-window-of-silence",
    title: "Window of Silence",
    content:
      "There is a kind of silence\nthat does not empty a room.\nIt gathers there,\nleaning softly against the glass,\nwaiting for a sentence brave enough\nto enter it.",
    image_url: "/images/collection/WhatsApp%20Image%202026-03-20%20at%2014.21.31.jpeg",
    category: "Poem",
    type: "poem",
    created_at: "2026-03-21T06:30:00.000Z",
    published: true
  }
];

const fallbackStories = [
  {
    id: "story-house-of-weather",
    title: "The House of Weather",
    content:
      "The old house held seasons in its walls. Rain returned as scent before it arrived as sound, and summer leaned through the corridor long before light reached the kitchen floor.\n\nWhen I was younger, I thought stories began with events. Now I think they begin with rooms. The right room keeps a memory alive until a sentence is ready for it.\n\nThis one began with a window, a metal latch, and the habit of standing still long enough for afternoon to notice me.",
    image_url: "/images/collection/WhatsApp%20Image%202026-03-20%20at%2014.22.15.jpeg",
    category: "Story",
    type: "story",
    created_at: "2026-03-25T10:15:00.000Z",
    published: true
  },
  {
    id: "story-city-after-rain",
    title: "City After Rain",
    content:
      "By the time the buses began moving again, the city had already changed its voice. The market spoke more softly. Shop signs reflected themselves in small, temporary rivers. People stepped carefully, as if the street had become a page that could smudge.\n\nI walked without urgency and kept thinking that some places only become readable after rain.",
    image_url: "/images/collection/WhatsApp%20Image%202026-03-20%20at%2014.24.02.jpeg",
    category: "Story",
    type: "story",
    created_at: "2026-03-19T17:25:00.000Z",
    published: true
  },
  {
    id: "story-last-gold",
    title: "Last Gold",
    content:
      "At the edge of evening, everything seemed briefly edited into kindness. The light forgave unfinished thoughts. Dust looked deliberate. Even the quiet between buildings felt composed.\n\nI wrote this piece after watching a day become generous in its final minutes, and realizing how much of writing is really a long practice of noticing.",
    image_url: "/images/collection/WhatsApp%20Image%202026-03-20%20at%2014.25.00.jpeg",
    category: "Essay",
    type: "story",
    created_at: "2026-03-18T18:45:00.000Z",
    published: true
  }
];

function getLocalGalleryEntries() {
  return getLocalGalleryPosts().map((post) => ({
    ...post,
    content:
      post.description ||
      "A gallery image from the local poetry collection, shown publicly as part of the author archive until the live Supabase gallery is populated.",
    category: post.category || "Gallery",
    type: "gallery",
    published: true
  }));
}

export function getFallbackAuthor() {
  return fallbackAuthor;
}

export function getLocalArchivePosts({ type = "", query = "", category = "", limit, includeUnpublished = false } = {}) {
  const combined = [...fallbackPoems, ...fallbackStories, ...getLocalGalleryEntries()]
    .filter((post) => (includeUnpublished ? true : post.published))
    .filter((post) => (type ? post.type === type : true))
    .filter((post) => (query ? post.title.toLowerCase().includes(String(query).toLowerCase()) : true))
    .filter((post) => (category ? post.category === category : true))
    .sort((left, right) => new Date(right.created_at).getTime() - new Date(left.created_at).getTime());

  return typeof limit === "number" ? combined.slice(0, limit) : combined;
}

export function getLocalArchivePostById(id) {
  return getLocalArchivePosts({ includeUnpublished: true }).find((post) => post.id === id) || getLocalGalleryPostById(id);
}

export function getLocalArchiveCategories({ type = "" } = {}) {
  return Array.from(
    new Set(
      getLocalArchivePosts({ type })
        .map((post) => post.category)
        .filter(Boolean)
    )
  ).sort((left, right) => left.localeCompare(right));
}
