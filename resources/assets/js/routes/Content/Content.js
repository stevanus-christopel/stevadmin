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
            pageItems: [],
            contents: [],
            page: '',
            search: '',
            isLoading: false,
            error: null,
        };

        this.fetchPages = this.fetchPages.bind(this);
        this.fetchContents = this.fetchContents.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
        this.handleKeyPressSearch = this.handleKeyPressSearch.bind(this);
    }
    componentDidMount() {
        this.fetchPages();
    }
    fetchPages() {
        this.setState({
            isLoading: true
        });
        fetch('/api/pages')
        .then(response => {
            return response.json();
        })
        .then(data => {
            let pageItems = [{ name: 'All Pages', value: 'All Pages' }];
            data.map(function(dataItem) {
                pageItems.push({ name: dataItem.page, value: dataItem.page });
            });
            this.setState({ pageItems: pageItems });
            this.fetchContents();
        });
    }
    fetchContents() {
        this.setState({
            isLoading: true
        });
        fetch('/api/contents')
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.setState({
                contents: data,
                error: null,
                isLoading: false
            });
        });
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
        let { contents, pageItems, page, search, isLoading, error } = this.state;

        return (
            <div className="content">
                <div className="content__filter">
                    <Select items={pageItems} disabled={isLoading} />
                    <TextInput type="text"
                        placeholder="Search here..." value={page} disabled={isLoading}
                        onChange={this.handleChangePage}
                        onKeyPress={this.handleKeyPressSearch} />
                    <Button primary medium onClick={this.handleSearch} disabled={isLoading}>Search</Button>
                </div>
                <div className="content__data">
                    {
                        contents.map(function(content) {
                            return (
                                <div className="content__data-item">
                                    <div>
                                        <p><b>{ content.Page }</b> - { content.ContentCode }</p>
                                        <p>Last updated by { content.UpdatedBy } at { content.UpdatedAt }</p>
                                        <p>Status: { content.IsActive === 1 ? "Active" : "Not Active" }</p>
                                    </div>
                                    <Button medium onClick={this.handleSearch} disabled={isLoading}>Open</Button>
                                </div>
                            )
                        }, this)
                    }
                </div>
            </div>
        );
    }
}

export default Content;