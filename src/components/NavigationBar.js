import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';

// import styled from 'styled-components';

// const Styles = styled.div`
//     .navbar{
//         background-color: #222;
//     }
// `;

export const NavigationBar = () => {
    const loc = window.location.pathname;
    const active = {
        home: loc === '/' ? 'active' : '',
        about: loc === '/about' ? 'active' : '',
        contact: loc === '/contact' ? 'active' : '',
        organize: loc === '/organize' ? 'active' : ''
    };
    console.log(loc, active);
    return (
        // <Styles>
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">suiio</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/" className={active.home}>財務管理</Nav.Link>
                        <Nav.Link href="/about" className={active.about}>會議管理</Nav.Link>
                        <Nav.Link href="/contact" className={active.contact}>留言管理</Nav.Link>
                        <Nav.Link href="/organize" className={active.organize}>組織管理</Nav.Link>
                        <Nav.Link href="/contact" className={active.contact}>個人管理</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        // </Styles>
    )
}



// export default class NavigationBar extends Component {
//     render() {
//         return (
//             <Navbar expand="lg" bg="dark" variant="dark">
//             <Container>
//                 <Navbar.Brand href="/">suiio</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="ml-auto">
//                         <Nav.Link href="/" className="">Home</Nav.Link>
//                         <Nav.Link href="/about">About</Nav.Link>
//                         <Nav.Link href="/contact">Contact</Nav.Link>
//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//         )
//     }
// }
