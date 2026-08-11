export interface Quote {
  id: string;
  text: string;
  author: string;
  category: string;
  imageUrl: string;
}

export const quotesData: Quote[] = [
  // --- Software Engineering & Technology ---
  {
    id: "tech-1",
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
    category: "Software Engineering",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "tech-2",
    text: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
    category: "Software Engineering",
    imageUrl:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "tech-3",
    text: "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.",
    author: "John Woods",
    category: "Software Engineering",
    imageUrl:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "tech-4",
    text: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
    category: "Technology",
    imageUrl:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "tech-5",
    text: "The most dangerous phrase in the language is, 'We've always done it this way.'",
    author: "Grace Hopper",
    category: "Technology",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "tech-6",
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    category: "Software Engineering",
    imageUrl:
      "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "tech-7",
    text: "Sometimes it is the people no one can imagine anything of who do the things no one can imagine.",
    author: "Alan Turing",
    category: "Technology",
    imageUrl:
      "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&q=80&w=1000",
  },

  // --- Science & Discovery ---
  {
    id: "sci-1",
    text: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
    author: "Marie Curie",
    category: "Science",
    imageUrl:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "sci-2",
    text: "Chance favors only the prepared mind.",
    author: "Louis Pasteur",
    category: "Science",
    imageUrl:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "sci-3",
    text: "Science and everyday life cannot and should not be separated.",
    author: "Rosalind Franklin",
    category: "Science",
    imageUrl:
      "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "sci-4",
    text: "The good thing about science is that it's true whether or not you believe in it.",
    author: "Neil deGrasse Tyson",
    category: "Science",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "sci-5",
    text: "Somewhere, something incredible is waiting to be known.",
    author: "Carl Sagan",
    category: "Science",
    imageUrl:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "sci-6",
    text: "What you do makes a difference, and you have to decide what kind of difference you want to make.",
    author: "Jane Goodall",
    category: "Science",
    imageUrl:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "sci-7",
    text: "If I have seen further it is by standing on the shoulders of Giants.",
    author: "Isaac Newton",
    category: "Science",
    imageUrl:
      "https://images.unsplash.com/photo-1447433583501-b51786f9af3b?auto=format&fit=crop&q=80&w=1000",
  },

  // --- Perseverance & Hard Work ---
  {
    id: "per-1",
    text: "Genius is one percent inspiration and ninety-nine percent perspiration.",
    author: "Thomas Edison",
    category: "Perseverance",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "per-2",
    text: "Nothing ever comes to one, that is worth having, except as a result of hard work.",
    author: "Booker T. Washington",
    category: "Perseverance",
    imageUrl:
      "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "per-3",
    text: "I have not failed. I've just found 10,000 ways that won't work.",
    author: "Thomas Edison",
    category: "Perseverance",
    imageUrl:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "per-4",
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "Perseverance",
    imageUrl:
      "https://images.unsplash.com/photo-1483366774565-c78efb8f43eb?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "per-5",
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "Perseverance",
    imageUrl:
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "per-6",
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    category: "Perseverance",
    imageUrl:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=1000",
  },
];
