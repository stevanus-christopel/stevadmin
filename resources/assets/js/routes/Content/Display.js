import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

//  Components
import Button from '../../components/Button';
import Select from '../../components/Select';
import TextInput from '../../components/TextInput';

class Content extends PureComponent {
    constructor(props) {
        super(props);
        
        this.state = {
            pageItems: props.pageItems,
            editableContent: props.content,
            editorState: EditorState.createWithContent(
                ContentState.createFromBlockArray(htmlToDraft(props.content.Content))
            ),
            isLoading: false,
            error: null
        };

        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeCode = this.handleChangeCode.bind(this);
        this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    componentDidMount() {

    }
    handleChangePage(event) {
        let content = {...this.state.editableContent};
        content.Page = event.target.value;
        this.setState({editableContent: content});
    }
    handleChangeCode(event) {
        let content = {...this.state.editableContent};
        content.ContentCode = event.target.value;
        this.setState({editableContent: content});
    }
    handleChangeLanguage(event) {
        let content = {...this.state.editableContent};
        content.Language = event.target.value.toUpperCase();
        this.setState({editableContent: content});
    }
    handleChangeStatus(event) {
        let content = {...this.state.editableContent};
        content.IsActive = event.target.value;
        this.setState({editableContent: content});
    }
    handleChangeTitle(event) {
        let content = {...this.state.editableContent};
        content.Title = event.target.value.toUpperCase();
        this.setState({editableContent: content});
    }
    onEditorStateChange(editorState){
        let content = {...this.state.editableContent};
        content.Content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.setState({
            editorState,
            editableContent: content
        });
    };
    handleSave() {
        let { editableContent } = this.state;
        if(editableContent.ContentCode.length === 0) {
            this.setState({error: 'Please enter Code.'});
        } else if(editableContent.Title.length === 0) {
            this.setState({error: 'Please enter Title.'});
        } else if(editableContent.Content.length === 0) {
            this.setState({error: 'Please enter Content.'});
        } else {
            this.setState({
                isLoading: true
            });

            editableContent.UpdatedAt = window.generateLaravelDate(new Date());
            editableContent.UpdatedBy = JSON.parse(window.sessionStorage.user).Username;

            fetch('api/contents/', {
                method:'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editableContent)
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if(data.exception) {
                    this.setState({
                        error: 'System error. Please contact administrator.',
                        isLoading: false
                    });
                } else if(data.length < 1) {
                    this.setState({
                        error: 'Failed to save the content. Please check your input.',
                        isLoading: false
                    });
                }else {
                    this.setState({
                        error: null,
                        isLoading: false
                    });

                    this.props.onSave();
                }
            });
        }
    }
    render() {
        let { content, onSave, onCancel } = this.props;
        let { pageItems, editableContent, editorState, isLoading, error } = this.state;

        return (
            <div className="content-display">
                <h2>Edit Content</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>Page</td>
                            <td>
                                <Select items={pageItems} 
                                value={editableContent.Page} disabled={isLoading}
                                onChange={this.handleChangePage}  />
                            </td>
                        </tr>
                        <tr>
                            <td>Code</td>
                            <td>
                                <TextInput type="text"
                                value={editableContent.ContentCode} disabled={isLoading}
                                onChange={this.handleChangeCode} />
                            </td>
                        </tr>
                        <tr>
                            <td>Language</td>
                            <td>
                                <TextInput type="text"
                                value={editableContent.Language} disabled={isLoading}
                                onChange={this.handleChangeLanguage} />
                            </td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>
                                <Select items={[
                                    { name: "Active", value: 1 },
                                    { name: "Not Active", value: 0 }
                                ]} value={editableContent.IsActive} disabled={isLoading}
                                onChange={this.handleChangeStatus} />
                            </td>
                        </tr>
                        <tr>
                            <td>Created by</td>
                            <td>{ content.CreatedBy } at { content.CreatedAt }</td>
                        </tr>
                        <tr>
                            <td>Last updated by</td>
                            <td>{ content.UpdatedBy } at { content.UpdatedAt }</td>
                        </tr>
                        <tr>
                            <td>Title</td>
                            <td>
                                <TextInput type="text"
                                value={editableContent.Title} disabled={isLoading}
                                onChange={this.handleChangeTitle} />
                            </td>
                        </tr>
                        <tr>
                            <td>Content</td>
                            <td>
                                <Editor 
                                    editorState={editorState}
                                    wrapperClassName="content__editor-wrapper"
                                    editorClassName="content__editor"
                                    onEditorStateChange={this.onEditorStateChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="content-display__button">
                    <Button medium onClick={onCancel} disabled={isLoading}>Cancel</Button>
                    <Button primary medium onClick={this.handleSave} disabled={isLoading}>Save</Button>
                </div>

                {
                    (!error && isLoading) &&
                    <div className="content-display__loading">Please wait...</div>
                }

                {
                    (error && !isLoading) &&
                    <div className="content-display__error">{ error }</div>
                }
            </div>
        );
    }
}

export default Content;