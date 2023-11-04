// SimplifyResultFunction.test.js
import {
  simplifyResult,
  assignDepartmentAndPosition,
  simplifyAndAssignMultiple,
  assignManagers,
  promoteEmployeesToDirectors,
  promoteEmployeeToCEO,
  filterByDepartment,
  simplifyAndAssignAll,
  randomlyAssignEmployeesToManagers
} from '@/app/helpers/format'
import { Department, Result, SimplifiedResult, UserProfile } from '@/types'
// Mock data that the API would return

// Mock data that the API would return
const apiResponse: { results: Result[] } = {
  results: [
    {
      gender: 'male',
      name: {
        title: 'Mr',
        first: 'Karl',
        last: 'Johnson'
      },
      location: {
        street: {
          number: 6057,
          name: 'Avondale Ave'
        },
        city: 'New York',
        state: 'New York',
        country: 'United States',
        postcode: 12564,
        coordinates: {
          latitude: '88.9222',
          longitude: '-82.9558'
        },
        timezone: {
          offset: '+3:00',
          description: 'Baghdad, Riyadh, Moscow, St. Petersburg'
        }
      },
      email: 'karl.johnson@example.com',
      login: {
        uuid: '97890990-7bf2-469d-981c-16a10ae5307f',
        username: 'bigpeacock170',
        password: 'luan',
        salt: 'DS9jzK3v',
        md5: '3fbb44cc3ed84f11b0b17d294e648b88',
        sha1: 'bc13b6a687d056cddb6bff9a546d7fcfd03cad45',
        sha256:
          'd3dea6c58256857f30dd60ef4db2708b62d5cc37eda19479ed4b72321d543f41'
      },
      dob: {
        date: '1966-12-17T05:32:24.120Z',
        age: 56
      },
      registered: {
        date: '2014-12-02T18:39:42.988Z',
        age: 8
      },
      phone: '(268) 420-4900',
      cell: '(576) 843-3163',
      id: {
        name: 'SSN',
        value: '557-48-8854'
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/6.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/6.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/6.jpg'
      },
      nat: 'US'
    } as Result
  ]
}

//  a function to simulate the array of results being of length 100 to test the data formatting functions
function duplicateResult (result: Result, times: number): Result[] {
  return new Array(times).fill(null).map(() => {
    // Using JSON methods to deep clone the object to avoid referencing issues
    return JSON.parse(JSON.stringify(result))
  })
}

// Mock fetch globally using jest.fn()
;(global as any).fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(apiResponse)
  })
) as jest.Mock

test('simplifyResult function transforms and returns the expected result', async () => {
  // Mock the API call
  const response = await fetch(
    'https://randomuser.me/api/?page=3&results=100&seed=abc'
  )
  const data = await response.json()
  const result = data.results[0]

  // Use the mocked result to test the function
  const simplified = simplifyResult(result)

  // Define the expected object structure
  const expected: SimplifiedResult = {
    uuid: result.login.uuid,
    picture: result.picture,
    name: result.name,
    email: result.email,
    location: result.location
  }

  // Assert the transformation is correct
  expect(simplified).toEqual(expected)
})

test('assignDepartmentAndPosition function assigns the correct department and position and user profile', async () => {
  const response = await fetch(
    'https://randomuser.me/api/?page=3&results=100&seed=abc'
  )
  const data = await response.json()
  const result = data.results[0]

  const simplified = simplifyResult(result)

  const userProfile = assignDepartmentAndPosition(simplified)

  const user: UserProfile = {
    uuid: userProfile.uuid,
    picture: userProfile.picture,
    name: userProfile.name,
    email: userProfile.email,
    location: userProfile.location,
    department: userProfile.department,
    position: 'Employee'
  }

  expect(user).toEqual(userProfile)
})

