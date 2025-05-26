'use client'

import { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Line, Pie, Radar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend)

type User = {
  id: number
  firstName: string
  lastName: string
  company: {
    department: string
  }
}

export default function AnalyticsPage() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('https://dummyjson.com/users?limit=100')
      const data = await res.json()
      setUsers(data.users)
    }
    fetchUsers()
  }, [])

  // 📊 Department-wise average ratings
  const departmentRatings: { [key: string]: number[] } = {}
  users.forEach((user) => {
    const department = user.company.department
    const rating = (user.id % 5) + 1
    if (!departmentRatings[department]) {
      departmentRatings[department] = []
    }
    departmentRatings[department].push(rating)
  })

  const departmentLabels = Object.keys(departmentRatings)
  const departmentAvgRatings = departmentLabels.map((dept) => {
    const ratings = departmentRatings[dept]
    return parseFloat((ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2))
  })

  // Chart Configs
  const barData = {
    labels: departmentLabels,
    datasets: [
      {
        label: 'Average Rating',
        data: departmentAvgRatings,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  }

  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Bookmarks Added',
        data: [2, 4, 3, 6, 1, 5, 7],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.3)',
        tension: 0.3,
      },
    ],
  }

  const pieData = {
    labels: ['Browsing', 'Bookmarking', 'Commenting', 'Sharing'],
    datasets: [
      {
        label: 'User Engagement',
        data: [300, 150, 100, 50],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverOffset: 6,
      },
    ],
  }

  const radarData = {
    labels: ['Communication', 'Tech Skills', 'Teamwork', 'Problem Solving', 'Leadership'],
    datasets: [
      {
        label: 'Employee A',
        data: [4, 3, 5, 4, 3],
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
      },
      {
        label: 'Employee B',
        data: [3, 4, 4, 3, 5],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
      },
    ],
  }

  const commonOptions = (title: string) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: title,
        font: { size: 18 },
      },
    },
  })

  return (
    <div className="p-8 bg-gray-100 h-screen w-full overflow-auto dark:bg-neutral-800">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">📊 Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg h-[400px]">
          <Bar data={barData} title={'Department-wise Average Ratings'} />
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg h-[400px]">
          <Line data={lineData} title="Weekly Bookmark Trends (Mocked)" />
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg h-[400px]">
          <Pie data={pieData} title="User Engagement Distribution" />
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg h-[400px]">
          <Radar data={radarData} title="Employee Performance Comparison" />
        </div>
      </div>
    </div>
  )
}
