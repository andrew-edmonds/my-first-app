import React, {Fragment, Component} from 'react';
import CardList from '../components/CardList.js';
import SearchBox from '../components/SearchBox.js';
import Scroll from '../components/Scroll.js'


class App extends Component {
    constructor (){
        super()
        this.state = {
            robots: [],
            searchfield: '',
        }
    }
    
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            return response.json();
        })
        .then(users=>{
            this.setState({robots : users});
        })
    }
    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }
    render (){

        const {robots, searchfield} = this.state;
        
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        
        return !robots.length ?
        <h1>loading...</h1> :
        <Fragment>
                <h1 className = 'tc f1'>Robot Friends</h1>
                <div className = 'tc'>
                    <SearchBox SearchChange = {this.onSearchChange}/>
                    <Scroll>
                        <CardList robots = {filteredRobots}/>
                    </Scroll>
                </div>
        </Fragment>
    }
}
export default App;