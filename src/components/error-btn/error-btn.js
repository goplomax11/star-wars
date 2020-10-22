import React from 'react';

class ErrorButton extends React.Component {

    state ={
        error:false
    }

   
      


    render() {
        if(this.state.error){
            this.foo.bar = 0;
        }
        return(
            <div className='btn btn-warning' onClick={() => this.setState({error:true})}>
                Throw Error
            </div>
        )
    }
}

export default ErrorButton