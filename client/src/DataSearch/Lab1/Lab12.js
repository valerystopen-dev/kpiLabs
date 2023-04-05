import React, {useEffect, useState} from "react";
import './lab1.css'

export const Lab12 = () => {
    const [visiblePart, setVisiblePart] = useState(1)
    const [counter, setCounter] = useState(1);
    const [documentCollections, setDocumentCollections] = useState([])
    const [searchQuery, setSearchQuery] = useState([])
    const [threshold, setThreshold] = useState(0.1)
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        if (searchQuery.length > 0) {
            performSearch()
        }
    }, [searchQuery])

    const cosSimilarity = (vecA, vecB) => {
        let dotProduct = 0
        vecA.forEach((el, index) => {
            dotProduct += el * vecB[index]
        })
        let magA = 0
        vecA.forEach((el) => {
            magA += el * el
        })
        magA = Math.sqrt(magA);
        let magB = 0;
        vecB.forEach((el) => {
            magB += el * el
        })
        magB = Math.sqrt(magB);

        return dotProduct / (magA * magB);
    }

    const getDenominator = (term, documents) => {
        return Math.max(
            ...documents.map((el) => {
                return getNumerator(term, el);
            })
        );
    };

    const getNumerator = (term, documents) => {
        return documents.filter((el) => el === term).length;
    };

    const performSearch = () => {
        const result = [];

        const documentsTerms = documentCollections.map((doc) => {
            return doc.toLowerCase().split(/[ ,.]+/);
        })
        const inputQuery = searchQuery.toLowerCase();
        const searchTerms = inputQuery.split(/[ ,.]+/);
        const words = new Set([
            ...documentsTerms.flat(Infinity),
            ...searchTerms.flat(Infinity),
        ]);

        const allSentences = [];
        allSentences.push(...documentsTerms, searchTerms);
        const vectors = [];
        allSentences.forEach(() => vectors.push([]))

        let maxWordsNum = 0
        words.forEach((word) => {
            allSentences.forEach((sentenceTerms) => {
                const includesWordNum = allSentences.filter((sentence) =>
                    sentence.includes(word)
                ).length;
                if (includesWordNum > maxWordsNum) {
                    maxWordsNum = includesWordNum
                }
            })
        })

        words.forEach((word) => {
            let count = 0;
            const denominator = getDenominator(word, allSentences);
            allSentences.forEach((sentenceTerms) => {
                const numerator = getNumerator(word, sentenceTerms);
                const tf = 0.5 + 0.5 * (numerator / denominator);
                const includesWordNum = allSentences.filter((sentence) =>
                    sentence.includes(word)
                ).length;
                const idf = Math.log(maxWordsNum / includesWordNum + 1);
                vectors[count].push(tf * idf);
                count++;
            })
        })

        vectors.forEach((vector, index) => {
            const value = cosSimilarity(vectors[vectors.length - 1], vector);
            if (value > threshold && index !== vector.length - 2) {
                result.push([documentCollections[index], value]);
            }
        })
        setSearchResult(result);
    }

    const handleDocumentChange = (evt, key) => {
        if (documentCollections[key] !== evt.target.value) {
            const newArr = documentCollections
            newArr[key] = evt.target.value
            setDocumentCollections(newArr)
        }
    }

    const handleAddClick = (evt) => {
        if (visiblePart === 1 && counter === documentCollections.length) {
            setCounter(counter + 1);
        }
    };

    const handleNext = () => {
        if (visiblePart === 1 && documentCollections.length > 0) {
            setCounter(1)
            setVisiblePart(visiblePart + 1)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchQuery(event.target[0].value)
    }

    const afterSubmission = (event) => {
        event.preventDefault();
    }

    return (
        <div>
            {visiblePart === 1 ? <form className="lab1" onSubmit={afterSubmission}>
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
            {visiblePart === 2 ?
                <form className="lab1" onSubmit={handleSubmit}>
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
                        {documentCollections.map((doc) => {
                            return <p style={{color: 'white'}}>{doc}</p>
                        })}
                    </div>
                    <div className='lab1' style={{display: 'inline'}}>
                        <b>Search query: </b>
                        <p style={{color: 'white'}}>{searchQuery}</p>
                    </div>
                    <div className='lab1' style={{display: 'inline'}}>
                        <b>Search results: </b>
                        {
                            searchResult.map((el) => {
                                return <p style={{color: 'white'}}>{el[0]} : {el[1]}</p>
                            })
                        }
                    </div>
                </div>
            ) : <div/>}
        </div>
    )
}