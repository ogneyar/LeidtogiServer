import { useRouter } from 'next/router'

const HomePid = () => {
  const router = useRouter()
  const { pid } = router.query

  return <p>HomePid: {pid}</p>
}

export default HomePid