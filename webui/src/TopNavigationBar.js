import {Container, Navbar, Nav} from "react-bootstrap";

function TopNavigationBar() {
    let slash = "/";
    if (window.location.origin.indexOf(".github.io") >= 0) {
        slash = "#";
    }
    let activeKey = window.location.href.split("/").pop();
    if (slash == "/") {
        activeKey = "/" + activeKey;
    }
    return (
        <div className={"topNavigationBar"}>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="ml-auto" activeKey={activeKey}>
                        <Navbar.Brand href={slash}>Tensorflow JS hackathon</Navbar.Brand>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default TopNavigationBar;
