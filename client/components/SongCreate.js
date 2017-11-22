import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class SongCreate extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)

    this.state = { title: '' }
  }

  onSubmit(event) {
    event.preventDefault()

    this.props.createSong({
      variables: {
        title: this.state.title
      }
    })
  }

  onChange(event) {
    this.setState({ title: event.target.value })
  }

  render() {
    return (
      <div>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit}>
          <label>Song Title:</label>
          <input
            onChange={this.onChange}
            value={this.state.title}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id,
      title
    }
  }
`

export default graphql(mutation, { name: 'createSong' })(SongCreate)