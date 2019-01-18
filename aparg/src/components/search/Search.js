import React from 'react';

export const Search = function(props){
    return(
        <form onSubmit={props.getFirstImgUrls}> 
            <input type='txt' placeholder='finde your photo' />
            <input className='submit' type='submit' value='Search'/>
        </form>
    )
}