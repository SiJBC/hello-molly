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
  console.log('render')
  const ceoTestId = testIDS!.ceoTestId
  if (!userData) {
    throw new Error('No user data provided')
  }

  const [expanded, setExpanded] = React.useState<string[]>([])
  const [selected, setSelected] = React.useState<string[]>([])

  const [data, setData] = React.useState(buildHierarchy(userData))
  if (!data) {
    throw new Error('No data provided')
  }
  const ceo = userData.find(user => user.position === 'CEO')
  if (!ceo) {
    throw new Error('No CEO found')
  }
  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds)
  }

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelected(nodeIds)
  }

  const handleExpandClick = () => {
    setExpanded(oldExpanded =>
      oldExpanded.length === 0 ? ['1', '5', '6', '7'] : []
    )
  }

  const handleSelectClick = () => {
    setSelected(oldSelected =>
      oldSelected.length === 0
        ? ['1', '2', '3', '4', '5', '6', '7', '8', '9']
        : []
    )
  }

  return (
    <div className='grid justify-center'>
      <Box sx={{ minHeight: 270, flexGrow: 1 }}>
        <Box sx={{ mb: 1 }}>
          {[...DEPARTMENTS, 'ALL'].map((department, index) => (
            <Button
              key={index}
              onClick={() => setExpanded([department[index]])}
            >
              <div className='text-xl font-semibold'>{department}</div>
            </Button>
          ))}
          <TreeView
            aria-label='controlled'
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            expanded={expanded}
            selected={selected}
            onNodeToggle={handleToggle}
            onNodeSelect={handleSelect}
            multiSelect
          >
            <TreeItem
              id='ceo'
              data-testid={ceoTestId}
              nodeId='1'
              label={ceo.name.first + ' ' + ceo.name.last}
              onClick={e => console.log(e)}
            >
              <>
                {data
                  .get(JSON.stringify(ceo))
                  .map((user: UserProfile, index: number) => {
                    return (
                      <TreeItem
                        key={`key-${index}-${user.uuid}`}
                        data-testid={`${user.department}-Director`}
                        nodeId='5'
                        label={user.name.first + ' ' + user.name.last}
                      />
                    )
                  })}
              </>
            </TreeItem>
            <TreeItem nodeId='5' label='Documents'>
              <TreeItem nodeId='6' label='MUI'>
                <TreeItem nodeId='7' label='src'>
                  <TreeItem nodeId='8' label='index.js' />
                  <TreeItem nodeId='9' label='tree-view.js' />
                </TreeItem>
              </TreeItem>
            </TreeItem>
          </TreeView>
        </Box>
      </Box>
    </div>
  )
}
