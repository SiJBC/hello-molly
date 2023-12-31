import _ from "lodash"
import { Result, SimplifiedResult, UserProfile } from "@/types"

import { DEPARTMENTS, POSITIONS } from "@/constants"

export function simplifyResult(result: Result): SimplifiedResult {
  return {
    uuid: result.login.uuid,
    picture: result.picture,
    name: result.name,
    email: result.email,
    location: result.location,
  }
}

export function assignDepartmentAndPosition(
  user: SimplifiedResult
): UserProfile {
  const randomDepartment: (typeof DEPARTMENTS)[number] =
    DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)]
  return {
    ...user,
    position: "Employee",
    department: randomDepartment,
  }
}

export function simplifyAndAssignMultiple(results: Result[]): UserProfile[] {
  return results.map((result): UserProfile => {
    // Simplify the result into a SimplifiedResult
    const simplified: SimplifiedResult = {
      uuid: result.login.uuid,
      picture: result.picture,
      name: result.name,
      email: result.email,
      location: result.location,
    }

    // Assign a random department and the "Employee" position
    const userProfile: UserProfile = {
      ...simplified,
      position: "Employee",
      department: DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)],
    }

    return userProfile
  })
}

export function assignManagers(userProfiles: UserProfile[]): UserProfile[] {
  // Departments array

  // Assign managers to each department
  DEPARTMENTS.forEach((department) => {
    // Filter users by department
    const candidates = userProfiles.filter(
      (user) => user.department === department
    )

    // Shuffle the candidates and pick the first two
    const managers = _.sampleSize(candidates, 2)

    // Assign the 'manager' role to the picked users
    managers.forEach((manager) => {
      manager.position = "Manager"
    })
  })

  return userProfiles
}

export function promoteEmployeesToDirectors(
  users: UserProfile[]
): UserProfile[] {
  const directorAssigned: Record<(typeof DEPARTMENTS)[number], boolean> = {
    Engineering: false,
    Marketing: false,
    Sales: false,
    HR: false,
  }

  for (const user of users) {
    // If the user is an employee and there is no director in their department yet
    if (user.position === "Employee" && !directorAssigned[user.department]) {
      // Promote to director
      user.position = "Director"
      // Mark that the department now has a director
      directorAssigned[user.department] = true
    }
  }

  return users
}

export function promoteEmployeeToCEO(users: UserProfile[]): UserProfile[] {
  let ceoAssigned = false

  for (const user of users) {
    // If we find an employee who is neither a manager nor a director, and we haven't assigned a CEO yet
    if (user.position === "Employee" && !ceoAssigned) {
      // Promote to CEO
      user.position = "CEO"
      // Mark that a CEO has been assigned
      ceoAssigned = true
      break // Stop looking as we have already assigned a CEO
    }
  }

  if (!ceoAssigned) {
    throw new Error("No suitable employee found to promote to CEO.")
  }

  return users
}

export function filterByDepartment(
  users: UserProfile[],
  department: (typeof DEPARTMENTS)[number]
): UserProfile[] {
  return users.filter((user) => user.department === department)
}

export function simplifyAndAssignAll(results: Result[]): UserProfile[] {
  // Step 1: Simplify the results
  const simplifiedProfiles: SimplifiedResult[] = results.map((result) =>
    simplifyResult(result)
  )

  // Step 2: Assign department and position
  const userProfiles: UserProfile[] = simplifiedProfiles.map((simplified) =>
    assignDepartmentAndPosition(simplified)
  )

  // Step 3: Assign managers
  const usersWithManagers: UserProfile[] = assignManagers(userProfiles)

  // Step 4: Promote employees to directors
  const usersWithDirectors: UserProfile[] =
    promoteEmployeesToDirectors(usersWithManagers)

  // Step 5: Promote an employee to CEO
  const usersWithCEO: UserProfile[] = promoteEmployeeToCEO(usersWithDirectors)

  return usersWithCEO
}
export function randomlyAssignEmployeesToManagers(
  employees: UserProfile[]
): UserProfile[] {
  // Group employees by department

  const departmentMap = new Map()

  for (const department of DEPARTMENTS) {
    departmentMap.set(department, filterByDepartment(employees, department))
  }

  for (const department of DEPARTMENTS) {
    const employeesInDepartment = departmentMap.get(department)
    const managersInDepartment = employeesInDepartment.filter(
      (employee: UserProfile) => employee.position === "Manager"
    )
    const employeesWithoutManager = employeesInDepartment.filter(
      (employee: UserProfile) => employee.position === "Employee"
    )

    for (const employee of employeesWithoutManager) {
      const randomManager = _.sampleSize(managersInDepartment, 1)[0]
      employee.manager = randomManager.uuid
    }
  }

  return employees
}
