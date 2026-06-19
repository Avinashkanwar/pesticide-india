import React from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopSidebar from '../components/DesktopSidebar';
import { BookOpen, ArrowRight } from 'lucide-react';

const DUMMY_ARTICLES = [
  {
    id: 1,
    category: "Disease",
    title: "Identifying Tomato Leaf Curl Virus (TYLCV)",
    description: "Learn how to spot the early signs of TYLCV, understand the role of whiteflies in transmission, and discover effective control measures.",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    readTime: "5 min read",
    date: "Oct 12, 2023"
  },
  {
    id: 2,
    category: "Pest Control",
    title: "Managing Fall Armyworm in Maize",
    description: "A comprehensive guide to monitoring and managing Fall Armyworm infestations using integrated pest management strategies.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    readTime: "8 min read",
    date: "Sep 28, 2023"
  },
  {
    id: 3,
    category: "Best Practices",
    title: "Optimizing Fertilizer Application for Maximum Yield",
    description: "Discover the best techniques for applying fertilizers at the right time and in the correct quantities to boost your crop yield.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    readTime: "6 min read",
    date: "Sep 15, 2023"
  },
  {
    id: 4,
    category: "Disease",
    title: "Wheat Rust: Types, Symptoms, and Management",
    description: "Identify the differences between stem, leaf, and stripe rust in wheat and learn how to implement effective fungicide programs.",
    image: "https://images.unsplash.com/photo-1501430654243-c934cec2e1c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    readTime: "7 min read",
    date: "Aug 30, 2023"
  }
];

const ArticleScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-sans flex overflow-hidden" style={{background: '#FFFFFF'}}>
      <DesktopSidebar />
      
      <div className="flex-1 ml-24 flex flex-col min-w-0 h-screen overflow-y-auto pb-10">
        {/* Header */}
        <header className="pt-8 pb-6 px-8 max-w-[1600px] w-full mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
              <BookOpen size={24} className="text-[#00693B]" />
            </div>
            <h1 className="text-4xl font-extrabold text-[#00693B] tracking-tight">Farming Knowledge Base</h1>
          </div>
          <p className="text-[#333333] font-medium">Expert articles on crop diseases, pest control, and farming best practices.</p>
        </header>

        <main className="max-w-[1600px] mx-auto px-8 w-full flex-1 flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {DUMMY_ARTICLES.map((article) => (
              <div 
                key={article.id} 
                onClick={() => navigate(`/articles/${article.id}`)}
                className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer"
              >
                {/* Image container */}
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-[#00693B] shadow-sm">
                    {article.category}
                  </div>
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between text-xs font-medium text-[#333333] mb-3">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-bold text-xl text-[#00693B] leading-tight mb-3 group-hover:text-[#333333] transition-colors">{article.title}</h3>
                  <p className="text-sm text-[#333333] line-clamp-3 mb-6 flex-1">
                    {article.description}
                  </p>
                  
                  {/* Button */}
                  <div className="mt-auto flex items-center gap-2 text-sm font-bold text-[#00693B] group-hover:gap-3 transition-all">
                    Read Article <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ArticleScreen;
