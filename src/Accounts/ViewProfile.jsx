import React, { Component, Fragment } from 'react';
import Navbar from '../components/Navbar';
import Firebase from '../config/firebase';
import { Link, browserHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import Media from "react-media";


class ViewProfile extends Component {
    constructor(props) {
        super(props)

        // this.handleSignOut = this.handleSignOut.bind(this)
        this.state = {
            listOfPeople: this.props.route.userData['0'],
            userUID: this.props.route.userUID
        }

    }


    // handleSignOut() {
    //     Firebase.auth().signOut();
    //     browserHistory.push('/');
    // }

    // UNSAFE_componentWillMount() {
    //     this.handleLoad()
    // }
    componentDidMount() {
        //this.handleLoad();
    }

    render() {
        const { listOfPeople, userUID } = this.state;
        console.log(userUID)
        return (

            <div>
                <Navbar userUID={this.state.userUID} />
                {(userUID) ?
                    <div className="row container-fluid justify-content-start mt-4">
                        <div className="card col-md-2 ml-3 d-flex mt-2 mb-3">
                            <div className="justify-content-start text-center">
                                <h3 className='mb-3 mt-3'>Account </h3>
                            </div>

                            <Button variant='contained'
                                className="btn  mb-1"
                                style={{
                                    backgroundColor: '#FFF',
                                    color: '#000'
                                }}
                                onClick={() => browserHistory.push('/updateprofile')}
                            >Update Profile
                            {/* <Link to={{
                            pathname: '/updateprofile',
                            state: { userDetails: listOfPeople }
                        }} >Update Profile</Link> */}
                            </Button>
                            {/* On small devices route to /messagemobile when Messages button is clicked. On large devices /messages */}
                            <Media query="(max-width: 769px)"
                                render={() => <Button className="btn  mb-1" variant='contained' style={{ backgroundColor: '#FFF', color: '#000' }}
                                    onClick={() => browserHistory.push('/chathistorymobile')}>Messages</Button>}
                            /> <Media query="(min-width: 770px)"
                                render={() => <Button className="btn  mb-1" variant='contained' style={{ backgroundColor: '#FFF', color: '#000' }}
                                    onClick={() => browserHistory.push('/messages')}>Messages</Button>}
                            />
                            {/* <Button className="btn  mb-1" variant='contained' style={{ backgroundColor: '#FFF', color: '#000' }}
                                onClick={() => browserHistory.push('/messages')}>Messages</Button> */}
                            {/* <Button className="btn  mb-1" variant='contained' style={{ backgroundColor: '#FFF', color: '#000' }}
                                onClick={this.handleSignOut}>Log Out</Button> */}
                        </div>

                        <div className="card col center-align mt-2  ml-3">
                            {(listOfPeople) ? <div className='container' >
                                <h3 className='mb-3 mt-3'>Your Profile</h3>
                                <div className="d-flex justify-content-center ">


                                    <div style={{ textAlign: 'center' }}>
                                        <img
                                            className="rounded-circle"
                                            src={listOfPeople.pic}
                                            style={{ width: 160, height: 160 }}
                                            alt={'profile pic'}
                                        /> <br />

                                    </div>
                                </div>
                                <div className="row mt-5 justify-content-between">
                                    <div className="mb-3 col-md-5 ">
                                        <h4>Personal Details</h4>
                                        <b>
                                            Name:</b>{`${listOfPeople.firstName} ${listOfPeople.lastName}`}
                                        <br />
                                        <b>Profession: </b>{listOfPeople.profession} <br />

                                        <b>
                                            City: </b>{listOfPeople.city} <br />


                                        <h4 className="mt-4 mb-1">Job Details</h4>
                                        <b>
                                            Skills: </b>{`${listOfPeople.skills.map((element, i) => (
                                                element.label
                                            ))}`} <br />


                                        <b>Job Desciption: </b>{`${listOfPeople.briefDescription}`}
                                    </div>
                                    <div className=" col-md-5 ">
                                        <h4 className="mb-2">Gallery of Work</h4>
                                        {listOfPeople.galleryOfWork.map((image, i) => (
                                            <div key={i} className="row mb-3" >
                                                <div className="col-md-6">
                                                    <img className="img-thumbnail mr-2" alt=" gallery of work" src={image} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='mt-5' style={{ textAlign: 'center' }}>


                                </div></div> : <div><h3>Please Update Your Profile</h3></div>}
                        </div>
                    </div>
                    : <div className="container text-center mt-5" style={{ height: '100%' }} >
                        {/* <img src={ChatIcon} /> */}
                        <h4 className="mt-5">Please login first</h4>
                        <Button variant='outlined'
                            style={{ backgroundColor: '#FFF', color: '#000', marginTop: 50 }}
                            onClick={() => browserHistory.push('/phoneLogin')}>Login</Button>
                    </div>
                }

            </div>)
    }
}



export default ViewProfile;