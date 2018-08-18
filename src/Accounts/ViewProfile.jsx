import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Firebase from '../config/firebase';
import { Link, browserHistory } from 'react-router';
import Button from '@material-ui/core/Button';

let element = '';
let userUID
class ViewProfile extends Component {
    constructor(props) {
        super(props)
        this.handleLoad = this.handleLoad.bind(this)
        this.handleSignOut = this.handleSignOut.bind(this)
        this.state = {
            listOfPeople: ''
        }
    }
    handleLoad() {
        Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                userUID = user.uid;
                //console.log(userUID);

                Firebase.database()
                    .ref(`Users/${userUID}`)
                    .on('value', (snapshot) => {
                        const data = snapshot.val()

                        if ((data.userUID == null)) {
                            browserHistory.push('/updateprofile')

                        } else {
                            this.setState({
                                listOfPeople: snapshot.val()
                            })
                        }
                    });
            } else {
                console.log('signed out')
            }
        });
    }

    handleSignOut() {
        console.log()
        Firebase.auth().signOut();
        browserHistory.push('/');
    }

    componentWillMount() {
        this.handleLoad()
    }
    render() {
        const { listOfPeople } = this.state;

        return (
            <div>
                <Navbar title={'Navbar Page'} />



                {(listOfPeople) ? <div className='container mt-2' >
                    <h3 className='mb-3'>Your Profile</h3>
                    <div className="d-flex justify-content-center ">


                        <div style={{ textAlign: 'center' }}>
                            <img
                                className="rounded-circle"
                                src={listOfPeople.pic}
                                style={{ width: 160, height: 160 }}
                                alt={'profile pic'}
                            /> <br />
                            <Button className="mt-3" variant='contained' style={{ backgroundColor: '#FFF', color: '#000' }}
                                onClick={() => browserHistory.push('/messages')}>Messages</Button>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className=" col-lg-6 col-md-6 ">
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
                        <div className=" col-lg-6 col-md-6 ">
                            <h4>Gallery of Work</h4>
                            {listOfPeople.galleryOfWork.map((image, i) => (
                                <div key={i} className="row mb-3" >
                                    <div className="col-md-6">
                                        <img className="img-thumbnail mr-2" src={image} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>



                    <div className='mt-5' style={{ textAlign: 'center' }}>
                        <Button variant='contained' style={{
                            backgroundColor: '#FFF',
                            color: '#000'
                        }}
                        //onClick={() => browserHistory.push('/updateprofile')}
                        ><Link to={{
                            pathname: '/updateprofile',
                            state: { userDetails: listOfPeople }
                        }} >Update Profile</Link>
                        </Button>

                    </div></div> : <div className="mt-5" style={{ textAlign: 'center' }}><h1>Sign In to View your profile</h1></div>}



            </div>

        )
    }
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '50%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        // to make the modal scrollable if it is bigger than than the page
        height: '500px',
        overflow: 'scroll',
    },
};

export default ViewProfile;