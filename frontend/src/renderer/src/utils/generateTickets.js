import { formatDistanceToNow } from 'date-fns'
import { faker } from '@faker-js/faker'

const priorityLevels = ['Low', 'Medium', 'High', 'Urgent']
const statuses = ['Pending', 'Assigned', 'In Progress', 'Done', 'Declined']
const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Data Encoder']
const users = Array.from({ length: 20 }, () => faker.person.fullName())

const generateTickets = (count = 100) => {
    return Array.from({ length: count }, (_, i) => {
        const status = faker.helpers.arrayElement(statuses)
        const createdAt = faker.date.recent({ days: 60 })
        const assignedAt =
            status !== 'Pending' ? faker.date.between({ from: createdAt, to: new Date() }) : null
        const deadline = assignedAt ? faker.date.soon({ days: 10, refDate: assignedAt }) : null
        const lastUpdated =
            status === 'Pending'
                ? createdAt
                : faker.date.between({ from: assignedAt, to: new Date() })

        return {
            ticketID: `T-${i + 1}`,
            priorityLevel: faker.helpers.arrayElement(priorityLevels),
            status: status,
            subject: faker.lorem.sentence(),
            requester: faker.helpers.arrayElement(users),
            department: faker.helpers.arrayElement(departments),
            assignedTo: status !== 'Pending' ? faker.helpers.arrayElement(users) : null,
            createdAt: createdAt.toISOString(),
            deadline: deadline ? deadline.toISOString() : null,
            lastUpdated: lastUpdated.toISOString(),
            lastUpdatedRelative: formatDistanceToNow(lastUpdated, { addSuffix: true })
        }
    })
}

export const tickets = generateTickets()