test('simplifyAndAssignMultiple should simplify and assign multiple profiles', () => {
  // Define a sample Result object

  // Duplicate the sample Result 100 times
  const duplicatedResults = duplicateResult(apiResponse.results[0], 100)

  // Call the function to simplify and assign profiles
  const simplifiedProfiles = simplifyAndAssignMultiple(duplicatedResults)

  // Check if the length of the output array matches the input array
  expect(simplifiedProfiles).toHaveLength(100)

  // Check if each profile has the expected properties and position
  simplifiedProfiles.forEach(profile => {
    expect(profile.uuid).toEqual(apiResponse.results[0].login.uuid)
    expect(profile.picture).toEqual(apiResponse.results[0].picture)
    expect(profile.name).toEqual(apiResponse.results[0].name)
    expect(profile.email).toEqual(apiResponse.results[0].email)
    expect(profile.location).toEqual(apiResponse.results[0].location)
    expect(profile.position).toEqual('Employee')
    expect(['engineering', 'marketing', 'product', 'hr']).toContain(
      profile.department
    )
  })
})

test('assignManagers function should assign 8 managers and 2 managers for each department', () => {
  const duplicatedResults = duplicateResult(apiResponse.results[0], 100)
  const simplifiedUserProfiles = simplifyAndAssignMultiple(duplicatedResults)
  const userProfilesWithManagers = assignManagers(simplifiedUserProfiles)

  const departmentCounts: { [key: string]: number } = {
    engineering: 0,
    marketing: 0,
    product: 0,
    hr: 0
  }
  let totalManagers = 0
  userProfilesWithManagers.forEach(user => {
    if (user.position === 'Manager') {
      totalManagers++
      departmentCounts[user.department]++
    }
  })

  expect(totalManagers).toBe(8)
  // Check if there are 2 managers for each department
  expect(departmentCounts['engineering']).toBe(2)
  expect(departmentCounts['marketing']).toBe(2)
  expect(departmentCounts['product']).toBe(2)
  expect(departmentCounts['hr']).toBe(2)
})

test('promoteEmployeesToDirector should create 4 directors one for each dataset', () => {
  const duplicatedResults = duplicateResult(apiResponse.results[0], 100)
  const simplifiedUserProfiles = simplifyAndAssignMultiple(duplicatedResults)
  const userProfilesWithManagers = assignManagers(simplifiedUserProfiles)

  const promoted = promoteEmployeesToDirectors(userProfilesWithManagers)

  const departmentCounts: { [key: string]: number } = {
    engineering: 0,
    marketing: 0,
    product: 0,
    hr: 0
  }
  let totalDirectors = 0
  promoted.forEach(user => {
    if (user.position === 'Director') {
      totalDirectors++
      departmentCounts[user.department]++
    }
  })

  expect(totalDirectors).toBe(4)
  // Check if there are 1 director for each department
  expect(departmentCounts['engineering']).toBe(1)
  expect(departmentCounts['marketing']).toBe(1)
  expect(departmentCounts['product']).toBe(1)
  expect(departmentCounts['hr']).toBe(1)
})

test('promoteEmployeeToCEO should promote an employee to CEO', () => {
  // Create a sample dataset with employees and managers
  const duplicatedResults = duplicateResult(apiResponse.results[0], 100)
  const simplifiedUserProfiles = simplifyAndAssignMultiple(duplicatedResults)
  const userProfilesWithManagers = assignManagers(simplifiedUserProfiles)
  const userProfilesWithManagersAndDirectors = promoteEmployeesToDirectors(
    userProfilesWithManagers
  )

  // Call the promoteEmployeeToCEO function on the dataset
  const result = promoteEmployeeToCEO(userProfilesWithManagersAndDirectors)

  // Check if there is one CEO in the result
  const ceoCount = result.filter(user => user.position === 'CEO').length
  expect(ceoCount).toBe(1)

  // Check if the CEO has been assigned
  const ceoUser = result.find(user => user.position === 'CEO')
  expect(ceoUser).toBeTruthy()

  // Check if the original employee has been promoted to CEO
  const employeeUser = userProfilesWithManagersAndDirectors.find(
    user => user.position === 'CEO'
  )
  expect(employeeUser?.position).toBe('CEO')
})

