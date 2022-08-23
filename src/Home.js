import Feed from "./Feed"
import { useContext } from 'react'
import DataContext from './context/DataContext'

const Home = () => {
  const { searchResults, fetchError, isLoading } = useContext(DataContext)
  return (
    <main className="Home">
      {isLoading && <p className="statusMasg">Loading posts....</p>}
      {!isLoading && fetchError && <p className="statusMasg" style={{color: "red"}}>{fetchError}</p>}
      {!fetchError && !isLoading && (searchResults.length ? (
        <Feed posts={searchResults} />
      ) : (
        <p className="statusMasg">No posts to display.</p>
      ))}
    </main>
  )
}

export default Home