import React from 'react';

export const Search = function(props){
    return(
        <form onSubmit={props.getSearchValues}> 
            <input type='txt' placeholder='write like this: cat dog' />
            <input className='submit' type='submit' value='Search'/>
        </form>
    )
}