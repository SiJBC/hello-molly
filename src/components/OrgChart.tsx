'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { DEPARTMENTS } from '@/constants'
import { TreeView } from '@mui/x-tree-view/TreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'
import { UserProfile } from '@/types'
import { buildHierarchy } from '@/helpers/format'
import { useEffect } from 'react'
import store from '@/redux/store'
import { useSelector } from 'react-redux'
import { setTheme, setUser } from '@/redux/slices'

type OrgChartProps = {
  userData: UserProfile[]
  testIDS?: Record<string, string>
}

export default function ControlledTreeView ({
  userData,
  testIDS = {
    ceoTestId: 'CEO',
    engineeringDirectorTestId: 'Engineering-Director',
    salesDirectorTestId: 'Sales-Director',
    marketingDirectorTestId: 'Marketing-Director',
    hrDirectorTestId: 'HR-Director'
  }
}: OrgChartProps) {
  const selectedUser = useSelector(
    (state: ReturnType<typeof store.getState>) => state.data.user
  )
  const ceoTestId = testIDS!.ceoTestId
  if (!userData) {
    throw new Error('No user data provided')
  }
  const data = buildHierarchy(userData)
  const [expanded, setExpanded] = React.useState<string[]>([])
  const [selected, setSelected] = React.useState<string[]>([])

  const ceo = userData.find(user => user.position === 'CEO')
  if (!ceo) {
    throw new Error('No CEO found')
  }

  useEffect(() => {
    const selectedUserNode = data.root.search(
      (selectedUser as UserProfile).uuid
    )
    setExpanded(selectedUserNode?.getAncestors().map(el => el.value.uuid) ?? [])
    setSelected([selectedUserNode?.value.uuid ?? ''])
  }, [selectedUser])

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds)
  }

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelected(nodeIds)
  }

  const returnDepartment = (department: string) => {
    const director = data.root.children.find(
      director => director.value.department === department
    )
    return [director, ...director!.getAncestors()].map(el => el?.value.uuid)
  }

  return (
    <div className='grid justify-center lg:pb-8 xl:pb-14 2xl:pb-32'>
      <div className='m-auto'>
        <Box sx={{ minHeight: 270, flexGrow: 1 }}>
          <Box sx={{ mb: 1 }}>
            <div className='pb-28 text-center'>
              {[...DEPARTMENTS, 'CLEAR'].map((department, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    if (department === 'CLEAR') return setExpanded([])
                    setExpanded(returnDepartment(department) as string[])
                    store.dispatch(setTheme(department))
                  }}
                >
                  <div className='text-xl font-semibold'>{department}</div>
                </Button>
              ))}
            </div>
            <div className='font-semibold text-lg'>
              <TreeView
                aria-label='controlled'
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
                multiSelect
                className='bg-white'
              >
                <TreeItem
                  id='ceo'
                  data-testid={ceoTestId}
                  nodeId={data.root.value.uuid}
                  label={
                    data.root.value.name.first +
                    ' ' +
                    data.root.value.name.last +
                    '- CEO'
                  }
                >
                  <>
                    {data.root.children.map((director, index) => {
                      return (
                        <TreeItem
                          key={`key-${index}-${director.value.uuid}`}
                          data-testid={`${director.value.department}-Director`}
                          nodeId={director.value.uuid}
                          label={
                            director.value.name.first +
                            ' ' +
                            director.value.name.last +
                            ` - ${director.value.department} Director`
                          }
                        >
                          {director.children.map((manager, index) => (
                            <TreeItem
                              key={`key-${index}-${manager.value.uuid}`}
                              data-testid={`${manager.value.department}-Manager`}
                              nodeId={manager.value.uuid}
                              label={`${manager.value.name.first} ${manager.value.name.last} - ${manager.value.department} Manager`}
                            >
                              {manager.children.map(employee => (
                                <TreeItem
                                  style={{
                                    backgroundColor: 'white'
                                  }}
                                  onClick={() => console.log('clicked')}
                                  key={`key-${employee.value.uuid}`}
                                  data-testid={`${employee.value.department}-Employee`}
                                  nodeId={employee.value.uuid}
                                  label={`${employee.value.name.first} ${employee.value.name.last} - ${employee.value.department}`}
                                />
                              ))}
                            </TreeItem>
                          ))}
                        </TreeItem>
                      )
                    })}
                  </>
                </TreeItem>
              </TreeView>
            </div>
          </Box>
        </Box>
      </div>
    </div>
  )
}
