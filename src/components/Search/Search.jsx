import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import listener from '../../common/listener'
import { inputSearch, toggleSearch } from '../../reducers/searchSlice'

import './Search.scss'

export default function Search() {
  const dispatch = useDispatch()
  const search = useSelector((state) => state.search)
  const inputRef = useRef()
  function handleInput(e) {
    dispatch(inputSearch(e.target.value))
  }

  function handleFocus() {
    dispatch(toggleSearch(true))
  }

  function handleBlur() {
    dispatch(toggleSearch(false))
  }

  function handleKeyDown(e) {
    if (e.keyCode === 27) {
      dispatch(toggleSearch(false))
      inputRef.current.blur()
    }
  }

  useEffect(() => {
    function focus() {
      inputRef.current.focus()
    }
    listener.register('search', 'focus', focus)
    return () => {
      listener.remove('search', 'focus', 'focus')
    }
  }, [])
  return (
    <div className="search">
      <span className="search__icon"></span>
      <input
        ref={inputRef}
        onFocus={handleFocus}
        // onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onChange={handleInput}
        value={search.input}
        placeholder="collection name/address/slug"
        className="search__input"
      ></input>
    </div>
  )
}
