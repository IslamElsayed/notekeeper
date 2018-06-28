import PropTypes from 'prop-types';
import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

export default class NoteForm extends React.Component {
  static propTypes = {
    note: PropTypes.object,
    errors: PropTypes.array,
    tags: PropTypes.array,
    note_tags: PropTypes.array,
    authenticity_token: PropTypes.string
  };
  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);

    // this.handleTagAddition = this.handleTagAddition.bind(this);
    // How to set initial state in ES6 class syntax
    // https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class
    this.state = { note: this.props.note, note_tags: this.props.note.tags || [] };
  }

  handleTagDelete(i) {
    let tags = this.state.note_tags;
    this.setState({
     note_tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleTagAddition(tag) {
    let tags = this.props.tags
    tags = tags.filter((note_tag) => note_tag.name === tag.text)

    if(tags.length === 0){
      fetch("/tags", { method: "POST",
                       headers: { "Content-Type": "application/json" },
                       body: JSON.stringify({ tag: { name: tag.text, authenticity_token: this.props.authenticity_token } }) })
      .then(response => response.json()).then(response => {
        let tags = (this.state.note_tags)
        tags.push(response)
        this.setState({ note_tags: tags });
      });
    } else {
      let tags = (this.state.note_tags)
      tag = this.props.tags.filter((origin_tag) => origin_tag.name === tag.text)[0]
      tags.push(tag)
      this.setState({ note_tags: tags });
    }
  }

  render() {
    let action = this.props.note.id ? Routes.note_path(this.props.note) : Routes.notes_path()
    let tag_ids = []
    this.state.note_tags.map(tag => (tag_ids.push(tag.id)))
    console.log(tag_ids)
    return (
      <form action={action} acceptCharset="UTF-8" method="POST">
        <input type="hidden" name="authenticity_token" value={this.props.authenticity_token}/>
        { this.props.errors.length > 0 &&
          <div id="error_explanation">
            <h2>{ this.props.errors.length } error(s) prohibited this note from being saved:</h2>

            <ul>
              { this.props.errors.map((message, index) => {
                return <li key={index}>{ message }</li>
              })}
            </ul>
          </div>
        }
        <div className="field">
          <label htmlFor="note_title">Title</label>
          <input type="text" name="note[title]" id="note_title" defaultValue={ this.props.note.title }/>
        </div>

        <div className="field">
          <label htmlFor="note_body">Body</label>
          <textarea name="note[body]" id="note_body" defaultValue={ this.props.note.body }></textarea>
        </div>

        <div className="field">
          <label htmlFor="note_body">Tags</label>

          <ReactTags tags={this.state.note_tags.map(tag => ({ id: tag.id.toString(), text: tag.name }))}
                    suggestions={this.props.tags.map(tag => ({ id: tag.id.toString(), text: tag.name }))}
                    handleDelete={this.handleTagDelete.bind(this)}
                    handleAddition={this.handleTagAddition.bind(this)}
                    />
          {this.state.note_tags.map(tag => (
            <input type="hidden" name="note[tag_ids][]" defaultValue={tag.id} />
          ))}
        </div>

        <div className="actions">
          <input type="submit" name="method"/>
        </div>
      </form>
    )
  }
}
