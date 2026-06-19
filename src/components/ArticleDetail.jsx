import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DesktopSidebar from './DesktopSidebar';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

const DUMMY_ARTICLES = [
  {
    id: 1,
    category: "Disease",
    title: "Identifying Tomato Leaf Curl Virus (TYLCV)",
    description: "Learn how to spot the early signs of TYLCV, understand the role of whiteflies in transmission, and discover effective control measures.",
    content: "Tomato Yellow Leaf Curl Virus (TYLCV) is one of the most devastating plant diseases in the world, affecting tomato crops heavily in tropical and subtropical regions. The virus is transmitted by the silverleaf whitefly (Bemisia tabaci).\n\n**Symptoms:**\n- Upward curling of leaves\n- Yellowing (chlorosis) of leaf margins\n- Stunted plant growth\n- Flower drop and reduced fruit yield\n\n**Management:**\n1. Use resistant tomato varieties.\n2. Control the whitefly population using yellow sticky traps and appropriate insecticides like Coragen or Nativo.\n3. Remove and destroy infected plants immediately to prevent the spread to healthy plants.",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    readTime: "5 min read",
    date: "Oct 12, 2023"
  },
  {
    id: 2,
    category: "Pest Control",
    title: "Managing Fall Armyworm in Maize",
    description: "A comprehensive guide to monitoring and managing Fall Armyworm infestations using integrated pest management strategies.",
    content: "Fall Armyworm (Spodoptera frugiperda) is a highly destructive pest that feeds on the leaves and stems of more than 80 plant species, causing major damage to maize.\n\n**Identification:**\n- The caterpillars have a dark head with a distinct pale, inverted Y-shaped mark on the front.\n- Four dark spots arranged in a square on the second-to-last abdominal segment.\n\n**Management:**\n- **Early Detection:** Scout fields regularly. Look for egg masses and early instars.\n- **Chemical Control:** Spray insecticides such as Emamectin benzoate or Spinosad into the whorl of the maize plant where the caterpillars hide.\n- **Biological Control:** Encourage natural enemies like parasitic wasps and predators.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    readTime: "8 min read",
    date: "Sep 28, 2023"
  },
  {
    id: 3,
    category: "Best Practices",
    title: "Optimizing Fertilizer Application for Maximum Yield",
    description: "Discover the best techniques for applying fertilizers at the right time and in the correct quantities to boost your crop yield.",
    content: "Proper fertilizer management is crucial for achieving high crop yields and maintaining soil health while minimizing environmental impact.\n\n**The 4R Nutrient Stewardship:**\n1. **Right Source:** Match the fertilizer type to crop needs.\n2. **Right Rate:** Match the amount of fertilizer to crop needs based on soil testing.\n3. **Right Time:** Make nutrients available when the crop needs them.\n4. **Right Place:** Keep nutrients where crops can use them.\n\n**Tips:**\n- Split nitrogen applications to match crop uptake patterns and reduce leaching.\n- Use precision agriculture technologies to vary application rates based on field variability.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    readTime: "6 min read",
    date: "Sep 15, 2023"
  },
  {
    id: 4,
    category: "Disease",
    title: "Wheat Rust: Types, Symptoms, and Management",
    description: "Identify the differences between stem, leaf, and stripe rust in wheat and learn how to implement effective fungicide programs.",
    content: "Wheat rusts are devastating fungal diseases that can cause significant yield losses if left uncontrolled. There are three main types: Stem rust, Leaf rust, and Stripe (yellow) rust.\n\n**Symptoms:**\n- **Stem Rust:** Dark red, elongated pustules on stems and leaves.\n- **Leaf Rust:** Small, round, orange-red pustules primarily on leaves.\n- **Stripe Rust:** Yellow pustules arranged in distinct stripes on adult leaves.\n\n**Management:**\n- Plant resistant varieties.\n- Apply preventative fungicides containing Azoxystrobin or Tebuconazole (e.g., Amistar Top or Nativo) when environmental conditions favor disease development.",
    image: "https://images.unsplash.com/photo-1501430654243-c934cec2e1c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    readTime: "7 min read",
    date: "Aug 30, 2023"
  }
];

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Simulate fetching article by ID
    const found = DUMMY_ARTICLES.find(a => a.id === parseInt(id));
    setArticle(found);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen bg-white font-sans flex overflow-hidden">
        <DesktopSidebar active="articles" />
        <div className="flex-1 ml-24 flex items-center justify-center">
          <p className="text-[#333333]">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans flex overflow-hidden">
      <DesktopSidebar active="articles" />
      
      <div className="flex-1 ml-24 flex flex-col min-w-0 h-screen overflow-y-auto pb-20">
        <main className="max-w-[1000px] mx-auto w-full flex-1 flex flex-col">
          
          {/* Back Button */}
          <div className="pt-8 pb-4 px-8">
            <button 
              onClick={() => navigate('/articles')}
              className="flex items-center gap-2 text-sm font-bold text-[#333333] hover:text-[#00693B] transition-colors"
            >
              <ArrowLeft size={16} /> Back to Knowledge Base
            </button>
          </div>

          {/* Hero Image */}
          <div className="px-8 mb-8">
            <div className="w-full h-[400px] rounded-[32px] overflow-hidden relative shadow-lg shadow-gray-200/50">
              <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-xl text-sm font-bold text-[#00693B] shadow-sm">
                {article.category}
              </div>
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content Header */}
          <div className="px-8 max-w-[800px] mx-auto w-full mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#00693B] leading-tight mb-6">{article.title}</h1>
            <div className="flex items-center gap-6 text-sm font-medium text-[#333333] border-b border-gray-100 pb-8">
              <div className="flex items-center gap-2">
                <Calendar size={16} /> {article.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} /> {article.readTime}
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="px-8 max-w-[800px] mx-auto w-full prose prose-lg prose-emerald text-[#00693B]">
            {article.content.split('\n').map((paragraph, idx) => {
              if (paragraph.startsWith('**')) {
                const parts = paragraph.split('**');
                return (
                  <p key={idx} className="mb-4">
                    <strong className="text-[#00693B]">{parts[1]}</strong>
                    {parts[2]}
                  </p>
                );
              }
              if (paragraph.startsWith('- ') || paragraph.match(/^\d+\./)) {
                return <p key={idx} className="mb-2 pl-4 border-l-2 border-emerald-500">{paragraph}</p>;
              }
              if (!paragraph.trim()) return null;
              return <p key={idx} className="mb-6 leading-relaxed">{paragraph}</p>;
            })}
          </div>

        </main>
      </div>
    </div>
  );
};

export default ArticleDetail;
