import React from 'react'
import {useDispatch} from 'react-redux'
import debounce from 'lodash.debounce'

import styles from './search.module.scss'
import { setSearchValue } from '../../redux/filter/slice'


const Search: React.FC = () => {
    const dispatch = useDispatch()
    const [value, setValue] = React.useState('')
    const inputRef = React.useRef<HTMLInputElement>(null)

    const OnClearClick = () => {
        dispatch(setSearchValue(''))
        setValue('')
        inputRef.current?.focus();
    }

    const updateSearchValue = React.useCallback(
        debounce((val: string) => {
            dispatch(setSearchValue(val))
        }, 250),
        [])

    const onInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value)
    }




    return (
        <div className={styles.root}>
            <svg className={styles.icon} viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
                <title />
                <path d="M54,0A42.051,42.051,0,0,0,12,42a41.5989,41.5989,0,0,0,8.48,25.0356L1.7578,85.7578a5.9994,5.9994,0,1,0,8.4844,8.4844L28.9644,75.52A41.5989,41.5989,0,0,0,54,84,42,42,0,0,0,54,0Zm0,72A30,30,0,1,1,84,42,30.0353,30.0353,0,0,1,54,72Z" />
            </svg>
            <input className={styles.input} ref={inputRef} value={value} onChange={onInputValue} placeholder='Search...' />
            {value &&
                <svg className={styles.close} onClick={OnClearClick} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
                </svg>}
        </div>
    )
}

export default Search