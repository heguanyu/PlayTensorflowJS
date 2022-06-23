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
                        <Nav.Link href={slash + "singlecandidate"} >Pick a candidate</Nav.Link>
                        <Nav.Link href={slash + "allcandidates"} >All candidates</Nav.Link>
                        <Nav.Link href={slash + "groupmatching"} >Group matching</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default TopNavigationBar;
