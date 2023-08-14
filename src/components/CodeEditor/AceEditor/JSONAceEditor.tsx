import React, { Component } from 'react';
import AceEditor, { IAceEditorProps } from 'react-ace';
import { addCompleter } from 'ace-builds/src-noconflict/ext-language_tools';
import './MaterialOneDark'; // pg模式包
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-spellcheck';
import 'ace-builds/src-noconflict/ext-searchbox';

interface JSONAceEditorProps extends IAceEditorProps {
    tables?: string[];
    setEditor: (editor: any) => void;
}

export default class JSONAceEditor extends Component<JSONAceEditorProps> {
    componentDidMount() {
        // 设置编辑器实例到 props 中提供的 setEditor 函数
        this.props.setEditor(this.refs.aceEditor);

        // 添加自动完成功能
        addCompleter({
            getCompletions: (editor, session, pos, prefix, callback) => {
                callback(
                    null,
                    // 使用传入的 tables 数据来生成自动完成列表
                    (this.props.tables || []).map((v) => ({ name: v, value: v }))
                );
            },
        });
    }

    render() {
        const { value, onChange, height, readOnly, theme } = this.props;
        return (
            <AceEditor
                ref="aceEditor"
                mode="json"
                theme={theme || 'material-one-dark'}
                fontSize={14}
                showGutter
                showPrintMargin={false}
                onChange={onChange}
                value={value}
                wrapEnabled
                highlightActiveLine
                enableBasicAutocompletion
                enableLiveAutocompletion
                enableSnippets
                style={{ width: '100%', height: height || 300 }}
                setOptions={{
                    readOnly: readOnly || false,
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 4,
                    useWorker: true,
                }}
            />
        );
    }
}
