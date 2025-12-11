import { useState, useEffect } from "react";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Article content mock data
  const article = {
    title: "The Beauty of Exploring New Cultures",
    author: "Jane Doe",
    date: "April 5, 2025",
    image: "https://placehold.co/800x450",
    summary:
      "Exploring new cultures opens the door to a deeper understanding of the world and ourselves. This article delves into the transformative power of cultural experiences.",
    content: `
      <p>Traveling to different parts of the world not only broadens your horizons but also reshapes your perception of life. Each culture brings its unique traditions, foods, languages, and philosophies that can deeply enrich our lives.</p>

      <h2 class="text-2xl font-bold mt-6 mb-3">Why Cultural Immersion Matters</h2>
      <p>Cultural immersion allows us to step outside our comfort zones and engage with communities in meaningful ways. Whether it's learning a local dance, sharing a meal with a family, or participating in a traditional festival, these moments create lasting memories and foster empathy.</p>

      <h2 class="text-2xl font-bold mt-6 mb-3">Challenges and Growth</h2>
      <p>While exploring new cultures can be challenging—especially when facing language barriers or unfamiliar customs—it's often in those moments that we grow the most. These challenges teach resilience, adaptability, and open-mindedness.</p>

      <h2 class="text-2xl font-bold mt-6 mb-3">Tips for Embracing New Cultures</h2>
      <ul class="list-disc pl-6 space-y-1">
        <li>Learn basic phrases in the local language</li>
        <li>Respect local customs and dress codes</li>
        <li>Engage with locals respectfully and curiously</li>
        <li>Try authentic cuisine without hesitation</li>
        <li>Document your experiences through journaling or photography</li>
      </ul>

      <p class="mt-6">Ultimately, the journey of discovering new cultures is as much about understanding others as it is about self-discovery. It’s an adventure that leaves you richer in spirit and perspective.</p>
    `,
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            {article.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
            <span>By {article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
          </div>
          <img
            src={article.image}
            alt="Article cover"
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <p className="mt-4 italic text-gray-700">{article.summary}</p>
        </div>
      </section>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div
          dangerouslySetInnerHTML={{ __html: article.content }}
          className="prose max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:my-4 prose-ul:pl-6 prose-li:mb-1 prose-a:text-indigo-600 hover:prose-a:text-indigo-800"
        ></div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-600">
          <p>&copy; 2025 WanderJournal. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
