import React, {useEffect, useState} from "react";
import './lab01.css'

export const Lab01 = () =>{

    const [key, setKey] = useState('')
    const [inputText, setInputText] = useState('')
    const [keyMatrix, setKeyMatrix] = useState([])
    const [splitText, setSplitText] = useState('')
    const [encryptedText, setEncryptedText] = useState('')

    useEffect(()=>{
        if(key.length > 0 && inputText.length > 0) {
           playfairEncode()
        }
    }, [key, inputText])

    const playfairEncode = () => {
        const kMatrix = constructKeyMatrix()
        const kMatrixArray = kMatrix.toUpperCase().split('')
        let resKeyMatrix = []
        for(let i = 0; i<5; i++){
            resKeyMatrix[i] = kMatrixArray.slice(i * 5, (i + 1) * 5)
        }
        setKeyMatrix(resKeyMatrix)
        const plainText = editPlain()
        setSplitText((plainText.match(/.{1,2}/g)).join(' '));
        const cipher = encryptPlayfair(kMatrix, plainText)
        setEncryptedText(cipher)
    }

    const constructKeyMatrix = () => {
        // + del ' '
        const alphabet = 'abcdefghifklmnopqrstuvwxyz'
        let resultKey = key + alphabet
        resultKey = resultKey.replace(/j/g, 'i')

        for (let i = 0; i< resultKey.length; i++){
            if(resultKey.indexOf(resultKey[i]) !== i){
                resultKey = resultKey.slice(0, i) + resultKey.slice(i + 1)
                i--
            }
        }
        return resultKey
    }

    const editPlain = () => {

        let plaintText = inputText

        for (let i = 0; i < plaintText.length - 1; i += 2){
            if (plaintText[i] === plaintText[i + 1]){
                plaintText = plaintText.slice(0, i + 1) + 'x' + plaintText.slice(i + 1)
            }
        }

        if (plaintText.length % 2 === 1) {
            plaintText += 'x'
        }

        plaintText = plaintText.replace(/j/g, 'i')

        return plaintText
    }

    const encryptPlayfair = (keyMatrix, plainText) => {
        let ciphertext = ''
        for (let i = 0; i < plainText.length - 1; i += 2){
            let i1, i2, j1, j2
            i1 = keyMatrix.indexOf(plainText[i]) / 5 | 0
            j1 = keyMatrix.indexOf(plainText[i]) % 5

            i2 = keyMatrix.indexOf(plainText[i + 1]) / 5 | 0
            j2 = keyMatrix.indexOf(plainText[i + 1]) % 5

            if(i1 == i2) {
                ciphertext += keyMatrix[i1 * 5 + (j1 + 1) % 5] + keyMatrix[i2 * 5 + (j2 + 1) % 5]
            }

            else if(j1 == j2) {
                ciphertext += keyMatrix[((i1 + 1) % 5) * 5 + j1] + keyMatrix[((i2 + 1) % 5) * 5 + j2]
            }

            else {
                ciphertext += keyMatrix[i1 * 5 + j2] + keyMatrix[i2 * 5 + j1]
            }
        }

        return ciphertext
    }

    // const decryptPlayfair = () => {
    //     let plainText = ''
    //     for (let i = 0; i < plainText.length - 1; i += 2){
    //
    //     }
    // }

    const afterSubmission = (event) => {
        event.preventDefault();
        setKey(event.target[0].value)
        setInputText(event.target[1].value)
    }
    return(
        <div>
            <form className="lab1" onSubmit = {afterSubmission}>
                <b>Input key</b>
                <input id="indexTermsInp"
                       className='fInput'
                       type="text" >
                </input>;
                <b>Input string to encrypt</b>
                <input id="indexTermsInp"
                       className='fInput'
                       type="text" >
                </input>;
                <button className="encryptButton">ENCRYPT</button>
            </form>
            {
                keyMatrix.length > 0 ? (
                    <div>
                        <p>Key Matrix: </p>
                        <table>
                            <tbody>
                            {keyMatrix.slice(0, keyMatrix.length).map((item, index) => {
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
                )  : <div/>
            }
            {
                splitText.length > 0 ? (
                    <div>
                        <p>Split text:</p>
                        <p className='splitText'>{splitText}</p>
                    </div>
                ) :<div/>
            }
            {
                encryptedText.length > 0 ? (
                    <div>
                        <p>Encrypted text:</p>
                        <p className='result'>{encryptedText.toUpperCase()}</p>
                        <button className="decryptButton">DECRYPT</button>
                    </div>
                ) :<div/>
            }
        </div>
    )
}