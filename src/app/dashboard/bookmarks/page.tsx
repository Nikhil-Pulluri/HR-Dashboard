import CardDemo from '@/components/card'
import type { User } from '@/components/card'
export default function Bookmarks() {
  const userData: User = {
    id: 1,
    firstName: 'Emily',
    lastName: 'Johnson',
    email: 'emily.johnson@x.dummyjson.com',
    age: 28,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    company: {
      department: 'Engineering',
    },
  }
  return (
    <div>
      <CardDemo user={userData} />
    </div>
  )
}
