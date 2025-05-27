'use client'

import { Tabs, Tab, Card, CardBody, Badge } from '@heroui/react'
import { useMemo } from 'react'
import { FaStar } from 'react-icons/fa'

// Utility to generate a random rating
const getRandomRating = () => Math.floor(Math.random() * 5) + 1

// Random mock feedback
const feedbackSamples = [
  'Excellent problem-solving skills and team player.',
  'Misses deadlines occasionally, but produces quality work.',
  'Great communication and consistently exceeds expectations.',
  'Needs improvement in time management.',
  'Shows strong initiative and leadership qualities.',
]

// Random mock projects
const projectSamples = [
  'Redesigned the onboarding flow for new employees.',
  'Implemented a data visualization dashboard for HR KPIs.',
  'Automated the payroll processing system.',
  'Migrated internal tools from legacy systems.',
  'Led the diversity and inclusion initiative.',
]

export default function Tabbed() {
  const rating = useMemo(getRandomRating, [])

  const feedback = useMemo(() => Array.from({ length: 3 }, () => feedbackSamples[Math.floor(Math.random() * feedbackSamples.length)]), [])

  const projects = useMemo(() => Array.from({ length: 3 }, () => projectSamples[Math.floor(Math.random() * projectSamples.length)]), [])

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Employee Details Tabs" variant="underlined" color="primary">
        {/* Overview Tab */}
        <Tab key="overview" title="Overview">
          <Card>
            <CardBody className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Performance Rating</h3>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Performance Badge</h3>
                <Badge color={rating >= 4 ? 'success' : rating >= 2 ? 'warning' : 'danger'}>{rating >= 4 ? 'Excellent' : rating >= 2 ? 'Average' : 'Needs Improvement'}</Badge>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Bio</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Passionate HR associate with a keen interest in employee engagement, performance analytics, and organizational development. Always striving to bring a people-first approach to work.
                </p>
              </div>
            </CardBody>
          </Card>
        </Tab>

        {/* Projects Tab */}
        <Tab key="projects" title="Projects">
          <Card>
            <CardBody className="space-y-4">
              <h3 className="text-lg font-semibold mb-3">Recent Projects</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-gray-200">
                {projects.map((proj, idx) => (
                  <li key={idx}>{proj}</li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Tab>

        {/* Feedback Tab */}
        <Tab key="feedback" title="Feedback">
          <Card>
            <CardBody className="space-y-4">
              <h3 className="text-lg font-semibold mb-3">Manager Feedback</h3>
              <ul className="space-y-3">
                {feedback.map((text, idx) => (
                  <li key={idx} className="p-3 bg-gray-50 dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600 rounded">
                    <p className="text-sm text-gray-700 dark:text-gray-300">“{text}”</p>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  )
}
