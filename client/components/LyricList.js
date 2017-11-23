import React, { Component } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const Li = styled.li`
  display: flex;
  justify-content: space-between;
`

const I = styled.i`
  margin-left: 5px;
`

const Div = styled.div`
  display:flex;
  align-items: center;
`

class LyricList extends Component {
  onLike(id) {
    this.props.likeLyric({ variables: { id } })
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <Li
          key={id}
          className="collection-item"
        >
          {content}
          <Div className="vote-box">
            {likes}
            <I
              className="material-icons"
              onClick={() => this.onLike(id)}
            >
              thumb_up
            </I>
          </Div>
        </Li>
      )
    })
  }
  render() {
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    )
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`

export default graphql(mutation, {
  name: 'likeLyric'
})(LyricList)