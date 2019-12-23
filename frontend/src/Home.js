import React, { Component } from 'react';
import {
    Container,
    LinearProgress,
    List, ListItem, ListItemText,
} from '@material-ui/core';
import { Link } from 'react-router-dom';


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            forms: [],
            formsReady: false
        }
    }

    componentDidMount() {

        fetch(`http://localhost:3001/api/forms`)
            .then(results => results.json())
            .then(json => {
                let forms = json.forms;
                this.setState({
                    forms: forms,
                    formsReady: true
                })
            })
            
    }

    render() {
        if(!this.state.formsReady) // Loading Progress Bar
        {
            return (
                <LinearProgress />
            );
        }
        else // Forms loaded
        {
            const forms = this.state.forms;
            const listItems = forms.map((item) => {
                return (
                    <ListItem button key={item.id} component={Link} to={item.url}>
                            <ListItemText primary={item.title} />
                    </ListItem>
                );
            });

            return (
              
                <Container>
                    <h1>لیست فرم‌ها:</h1>

                    <List component="nav">
                        {listItems}
                    </List>
                </Container>

            );
        }
    }
}

export default Home;