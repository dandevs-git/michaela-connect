import { faker } from '@faker-js/faker'

const priorityLevels = ['Low', 'Medium', 'High', 'Urgent']
const statuses = ['Pending', 'Assigned', 'In Progress', 'Done', 'Declined']
const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Data Encoder']
const users = Array.from({ length: 20 }, () => faker.person.fullName())

const generateTickets = (count = 100) => {
    return Array.from({ length: count }, (_, i) => {
        const status = faker.helpers.arrayElement(statuses)
        const createdAt = faker.date.recent({ days: 60 })
        const assignedAt = faker.date.between({ from: createdAt, to: new Date() })
        const deadline = faker.date.soon({ days: 10, refDate: assignedAt })

        return {
            ticketID: `T-${i + 1}`,
            priorityLevel: faker.helpers.arrayElement(priorityLevels),
            status: status,
            subject: faker.lorem.sentence(),
            requester: faker.helpers.arrayElement(users),
            department: faker.helpers.arrayElement(departments),
            assignedTo: status !== 'Pending' ? faker.helpers.arrayElement(users) : null,
            createdAt: createdAt.toISOString().split('T')[0],
            deadline: deadline.toISOString().split('T')[0]
        }
    })
}

export const tickets = generateTickets()
