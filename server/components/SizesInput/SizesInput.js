import React, { createRef, Component } from 'react'
import { withDocument } from 'part:@sanity/form-builder'
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'
import Label from 'part:@sanity/components/labels/default'
import Checkbox from 'part:@sanity/components/toggles/checkbox'
import sanityClient from 'part:@sanity/base/client'
import styles from './SizesInput.css'

const sizesQuery = `
  *[_id == $productId][0] { sizes }
`

const createPatchEvent = (value) =>
  PatchEvent.from(value === [] ? unset() : set(value))

class SizesInput extends Component {
  static defaultProps = {
    value: []
  }

  state = {
    loading: true,
    sizes: [],
  }

  constructor(props) {
    super(props)
    this.ref = createRef()
  }

  async componentDidMount() {
    const { document } = this.props
    const productId = document.product._ref

    const { sizes } = await sanityClient.fetch(sizesQuery, { productId })
    this.setState({ loading: false, sizes })
  }

  focus() {
    this.ref.current.focus()
  }

  handleChange = (event) => {
    const { onChange, value: currentValue } = this.props
    const { value, checked } = event.target

    const newValue = checked
      ? [...currentValue, value]
      : currentValue.filter((v) => v !== value)
    const patchEvent = createPatchEvent(newValue)
    onChange(patchEvent)
  }

  render() {
    const { value, document } = this.props
    const { loading, sizes } = this.state

    return (
      <>
        <Label level={1}>Sizes</Label>
        {loading && <Label>Loading...</Label>}
        <div className={styles.container}>
          {sizes.map(({ _key, width, height }) => (
            <div key={_key} className={styles.checkboxContainer}>
              <Checkbox
                label={`${width}x${height}`}
                value={_key}
                checked={value.includes(_key)}
                onChange={this.handleChange}
              />
            </div>
          ))}
        </div>
      </>
    )
  }
}

export default withDocument(SizesInput)
