import React, { Component } from "react";
import BasePage from "../BasePage";
import { Jumbotron, Row, Col } from "reactstrap";
import UserTable from "../../components/StripedTable";
import NotesComponent from "./desk_components/NotesComponent";
import AddNotes from "./desk_components/AddNotes";
import axios from "../../axiosInstance";

class DeskHome extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, items: [], notes: []};
    }

    load_notes = () => {
        axios.get("/api/desknotes/").then(res => {
            this.setState({
                loading: false,
                notes: res.data.map(item => {
                    return {
                        user: item.desk_worker,
                        body: item.content,
                        pk: item.pk,
                    }
                }),
                notes_refresh: false,
            });
        });
    }

    load_items = () =>{
        axios.get("/api/deskitems/out/").then(res => {
            console.log(res);
            console.log("check")
            this.setState({
                loading: false,
                items: res.data.map(item => 
                    [
                        item.name,
                        item.resident,
                        item.time_due
                    ]
                ),
            });
        });
    }

    async componentDidMount() {
        this.load_notes();
        this.load_items();
    }


    render() {
        return (
            <BasePage loading={this.state.loading} header="Dashboard">

                <Jumbotron>
                    Test Dashboard
                </Jumbotron>

                <Row>
                    <Col xs="4">
                        <Jumbotron>
                            <h2>Notes</h2>
                            <AddNotes update_notes={this.load_notes} {... this.props} />
                            <p></p> {/* used for the extra space. */}
                            <NotesComponent update_notes={this.load_notes} notes={this.state.notes} />
                        </Jumbotron>
                    </Col>
                    <Col>
                        <Jumbotron>
                            <h2>Checked out items</h2>
                            <p></p>
                            {(this.state.items.length) ? 
                            <UserTable
                                rows={this.state.items}
                                headers={["Name", "Item", "Return Date"]}
                            />
                            :
                                <h4>There are no checked out items.</h4>
                            }
                            
                        </Jumbotron>
                    </Col>
                </Row>
            </BasePage>
        );
    }
}

export default DeskHome;