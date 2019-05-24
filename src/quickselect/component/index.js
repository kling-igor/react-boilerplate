import React from 'react'
import styled from 'styled-components'
import { MenuItem, Dialog, Classes } from '@blueprintjs/core'
import { Suggest } from '@blueprintjs/select'

require('./bp3.css')

export class QuickSelect extends React.Component {
  state = {
    content: [],
    isOpen: true
  }

  renderItem = (item, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
      return null
    }

    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        key={item}
        onClick={handleClick}
        text={item}
        textClassName="menu-item"
      />
    )
  }

  filterItems = (query, items) => {
    return items.filter(item => {
      return item.toLowerCase().indexOf(query.toLowerCase()) >= 0
    })
  }

  onQueryChange = query => {
    console.log('query:', query)
    // тут можно, например, вызывать колбек для перехода на строку редактора
  }

  handleValueChange = value => {
    this.setState({ isOpen: false })
    console.log('SELECT:', value)
  }

  renderInputValue = inputValue => {
    return inputValue
  }

  render() {
    return (
      <Dialog
        autoFocus={true}
        className={this.props.darkTheme ? 'bp3-dark' : ''}
        isOpen={this.state.isOpen}
        transitionDuration={0}
        // backdropClassName="backdrop"
        inputProps={{ small: true, fill: true }}
        onClosed={this.props.onClosed}
        canEscapeKeyClose={true}
        canOutsideClickClose={true}
        onClose={() => {
          this.setState({ isOpen: false })
        }}
      >
        <div
          ref={ref => {
            this.divRef = ref
          }}
          className={Classes.DIALOG_BODY}
          style={{
            width: 500,
            height: 66 // 72
          }}
        >
          <Suggest
            items={this.props.items}
            itemRenderer={this.renderItem}
            itemListPredicate={this.filterItems}
            onQueryChange={this.onQueryChange}
            closeOnSelect={true}
            openOnKeyDown={false}
            resetOnClose={false}
            resetOnQuery={true}
            resetOnSelect={false}
            inputValueRenderer={this.renderInputValue}
            noResults={<MenuItem disabled={true} text="No result..." />}
            onItemSelect={this.handleValueChange}
            usePortal={false}
            popoverProps={{
              minimal: true,
              // portalContainer: this.divRef,
              targetClassName: 'dialog-input',
              popoverClassName: 'popover'
            }}
            inputProps={{
              inputRef: el => {
                !!el && el.focus()
              },
              small: true,
              fill: true,
              className: 'quickOpenInput',
              placeholder: "Type '?' to get help on the actions you can take from here"
            }}
          />
        </div>
      </Dialog>
    )
  }
}
