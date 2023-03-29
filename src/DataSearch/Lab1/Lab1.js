import React, {useState} from "react";
import './lab1.css'


export const Lab1 = () => {
    const [counter, setCounter] = useState(1);
    const [indexTerms, setIndexTerms] = useState([])
    const [documentCollections, setDocumentCollections] = useState([])
    const [searchQuery, setSearchQuery] = useState([])
    const [visiblePart, setVisiblePart] = useState(1)

    const handleAddClick = (evt) => {
        if((visiblePart === 1 && counter === indexTerms.length) ||
            (visiblePart === 2 && counter === documentCollections.length) ||
            (visiblePart === 3 && counter === searchQuery.length)){
                setCounter(counter + 1);
        }
    };

    const handleIndexChange = (evt, key) => {
        if(indexTerms[key] !== evt.target.value){
            const newArr = indexTerms
            newArr[key] = evt.target.value
            setIndexTerms(newArr)
        }
    }

    const handleDocumentChange = (evt, key) => {
        if(documentCollections[key] !== evt.target.value){
            const newArr = documentCollections
            newArr[key] = evt.target.value
            setDocumentCollections(newArr)
        }
    }

    const handleSearchChange = (evt, key) => {
        if(searchQuery[key] !== evt.target.value){
            const newArr = searchQuery
            newArr[key] = evt.target.value
            setSearchQuery(newArr)
        }
    }

    const handleNext = () => {
        if((visiblePart === 1 && indexTerms.length > 0) ||
            (visiblePart === 2 && documentCollections.length > 0)) {
                setCounter(1)
                setVisiblePart(visiblePart + 1)
        }
    }

    const handleSubmit = () =>{
        if(searchQuery.length>0){
            setVisiblePart(visiblePart+1)
        }
    }

    const afterSubmission = (event) => {
        event.preventDefault();
    }

    return (
        <div>
            {visiblePart===1 ?
                <form className="lab1" onSubmit = {afterSubmission}>
                    <b>1. Input index terms</b>
                    {Array.from(Array(counter)).map((el, c) => {
                        return <input id="indexTermsInp"
                            className='fInput'
                            key={c}
                            type="text"
                        onChange={event => handleIndexChange(event, c)}>
                        </input>;
                    })}
                    <button className="addButton" onClick={handleAddClick}>+</button>
                    <button className="submitButton" onClick={handleNext}>NEXT</button>
                </form> : <div/>
            }
            { visiblePart===2 ?
            <form className="lab1" onSubmit = {afterSubmission}>
                <b>2. Input document collections</b>
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
            { visiblePart===3 ?
                <form className="lab1" onSubmit = {afterSubmission}>
                    <b>3. Input search query</b>
                    {Array.from(Array(counter)).map((el, c) => {
                        return <input id="searchInp"
                                      className='fInput'
                                      key={c}
                                      type="text"
                                      onChange={event => handleSearchChange(event, c)}>
                        </input>;
                    })}
                    <button className="addButton" onClick={handleAddClick}>+</button>
                    <button className="submitButton" onClick={handleSubmit}>SUBMIT</button>
                </form> : <div/>}
            { visiblePart===4 ?
                <div className="lab1">
                    <b>{indexTerms[0]}</b>
                    <b>{documentCollections[0]}</b>
                    <b>{searchQuery[0]}</b>
                </div>: <div/>}
        </div>
    );
}