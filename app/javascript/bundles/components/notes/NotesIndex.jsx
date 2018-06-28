import PropTypes from 'prop-types';
import React from 'react';

export default class NotesIndex extends React.Component {
  static propTypes = {
    note_users: PropTypes.array.isRequired // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class
    this.state = { note_users: this.props.note_users };
  }

  render() {
    return (
      <div>
        <p id="notice">{ this.props.notice }</p>

        <h1>Notes</h1>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            { this.state.note_users.map((note_user, index) => {
              return <tr key={index}>
                      <td>{ note_user.note.title }</td>
                      <td>{ note_user.note.body }</td>
                      <td><a href={Routes.note_path(note_user.note)}>Show</a></td>
                      <td>{note_user.role != 'reader' && <a href={Routes.edit_note_path(note_user.note)}>Edit</a>}</td>
                      <td>{['owner', 'creator'].includes(note_user.role) && <a href={Routes.note_path(note_user.note)} data-confirm="Are you sure?" rel="nofollow" data-method="delete">Destroy</a>}</td>
                    </tr>
            })}
          </tbody>
        </table>

        <br/>

        <a href='/notes/new'>New Note</a>
      </div>
    )
  }
}
