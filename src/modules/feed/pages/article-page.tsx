import { FC } from "react"
import ArticleBanner from "../components/article-banner/article-banner.component"
import Container from "../../../common/components/container/container.component"
import TagList from "../components/tag-list/tag-list.component"
import ArticleMeta from "../components/article-meta/article-meta.component"
import { useGetSingleArticleQuery } from "../api/repository"
import { useParams } from "react-router-dom"
import CommentsList from "../components/comments-list/comments-list.componnent"


interface ArticlePageProps {}

const convertNewLines = (body: string) => {
  return body.split('\\n').join(' ');
}

const ArticlePage: FC<ArticlePageProps> = () => {
  
  const {slug} = useParams();

  const {data, isLoading} = useGetSingleArticleQuery({slug: slug!});

  console.log(data)

  if(isLoading) {
    return <h1>Loading...</h1>
  }

  if(!data) {
    return <h1>Article not found</h1>
  }
  
  return (
    <>
      <ArticleBanner 
        title={data.article.title} 
        author={data.article.author!} 
        likes={data.article.favoritesCount!}
        publishedAt={data.article.createdAt}
      />
      <Container>
        <div className="pb-8 border-b mb-6">
          <p className="font-sourceSerif text-articleBody leading-articleBody mb-8" dangerouslySetInnerHTML={{
            __html: convertNewLines(data.article.body)
          }}/>
          <TagList list={data.article.tagList}/>
        </div> 
        <div className="flex justify-center">
          <ArticleMeta
            author={data.article.author}
            likes={data.article.favoritesCount}
            publishedAt={data.article.createdAt}
            authorNameStyle="GREEN"
          />
        </div>
        <CommentsList />
      </Container>
    </>
  )
}

export default ArticlePage