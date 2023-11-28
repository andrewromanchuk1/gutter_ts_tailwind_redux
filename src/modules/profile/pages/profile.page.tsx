import React from 'react'
import ProfileBanner from '../components/profile-banner/profile-banner.component'
import Feed from '../../feed/components/feed/feed.component'
import { useGetProfileFeedQuery } from '../../feed/api/repository'
import { useLocation, useParams } from 'react-router-dom'
import { usePageParam } from '../../feed/hooks/use-page-param.hook'
import Container from '../../../common/components/container/container.component'
import FeedToggle from '../../feed/components/feed-toggle/feed-toggle.component'

type ProfilePageProps = {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const { page } = usePageParam();
  const { profile } = useParams();
  const { pathname } = useLocation();

  const { data, isLoading, isFetching, error } = useGetProfileFeedQuery({
    page, 
    author: profile!,
    isFavorited: pathname.includes(`/@/${encodeURIComponent(profile!)}/favorites`),
  })

  const feedToggleItems = [{
      text: 'Favorited articles',
      link: `/@/${encodeURIComponent(profile!)}/favorites`
  }]

  return (
    <>
      <ProfileBanner username={profile!}/>
      <Container>
        <FeedToggle 
          defaultText='My Articles' 
          defaultLink={`/@/${encodeURIComponent(profile!)}`} 
          items={feedToggleItems}
        />
        <Feed 
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
          error={error}
        />
      </Container>
    </>
  )
}

export default ProfilePage