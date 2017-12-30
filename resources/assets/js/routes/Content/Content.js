import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

//  Components
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

class Content extends PureComponent {
    constructor(props) {
        super(props);
  
        this.state = {
            page: '',
            search: '',
            isLoading: false,
            error: null,
        };

        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
        this.handleKeyPressSearch = this.handleKeyPressSearch.bind(this);
    }
    handleChangePage(event) {
        this.setState({page: event.target.value});
    }
    handleChangeSearch(event) {
        this.setState({search: event.target.value});
    }
    handleKeyPressSearch(event) {
        if(event.key == 'Enter'){
            this.handleSearch();
        }
    }
    handleSearch() {

    }
    render() {
        let { page, search, isLoading, error } = this.state;

        return (
            <div className="content">
                <h2>Website Content</h2>
                <div className="content__filter">
                    <TextInput type="text"
                        placeholder="Search here..." value={page}
                        onChange={this.handleChangePage}
                        onKeyPress={this.handleKeyPressSearch} />
                </div>
            </div>
        );
    }
}

export default Content;