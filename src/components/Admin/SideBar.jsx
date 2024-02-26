import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import {
  FaTachometerAlt,
  FaGem,
  FaGithub,
  FaRegLaughWink
} from 'react-icons/fa'
import { DiReact } from 'react-icons/di'
import { MdDashboard } from 'react-icons/md'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

import sidebarBg from '../../assets/bg2.jpg'

const SideBar = props => {
  const { collapsed, toggled, handleToggleSidebar } = props
  const navigate = useNavigate()

  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint='md'
        onToggle={handleToggleSidebar}
        timeDuration={2000}
      >
        <SidebarHeader>
          <div
            style={{
              padding: '24px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              letterSpacing: '1px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              textAlign: 'center',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            <DiReact
              size={'3em'}
              color={'00bfff'}
              style={{ marginRight: '10px' }}
            />
            Huy Kirito
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape='circle'>
            <MenuItem icon={<MdDashboard />}>
              Dashboard
              <Link to='/admin' />
            </MenuItem>
          </Menu>
          <Menu iconShape='circle'>
            <SubMenu icon={<FaGem />} title='Fetures'>
              <MenuItem>
                Users Managements
                <Link to='/admin/manage-users' />{' '}
              </MenuItem>
              <MenuItem> Quiz Managements </MenuItem>
              <MenuItem> Questions Managements </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: 'center' }}>
          <div
            className='sidebar-btn-wrapper'
            style={{
              padding: '20px 24px'
            }}
          >
            <a
              href='https://github.com/minhhuy1201?tab=repositories&type=source'
              target='_blank'
              className='sidebar-btn'
              rel='noopener noreferrer'
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'
                }}
              >
                <span
                  style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                >
                  Github Profile
                </span>
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  )
}

export default SideBar
