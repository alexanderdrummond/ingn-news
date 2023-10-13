import React, { useState, useContext } from "react";
import Link from 'next/link';
import { AuthContext } from '../../utils/authContext';
import { useMutation } from "@apollo/client";
import { DELETE_NEWS_ITEM, GET_NEWS_ITEMS } from '../../utils/queries';
import EditModal from "../Management/EditModal";

const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
};

export default function NewsCard({ newsItem, gridArea }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { user } = useContext(AuthContext);
    const titleCharacterLimit = "Revolutionerende Robotteknologi Fra DTU Truer".length;

    const formattedDate = new Date(newsItem.date).toLocaleDateString("en-GB", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const [deleteNewsItem] = useMutation(DELETE_NEWS_ITEM, {
        refetchQueries: [{ query: GET_NEWS_ITEMS }],
    });

    const handleDeleteClick = async () => {
        try {
            await deleteNewsItem({
                variables: {
                    where: { id: newsItem.id }
                }
            });
        } catch (error) {
            alert(error.message);
        }
    };

    const isSideLayout = ['a6', 'a7'].includes(gridArea);

    return (
        <div style={{ gridArea }} className={`bg-white flex ${isSideLayout ? 'flex-row' : 'flex-col'} relative`}>
            {isSideLayout ? (
                <>
                    {newsItem.photo && (
                        <div className="flex-none w-2/5 overflow-hidden">
                            <img src={newsItem.photo.url} alt={newsItem.title} className="object-cover w-full h-full" />
                        </div>
                    )}
                    <div className="p-4 flex-grow flex flex-col justify-between">
                        <div>
                            <h3 className={`text-xl font-semibold mb-1 ${newsItem.title.length > titleCharacterLimit ? 'w-64 break-words' : ''}`}>
                                {newsItem.title}
                            </h3>
                            <p className="text-sm text-red-500 mb-1">D. {formattedDate} - af {newsItem.author}</p>
                            {['a1', 'a6', 'a7'].includes(gridArea) && newsItem.content && (
                                <p className="text-md mb-2">{truncateContent(newsItem.content)}</p>
                            )}
                        </div>
                        <div className="flex justify-between items-center">
                            <Link legacyBehavior href={`/news/${newsItem.slug}`} passHref>
                                <a className="text-gray">Læs mere</a>
                            </Link>
                            {user && (
                                <div className="flex">
                                    <button onClick={() => setIsEditModalOpen(true)}>
                                        <img src="/update.svg" alt="Edit" className="inline-block ml-2" width="20" height="20" />
                                    </button>
                                    <button onClick={handleDeleteClick}>
                                        <img src="/delete.svg" alt="Delete" className="inline-block ml-2" width="20" height="20" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="p-4 flex-grow flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-1">{newsItem.title}</h3>
                            <p className="text-md text-red-500 mb-1">D. {formattedDate} - af {newsItem.author}</p>
                            {['a1', 'a6', 'a7'].includes(gridArea) && newsItem.content && (
                                <p className="text-md mb-2">{truncateContent(newsItem.content)}</p>
                            )}
                        </div>
                        <div className="flex justify-between items-center">
                            <Link legacyBehavior href={`/news/${newsItem.slug}`} passHref>
                                <a className="text-gray-500">Læs mere</a>
                            </Link>
                            {user && (
                                <div className="flex">
                                    <button onClick={() => setIsEditModalOpen(true)}>
                                        <img src="/update.svg" alt="Edit" className="inline-block ml-2" width="20" height="20" />
                                    </button>
                                    <button onClick={handleDeleteClick}>
                                    <img src="/delete.svg" alt="Delete" className="inline-block ml-2" width="20" height="20" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    {newsItem.photo && (
                        <div className="flex-grow overflow-hidden">
                            <img src={newsItem.photo.url} alt={newsItem.title} className="object-cover w-full h-full" />
                        </div>
                    )}
                </>
            )}
            <EditModal
                newsItem={newsItem}
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
            />
        </div>
    );
}