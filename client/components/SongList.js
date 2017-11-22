import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { Link } from 'react-router'
import styled from 'styled-components'

import query from '../queries/fetchSongs'

const Li = styled.li`
  display: flex;
  justify-content: space-between;
`

class SongList extends Component {
  onSongDelete(id) {
    this.props
      .deleteSong({ variables: { id } })
      .then(() => this.props.data.refetch())
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <Li key={id} className="collection-item">
          {title}
          <i className="material-icons" onClick={() => this.onSongDelete(id)}>
            delete
          </i>
        </Li>
      )
    })
  }

  render() {
    return (
      <div>
        <ul className="collection">
          {this.props.data.loading || this.renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
         >
          <i className="material-icons">add</i>
        </Link>
      </div>
    )
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(query),
  graphql(mutation, { name: 'deleteSong' })
)(SongList)
