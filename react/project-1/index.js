// import json, {a, b, c} from './a'

// // document.write("reactQ")

// // import {a, b} from './a'
// // import {aa, bb} from './a'
// // import obj from './a'

// require('./index.css')

// // document.write(a + b)
// // document.write(aa + bb)
// // document.write(obj.a + obj.b)

// document.write(json.a);//hello
// document.write(json.b);//webpack
// document.write(a);//5
// document.write(b);//10
// document.write(c);//15


import React from 'react'
import ReactDom from 'react-dom'

class Wei extends React.Component {
    render() {
        return <div>
            <div>we come to React Word!</div>
        </div>
    }
}

ReactDom.render(
    <Wei/>,
    document.getElementById('app')
);