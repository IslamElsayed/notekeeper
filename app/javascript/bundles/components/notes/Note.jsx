import PropTypes from 'prop-types';
import React from 'react';

export default class NoteForm extends React.Component {
  static propTypes = {
    note: PropTypes.object.isRequired
  };
  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class
    this.state = { note: this.props.note };
  }

  render() {
    let note = this.props.note
    return (
      <div>
        <p id="notice">{ this.props.notice }</p>

        <p>
          <strong>Title:</strong>
          <br/>
          { note.title }
        </p>

        <p>
          <strong>Body:</strong>
          <br/>
          { note.body }
        </p>

        <p>
          <strong>Tags:</strong>
          <br/>
          { note.tags.map((tag) => {
             <br/>
             return tag.name + '('+ tag.notes_count+' notes)'
          })}
        </p>

        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            { this.props.note_users.map((note_user, index) => {
              return <tr key={index}>
                       <td>{note_user.user.email}</td>
                       <td>{note_user.role}</td>
                       <td>{note_user.role != 'creator' &&
                         <a href={Routes.revoke_note_user_path(note_user.note, note_user.user)} data-confirm="Are you sure?" rel="nofollow" data-method="delete">Remove</a>
                       }
                       </td>
                     </tr>
            })}
          </tbody>
        </table>

        { ['owner', 'creator'].includes(this.props.current_note_user.role) &&
          <form action={Routes.invite_note_users_path(note)} acceptCharset="UTF-8" method="post"><input type="hidden" name={this.props.authenticity_token} />
            <select name="user_id">
              { this.props.users.map((user, index) => {
                return <option value={user.id} key={index}>{ user.email }</option>
              })}
            </select>
            <select name="role">
              { this.props.roles.map((role, index) => {
                return <option value={role} key={index}>{ role }</option>
              })}
            </select>
            <input type="submit" name="commit" value="Invite" data-disable-with="Invite" />
          </form>
        }
      </div>
    )
  }
}
