import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';


import './App.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css'
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';

class Apps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            html: '',
            css: '',
            js: '',
            theme:'material'
        };
    }

    componentDidUpdate() {
        this.runCode();
    }

 

    runCode = () => {
        const { html, css, js } = this.state;

        const iframe = this.refs.iframe;
        const document = iframe.contentDocument;
        const documentContents = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <style>
              ${css}
            </style>
          </head>
          <body>
            ${html}

            <script type="text/javascript">
              ${js}
            </script>
          </body>
          </html>
        `;

        document.open();
        document.write(documentContents);
        document.close();
    };

    render() {
        const { html, js, css } = this.state;
        const codeMirrorOptions = {
            theme: this.state.theme,
            lineNumbers: true,
            scrollbarStyle: null,
            tabSize: 4,
            indentWithTabs:true,
            indentUnit:4,
        };

        return (
            <div className="App">
                <header className="header">
                    < img src = {
                        require('./favicon.ico')
                    }
                    alt="Icon"/> Code Fiddle | A Rapid Editor For HTML , CSS And Javascript Prototypes 
                    <br />
                    Mode :- <select value={this.state.theme} onChange={(e)=>this.setState({
                        theme:e.target.value
                    })}>
                    <option value="material">Dark</option>
                    <option value="default">Light</option>
                    </select>
                </header>
                <hr color="white" />
                <section className="playground">
                    <div className="code-editor html-code">
                        <div className="editor-header">HTML</div>
                        <CodeMirror
                            value={html}
                            options={{
                                mode: 'htmlmixed',
                                ...codeMirrorOptions,
                            }}
                            onBeforeChange={(editor, data, html) => {
                                this.setState({ html });
                            }}
                        />
                    </div>
                    <div className="code-editor css-code">
                        <div className="editor-header">CSS</div>
                        <CodeMirror
                            value={css}
                            options={{
                                mode: 'css',
                                ...codeMirrorOptions,
                            }}
                            onBeforeChange={(editor, data, css) => {
                                this.setState({ css });
                            }}
                        />
                    </div>
                    <div className="code-editor js-code">
                        <div className="editor-header">JS</div>
                        <CodeMirror
                            value={js}
                            options={{
                                mode: 'javascript',
                                ...codeMirrorOptions,
                            }}
                            onBeforeChange={(editor, data, js) => {
                                this.setState({ js });
                            }}
                        />
                    </div>
                </section>
                <section className="result">
                    <iframe title="result" className="iframe" ref="iframe" />
                </section>
            </div>
        );
    }
}

export default Apps;