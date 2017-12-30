import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

//  Components
import Button from '../../components/Button';
import Select from '../../components/Select';
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
                <div className="content__filter">
                    <Select items={[
                        { name: "All Page", value: "all" }
                    ]} />
                    <TextInput type="text"
                        placeholder="Search here..." value={page}
                        onChange={this.handleChangePage}
                        onKeyPress={this.handleKeyPressSearch} />
                    <Button medium onClick={this.handleSearch} disabled={isLoading}>Search</Button>
                </div>
            </div>
        );
    }
}

export default Content;