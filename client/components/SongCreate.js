import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link, hashHistory } from 'react-router'

import query from '../queries/fetchSongs'

class SongCreate extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)

    this.state = { title: '' }
  }

  onSubmit(event) {
    event.preventDefault()

    this.props
      .createSong({
        variables: { title: this.state.title},
        refetchQueries: [{ query }]
      })
      .then(() => hashHistory.push('/'))

  }

  onChange(event) {
    this.setState({ title: event.target.value })
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
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