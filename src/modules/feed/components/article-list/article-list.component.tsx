import React from 'react'
import Article from '../article/article.component'
import { FeedArticle } from '../../api/dto/global-feed.in'

interface ArticleListProps { 
  list: FeedArticle[];
}

const ArticleList: React.FC<ArticleListProps> = ({list}) => {
  console.log(list)
  return (
    <div>
      {list.map((article) => (
        <Article key={article.slug} {...article}/>
      ))}
    </div>
  )
}

export default ArticleList