test('filterByDepartment should filter the users by department', () => {
  // Create a sample dataset with employees and managers
  const duplicatedResults = duplicateResult(apiResponse.results[0], 100)
  const simplifiedUserProfiles = simplifyAndAssignMultiple(duplicatedResults)
  const userProfilesWithManagers = assignManagers(simplifiedUserProfiles)
  const userProfilesWithManagersAndDirectors = promoteEmployeesToDirectors(
    userProfilesWithManagers
  )
  const result = promoteEmployeeToCEO(userProfilesWithManagersAndDirectors)

  // Filter the result by department
  const filteredEngineering = filterByDepartment(result, 'engineering')
  const filteredMarketing = filterByDepartment(result, 'marketing')
  const filteredProduct = filterByDepartment(result, 'product')
  const filteredHR = filterByDepartment(result, 'hr')

  // Check if the filtered result has the correct length

  // Check if the filtered result has the correct department
  expect(
    filteredEngineering.every(user => user.department === 'engineering')
  ).toBe(true)
  expect(filteredMarketing.every(user => user.department === 'marketing')).toBe(
    true
  )
  expect(filteredProduct.every(user => user.department === 'product')).toBe(
    true
  )
  expect(filteredHR.every(user => user.department === 'hr')).toBe(true)
})

test('simplifyAndAssignAll should simplify and assign all profiles with final dataset', async () => {
  const duplicatedResults = duplicateResult(apiResponse.results[0], 100)

  // Call the simplifyAndAssignAll function
  const simplifiedAndAssignedProfiles: UserProfile[] =
    simplifyAndAssignAll(duplicatedResults)

  // Check if the length of the result matches the input
  expect(simplifiedAndAssignedProfiles.length).toBe(100)

  // Check if there are 8 managers
  const managersCount = simplifiedAndAssignedProfiles.filter(
    profile => profile.position === 'Manager'
  ).length
  expect(managersCount).toBe(8)

  const managersCountByDepartment: Record<Department, number> = {
    engineering: 0,
    marketing: 0,
    product: 0,
    hr: 0
  }
  simplifiedAndAssignedProfiles.forEach(profile => {
    if (profile.position === 'Manager') {
      managersCountByDepartment[profile.department]++
    }
  })
  expect(Object.values(managersCountByDepartment)).toEqual([2, 2, 2, 2]) // 2 managers for each department

  // Check if there are directors for each department
  const directorsCountByDepartment: Record<Department, number> = {
    engineering: 0,
    marketing: 0,
    product: 0,
    hr: 0
  }
  simplifiedAndAssignedProfiles.forEach(profile => {
    if (profile.position === 'Director') {
      directorsCountByDepartment[profile.department]++
    }
  })
  expect(Object.values(directorsCountByDepartment)).toEqual([1, 1, 1, 1]) // 1 director for each department

  // Check if there is one CEO
  const ceoCount = simplifiedAndAssignedProfiles.filter(
    profile => profile.position === 'CEO'
  ).length
  expect(ceoCount).toBe(1)
})

test('Employees with position "Employee" should have a manager', () => {
  // Sample dataset
  // Assign managers to employees
  const duplicatedResults = duplicateResult(apiResponse.results[0], 100)
  const simplifiedAndAssignedProfiles: UserProfile[] =
    simplifyAndAssignAll(duplicatedResults)
  const updatedDataset = randomlyAssignEmployeesToManagers(
    simplifiedAndAssignedProfiles
  )

  // Filter employees with the position "Employee"
  const employeesWithPositionEmployee = updatedDataset.filter(
    employee => employee.position === 'Employee'
  )

  // Check if all employees with the position "Employee" have a manager assigned
  employeesWithPositionEmployee.forEach(employee => {
    expect(employee.manager).not.toBeNull()
  })
})
