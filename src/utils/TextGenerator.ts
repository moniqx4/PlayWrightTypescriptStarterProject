import { TextType } from "../constants"

/**Generates a random string of Ascii characters
 * @param  {number} numberOfChars, set to the number of characters for string
 * @returns string
 */
function generateTextStrings(numberOfChars: number): string {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'    
    let randomText = ''
    const numberOfCharsLength = characters.length
    
    for(let i = 0; i < numberOfChars; i++) {
      randomText += characters.charAt(Math.floor(Math.random() * numberOfCharsLength))
    }
    
    return randomText
}

function generateNumericStrings(numberOfChars: number): string {
  const characters ='0123456789'    
  let randomText = ''
  const numberOfCharsLength = characters.length
  
  for(let i = 0; i < numberOfChars; i++) {
    randomText += characters.charAt(Math.floor(Math.random() * numberOfCharsLength))
  }
  
  return randomText
}

function generateAlphaTextOnlyStrings(numberOfChars: number): string {
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'    
  let randomText = ''
  const numberOfCharsLength = characters.length
  
  for(let i = 0; i < numberOfChars; i++) {
    randomText += characters.charAt(Math.floor(Math.random() * numberOfCharsLength))
  }
  
  return randomText
}

function createTestTextString(textType: TextType, numberOfChars: number=1): string | undefined {
    console.log(`generating a text string of type: ${textType.toString()} with ${numberOfChars} characters`)

    switch (textType) {
      case TextType.ALPHA:
        return generateAlphaTextOnlyStrings(numberOfChars)        

      case TextType.ALPHA_NUMERIC:
        return generateTextStrings(numberOfChars)       

      case TextType.SPECIAL_CHARS:
        return generateSpecialCharacterTextStrings(numberOfChars) 
        
      case TextType.EXTENDED_ASCII:
        return generateExtendedAsciTextStrings()  

      case TextType.MIXED:
        return generateMixedAsciSpecCharTextStrings(numberOfChars)

      case TextType.NUMERIC:
        return generateNumericStrings(numberOfChars)

      case TextType.SCRIPT:
        return '<script> alert() </script>'

      case TextType.SQL:
        return 'select * FROM [ReportManagement].[dbo].[Report]'

      case TextType.BLANK:
        return ' '        
    
      default:
        console.log('Unrecognized text type')
        break;
    }
}

/**Generates a random string of Non-Ascii characters
 * @param  {number} numberOfChars, set to the number of characters for string
 * @returns string
 */
function generateSpecialCharacterTextStrings(numberOfChars: number): string { 
  const characters ='~!@#$%^&*(){}[]<>`,.\"/?|\\'
  let randomText = ''
  const numberOfCharsLength = characters.length

  for(let i = 0; i < numberOfChars; i++) {
    randomText += characters.charAt(Math.floor(Math.random() * numberOfCharsLength))
  }
  
  return randomText
}

function generateExtendedAsciTextStrings(): string { 

  let win1251decoder = new TextDecoder('windows-1251');
  let bytes = new Uint8Array([207, 240, 232, 226, 229, 242, 44, 32, 236, 232, 240, 33]);
   // returns russian text, Привет, мир!  - Hello world for the rest of us
  return win1251decoder.decode(bytes)
}

/**Generates a random string of Mix of Ascii and Non-Ascii characters
 * @param  {number} numberOfChars, set to the number of characters for string
 * @returns string
 */
function generateMixedAsciSpecCharTextStrings(numberOfChars: number): string {  

  const characters ='~!@#$%^&*(){}[]<>`,.\"/?|\\0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
  let randomText = ''
  const numberOfCharsLength = characters.length

  for(let i = 0; i < numberOfChars; i++) {
    randomText += characters.charAt(Math.floor(Math.random() * numberOfCharsLength))
  }
    
  return randomText
}

/**
 * @param  {RegExp} regex, pass in a regex to use, for example, RegExp => new RegExp(/\D[a-zA-Z]/)
 * @param  {string} stringValue, the string value to parse
 * example, define your regex like this,  const regexAMPM = () => new RegExp(/\D[a-zA-Z]/) then use this method like this parseRegex(regexAMPM, '12:12:53PM'), this would return string value PM
 * see constants/CommonRegexes.ts for possible re-use
 */
function parseToStringRegex(regex: RegExp, stringValue: string){
  return regex.exec(`${stringValue}`) 
}

export const TestGenerator = {   
  generateTextStrings,
  generateSpecialCharacterTextStrings,
  generateMixedAsciSpecCharTextStrings,
  generateExtendedAsciTextStrings,
  generateNumericStrings,
  parseToStringRegex,
  createTestTextString
}