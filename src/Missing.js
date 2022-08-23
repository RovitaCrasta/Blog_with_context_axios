import { Link} from 'react-router-dom'

const Missing = () => {
  return (
    <main className="Missiing">
        <h2>Post Not FOund!</h2>
        <p> Well, that's dissappointing.</p>
        <p>
            <Link to='/'>Visit Our Homepage</Link>
        </p>
    </main>
  )
}

export default Missing