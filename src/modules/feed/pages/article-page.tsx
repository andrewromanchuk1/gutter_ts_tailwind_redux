import { FC } from "react"
import ArticleBanner from "../components/article-banner/article-banner.component"
import Container from "../../../common/components/container/container.component"
import TagList from "../components/tag-list/tag-list.component"
import ArticleMeta from "../components/article-meta/article-meta.component"
import { useGetSingleArticleQuery } from "../api/repository"
import { useParams } from "react-router-dom"
import CommentsList from "../components/comments-list/comments-list.componnent"
import MDEditor from "@uiw/react-md-editor"


interface ArticlePageProps {}

const convertNewLines = (body: string) => {
  return body.split('\\n').join(' ');
}

const ArticlePage: FC<ArticlePageProps> = () => {
  
  const {slug} = useParams();

  const {data, isLoading} = useGetSingleArticleQuery({slug: slug!});

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
        slug={slug!}
        isFavorited={data.article.favorited}
      />
      <Container>
        <div className="pb-8 border-b mb-6">
          <MDEditor.Markdown 
            source={convertNewLines(data.article.body)} 
            className="font-sourceSerif text-articleBody leading-articleBody mb-8 bg-white text-conduit-gray-1000" 
          />
          <TagList list={data.article.tagList}/>
        </div> 
        <div className="flex justify-center">
          <ArticleMeta 
            author={data.article.author}
            likes={data.article.favoritesCount}
            publishedAt={data.article.createdAt}
            authorNameStyle="GREEN"
            slug={slug!}
            isFavorited={data.article.favorited}
          />
        </div>
        <CommentsList />
      </Container>
    </>
  )
}

export default ArticlePage