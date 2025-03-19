import { faker } from '@faker-js/faker'
import SHA256 from 'crypto-js/sha256'

const roles = ['Staff', 'Head Department', 'Manager', 'General Manager', 'Moderator']
const statuses = ['Active', 'Inactive', 'Suspended']
const genders = ['Male', 'Female', 'Other']

const hashPassword = (password) => {
    return SHA256(password).toString()
}

const generateUsers = (count = 100) => {
    return Array.from({ length: count }, (_, i) => {
        const role = faker.helpers.arrayElement(roles)
        const status = faker.helpers.arrayElement(statuses)
        const gender = faker.helpers.arrayElement(genders)
        const dob = faker.date.birthdate({ min: 18, max: 60, mode: 'age' })

        return {
            userID: `#${i + 1}`,
            name: faker.person.fullName(),
            email: faker.internet.email(),
            username: faker.internet.username(),
            password: hashPassword(`password${i + 1}`),
            phone: faker.phone.number('+639#########'),
            address: `${faker.location.streetAddress()}, ${faker.location.city()}`,
            gender: gender,
            dob: dob.toISOString().split('T')[0],
            profile_picture: faker.image.avatar(),
            last_login: faker.date.recent({ days: 90 }).toLocaleDateString('en-US'),
            ip_address: faker.internet.ip(),
            account_verified: faker.helpers.arrayElement(['Yes', 'No']),
            department_id: faker.number.int({ min: 1, max: 10 }),
            created_by: faker.helpers.arrayElement(['Admin', 'System', 'Manager']),
            updated_by: faker.helpers.arrayElement(['Admin', 'System', 'Manager']),
            date_updated: faker.date.past({ years: 1 }).toLocaleDateString('en-US'),
            failed_login_attempts: faker.number.int({ min: 0, max: 5 }),
            locked_status: faker.helpers.arrayElement(['Yes', 'No']),
            two_factor_enabled: faker.helpers.arrayElement(['Yes', 'No']),
            role: role,
            role_id: roles.indexOf(role) + 1,
            status: status,
            permissions: JSON.stringify({ read: true, write: false, delete: false })
        }
    })
}

export const users = generateUsers()
