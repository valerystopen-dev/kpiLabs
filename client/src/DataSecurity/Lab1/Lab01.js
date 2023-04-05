import React, {useEffect, useState} from "react";
import './lab01.css'

export const Lab01 = () => {

    const [key, setKey] = useState('')
    const [inputText, setInputText] = useState('')
    const [keyMatrix, setKeyMatrix] = useState('')
    const [playfairSquare, setPlayfairSquare] = useState([])
    const [splitText, setSplitText] = useState('')
    const [encryptedText, setEncryptedText] = useState('')
    const [decryptedText, setDecryptedText] = useState('')
    const [inputError, setInputError] = useState(false)

    useEffect(() => {
        if (key.length > 0 && inputText.length > 0) {
            setDecryptedText('')
            playfairEncode()
        }
    }, [key, inputText])

    const playfairEncode = () => {
        setEncryptedText('')
        setPlayfairSquare([])
        setSplitText('')
        if (/[^a-z]/i.test(inputText) || /[^a-z]/i.test(key)) {
            setInputError(true)
        } else {
            setInputError(false)
            const kMatrix = constructKeyMatrix()
            setKeyMatrix(kMatrix)
            const kMatrixArray = kMatrix.toUpperCase().split('')
            let resKeyMatrix = []
            for (let i = 0; i < 5; i++) {
                resKeyMatrix[i] = kMatrixArray.slice(i * 5, (i + 1) * 5)
            }
            setPlayfairSquare(resKeyMatrix)
            const plainText = editPlain()
            setSplitText((plainText.match(/.{1,2}/g)).join(' '));
            const cipher = encryptPlayfair(kMatrix, plainText)
            setEncryptedText(cipher)
        }
    }

    const constructKeyMatrix = () => {

        const alphabet = 'abcdefghifklmnopqrstuvwxyz'
        let resultKey = key.toLowerCase() + alphabet
        resultKey = resultKey.replace(/j/g, 'i')

        for (let i = 0; i < resultKey.length; i++) {
            if (resultKey.indexOf(resultKey[i]) !== i) {
                resultKey = resultKey.slice(0, i) + resultKey.slice(i + 1)
                i--
            }
        }
        return resultKey
    }

    const editPlain = () => {

        let plaintText = inputText.toLowerCase()

        for (let i = 0; i < plaintText.length - 1; i += 2) {
            if (plaintText[i] === plaintText[i + 1]) {
                plaintText = plaintText.slice(0, i + 1) + 'x' + plaintText.slice(i + 1)
            }
        }

        if (plaintText.length % 2 === 1) {
            plaintText += 'x'
        }

        plaintText = plaintText.replace(/j/g, 'i')

        return plaintText
    }

    const encryptPlayfair = (kMatrix, plainText) => {
        let ciphertext = ''
        for (let i = 0; i < plainText.length - 1; i += 2) {
            let i1, i2, j1, j2

            i1 = kMatrix.indexOf(plainText[i]) / 5 | 0
            j1 = kMatrix.indexOf(plainText[i]) % 5

            i2 = kMatrix.indexOf(plainText[i + 1]) / 5 | 0
            j2 = kMatrix.indexOf(plainText[i + 1]) % 5

            //same row => row num * 5 + (col num + 1) % 5 => to shift right
            if (i1 == i2) {
                ciphertext += kMatrix[i1 * 5 + (j1 + 1) % 5] + kMatrix[i2 * 5 + (j2 + 1) % 5]
            }

            //same column => ((row num + 1) % 5) * 5 + col num * 5  => to shift down
            else if (j1 == j2) {
                ciphertext += kMatrix[((i1 + 1) % 5) * 5 + j1] + kMatrix[((i2 + 1) % 5) * 5 + j2]
            }

            //add col num of 2nd element
            else {
                ciphertext += kMatrix[i1 * 5 + j2] + kMatrix[i2 * 5 + j1]
            }
        }

        return ciphertext
    }

    const decryptPlayfair = () => {

        let plainText = ''
        for (let i = 0; i < encryptedText.length - 1; i += 2) {
            let i1, i2, j1, j2
            i1 = keyMatrix.indexOf(encryptedText[i]) / 5 | 0
            j1 = keyMatrix.indexOf(encryptedText[i]) % 5

            i2 = keyMatrix.indexOf(encryptedText[i + 1]) / 5 | 0
            j2 = keyMatrix.indexOf(encryptedText[i + 1]) % 5

            //same row => row num * 5 + (col num - 1) * 5 => to shift left
            if (i1 == i2) {
                plainText += j1 !== 0 ? keyMatrix[i1 * 5 + (j1 - 1) % 5] : keyMatrix[i1 * 5 + 4]
                plainText += j2 !== 0 ? keyMatrix[i2 * 5 + (j2 - 1) % 5] : keyMatrix[i2 * 5 + 4]
            }

            //same column => ((row num - 1) % 5) * 5 + col num * 5 => to shift up
            else if (j1 == j2) {
                plainText += i1 !== 0 ? keyMatrix[((i1 - 1) % 5) * 5 + j1] : keyMatrix[20 + j1]
                plainText += i2 !== 0 ? keyMatrix[((i2 - 1) % 5) * 5 + j2] : keyMatrix[20 + j2]
            }

            //same algorithm
            else {
                plainText += keyMatrix[i1 * 5 + j2] + keyMatrix[i2 * 5 + j1]
            }
        }
        setDecryptedText(plainText)
        return plainText
    }

    const afterSubmission = (event) => {
        event.preventDefault();
        setKey(event.target[0].value)
        setInputText(event.target[1].value)
    }
    return (
        <div>
            <form className="lab1" onSubmit={afterSubmission}>
                <b>Input key</b>
                <input id="indexTermsInp"
                       className='fInput'
                       type="text">
                </input>;
                <b>Input string to encrypt</b>
                <input id="indexTermsInp"
                       className='fInput'
                       type="text">
                </input>;
                {inputError ? (
                    <div style={{marginTop: '-30px'}}>
                        <p style={{fontSize: '13pt', color: '#f95959'}}>*Key and string can only contain letters</p>
                    </div>) : <div/>}
                <button className="encryptButton">ENCRYPT</button>
            </form>
            {
                playfairSquare.length > 0 ? (
                    <div>
                        <p>Key Matrix: </p>
                        <table>
                            <tbody>
                            {playfairSquare.slice(0, playfairSquare.length).map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item[0]}</td>
                                        <td>{item[1]}</td>
                                        <td>{item[2]}</td>
                                        <td>{item[3]}</td>
                                        <td>{item[4]}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                ) : <div/>
            }
            {
                splitText.length > 0 ? (
                    <div style={{display: 'flex'}}>
                        <p>Split text:</p>
                        <p style={{marginLeft: '1%'}} className='splitText'>{splitText}</p>
                    </div>
                ) : <div/>
            }
            {
                encryptedText.length > 0 ? (
                    <div>
                        <div style={{display: 'flex'}}>
                            <p style={{fontSize: '28px'}}>Encrypted text:</p>
                            <p className='result' style={{marginLeft: '1%'}}>{encryptedText.toUpperCase()}</p>
                        </div>
                        <button style={{marginLeft: '52%'}} className="encryptButton"
                                onClick={decryptPlayfair}>DECRYPT
                        </button>
                    </div>
                ) : <div/>
            }
            {
                decryptedText.length > 0 ? (
                    <div style={{display: 'flex'}}>
                        <p style={{fontSize: '28px'}}>Decrypted text:</p>
                        <p className='result' style={{marginLeft: '1%'}}>{decryptedText.toUpperCase()}</p>
                    </div>
                ) : <div/>
            }
        </div>
    )
}