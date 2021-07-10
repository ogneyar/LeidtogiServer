import { useRouter } from 'next/router'
import App from '../../components/App'

const PageId = () => {
  const router = useRouter()
  const { pid } = router.query

  return <App />
}

export default PageId