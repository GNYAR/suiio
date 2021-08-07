import React from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap'
export const NavigationBar = () => {
    const loc = window.location.pathname
    const active = {
        finance: loc === '/finace' ? 'active' : '',
        conference: loc === '/conference' ? 'active' : '',
        contact: loc === '/contact' ? 'active' : '',
        organize: loc === '/organize' ? 'active' : '',
        account: loc === '/account' ? 'active' : '',
    }
    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/finace">suiio</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link
                            href="/finace"
                            className={active.finance}
                        >
                            財務管理
                        </Nav.Link>
                        <Nav.Link
                            href="/conference"
                            className={active.conference}
                        >
                            會議管理
                        </Nav.Link>
                        <Nav.Link href="/contact" className={active.contact}>
                            留言管理
                        </Nav.Link>
                        <Nav.Link
                            href="/organize"
                            className={active.organize}
                        >
                            組織管理
                        </Nav.Link>
                        <Nav.Link href="/account" className={active.account}>
                            帳號管理
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
