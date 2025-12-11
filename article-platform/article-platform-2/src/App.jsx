import React from "react";
import {
  Code,
  Terminal,
  Github,
  ExternalLink,
  ChevronRight,
  Calendar,
  Clock,
  User,
} from "lucide-react";

const App = () => {
  const articleMetadata = {
    title: "Mastering Python: Advanced Techniques for Modern Development",
    author: "Alex Chen",
    date: "March 15, 2024",
    readTime: "8 min read",
    tags: ["Python", "Programming", "Best Practices", "Advanced"],
  };

  const codeExamples = [
    {
      title: "Context Managers with Custom Classes",
      language: "python",
      code: `class DatabaseConnection:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.connection = None
    
    def __enter__(self):
        self.connection = connect_to_db(self.host, self.port)
        return self.connection
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.connection:
            self.connection.close()

# Usage
with DatabaseConnection("localhost", 5432) as db:
    result = db.query("SELECT * FROM users")`,
    },
    {
      title: "Async/Await Pattern for Concurrent Operations",
      language: "python",
      code: `import asyncio
import aiohttp

async def fetch_url(session, url):
    async with session.get(url) as response:
        return await response.text()

async def main():
    urls = ["https://api.example.com/data1", 
            "https://api.example.com/data2"]
    
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
        return results

# Run the async function
data = asyncio.run(main())`,
    },
    {
      title: "Type Hints with Generics",
      language: "python",
      code: `from typing import TypeVar, Generic, List

T = TypeVar('T')

class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: List[T] = []
    
    def push(self, item: T) -> None:
        self._items.append(item)
    
    def pop(self) -> T:
        return self._items.pop()
    
    def peek(self) -> T:
        return self._items[-1]

# Usage with type safety
int_stack: Stack[int] = Stack()
int_stack.push(42)
value = int_stack.pop()  # Type checker knows this is int`,
    },
  ];

  const tips = [
    "Use f-strings for string formatting instead of .format() or % formatting",
    "Leverage pathlib for file system operations instead of os.path",
    "Prefer enumerate() over range(len()) when iterating with indices",
    "Use collections.Counter for counting hashable objects efficiently",
    "Implement __repr__ methods for better debugging experience",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Code className="w-4 h-4" />
            <span>Python Programming</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            {articleMetadata.title}
          </h1>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm mb-8 pb-6 border-b">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{articleMetadata.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{articleMetadata.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{articleMetadata.readTime}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {articleMetadata.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            Python continues to dominate the programming landscape, but
            mastering its advanced features can significantly elevate your code
            quality and performance. In this comprehensive guide, we'll explore
            sophisticated Python techniques that separate beginners from
            experts.
          </p>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Why Advanced Python Matters
            </h2>
            <p className="opacity-90 leading-relaxed">
              As Python applications grow in complexity, understanding advanced
              patterns becomes crucial for maintainability, performance, and
              developer experience. These techniques not only make your code
              more robust but also demonstrate professional mastery of the
              language.
            </p>
          </div>
        </section>

        {/* Code Examples Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b">
            Advanced Code Patterns
          </h2>

          {codeExamples.map((example, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {example.title}
              </h3>
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {example.language}
                  </span>
                </div>
                <pre className="p-6 text-gray-100 text-sm overflow-x-auto">
                  <code>{example.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </section>

        {/* Best Practices Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b">
            Essential Best Practices
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Performance Tips */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Performance Optimization
          </h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Memory Efficiency Tips
            </h3>
            <ul className="text-yellow-700 space-y-2">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 mt-1 flex-shrink-0" />
                Use generators instead of lists for large datasets
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 mt-1 flex-shrink-0" />
                Leverage __slots__ to reduce memory overhead in classes
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 mt-1 flex-shrink-0" />
                Use collections.deque for efficient append/pop operations
              </li>
            </ul>
          </div>
        </section>

        {/* Conclusion */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Mastering these advanced Python techniques will significantly
            improve your code quality, performance, and maintainability.
            Remember that the key to becoming an expert Python developer is not
            just knowing these patterns, but understanding when and why to use
            them.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              <Github className="w-4 h-4" />
              View Code Examples on GitHub
            </button>
            <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              <ExternalLink className="w-4 h-4" />
              Python Documentation
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Code className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold">Python Mastery</span>
          </div>
          <p className="text-gray-400 mb-6">
            Elevating Python development through advanced techniques and best
            practices
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <span>© 2024 Python Mastery</span>
            <span>•</span>
            <span>All code examples are MIT licensed</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
