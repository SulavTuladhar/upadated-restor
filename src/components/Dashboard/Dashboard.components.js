import React, { Component } from 'react'
import Docker from '../common/Docker/Docker.components'
import { ViewProducts } from '../products/ViewProducts/ViewProducts.components'

export class Dashboard extends Component {
  render() {
    return (
      <>
          <ViewProducts seenByAdmin />
          <Docker />
      </>
    )
  }
}
