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
  randomlyAssignEmployeesToManagers,
  processUserData
} from '@/helpers/format'
import { Result, SimplifiedResult, UserProfile } from '@/types'
import { DEPARTMENTS } from '@/constants'
import { Node } from '@/helpers/format'

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

import EmployeeTree from '@/components/OrgChart' // Adjust the import path as needed
import React from 'react'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

function duplicateResult (result: Result, times: number): Result[] {
  const duplicatedResults: Result[] = []

  for (let i = 0; i < times; i++) {
    const duplicatedResult: Result = JSON.parse(JSON.stringify(result))
    duplicatedResult.login.uuid = (duplicatedResult.login.uuid as string) + i
    duplicatedResults.push(duplicatedResult)
  }

  return duplicatedResults
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
    email: result.email
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
    expect(profile.picture).toEqual(apiResponse.results[0].picture)
    expect(profile.name).toEqual(apiResponse.results[0].name)
    expect(profile.email).toEqual(apiResponse.results[0].email)
    expect(profile.position).toEqual('Employee')
    expect(['Engineering', 'Marketing', 'Sales', 'HR']).toContain(
      profile.department
    )
  })
})

test('assignManagers function should assign 8 managers and 2 managers for each department', () => {
  const duplicatedResults = duplicateResult(apiResponse.results[0], 100)
  const simplifiedUserProfiles = simplifyAndAssignMultiple(duplicatedResults)
  const userProfilesWithManagers = assignManagers(simplifiedUserProfiles)

  const departmentCounts: { [key: string]: number } = {
    Engineering: 0,
    Marketing: 0,
    Sales: 0,
    HR: 0
  }
  let totalManagers = 0
  userProfilesWithManagers.forEach(user => {
    if (user.position === 'Manager') {
      totalManagers++
      departmentCounts[user.department]++
    }
  })

  expect(totalManagers).toBe(8)
  expect(departmentCounts['Engineering']).toBe(2)
  expect(departmentCounts['Marketing']).toBe(2)
  expect(departmentCounts['Sales']).toBe(2)
  expect(departmentCounts['HR']).toBe(2)
})

test('promoteEmployeesToDirector should create 4 directors one for each dataset', () => {
  const duplicatedResults = duplicateResult(apiResponse.results[0], 100)
  const simplifiedUserProfiles = simplifyAndAssignMultiple(duplicatedResults)
  const userProfilesWithManagers = assignManagers(simplifiedUserProfiles)

  const promoted = promoteEmployeesToDirectors(userProfilesWithManagers)

  const departmentCounts: { [key: string]: number } = {
    Engineering: 0,
    Marketing: 0,
    Sales: 0,
    HR: 0
  }
  let totalDirectors = 0
  promoted.forEach(user => {
    if (user.position === 'Director') {
      totalDirectors++
      departmentCounts[user.department]++
    }
  })

  expect(totalDirectors).toBe(4)
  expect(departmentCounts['Engineering']).toBe(1)
  expect(departmentCounts['Marketing']).toBe(1)
  expect(departmentCounts['Sales']).toBe(1)
  expect(departmentCounts['HR']).toBe(1)
})

test('promoteEmployeeToCEO should promote an employee to CEO', () => {
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
  const filteredEngineering = filterByDepartment(result, 'Engineering')
  const filteredMarketing = filterByDepartment(result, 'Marketing')
  const filteredProduct = filterByDepartment(result, 'Sales')
  const filteredHR = filterByDepartment(result, 'HR')

  // Check if the filtered result has the correct length

  // Check if the filtered result has the correct department
  expect(
    filteredEngineering.every(user => user.department === 'Engineering')
  ).toBe(true)
  expect(filteredMarketing.every(user => user.department === 'Marketing')).toBe(
    true
  )
  expect(filteredProduct.every(user => user.department === 'Sales')).toBe(true)
  expect(filteredHR.every(user => user.department === 'HR')).toBe(true)
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

  const managersCountByDepartment: Record<typeof DEPARTMENTS[number], number> =
    {
      Engineering: 0,
      Marketing: 0,
      Sales: 0,
      HR: 0
    }
  simplifiedAndAssignedProfiles.forEach(profile => {
    if (profile.position === 'Manager') {
      managersCountByDepartment[profile.department]++
    }
  })
  expect(Object.values(managersCountByDepartment)).toEqual([2, 2, 2, 2]) // 2 managers for each department

  // Check if there are directors for each department
  const directorsCountByDepartment: Record<typeof DEPARTMENTS[number], number> =
    {
      Engineering: 0,
      Marketing: 0,
      Sales: 0,
      HR: 0
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

test('Employees with position "Employee" should have a manager and manager should be same department as employee', () => {
  // Sample dataset
  // Assign managers to employees
  const duplicatedResults = duplicateResult(apiResponse.results[0], 100)
  const simplifiedAndAssignedProfiles: UserProfile[] =
    simplifyAndAssignAll(duplicatedResults)
  const updatedDataset = randomlyAssignEmployeesToManagers(
    simplifiedAndAssignedProfiles
  )

  const departmentMap = new Map()

  for (const department of DEPARTMENTS) {
    departmentMap.set(
      department,
      filterByDepartment(simplifiedAndAssignedProfiles, department)
    )
  }

  // Filter employees with the position "Employee"
  const employeesWithPositionEmployee = updatedDataset.filter(
    employee => employee.position === 'Employee'
  )

  // Check if all employees with the position "Employee" have a manager assigned
  employeesWithPositionEmployee.forEach(employee => {
    expect(!employee.manager).toBeFalsy()
  })

  // check that the assigned manager for each employee matches their department
  employeesWithPositionEmployee.forEach(employee => {
    expect(
      departmentMap
        .get(employee.department)
        .find((employee: UserProfile) => employee.position === 'Manager')
        .department
    ).toBe(employee.department)
  })
})

describe('When user clicks on CEO in hierarchy tree all the directors are displayed', () => {
  it('should display all directors', async () => {
    const duplicatedResults = duplicateResult(apiResponse.results[0], 100)
    const processedData = processUserData(duplicatedResults)

    const { getByTestId, queryByTestId } = render(
      <EmployeeTree
        testIDS={{
          ceoTestId: 'CEO',
          engineeringDirectorTestId: 'Engineering-Director',
          salesDirectorTestId: 'Sales-Director',
          marketingDirectorTestId: 'Marketing-Director',
          hrDirectorTestId: 'HR-Director'
        }}
        userData={processedData}
      />
    )

    expect(queryByTestId('Engineering-Director')).toBeNull()
    expect(queryByTestId('Sales-Director')).toBeNull()
    expect(queryByTestId('Marketing-Director')).toBeNull()
    expect(queryByTestId('HR-Director')).toBeNull()

    const ceo = getByTestId('CEO')
    userEvent.type(ceo, '{enter}')

    await waitFor(() => {
      expect(queryByTestId('Engineering-Director')).toBeTruthy()
      expect(queryByTestId('Sales-Director')).toBeTruthy()
      expect(queryByTestId('Marketing-Director')).toBeTruthy()
      expect(queryByTestId('HR-Director')).toBeTruthy()
    })
  })
})
