import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

//  Components
import Button from '../../components/Button';

class Content extends PureComponent {
    constructor(props) {
        super(props);
  
        this.state = {
            isLoading: false,
        };

        this.handleSave = this.handleSave.bind(this);
    }
    componentDidMount() {

    }
    handleSave() {
        
    }
    render() {
        let { content, onCancel } = this.props;
        let { isLoading } = this.state;

        return (
            <div className="content-display">
                <p>Page: <b>{ content.Page }</b></p>
                <p>Code: <b>{ content.ContentCode }</b></p>
                <p>Status: { content.IsActive === 1 ? "Active" : "Not Active" }</p>
                <p>Created by { content.CreatedBy } at { content.CreatedAt }</p>
                <p>Last updated by { content.UpdatedBy } at { content.UpdatedAt }</p>

                <div className="content-display__button">
                    <Button medium onClick={onCancel} disabled={isLoading}>Cancel</Button>
                    <Button primary medium onClick={this.handleSave} disabled={isLoading}>Save</Button>
                </div>
            </div>
        );
    }
}

export default Content;