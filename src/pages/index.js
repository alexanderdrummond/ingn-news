import { useState } from 'react';
import Header from "@/components/Header/AppHeader";
import NewsGrid from "@/components/News/NewsGrid";
import Footer from '@/components/Header/Footer';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <Header handleCategoryClick={handleCategoryClick} selectedCategory={selectedCategory} />
      <NewsGrid selectedCategory={selectedCategory} />
      <Footer />
    </div>
  );
}
