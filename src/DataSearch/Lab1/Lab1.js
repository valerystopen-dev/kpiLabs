import React, {useEffect, useState} from "react";
import './lab1.css'


export const Lab1 = () => {
    const [counter, setCounter] = useState(1);
    const [indexTerms, setIndexTerms] = useState([])
    const [documentCollections, setDocumentCollections] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [visiblePart, setVisiblePart] = useState(1)
    const [inputError, setInputError] = useState(false)
    const [searchString, setSearchString] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const createSearchArray = () =>{
        let resultArray = []
        const searchArray = searchQuery.split(/([()])/)
        for (let i = 0; i<searchArray.length; i++){
            if(searchArray[i]==='(' || searchArray[i]==='' || searchArray[i]===')'){
                searchArray.splice(i, 1)
                i--
            }
        }
        if (searchArray.length >= 1){
            if (searchArray[0].includes('&')){
                resultArray.push(searchArray[0].split('&'))
            }
            else if(searchArray[0].includes('v')){
                const orArray = searchArray[0].split('v')
                orArray.forEach((el)=>{
                    resultArray.push(new Array(el))
                })
            }
        }
        if (searchArray.length === 2){
            if(searchArray[1].includes('&')){
                const andArray = searchArray[1].split('&')
                resultArray.forEach((el)=>{
                    el.push(andArray[1])
                })
            }
            else if(searchArray[1].includes('v')){
                resultArray.push(new Array(searchArray[1].split('v')[1]))
            }
        }
        if(searchArray.length === 3){
            if(searchArray[1].includes('&')){
                if(searchArray[2].includes('&')){
                   const andArr = searchArray[2].split('&')
                   andArr.forEach((el) => {
                       resultArray.forEach((el2)=>{
                           el2.push(el)
                       })
                   })
                }
                if(searchArray[2].includes('v')){
                    const orArr = searchArray[2].split('v')
                    if(resultArray.length< orArr.length){
                        resultArray.push((resultArray[0].slice(0,2)))
                    }
                    else{
                        resultArray.push(resultArray[0].slice(0,1))
                        resultArray[2].push(orArr[1])
                        resultArray.push(resultArray[1].slice(0,1))
                        resultArray[3].push(orArr[0])
                    }
                    resultArray[0].push(orArr[0])
                    resultArray[1].push(orArr[1])
                }
            }
            else if(searchArray[1].includes('v')){
                if(searchArray[2].includes('&')){
                    resultArray.push(searchArray[2].split('&'))
                }
                else if(searchArray[2].includes('v')){
                    const orArr = searchArray[2].split('v')
                    orArr.forEach((el)=>{
                        resultArray.push(new Array(el))
                    })
                }
            }
        }
        return resultArray;
    }

    const createSearchString = (searchArray) => {
        let res = 'Find a document that contains terms: '
        searchArray.forEach((arr) => {
            arr.forEach((el) => {
                res += indexTerms[el-1]
                if(arr.indexOf(el)!==arr.length-1){
                    res += ' and '
                }
            })
            if(searchArray.indexOf(arr)!==searchArray.length-1){
                res += ' or '
            }
        })
        console.log(res)
        return res
    }

    const performSearch = () => {
        const searchArray = createSearchArray()
        setSearchString(createSearchString(searchArray))
        const resultArray = []
        let checkNeed = true
        documentCollections.forEach((doc)=>{
           searchArray.forEach((arr)=>{
               checkNeed = true
               arr.forEach((el) => {
                   if(!doc.toLowerCase().includes(indexTerms[el-1].toLowerCase())){
                       checkNeed = false
                   }
               })
               if(checkNeed){
                   resultArray.push(doc)
               }
           })
        })
        setSearchResults(Array.from([...new Set (resultArray)]))
    }

    useEffect(()=>{
        if(searchQuery.length>0) {
            performSearch()
        }
    }, [searchQuery])

    const handleAddClick = (evt) => {
        if((visiblePart === 1 && counter === indexTerms.length) ||
            (visiblePart === 2 && counter === documentCollections.length))
        {
                setCounter(counter + 1);
        }
    };

    const handleIndexChange = (evt, key) => {
        if(/\s/g.test(indexTerms[key])){
            setInputError(true)
        }
        else{
            setInputError(false)
        }
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

    const handleNext = () => {
        if((visiblePart === 1 && indexTerms.length > 0) ||
            (visiblePart === 2 && documentCollections.length > 0)) {
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
                    <button className="addButton" disabled={inputError} onClick={handleAddClick}>+</button>
                    <button className="submitButton" disabled={inputError} onClick={handleNext}>NEXT</button>
                </form> : <div/>
            }
            {inputError ? <p style={{color: 'red', fontSize: '20px'}}>No spaces allowed in index terms</p> : <div/>}
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
                <form className="lab1" onSubmit = {handleSubmit}>
                    <b>3. Input search query</b>
                    <input id="searchInp"
                           className='fInput'
                           type="text">
                    </input>
                    <button style={{marginLeft: '60%'}} className="submitButton">SUBMIT</button>
                </form> : <div/>}
            { searchQuery.length > 0 ?
                <div>
                    <div className='lab1' style={{display: 'inline'}}>
                        <b>Index terms:</b>
                        {indexTerms.map((term)=>{
                            return <p style={{color: 'white'}}>{term}</p>
                        })}
                    </div>
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
                    <div className='lab1' style={{display: 'inline'}}>
                        <b>Search string: </b>
                        <p style={{color: 'white'}}>{searchString}</p>
                    </div>
                    <div className='lab1' style={{display: 'inline'}}>
                        <b>Search results: </b>
                        {searchResults.map((search)=>{
                            return <p style={{color: 'white'}}>{search}</p>
                        })}
                        <br/>
                    </div>
                </div>: <div/>}
        </div>
    );
}