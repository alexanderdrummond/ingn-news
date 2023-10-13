import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { GET_NEWS_ITEMS } from '../../utils/queries';
import Link from 'next/link';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default function AppHeader({ handleCategoryClick, selectedCategory, isLoginPage, isArticlePage }) {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  const { loading, error, data } = useQuery(GET_NEWS_ITEMS);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, [auth]);

  let categories = [];

  if (data) {
    categories = Array.from(new Set(data.newsitems.map(item => item.category)));
  }

  const isActive = (category) => selectedCategory === category;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <header className="bg-white shadow-md w-full">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-red-500 text-4xl">
          <Link legacyBehavior href="/">
            <a>INGN</a>
          </Link>
        </div>

        {!isLoginPage && !isArticlePage && (
          <div className="hidden md:flex space-x-4">
            <a
              href="#"
              className={`text-gray-600 ${!selectedCategory && 'text-red-500'} hover:text-red-500`}
              onClick={() => handleCategoryClick(null)}
            >
              All Posts
            </a>
            {categories.map((category, index) => (
              <a
                href="#"
                key={index}
                className={`text-gray-600 ${isActive(category) && 'text-red-500'} hover:text-red-500`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </a>
            ))}
          </div>
        )}

        <div className="md:hidden flex items-center space-x-2">
          {isLoginPage ? (
            <Link legacyBehavior href="/" passHref>
              <button>
                <Image src="/home.svg" alt="Home Icon" width={24} height={24} className="text-red-500" />
              </button>
            </Link>
          ) : (
            <button onClick={() => setShowMenu(!showMenu)}>
              <Image src="/menu.svg" alt="Menu Icon" width={24} height={24} className="text-red-500" />
            </button>
          )}
          {user ? (
            <button onClick={handleLogout}>
              <Image src="/logout.svg" alt="Logout Icon" width={24} height={24} className="text-red-500" />
            </button>
          ) : (
            <Link legacyBehavior href="/login" passHref>
              <button>
                <Image src="/login.svg" alt="Login Icon" width={24} height={24} className="text-red-500" />
              </button>
            </Link>
          )}
        </div>

        <div className="hidden md:block">
          {user ? (
            <button onClick={handleLogout}>
              <Image src="/logout.svg" alt="Logout Icon" width={24} height={24} className="text-red-500" />
            </button>
          ) : (
            <Link legacyBehavior href="/login" passHref>
              <button>
                <Image src="/login.svg" alt="Login Icon" width={24} height={24} className="text-red-500" />
              </button>
            </Link>
          )}
        </div>
      </div>

      {!isLoginPage && !isArticlePage && showMenu && (
        <div className="container mx-auto px-4 py-2">
          <a
            href="#"
            className={`block text-gray-600 ${!selectedCategory && 'text-red-500'} hover:text-red-500 py-1`}
            onClick={() => handleCategoryClick(null)}
          >
            All Posts
          </a>
          {categories.map((category, index) => (
            <a
              href="#"
              key={index}
              className={`block text-gray-600 ${isActive(category) && 'text-red-500'} hover:text-red-500 py-1`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
