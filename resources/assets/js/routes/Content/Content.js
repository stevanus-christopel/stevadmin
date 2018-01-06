import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

//  Routes
import Display from './Display';
import Create from './Create';

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
            isCreate: false,
        };

        this.fetchPages = this.fetchPages.bind(this);
        this.fetchContents = this.fetchContents.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
        this.handleKeyPressSearch = this.handleKeyPressSearch.bind(this);
        this.handleDisplay = this.handleDisplay.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    componentDidMount() {
        this.fetchPages();
    }
    fetchPages() {
        this.setState({
            isLoading: true
        });
        fetch(`/api/pages`)
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
        fetch(`/api/contents?page=${this.state.page}&search=${this.state.search}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.setState({
                contents: data,
                currentContent: null,
                error: null,
                isLoading: false,
                isCreate: false
            });
        });
    }
    handleChangePage(event) {
        this.setState({page: event.target.value},
            this.fetchContents);
    }
    handleChangeSearch(event) {
        this.setState({search: event.target.value});
    }
    handleKeyPressSearch(event) {
        if(event.key == 'Enter'){
            this.handleSearch();
        }
    }
    handleDisplay(content) {
        this.setState({
            currentContent: content,
            isCreate: false,
        });
    }
    handleCreate(content) {
        this.setState({
            currentContent: null,
            isCreate: true
        });
    }
    handleCancel() {
        this.setState({
            currentContent: null,
            isCreate: false
        });
    }
    render() {
        let { contents, currentContent, pageItems, page, search, isLoading, error,
        isCreate } = this.state;

        return (
            <div className="content">
                {
                    isCreate ?
                    <Create pageItems={pageItems}
                        onSave={this.fetchContents}
                        onCancel={this.handleCancel} /> :
                    currentContent != null ?
                    <Display pageItems={pageItems} content={currentContent}
                        onSave={this.fetchContents}
                        onCancel={this.handleCancel} /> :
                    <div>
                        <h2>Content List</h2>
                        <div className="content__filter">
                            <Select items={
                                [{ name: 'All Pages', value: '' },
                                ...pageItems
                                ]} disabled={isLoading} onChange={this.handleChangePage} />
                            <TextInput type="text"
                                placeholder="Search here..." value={search} disabled={isLoading}
                                onChange={this.handleChangeSearch}
                                onKeyPress={this.handleKeyPressSearch} />
                            <div className="content__filter-button">
                                <Button primary medium onClick={this.fetchContents} disabled={isLoading}>Search</Button>
                                <Button medium onClick={this.handleCreate} disabled={isLoading}>Add New Content</Button>
                            </div>
                        </div>
                        <div className="content__data">
                            {
                                contents.map(function(content, index) {
                                    return (
                                        <div key={index} className="content__data-item">
                                            <div>
                                                <p><b>{ content.Page }</b> - { content.ContentCode }</p>
                                                <p>Status: { content.IsActive === 1 ? "Active" : <span>Not Active</span> }</p>
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