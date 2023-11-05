// @ts-nocheck
import _ from "lodash"
import { Result, SimplifiedResult, UserProfile } from "@/types"

import { DEPARTMENTS } from "@/constants"

export function simplifyResult(result: Result): SimplifiedResult {
  return {
    uuid: result.login.uuid,
    picture: result.picture,
    name: result.name,
    email: result.email,
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

export function processUserData(results: Result[]): UserProfile[] {
  const userProfiles: UserProfile[] = simplifyAndAssignMultiple(results)
  const usersWithManagers: UserProfile[] = assignManagers(userProfiles)
  const usersWithDirectors: UserProfile[] =
    promoteEmployeesToDirectors(usersWithManagers)
  const usersWithCEO: UserProfile[] = promoteEmployeeToCEO(usersWithDirectors)
  const usersWithManagersAssigned: UserProfile[] =
    randomlyAssignEmployeesToManagers(usersWithCEO)

  return usersWithManagersAssigned
}

export function buildHierarchy(users: UserProfile[]) {
  const ceo = users.find((user) => user.position === "CEO")
  const hierarchyTrie: Hierarchy = {
    root: new Node(ceo!),
  }
  const directors = users.filter((user) => user.position === "Director")
  const directorNodes = directors.map((director) => new Node(director))
  directorNodes.map((directorNode) =>
    directorNode.setParent(hierarchyTrie.root)
  )
  hierarchyTrie.root.setChildren(directorNodes)

  const managers = users.filter((user) => user.position === "Manager")

  for (const director of directorNodes) {
    const manager = new Node(
      managers.find(
        (manager) => manager.department === director.value.department
      )!
    )
    manager.setParent(director)
    director.setChildren([...director.getChildren(), manager])
  }
  for (const department of DEPARTMENTS) {
    directorNodes
      .find((director) => director.value.department === department)
      ?.setChildren(
        managers
          .filter((manager) => manager.department === department)
          .map((manager) => {
            const managerNode = new Node(manager)
            managerNode.setParent(
              directorNodes.find(
                (director) => director.value.department === department
              )!
            )
            return managerNode
          })
      )
  }
  for (const director of directorNodes) {
    const managerNodes = director.children
    managerNodes.map((managerNode) => {
      users
        .filter((user) => user.manager === managerNode.value.uuid)
        .map((user) => {
          const userNode = new Node(user)
          userNode.setParent(managerNode)
          managerNode.setChildren([...managerNode.getChildren(), userNode])
        })
    })
  }
  return hierarchyTrie
}

export interface Hierarchy {
  root: Node
}

export class Node {
  constructor(
    public value: UserProfile,
    public parent: Node | null = null,
    public children: Node[] = []
  ) {
    if (parent) {
      parent.children.push(this)
    }
  }
  setChildren(children: Node[]) {
    this.children = children
  }
  getChildren() {
    return this.children
  }
  setParent(parent: Node) {
    this.parent = parent
  }
  getAncestors(): Node[] {
    if (this.parent) {
      const ancestors = this.parent.getAncestors()
      return [...ancestors, this.parent]
    }
    return []
  }
  search(value: string): Node | null {
    if (this.value.uuid === value) {
      return this
    }
    for (const child of this.children) {
      const result = child.search(value)
      if (result) {
        return result
      }
    }
    return null
  }
}
