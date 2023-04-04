import React, {useState} from "react";
import './lab1.css'

export const Lab12 = () => {
    const [visiblePart, setVisiblePart] = useState(1)
    const [counter, setCounter] = useState(1);
    const [documentCollections, setDocumentCollections] = useState([])
    const [searchQuery, setSearchQuery] = useState([])


    const handleDocumentChange = (evt, key) => {
        if(documentCollections[key] !== evt.target.value){
            const newArr = documentCollections
            newArr[key] = evt.target.value
            setDocumentCollections(newArr)
        }
    }

    const handleAddClick = (evt) => {
        if(visiblePart === 1 && counter === documentCollections.length)
        {
            setCounter(counter + 1);
        }
    };

    const handleNext = () => {
        if(visiblePart === 1 && documentCollections.length > 0) {
            setCounter(1)
            setVisiblePart(visiblePart + 1)
        }
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        setSearchQuery(event.target[0].value)
    }

    const afterSubmission = (event) => {
        event.preventDefault();
    }

    return(
        <div>
            {visiblePart === 1 ? <form className="lab1" onSubmit = {afterSubmission}>
                <b>1. Input document collections</b>
                {Array.from(Array(counter)).map((el, c) => {
                    return <input id="documentInp"
                                  className='fInput'
                                  key={c}
                                  type="text"
                                  onChange={event => handleDocumentChange(event, c)}>
                    </input>;
                })}
                <button className="addButton" onClick={handleAddClick}>+</button>
                <button className="submitButton" onClick={handleNext}>NEXT</button>
            </form> : <div/>}
            { visiblePart===2 ?
                <form className="lab1" onSubmit = {handleSubmit}>
                    <b>2. Input search query</b>
                    <input id="searchInp"
                           className='fInput'
                           type="text">
                    </input>
                    <button style={{marginLeft: '60%'}} className="submitButton">SUBMIT</button>
                </form> : <div/>}
            {searchQuery.length > 0 ? (
                <div>
                    <div className='lab1' style={{display: 'inline'}}>
                        <b>Documents: </b>
                        {documentCollections.map((doc)=>{
                            return <p style={{color: 'white'}}>{doc}</p>
                        })}
                    </div>
                    <div className='lab1' style={{display: 'inline'}}>
                        <b>Search query: </b>
                        <p style={{color: 'white'}}>{searchQuery}</p>
                    </div>
                </div>
            ) : <div/>}
        </div>
    )
}