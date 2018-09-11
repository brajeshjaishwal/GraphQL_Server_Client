import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { NavLink } from 'react-router-dom'
import { Container, Icon, Menu, Label, Button } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

const noAuthHeader = <Menu fixed='top' >
                                <Container>
                                  <Menu.Item header>
                                    <Icon name='handshake' />
                                    <NavLink exact to = '/'>ConceptShare</NavLink>
                                  </Menu.Item>
                                  <Menu.Item>
                                    <NavLink activeClassName="active" exact to = '/Concepts'>Concepts</NavLink>
                                  </Menu.Item>
                                  <Menu.Item position='right'>
                                      <NavLink activeClassName="active" exact to = "/Login" >Login</NavLink>
                                      <NavLink activeClassName="active" exact to = "/Register" style={{marginLeft: '1em'}}>Register</NavLink>
                                  </Menu.Item>
                                </Container>
                              </Menu>

const authHeader = <Menu fixed='top' >
                            <Container>
                              <Menu.Item header>
                                <Icon name='handshake' />
                                <NavLink exact to = '/'>ConceptShare</NavLink>
                              </Menu.Item>
                              <Menu.Item>
                                <NavLink activeClassName="active" exact to = '/Concepts'>Concepts</NavLink>
                                <NavLink activeClassName="active" exact to = '/MyConcepts' style={{marginLeft: '1em'}}>My Concepts</NavLink>
                              </Menu.Item>
                              <Menu.Item position='right'>
                                <NavLink activeClassName="active" exact to = "/Profile" >Profile</NavLink>
                                <NavLink activeClassName="active" exact to = "/Logout" style={{marginLeft: '1em'}}>Logout</NavLink>
                              </Menu.Item>
                            </Container>
                            </Menu>

const AppHeader = ({session, history}) => {
  console.log(history)
  console.log(session)
  return session ? authHeader : noAuthHeader
}

export default withRouter(AppHeader)