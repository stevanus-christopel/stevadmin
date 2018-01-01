import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

//  Routes
import Display from './Display';

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
            currentContent: null,
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
        this.handleSearch = this.handleSearch.bind(this);
        this.handleDisplay = this.handleDisplay.bind(this);
        this.handleDisplayCancel = this.handleDisplayCancel.bind(this);
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
            let pageItems = [];
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
    handleDisplay(content) {
        this.setState({
            currentContent: content
        });
    }
    handleDisplayCancel() {
        this.setState({
            currentContent: null
        });
    }
    render() {
        let { contents, currentContent, pageItems, page, search, isLoading, error } = this.state;

        return (
            <div className="content">
                {
                    currentContent != null ?
                    <Display pageItems={pageItems} content={currentContent}
                        onCancel={this.handleDisplayCancel} /> :
                    <div>
                        <h2>Content List</h2>
                        <div className="content__filter">
                            <Select items={
                                [{ name: 'All Pages', value: 'All Pages' },
                                ...pageItems
                                ]} disabled={isLoading} />
                            <TextInput type="text"
                                placeholder="Search here..." value={page} disabled={isLoading}
                                onChange={this.handleChangePage}
                                onKeyPress={this.handleKeyPressSearch} />
                            <div className="content__filter-button">
                                <Button primary medium onClick={this.handleSearch} disabled={isLoading}>Search</Button>
                                <Button medium onClick={this.handleSearch} disabled={isLoading}>Add New Content</Button>
                            </div>
                        </div>
                        <div className="content__data">
                            {
                                contents.map(function(content, index) {
                                    return (
                                        <div key={index} className="content__data-item">
                                            <div>
                                                <p><b>{ content.Page }</b> - { content.ContentCode }</p>
                                                <p>Status: { content.IsActive === 1 ? "Active" : "Not Active" }</p>
                                                <p>Last updated by { content.UpdatedBy } at { content.UpdatedAt }</p>
                                            </div>
                                            <Button small onClick={() => this.handleDisplay(content)} disabled={isLoading}>Edit</Button>
                                        </div>
                                    )
                                }, this)
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Content;