import React, { Component } from 'react'
import HomeNavbar from '../components/HomeNavbar';
import RoutineIndexContainer from '../containers/RoutineIndexContainer';


class Home extends Component {
    state = {
        user: {},
    }

    componentDidMount() {
        this.fetchUser()
    }

    fetchUser = () => {
        const username = this.props.match.params.username
        fetch(`http://localhost:3002/api/v1/users/login/${username}`).then(resp => resp.json())
        .then(userData => this.setState({user: userData}))
    }

    // renderUserActivities = userActivityArray => {
    //     let newArray = userActivityArray.filter(userAct => userAct.completed === false)
    //     this.setState({routine: newArray})
    // }

    

//     fetchRoutine = () => {
//         fetch(`http://localhost:3002/api/v1/users/${this.state.user.id}/user_activities`)
//         .then(resp => resp.json())
//         .then(routineData => this.setState({routine: routineData}))
//     }

//     fetchActivities = () => {
//         fetch('http://localhost:3002/api/v1/activities').then(resp => resp.json()).then(activities => this.setState({activities}))
//     }


//     addToRoutine = id => {
//         fetch(`http://localhost:3002/api/v1/user_activities`,{
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json"
//             },
//             body: JSON.stringify({
//                 position:   this.state.routine.length,
//                 user_id:    this.state.user.id,
//                 activity_id: id
//             })
//         })
//         .then(resp => resp.json())
//         .then(userActObj => {
//             // this.fetchRoutine()
//             this.setState(prevState => {
//                 return {
//                     routine: [...prevState.routine, userActObj]
//                 }
                
//             })

//             // console.log(this.state)
//         })
//     }


//     removeFromRoutine = userAct => {
//         fetch(`http://localhost:3002/api/v1/user_activities/${userAct.id}`,{
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json"
//             }
//         })
//         .then(() => {
//             this.setState(prevState => {
//                 let newRoutine = prevState.routine
//                 newRoutine.splice(userAct.position, 1)
//                     return{
//                         routine: newRoutine
//                     }
//             })
            
//         })
//         .then(this.updateRoutine)
        
//     }

    
//     updateRoutine = () => {
//         let routine = this.state.routine
//         routine.forEach((routineItem, index) =>
//         fetch(`http://localhost:3002/api/v1/user_activities/${routineItem.id}`,{
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json"
//             },
//             body: JSON.stringify({
//                 position: index
//             })
//         })
//         .then(resp => resp.json())
//         .then(json => {
//             this.fetchRoutine()
//         })
//         )
//     }

 
// //ANCHOR automation
//     completeActivity = id => {
//         fetch(`http://localhost:3002/api/v1/user_activities/${id}`,{
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json"
//             },
//             body: JSON.stringify({
//                 completed: true
//             })
//         })
//         .then(resp => resp.json())
//         .then(json => {
//             this.fetchRoutine()
//         })
//     }

//     renderRoutineActivities = () => {
//         const routineLength = this.state.routine.length
//         // routineLength < 1 || routineLength === undefined ? 
//         const firstRoutine = (this.state.routine[0] === undefined ? 
//             22 : this.state.routine.sort((a, b) => a.position - b.position)[0].activity_id)
//         const activityName = activities.find(activity => activity.id === firstRoutine).name
//         console.log(activityName)
//         return activityName
//     }

//     nextActivity = () => {
//         this.setState(prevState => {
//             prevState.routine.splice(0, 1)
//             return{
//                 routine: [...prevState.routine]
//             }
//         })
//     }

//     changeToComplete = routineItem => {
//         fetch(`http://localhost:3002/api/v1/user_activities/${routineItem.id}`,{
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json"
//             },
//             body: JSON.stringify({
//                 completed: true
//             })
//         })
//             .then(resp => resp.json())
//             .then(json => {
//             this.fetchRoutine()
//         })
//     }
    
    render() {
        console.log(this.props)
        return (
            <>
                <HomeNavbar />
                {/* {!this.props.loggedIn && this.props.history.push('/welcome')} */}
                <RoutineIndexContainer  user={this.state.user} match={this.props.match} userActivities={this.state.userActivities}/>
            </>
        )
    }
}

export default Home