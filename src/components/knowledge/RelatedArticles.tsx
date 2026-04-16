import ArticleCard from './ArticleCard';
import { Article } from '../../data/articles';
import { motion } from 'framer-motion';

interface RelatedArticlesProps {
    category: string;
    currentArticleId: number;
    relatedArticles: Article[];
}

export default function RelatedArticles({ category, currentArticleId, relatedArticles }: RelatedArticlesProps) {
    return (
        <motion.section
            className="py-24 border-t border-white/10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    className="text-4xl lg:text-5xl font-black text-white mb-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    You might also like
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {relatedArticles.map((article, index) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ArticleCard article={article} />
                        </motion.div>
                    ))}
                </div>

                {relatedArticles.length === 0 && (
                    <div className="text-center py-32">
                        <div className="text-6xl mb-8">🔍</div>
                        <h3 className="text-3xl font-bold text-white mb-4">No related articles</h3>
                        <p className="text-xl text-white/60">Check back later for more content in this category</p>
                    </div>
                )}
            </div>
        </motion.section>
    );
}

