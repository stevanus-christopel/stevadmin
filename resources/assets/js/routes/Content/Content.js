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
            countContents: 0,
            currentContent: null,
            page: '',
            search: '',
            contentPage: 1,
            isLoading: false,
            error: null,
            isCreate: false,
        };

        this.fetchPages = this.fetchPages.bind(this);
        this.fetchContents = this.fetchContents.bind(this);
        this.handleChangeContentPage = this.handleChangeContentPage.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
        this.handleKeyPressSearch = this.handleKeyPressSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDisplay = this.handleDisplay.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleCreateSave = this.handleCreateSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    componentDidMount() {
        this.fetchPages();
        this.fetchContents();
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
            this.setState({ 
                pageItems: pageItems,
            });
        });
    }
    fetchContents() {
        this.setState({
            isLoading: true
        });
        fetch(`/api/contents?page=${this.state.page}&search=${this.state.search}&contentPage=${this.state.contentPage}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.setState({
                contents: data.Content,
                countContents: data.Count,
                currentContent: null,
                error: null,
                isLoading: false,
                isCreate: false
            });
        });
    }
    handleChangeContentPage(newContentPage) {
        this.setState({contentPage: newContentPage},
            this.fetchContents);
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
    handleSearch() {
        this.setState({contentPage: 1},
            this.fetchContents);
    }
    handleDelete(content) {
        if(confirm(`Do you want to delete "${content.Page} - ${content.ContentCode}" ?`)) {
            fetch( 'api/contents/',
            { 
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(content)
            })
            .then(response => {
                if(response.status != 204) {
                    alert(`Failed to delete "${content.Page} - ${content.ContentCode}".`)
                } else {
                    var newContents = this.state.contents.filter(function(item) {
                        return item !== content
                    });
                    this.setState({ contents: newContents });
                }
            });
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
    handleCreateSave() {
        this.fetchContents();
        this.fetchPages();
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
                        onSave={this.handleCreateSave}
                        onCancel={this.handleCancel} /> :
                    currentContent != null ?
                    <Display pageItems={pageItems} content={currentContent}
                        onSave={this.fetchContents}
                        onCancel={this.handleCancel} /> :
                    <div>
                        <h2>Contents</h2>
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
                                <Button primary medium onClick={this.handleSearch} 
                                disabled={isLoading}>Search</Button>
                                <Button medium onClick={this.handleCreate} 
                                disabled={isLoading}>Add New Content</Button>
                            </div>
                        </div>
                        <div className="content__data">
                            {
                                contents.map(function(content, index) {
                                    return (
                                        <div key={index} className="content__data-item">
                                            <div>
                                                <p><b>{ content.Page }</b> - { content.ContentCode }</p>
                                                <p>Language: { content.Language }</p>
                                                <p>Status: { content.IsActive === 1 ? "Active" : <span>Not Active</span> }</p>
                                                <p>Last updated by { content.UpdatedBy } at { content.UpdatedAt }</p>
                                            </div>
                                            <div className="content__data-item-button">
                                                {
                                                    content.IsActive != 1 &&
                                                    <Button error small onClick={() => this.handleDelete(content)} 
                                                    disabled={isLoading}>Delete</Button>
                                                }
                                                <Button small onClick={() => this.handleDisplay(content)} 
                                                disabled={isLoading}>Edit</Button>
                                            </div>
                                        </div>
                                    )
                                }, this)
                            }
                        </div>
                        <div className="content__page">
                            {
                                this.state.contentPage > 1 && 
                                <span onClick={() => this.handleChangeContentPage(this.state.contentPage - 1)}>Prev</span>
                            }
                            <b>{ this.state.contentPage }</b> of { Math.ceil(this.state.countContents / 5) }
                            {
                                this.state.contentPage < Math.ceil(this.state.countContents / 5) &&
                                <span onClick={ () => this.handleChangeContentPage(this.state.contentPage + 1)}>Next</span>
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Content;