import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import marked from 'marked';


//var markedDown = require('marked');
const myRenderer = new marked.Renderer();
myRenderer.heading = function (text, level) {
  
return ` <h${level}>
          ${text}
          </h${level}>`;
};

myRenderer.paragraph = function (text) {
  
return ` <p>
          ${text}
          </p>`;
};

/*myRenderer.list = function (text) {
  
  return ` <li style="color:green">
            ${text}
            </li>`;
};*/



//place holder text for the editor
const placeHolderText = `# Hello this is my Markdown Live Preview 

                        
## This is a subheading !!!!
### And now you can make your heading a little more smaller

Curious, what is markdown is ? [check here](https://en.wikipedia.org/wiki/Markdown)
> It's a lightweight markup language .......
## Usage (Check simultaneously the List feature):
1. Write Markdown text here following the syntax
2. Check the magic result in the corresponding preview area
You can also write inline code between two backticks such as \`<p>Here you Go</p>\`
Multiline code goes here,

\`\`\`\`
(function(){
 alert("Do cool stuff and make a difference !!!! ");
})();
\`\`\`\`

For sure there are
> Block Quotes!

Bulleted List is also possible !
- Here you go
 - Can make nesting too
   - May be one more level

### Quick text styling reference
* **bold**
* _italics_
* **_both_**
* ~~cross that stuff out right NOW~~

![React Logo w/ Text](https://goo.gl/Umyytc)
`;


/*State will be maintained in App. The child components EditorArea and 
PreviewArea will be changed and updated as per state changes here*/ 
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      marktext : placeHolderText
    };

    this.retrieveTextContent = this.retrieveTextContent.bind(this);
  }

  retrieveTextContent(returnedText){
    this.setState(
      {
        marktext: returnedText,

     });
  }
  render() {
    return (
      <div id="mainDivFlexbox">
      <EditorArea content={this.state.marktext} getText={this.retrieveTextContent}/>
      <PreviewArea previewContent={this.state.marktext}/>
      </div>
      
    );
  }
}

//Editing area
class EditorArea extends Component {
  constructor(props){
    super(props);
    this.getTextContent = this.getTextContent.bind(this);
  }
  getTextContent(e){
      let renderedVal = marked.Renderer(e.target.value);
      let contenteditable = document.getElementById('editortextarea');
      let text = contenteditable.textContent;
    this.props.getText(e.target.value);
    }
  
  render(){
   let content = this.props.content;
   
    return (

      <div id="editor">
      <div id="editorbar">Editor</div>
      <textarea id="editortextarea" onChange={this.getTextContent} value={content}/>
      </div>
    )
  }
}

//preview component
class PreviewArea extends Component{
  constructor(props){
    super(props);
  }

  render(){
    //console.log("this.props.previewContent , ",this.props.previewContent);
const renderedHtml = marked(this.props.previewContent, { renderer: myRenderer });
  return (

    <div id='preview'>
    <div id="previewbar">Markdown Preview</div>
    <div id='previewText' dangerouslySetInnerHTML={{__html : renderedHtml}} />
    </div>
  )

  }





}

export default App;
